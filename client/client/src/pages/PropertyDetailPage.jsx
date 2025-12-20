import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { properties, formatPrice } from "../data/properties.js";
import { agents } from "../data/agents.js";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = useMemo(() => properties.find((p) => p.id === id), [id]);
  const [imgIndex, setImgIndex] = useState(0);

  const agent = useMemo(() => {
    if (!property) return null;
    return agents.find((a) => a.id === property.agentId) || null;
  }, [property]);

  if (!property) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8">
        <p className="font-semibold">Listing not found.</p>
        <div className="mt-3">
          <Link className="text-sm font-semibold hover:underline" to="/properties">
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const mainImg = images[Math.min(imgIndex, images.length - 1)];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link className="text-sm font-semibold hover:underline" to="/properties">
            ← Back to properties
          </Link>
          <h1 className="mt-2 text-3xl font-bold">{property.title}</h1>
          <p className="text-slate-600">{property.city} • {property.status} • {property.type}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{formatPrice(property.price)}</div>
          <div className="text-xs text-slate-500">dummy price</div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
            <img src={mainImg} alt={property.title} className="h-[340px] w-full object-cover" />
            <div className="p-4 flex gap-3 overflow-x-auto">
              {images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setImgIndex(idx)}
                  className={`h-16 w-24 rounded-xl overflow-hidden border transition ${
                    idx === imgIndex ? "border-slate-900" : "border-slate-200 hover:border-slate-400"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <h2 className="text-xl font-bold">Overview</h2>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                {property.beds} beds
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                {property.baths} baths
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
            <p className="mt-4 text-slate-600 leading-relaxed">{property.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => alert("Tour requested (prototype)")}
                className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
              >
                Request a tour
              </button>
              <button
                onClick={() => alert("Application started (prototype)")}
                className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold hover:bg-slate-50"
              >
                Start application
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <h3 className="text-lg font-bold">Quick actions</h3>
            <div className="mt-4 grid gap-3">
              <button
                onClick={() => alert("Saved (prototype)")}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
              >
                Save to favorites
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold"
              >
                Contact us
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
              >
                Sign in for alerts
              </button>
            </div>
          </div>

          {agent && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6">
              <h3 className="text-lg font-bold">Agent</h3>
              <div className="mt-4 flex items-center gap-3">
                <img src={agent.photo} alt={agent.name} className="h-12 w-12 rounded-2xl object-cover" />
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className="text-sm text-slate-600">{agent.title}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{agent.bio}</p>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Phone</span>
                  <span className="font-semibold">{agent.phone}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Email</span>
                  <span className="font-semibold">{agent.email}</span>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => alert("Message sent (prototype)")}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold"
                >
                  Message
                </button>
                <Link
                  to="/agents"
                  className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                >
                  View agents
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
