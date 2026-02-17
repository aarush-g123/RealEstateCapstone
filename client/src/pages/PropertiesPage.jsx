import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties as allProperties } from "../data/properties.js";

export default function PropertiesPage() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState(params.get("status") || "Any");
  const [type, setType] = useState(params.get("type") || "Any");
  const [q, setQ] = useState(params.get("q") || "");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allProperties.filter((p) => {
      if (status !== "Any" && p.status !== status) return false;
      if (type !== "Any" && p.type !== type) return false;
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.status.toLowerCase().includes(query)
      );
    });
  }, [status, type, q]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="panelTitle">Active listings</div>
          <h1 className="mt-4 heading">Properties</h1>
          <p className="mt-3 subtleText">Browse listings</p>
        </div>

        <Link to="/" className="text-sm font-semibold text-white/80 hover:text-white hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="panel p-6 grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-white/80">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, keyword, type..."
            className="inputDark mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-white/80">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="selectDark mt-2"
          >
            <option className="text-slate-900">Any</option>
            <option className="text-slate-900">For Sale</option>
            <option className="text-slate-900">For Rent</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-white/80">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="selectDark mt-2"
          >
            <option className="text-slate-900">Any</option>
            <option className="text-slate-900">House</option>
            <option className="text-slate-900">Condo</option>
            <option className="text-slate-900">Cabin</option>
          </select>
        </div>

        <div className="md:col-span-4 flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="text-sm text-white/70">
            Showing <span className="font-semibold text-white">{filtered.length}</span> results
          </p>

          <button
            onClick={() => {
              setQ("");
              setStatus("Any");
              setType("Any");
            }}
            className="btnGhost"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="panel p-10 text-center">
          <p className="font-semibold text-white">No matches.</p>
          <p className="text-white/70 mt-2">Try clearing filters or searching a different city.</p>
        </div>
      )}
    </div>
  );
}
