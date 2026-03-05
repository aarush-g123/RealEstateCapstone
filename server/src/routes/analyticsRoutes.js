// server/src/routes/analyticsRoutes.js
const express = require('express');
const { z } = require('zod');
const { Op, fn, col } = require('sequelize');
const { AnalyticsEvent } = require('../models');
const { requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

const eventSchema = z.object({
  eventType: z.string().trim().min(1).max(40).default('page_view'),
  path: z.string().trim().min(1).max(512),
  propertyId: z.string().trim().min(1).max(64).optional().nullable(),
  visitorId: z.string().trim().min(1).max(64).optional().nullable(),
  referrer: z.string().trim().min(1).max(512).optional().nullable(),
});

function looksLikeBot(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  if (!ua) return false;
  return (
    ua.includes('bot') ||
    ua.includes('spider') ||
    ua.includes('crawler') ||
    ua.includes('headless') ||
    ua.includes('lighthouse')
  );
}

// POST /api/analytics/event (public)
router.post('/event', async (req, res) => {
  try {
    const parsed = eventSchema.parse(req.body || {});

    // basic bot filter
    const userAgent = req.get('user-agent') || null;
    if (looksLikeBot(userAgent)) {
      return res.json({ ok: true, ignored: true });
    }

    await AnalyticsEvent.create({
      eventType: parsed.eventType,
      path: parsed.path,
      propertyId: parsed.propertyId || null,
      visitorId: parsed.visitorId || null,
      referrer: parsed.referrer || req.get('referer') || null,
      userAgent,
      occurredAt: new Date(),
    });

    res.json({ ok: true });
  } catch (err) {
    // never fail the page because analytics failed
    console.error('analytics/event error:', err?.message || err);
    res.status(200).json({ ok: true, error: 'ignored' });
  }
});

// GET /api/analytics/summary?days=30 (admin)
router.get('/summary', requireRole('admin'), async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days || '30', 10) || 30, 1), 365);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const where = {
    eventType: 'page_view',
    occurredAt: { [Op.gte]: since },
  };

  const totalSiteViews = await AnalyticsEvent.count({ where });

  const pagesRows = await AnalyticsEvent.findAll({
    where,
    attributes: ['path', [fn('COUNT', col('id')), 'views']],
    group: ['path'],
    order: [[fn('COUNT', col('id')), 'DESC']],
    limit: 500,
    raw: true,
  });

  const propertiesRows = await AnalyticsEvent.findAll({
    where: { ...where, propertyId: { [Op.ne]: null } },
    attributes: ['propertyId', [fn('COUNT', col('id')), 'views']],
    group: ['propertyId'],
    order: [[fn('COUNT', col('id')), 'DESC']],
    limit: 500,
    raw: true,
  });

  const pages = {};
  for (const r of pagesRows) pages[r.path] = Number(r.views || 0);

  const properties = {};
  for (const r of propertiesRows) properties[r.propertyId] = Number(r.views || 0);

  res.json({
    days,
    totalSiteViews,
    pages,
    properties,
    updatedAt: new Date().toISOString(),
  });
});

// POST /api/analytics/reset (admin)
router.post('/reset', requireRole('admin'), async (req, res) => {
  await AnalyticsEvent.destroy({ where: {}, truncate: true });
  res.json({ ok: true });
});

// DELETE /api/analytics/property/:id (admin)
router.delete('/property/:id', requireRole('admin'), async (req, res) => {
  const propertyId = String(req.params.id || '').trim();
  if (!propertyId) return res.status(400).json({ error: 'Missing property id' });

  const deleted = await AnalyticsEvent.destroy({ where: { propertyId } });
  res.json({ ok: true, deleted });
});

module.exports = router;
