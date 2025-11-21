// src/routes/contactRoutes.js
const express = require('express');
const { z } = require('zod');
const { Contact } = require('../models');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

// GET /api/contacts
router.get('/', requireAuth, async (req, res) => {
  const contacts = await Contact.findAll();
  res.json({ contacts });
});

// POST /api/contacts  (admin only)
router.post('/', requireRole('admin'), async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    const contact = await Contact.create(data);
    res.status(201).json({ contact });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid contact data' });
  }
});

module.exports = router;
