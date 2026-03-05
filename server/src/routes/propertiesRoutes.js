// server/src/routes/propertiesRoutes.js
const express = require("express");
const { z } = require("zod");
const { requireRole } = require("../middleware/authMiddleware");
const { extractFacts } = require("../utils/extractFacts");

const router = express.Router();

const extractSchema = z.object({
  rawText: z.string().min(1).max(20000),
});

// POST /api/properties/extract-facts
router.post("/extract-facts", (req, res) => {
  try {
    const { rawText } = extractSchema.parse(req.body);
    const data = extractFacts(rawText);
    res.json({ ok: true, data });
  } catch {
    res.status(400).json({ ok: false, error: "Invalid request" });
  }
});

module.exports = router;