import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProperty, removeProperty, useProperties } from "../utils/propertiesStore.js";
import { clearPropertyMetrics, resetMetrics, useMetrics } from "../utils/metricsStore.js";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [properties, setProperties] = useProperties();
  const [metrics, refreshMetrics] = useMetrics();

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "House",
    status: "For Sale",
    imagesText: "",
    description: "",
    featured: false,
  });

  const canSubmit = useMemo(() => {
    return (
      form.title.trim() &&
      form.city.trim() &&
      String(form.price).trim() &&
      String(form.beds).trim() &&
      String(form.baths).trim() &&
      String(form.sqft).trim()
    );
  }, [form]);

  useEffect(() => {
    const authed = localStorage.getItem("ownerAuthed") === "true";
    if (!authed) navigate("/owner-login");
  }, [navigate]);

  const email = localStorage.getItem("ownerEmail");

  const propertyViews = useMemo(() => {
    const map = (metrics && metrics.properties) || {};
    return properties
      .map((p) => ({
        id: p.id,
        title: p.title,
        city: p.city,
        views: Number(map[p.id] || 0),
      }))
      .sort((a, b) => b.views - a.views);
  }, [metrics, properties]);

  const pageViews = useMemo(() => {
    const pages = (metrics && metrics.pages) || {};
    return Object.entries(pages)
      .map(([path, views]) => ({ path, views: Number(views || 0) }))
      .sort((a, b) => b.views - a.views);
  }, [metrics]);

  return (
    <div className="panel p-10">
      <h1 className="text-4xl font-semibold tracking-wide text-white">Owner Dashboard</h1>

      <p className="mt-3 text-white/70">
        This page is restricted to the site owner.{" "}
        {email ? (
          <>
            Signed in as <span className="font-semibold text-white">{email}</span>.
          </>
        ) : null}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Listings</div>
          <div className="mt-3 text-white/80 font-semibold">Manage property cards</div>
          <div className="text-sm text-white/70 mt-2">
            Update active listings shown on the site.
          </div>

          <Link
            to="/properties"
            className="mt-5 inline-block text-sm font-semibold text-white/80 hover:text-white hover:underline transition"
          >
            View properties →
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Messages</div>
          <div className="mt-3 text-white/80 font-semibold">Inquiries and tour requests</div>
          <div className="text-sm text-white/70 mt-2">
            View contact submissions from visitors.
          </div>

          <Link
            to="/contact"
            className="mt-5 inline-block text-sm font-semibold text-white/80 hover:text-white hover:underline transition"
          >
            Contact page →
          </Link>
        </div>
      </div>

      {/* PROPERTY MANAGER */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Add listing</div>
          <div className="mt-3 text-white/80 font-semibold">Create a new property</div>

          <form
            className="mt-5 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;

              const images = String(form.imagesText || "")
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);

              const next = addProperty({
                title: form.title.trim(),
                city: form.city.trim(),
                price: Number(form.price),
                beds: Number(form.beds),
                baths: Number(form.baths),
                sqft: Number(form.sqft),
                type: form.type,
                status: form.status,
                images: images.length ? images : ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80"],
                description: form.description.trim() || "New listing.",
                agentId: "a-1",
                featured: Boolean(form.featured),
              });

              setProperties(next);
              setForm({
                title: "",
                city: "",
                price: "",
                beds: "",
                baths: "",
                sqft: "",
                type: "House",
                status: "For Sale",
                imagesText: "",
                description: "",
                featured: false,
              });
            }}
          >
            <input
              className="inputDark"
              placeholder="Title (e.g., 4BR Colonial in Ridgewood)"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />

            <input
              className="inputDark"
              placeholder="City, State (e.g., Ramsey, NJ)"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            />

            <div className="grid gap-3 sm:grid-cols-3">
              <input
                className="inputDark"
                placeholder="Price"
                inputMode="numeric"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
              />
              <input
                className="inputDark"
                placeholder="Beds"
                inputMode="numeric"
                value={form.beds}
                onChange={(e) => setForm((p) => ({ ...p, beds: e.target.value }))}
              />
              <input
                className="inputDark"
                placeholder="Baths"
                inputMode="numeric"
                value={form.baths}
                onChange={(e) => setForm((p) => ({ ...p, baths: e.target.value }))}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <input
                className="inputDark"
                placeholder="Sqft"
                inputMode="numeric"
                value={form.sqft}
                onChange={(e) => setForm((p) => ({ ...p, sqft: e.target.value }))}
              />

              <select
                className="selectDark"
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              >
                <option className="text-slate-900">For Sale</option>
                <option className="text-slate-900">For Rent</option>
              </select>

              <select
                className="selectDark"
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              >
                <option className="text-slate-900">House</option>
                <option className="text-slate-900">Condo</option>
                <option className="text-slate-900">Cabin</option>
              </select>
            </div>

            <textarea
              className="inputDark min-h-[90px]"
              placeholder={'Image URLs (one per line)\nhttps://...\nhttps://...'}
              value={form.imagesText}
              onChange={(e) => setForm((p) => ({ ...p, imagesText: e.target.value }))}
            />

            <textarea
              className="inputDark min-h-[90px]"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
              />
              Mark as featured
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`btnPrimary ${!canSubmit ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Add property
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Your listings</div>
          <div className="mt-3 text-white/80 font-semibold">Remove properties</div>
          <p className="mt-2 text-sm text-white/70">
            These update immediately on the Properties page.
          </p>

          <div className="mt-6 space-y-3 max-h-[520px] overflow-auto pr-1">
            {properties.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-white font-semibold truncate">{p.title}</div>
                  <div className="text-xs text-white/60 mt-1 truncate">
                    {p.city} • {p.status} • {p.type}
                    {p.featured ? " • Featured" : ""}
                  </div>
                </div>

                <button
                  className="btnGhost whitespace-nowrap"
                  onClick={async () => {
                    const ok = window.confirm(`Remove “${p.title}”?`);
                    if (!ok) return;
                    const next = removeProperty(p.id);
                    try {
                      await clearPropertyMetrics(p.id);
                    } catch {}
                    await refreshMetrics();
                    setProperties(next);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            {properties.length === 0 && (
              <div className="text-sm text-white/70">No properties yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm tracking-[0.35em] uppercase text-white/60">Metrics</div>
            <div className="mt-3 text-white/80 font-semibold">Views</div>
            <p className="mt-2 text-sm text-white/70">
              Server-backed analytics (last {metrics?.days || 30} days).
            </p>
          </div>

          <button
            className="btnGhost"
            onClick={async () => {
              const ok = window.confirm("Reset all metrics? This can’t be undone.");
              if (!ok) return;
              try {
                await resetMetrics();
              } catch {}
              await refreshMetrics();
            }}
          >
            Reset metrics
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-xs tracking-[0.25em] uppercase text-white/50">Total site views</div>
            <div className="mt-2 text-3xl font-semibold text-white">
              {Number(metrics?.totalSiteViews || 0).toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-white/50">Last updated: {metrics?.updatedAt || ""}</div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-xs tracking-[0.25em] uppercase text-white/50">Views by page</div>
            <div className="mt-4 space-y-2 max-h-[220px] overflow-auto pr-1">
              {pageViews.map((r) => (
                <div key={r.path} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/80 truncate">{r.path}</span>
                  <span className="font-semibold text-white">{r.views.toLocaleString()}</span>
                </div>
              ))}
              {pageViews.length === 0 && <div className="text-sm text-white/70">No views yet.</div>}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs tracking-[0.25em] uppercase text-white/50">Views by property</div>
          <div className="mt-4 space-y-2 max-h-[300px] overflow-auto pr-1">
            {propertyViews.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <div className="text-white/80 truncate">{r.title}</div>
                  <div className="text-xs text-white/50 truncate">{r.city}</div>
                </div>
                <span className="font-semibold text-white">{r.views.toLocaleString()}</span>
              </div>
            ))}
            {propertyViews.length === 0 && <div className="text-sm text-white/70">No properties yet.</div>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => {
            localStorage.removeItem("ownerAuthed");
            localStorage.removeItem("ownerEmail");
            navigate("/");
          }}
          className="btnGhost"
        >
          Sign out
        </button>

        <Link to="/" className="btnPrimary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
