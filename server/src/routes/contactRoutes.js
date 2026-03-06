const express = require('express');
const { z } = require('zod');
const { Contact } = require('../models');

const router = express.Router();

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
  propertyId: z.string().trim().max(120).optional(),
  propertyTitle: z.string().trim().max(255).optional(),
  source: z.string().trim().max(80).optional(),
});

// GET /api/contacts
// Note: this is intentionally open because the current dashboard auth is client-side only.
router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json({ contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});

// POST /api/contacts
router.post('/', async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const contact = await Contact.create({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      propertyId: data.propertyId || null,
      propertyTitle: data.propertyTitle || null,
      source: data.source || 'contact-page',
    });
    res.status(201).json({ contact });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid contact data' });
  }
});

module.exports = router;
