import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties } from "../data/properties.js";

export default function HomePage() {
  const featured = useMemo(() => properties.filter((p) => p.featured), []);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Any");
  const [type, setType] = useState("Any");

  const searchHref = useMemo(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (status !== "Any") params.set("status", status);
    if (type !== "Any") params.set("type", type);
    return `/properties?${params.toString()}`;
  }, [query, status, type]);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            Find a place that <span className="underline decoration-slate-300">fits your life</span>.
          </h1>
          <p className="mt-4 text-slate-600">
            Browse homes, condos, and rentals with a clean, client-friendly experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
            >
              Browse properties
            </Link>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold hover:bg-slate-50"
            >
              Talk to an agent
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xl font-bold">4</div>
              <div className="text-xs text-slate-500">featured listings</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xl font-bold">1</div>
              <div className="text-xs text-slate-500">agent</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Search</h2>
          </div>

          <div className="mt-4 grid gap-3">
            <div>
              <label className="text-sm font-semibold">City / keyword</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: Austin, Loft, Tahoe..."
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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
            </div>

            <Link
              to={searchHref}
              className="mt-1 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 text-center"
            >
              Search listings
            </Link>

          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured listings</h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
