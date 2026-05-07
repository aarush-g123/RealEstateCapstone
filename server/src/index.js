// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const session = require("express-session");

const { sequelize } = require("./models");

const propertiesRoutes = require("./routes/propertiesRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan("dev"));

app.set("trust proxy", 1);

// Allow multiple origins in dev
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (allowedOrigins.length === 0) {
        return cb(null, origin === "http://localhost:5173");
      }

      return cb(null, allowedOrigins.includes(origin));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

// rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// health routes
app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/version", (req, res) => {
  res.json({
    service: "real-estate-capstone-server",
    gitSha: process.env.GIT_SHA || null,
    buildTime: process.env.BUILD_TIME || null,
    nodeEnv: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/properties", propertiesRoutes);

// START SERVER IMMEDIATELY (do not block on DB)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Connect to DB in background (optional)
(async () => {
  try {
    await sequelize.authenticate();

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    }

    console.log("DB connected & synced.");
  } catch (err) {
    console.error(
      "Unable to connect to DB (continuing without DB):",
      err?.message || err
    );
  }
})();