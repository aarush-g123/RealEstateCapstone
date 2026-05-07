// client/src/utils/propertiesStore.js
// Simple localStorage-backed CRUD for listings (prototype-friendly).

import { useEffect, useState } from "react";
import { properties as seedProperties } from "../data/properties.js";

const STORAGE_KEY = "properties_v2";
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getProperties() {
  if (typeof window === "undefined") return seedProperties;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // Seed on first run so the owner can immediately edit.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProperties));
    return seedProperties;
  }

  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProperties));
    return seedProperties;
  }

  return parsed;
}

export function setProperties(next) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  // Let same-tab listeners update immediately.
  window.dispatchEvent(new CustomEvent("properties-updated"));
}

export function addProperty(input) {
  const list = getProperties();
  const id = `p-${Date.now()}`;
  const next = [{ ...input, id }, ...list];
  setProperties(next);
  return next;
}

export function removeProperty(id) {
  const list = getProperties();
  const next = list.filter((p) => p.id !== id);
  setProperties(next);
  return next;
}

export function useProperties() {
  // Tiny hook so pages stay in sync when the dashboard edits listings.
  // (No external state library needed.)
  const [list, setList] = useState(() => getProperties());

  useEffect(() => {
    const onUpdate = () => setList(getProperties());
    window.addEventListener("properties-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("properties-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return [list, setList];
}
