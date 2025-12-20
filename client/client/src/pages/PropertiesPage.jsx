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
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-slate-600">Browse listings (dummy data).</p>
        </div>
        <Link to="/" className="text-sm font-semibold hover:underline">
          ← Back to home
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-5 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, keyword, type..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
          >
            <option>Any</option>
            <option>For Sale</option>
            <option>For Rent</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
          >
            <option>Any</option>
            <option>House</option>
            <option>Condo</option>
            <option>Cabin</option>
          </select>
        </div>

        <div className="md:col-span-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            results
          </p>
          <button
            onClick={() => {
              setQ("");
              setStatus("Any");
              setType("Any");
            }}
            className="text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <p className="font-semibold">No matches.</p>
          <p className="text-slate-600 mt-1">Try clearing filters or searching a different city.</p>
        </div>
      )}
    </div>
  );
}
