
// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const session = require('express-session');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(helmet());
app.use(morgan('dev'));

// CORS: allow frontend (Vite default http://localhost:5173)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true if HTTPS
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

// rate limiting basic
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// health check
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// start server after DB sync
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // dev only
    console.log('DB connected & synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();
