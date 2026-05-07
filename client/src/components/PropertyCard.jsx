import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/properties.js";

export default function PropertyCard({ property }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-sm hover:border-white/20 transition">
      <div className="relative">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="h-52 w-full object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
        />
        {/* subtle dark overlay on hover for a more premium feel */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-slate-900 border border-white/40">
            {property.status}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white border border-white/15">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white leading-snug">{property.title}</h3>
            <p className="text-sm text-white/70">{property.city}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold text-white">{formatPrice(property.price)}</div>
            <div className="text-xs text-white/50 tracking-widest uppercase">est. price</div>
          </div>
        </div>

        <div className="mt-4 flex gap-4 text-xs text-white/70 tracking-widest uppercase">
          <span>{property.beds} bd</span>
          <span>{property.baths} ba</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>

        <div className="mt-5 flex gap-2">
          <Link
            to={`/properties/${property.id}`}
            className="flex-1 text-center px-4 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase bg-white text-black hover:bg-slate-100 transition"
          >
            View details
          </Link>
          <button
            onClick={() => alert("Saved to favorites (prototype)")}
            className="px-4 py-3 rounded-xl text-sm font-semibold border border-white/15 text-white hover:border-white/40 hover:bg-white/5 transition"
            aria-label="Save to favorites"
            title="Save"
          >
            ☆
          </button>
        </div>
      </div>
    </div>
  );
}
