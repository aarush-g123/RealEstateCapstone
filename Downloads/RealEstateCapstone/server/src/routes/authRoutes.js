// src/routes/authRoutes.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { z } = require('zod');
const { User } = require('../models');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginSchema = z.object({
  idToken: z.string(),
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { idToken } = loginSchema.parse(req.body);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ where: { googleId } });
    if (!user) {
      // Security: only grant admin if email matches OWNER_EMAIL (if set).
      // Fallback demo behavior: first user becomes admin.
      const ownerEmail = (process.env.OWNER_EMAIL || '').trim().toLowerCase();
      let role = 'viewer';

      if (ownerEmail && String(email).toLowerCase() === ownerEmail) {
        role = 'admin';
      } else {
        const totalUsers = await User.count();
        role = totalUsers === 0 ? 'admin' : 'viewer';
      }

      user = await User.create({ googleId, email, name, role });
    } else {
      // If OWNER_EMAIL is set, ensure that account is admin.
      const ownerEmail = (process.env.OWNER_EMAIL || '').trim().toLowerCase();
      if (ownerEmail && String(user.email).toLowerCase() === ownerEmail && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
    }

    // store in session
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.json({ user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid token or request' });
  }
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(200).json({ user: null });
  }
  res.json({ user: req.session.user });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

module.exports = router;
