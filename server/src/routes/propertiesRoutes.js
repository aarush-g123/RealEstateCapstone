// server/src/routes/propertiesRoutes.js
const express = require("express");
const multer = require("multer");
const { parse } = require("csv-parse/sync");
const { z } = require("zod");
const { extractFacts } = require("../utils/extractFacts");

const router = express.Router();

const extractSchema = z.object({
  rawText: z.string().min(1).max(20000),
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

function clean(value) {
  if (value == null) return "";
  return String(value).trim();
}

function toNumberLoose(value) {
  if (value == null) return null;
  const cleaned = String(value).replace(/[$,\s]/g, "");
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function normalizeType(value) {
  const t = clean(value).toLowerCase();
  if (!t) return null;
  if (t.includes("condo")) return "Condo";
  if (t.includes("cabin")) return "Cabin";
  return "House";
}

function splitFeatures(value) {
  const raw = clean(value);
  if (!raw) return [];
  return raw
    .split(/\n|,|;|\|/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function mapCsvRowToForm(row) {
  return {
    title: clean(row.title || row.address || row.property || row.name),
    city: clean(row.city || row.town || row.municipality),
    price: toNumberLoose(row.price || row.listPrice || row.list_price),
    beds: toNumberLoose(row.beds || row.bedrooms || row.br),
    baths: toNumberLoose(row.baths || row.bathrooms || row.ba),
    sqft: toNumberLoose(row.sqft || row.squareFeet || row.square_feet || row.livingArea),
    yearBuilt: toNumberLoose(row.yearBuilt || row.year_built || row.year),
    lotSizeSqft: toNumberLoose(row.lotSizeSqft || row.lot_size_sqft || row.lotSize || row.lot_size),
    parking: clean(row.parking),
    type: normalizeType(row.type || row.propertyType || row.property_type) || "House",
    status: clean(row.status) || "For Sale",
    description: clean(row.description || row.remarks),
    featuresText: splitFeatures(row.features || row.amenities || row.highlights).join("\n"),
    imagesText: clean(row.images || row.imageUrls || row.image_urls).replace(/\s*,\s*/g, "\n"),
  };
}

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

// POST /api/properties/import-csv-preview
router.post("/import-csv-preview", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No CSV file uploaded." });
    }

    const text = req.file.buffer.toString("utf8");

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ ok: false, error: "CSV file has no data rows." });
    }

    const firstRow = records[0];
    const mapped = mapCsvRowToForm(firstRow);

    return res.json({
      ok: true,
      rowCount: records.length,
      headers: Object.keys(firstRow),
      data: mapped,
    });
  } catch (err) {
    console.error("CSV preview parse failed:", err);
    return res.status(400).json({
      ok: false,
      error: "Could not parse CSV. Make sure the first row contains headers.",
    });
  }
});

module.exports = router;