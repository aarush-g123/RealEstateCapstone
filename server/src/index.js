
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

// If deploying behind nginx/reverse proxy:
app.set('trust proxy', 1);

// Allow multiple origins in dev, and also allow same-origin deploys.
// Example: CORS_ORIGIN="http://localhost:5173,https://yourdomain.com"
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Non-browser clients or same-origin scenarios sometimes send no Origin.
      if (!origin) return cb(null, true);

      // If no allowedOrigins set, default allow localhost dev only.
      if (allowedOrigins.length === 0) {
        return cb(null, origin === 'http://localhost:5173');
      }

      return cb(null, allowedOrigins.includes(origin));
    },
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
      secure: process.env.NODE_ENV === 'production', // requires HTTPS
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax',
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

app.get('/version', (req, res) => {
  res.json({
    service: 'real-estate-capstone-server',
    gitSha: process.env.GIT_SHA || null,
    buildTime: process.env.BUILD_TIME || null,
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});


// routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// start server after DB sync
(async () => {
  try {
await sequelize.authenticate();

if (process.env.NODE_ENV !== 'production') {
  await sequelize.sync({ alter: true }); // dev only
}
    console.log('DB connected & synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
})();
