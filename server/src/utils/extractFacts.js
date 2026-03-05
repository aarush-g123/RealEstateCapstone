// server/src/utils/extractFacts.js
// Structured, regex-first extraction for "paste-to-parse" listing facts.
// Goal: best-effort extraction + normalization (never throws on messy text).

const SQFT_PER_ACRE = 43560;

function toNumberLoose(s) {
  if (s == null) return null;
  const cleaned = String(s).replace(/[,\s]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function clampInt(n, min, max) {
  if (!Number.isFinite(n)) return null;
  const x = Math.trunc(n);
  if (x < min || x > max) return null;
  return x;
}

function pickFirstMatch(text, regex) {
  const m = regex.exec(text);
  return m ? m : null;
}

function uniq(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function normalizeType(textLower) {
  // Keyword-based (not exhaustive). Return null if unsure.
  const rules = [
    { re: /\bcondo(minium)?\b/, value: "Condo" },
    { re: /\btown\s*home\b|\btownhouse\b/, value: "Townhouse" },
    { re: /\bmulti\s*-?family\b|\bduplex\b|\btriplex\b/, value: "Multi-Family" },
    { re: /\bcape\s*cod\b/, value: "Cape Cod" },
    { re: /\bcolonial\b/, value: "Colonial" },
    { re: /\brace\s*?ranch\b|\branch\b/, value: "Ranch" },
    { re: /\bsplit\s*level\b/, value: "Split Level" },
    { re: /\bnew\s*construction\b/, value: "New Construction" },
    { re: /\bcabin\b/, value: "Cabin" },
    { re: /\bsingle\s*family\b|\bsf\b/, value: "House" },
  ];

  for (const r of rules) {
    if (r.re.test(textLower)) return r.value;
  }
  return null;
}

function extractFeatures(textLower) {
  // 1) If there's a "features:" or "amenities:" segment, prioritize that.
  // 2) Otherwise, scan for a short whitelist of common features.
  const out = [];

  const header = /(features|amenities|highlights)\s*[:\-]\s*([\s\S]{0,500})/i.exec(textLower);
  if (header) {
    // Stop at newline block break, or after ~500 chars.
    const seg = header[2]
      .split(/\n\s*\n/)[0]
      .split(/\n/)[0]
      .trim();
    if (seg) {
      seg
        .split(/\s*[;,•\|]\s*|\s{2,}/)
        .map((s) => s.trim())
        .filter((s) => s.length >= 3)
        .forEach((s) => out.push(s));
    }
  }

  const common = [
    "hardwood floors",
    "stainless steel",
    "central air",
    "central a/c",
    "finished basement",
    "walk-in closet",
    "open concept",
    "granite countertops",
    "quartz countertops",
    "fenced yard",
    "deck",
    "patio",
    "pool",
    "fireplace",
    "solar",
    "smart home",
  ];

  for (const phrase of common) {
    const p = phrase.toLowerCase();
    if (textLower.includes(p)) out.push(phrase);
  }

  return uniq(out).slice(0, 20);
}

function extractParking(textLower) {
  // Best-effort: return a short human string or null.
  // Examples: "2-car garage", "1-car garage", "driveway", "street parking".
  const mGarage = /\b(\d+)\s*[- ]?car\s+garage\b/.exec(textLower);
  if (mGarage) {
    const n = clampInt(Number(mGarage[1]), 1, 10);
    if (n) return `${n}-car garage`;
    return "garage";
  }
  if (/\bgarage\b/.test(textLower)) return "garage";
  if (/\bdriveway\b/.test(textLower)) return "driveway";
  if (/\bstreet\s+parking\b/.test(textLower)) return "street parking";
  if (/\boff\s*-?street\s+parking\b/.test(textLower)) return "off-street parking";
  return null;
}

function extractLotSizeSqft(textLower) {
  // Try acres first
  const mAcre = /\b([\d,.]+)\s*(acre|acres)\b/.exec(textLower);
  if (mAcre) {
    const acres = toNumberLoose(mAcre[1]);
    if (acres && acres > 0 && acres < 1000) {
      return Math.round(acres * SQFT_PER_ACRE);
    }
  }

  // Then "sq ft lot" patterns
  const mSqftLot = /\b([\d,]{3,})\s*(sq\s?ft|sqft|square\s?feet)\s*(lot|lot\s*size)?\b/.exec(textLower);
  if (mSqftLot) {
    const sqft = toNumberLoose(mSqftLot[1]);
    if (sqft && sqft > 0) return Math.round(sqft);
  }

  // "lot: 50x100"
  const mDims = /\blot\s*[:\-]?\s*(\d{1,4})\s*[x×]\s*(\d{1,4})\b/.exec(textLower);
  if (mDims) {
    const a = clampInt(Number(mDims[1]), 1, 20000);
    const b = clampInt(Number(mDims[2]), 1, 20000);
    if (a && b) return a * b;
  }

  return null;
}

function extractFacts(rawText) {
  const text = String(rawText || "");
  const tLower = text.toLowerCase();

  // Beds
  const mBeds = pickFirstMatch(tLower, /\b(\d+)\s*(bed|beds|bedroom|bedrooms|br)\b/);
  const beds = mBeds ? clampInt(Number(mBeds[1]), 0, 50) : null;

  // Baths (allow 2.5)
  const mBaths = pickFirstMatch(tLower, /\b(\d+(?:\.\d+)?)\s*(bath|baths|bathroom|bathrooms|ba)\b/);
  const baths = mBaths ? Number(mBaths[1]) : null;
  const bathsNorm = Number.isFinite(baths) && baths >= 0 && baths <= 50 ? baths : null;

  // Sqft
  const mSqft = pickFirstMatch(tLower, /\b([\d,]{3,})\s*(sq\s?ft|sqft|square\s?feet)\b/);
  const squareFeet = mSqft ? clampInt(toNumberLoose(mSqft[1]), 0, 1000000) : null;

  // Year built
  const mYear = pickFirstMatch(tLower, /\b(?:built\s*in\s*|year\s*built\s*[:\-]?\s*)(\d{4})\b/);
  const yearBuilt = mYear ? clampInt(Number(mYear[1]), 1600, 2100) : null;

  // Lot size (sqft)
  const lotSizeSqft = extractLotSizeSqft(tLower);

  // Parking
  const parking = extractParking(tLower);

  // Property type
  const propertyType = normalizeType(tLower);

  // Features
  const features = extractFeatures(tLower);

  return {
    beds,
    baths: bathsNorm,
    squareFeet,
    yearBuilt,
    lotSizeSqft,
    parking,
    propertyType,
    features,
  };
}

module.exports = { extractFacts };