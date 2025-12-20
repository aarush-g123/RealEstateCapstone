import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/properties.js";

export default function PropertyCard({ property }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="h-48 w-full object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 border border-slate-200">
            {property.status}
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-900 text-white">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900 leading-snug">{property.title}</h3>
            <p className="text-sm text-slate-600">{property.city}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-900">{formatPrice(property.price)}</div>
            <div className="text-xs text-slate-500">est. price</div>
          </div>
        </div>

        <div className="mt-3 flex gap-3 text-xs text-slate-600">
          <span>{property.beds} bd</span>
          <span>{property.baths} ba</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/properties/${property.id}`}
            className="flex-1 text-center px-3 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800"
          >
            View details
          </Link>
          <button
            onClick={() => alert("Saved to favorites (prototype)")}
            className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50"
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
