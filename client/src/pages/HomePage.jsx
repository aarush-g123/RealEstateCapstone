import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties } from "../data/properties.js";

function useCountUp(start, to, duration = 1200) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();

    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return val;
}

function StatsBand() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSeen(true),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const closedSales = useCountUp(seen, 208);
  const totalValue = useCountUp(seen, 220);
  const avgPrice = useCountUp(seen, 1);

  return (
    <section ref={ref} className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-14 text-center">
        <div>
          <div className="text-5xl font-semibold tracking-wide">{closedSales}</div>
          <div className="mt-3 text-xs tracking-[0.35em] uppercase text-white/70">
            Closed Sales
          </div>
        </div>
        <div>
          <div className="text-5xl font-semibold tracking-wide">${totalValue}M</div>
          <div className="mt-3 text-xs tracking-[0.35em] uppercase text-white/70">
            Total Value
          </div>
        </div>
        <div>
          <div className="text-5xl font-semibold tracking-wide">${avgPrice}M</div>
          <div className="mt-3 text-xs tracking-[0.35em] uppercase text-white/70">
            Average Price
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsDark() {
  const reviews = [
    {
      name: "Client A",
      text:
        "Sweta was direct, fast, and honest. We never felt pushed. She negotiated hard and made the process simple.",
    },
    {
      name: "Client B",
      text:
        "Extremely responsive and detail-oriented. Every question got answered quickly and clearly.",
    },
    {
      name: "Client C",
      text:
        "Strong market knowledge. Realistic expectations and excellent guidance from start to finish.",
    },
  ];

  return (
    <section className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-white/60">
              Testimonials
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-wide">
              What clients say
            </h2>
          </div>
          <Link to="/contact" className="text-sm font-semibold text-white/80 hover:text-white hover:underline">
            Let’s connect →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur shadow-sm"
            >
              <div className="text-sm leading-relaxed text-white/80">“{r.text}”</div>
              <div className="mt-6 text-xs tracking-[0.35em] uppercase text-white/60">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <div className="text-xs tracking-[0.45em] uppercase text-white/70">
            Bergen County Real Estate
          </div>

          <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-[0.12em]">
            SWETA PATEL SELECT
          </h1>

          <p className="mt-6 text-sm sm:text-base tracking-[0.35em] uppercase text-white/75">
            Make your next move — the best move
          </p>

          <div className="mt-12 w-full max-w-4xl">
            <div className="flex w-full overflow-hidden rounded-2xl bg-white shadow-lg">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-6 py-5 text-slate-900 outline-none"
                placeholder="Search by address, city, or neighborhood"
              />
              <Link
                to={searchHref}
                className="px-10 py-5 font-semibold tracking-[0.18em] uppercase text-slate-900 hover:bg-slate-50"
              >
                Search
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur outline-none"
              >
                <option className="text-slate-900">Any</option>
                <option className="text-slate-900">For Sale</option>
                <option className="text-slate-900">For Rent</option>
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur outline-none"
              >
                <option className="text-slate-900">Any</option>
                <option className="text-slate-900">House</option>
                <option className="text-slate-900">Condo</option>
                <option className="text-slate-900">Cabin</option>
              </select>
            </div>

            {/* Removed "NO IDX" per your request */}
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/properties"
                className="px-7 py-3 rounded-full border border-white/35 text-white font-semibold tracking-[0.18em] uppercase hover:border-white"
              >
                View listings
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3 rounded-full bg-white text-slate-900 font-semibold tracking-[0.18em] uppercase hover:bg-slate-100"
              >
                Let’s connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <ReviewsDark />

      {/* FEATURED LISTINGS (dark, no white blocks) */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.35em] uppercase text-white/60">
                Active listings
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-wide">
                Featured listings
              </h2>
            </div>
            <Link to="/properties" className="text-sm font-semibold text-white/80 hover:text-white hover:underline">
              View all →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
