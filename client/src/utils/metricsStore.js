import { useCallback, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
axios.defaults.withCredentials = true;

// Server-backed analytics (Option B)
// - Public event endpoint: POST /api/analytics/event
// - Admin summary/reset endpoints (requires backend session):
//     GET  /api/analytics/summary?days=30
//     POST /api/analytics/reset
//     DELETE /api/analytics/property/:id

const VISITOR_KEY = "sp_vid_v1";

function nowISO() {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}

function randomId() {
  try {
    return crypto.randomUUID();
  } catch {
    return "v_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }
}

export function getVisitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next = randomId().slice(0, 64);
    localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return null;
  }
}

export async function trackPageView(pathname) {
  if (!pathname) return;
  const visitorId = getVisitorId();

  // Fire-and-forget: never block UI.
  axios
    .post("/analytics/event", {
      eventType: "page_view",
      path: pathname,
      visitorId,
      referrer: document.referrer || "",
    })
    .catch(() => {});
}

export async function trackPropertyView(propertyId) {
  if (!propertyId) return;
  const visitorId = getVisitorId();

  axios
    .post("/analytics/event", {
      eventType: "page_view",
      path: window.location?.pathname || `/properties/${propertyId}`,
      propertyId,
      visitorId,
      referrer: document.referrer || "",
    })
    .catch(() => {});
}

export async function resetMetrics() {
  await axios.post("/analytics/reset");
}

export async function clearPropertyMetrics(propertyId) {
  if (!propertyId) return;
  await axios.delete(`/analytics/property/${encodeURIComponent(propertyId)}`);
}

export function useMetrics(days = 30) {
  const [metrics, setMetrics] = useState(() => ({
    days,
    totalSiteViews: 0,
    pages: {},
    properties: {},
    updatedAt: nowISO(),
  }));

  const refresh = useCallback(async () => {
    try {
      const res = await axios.get(`/analytics/summary?days=${encodeURIComponent(days)}`);
      setMetrics(res.data);
    } catch {
      // If not authed as admin, keep whatever is already in state.
    }
  }, [days]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [metrics, refresh];
}
