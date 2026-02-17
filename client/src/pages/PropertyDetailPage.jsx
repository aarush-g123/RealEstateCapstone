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
      <div className="panel p-10">
        <p className="font-semibold text-white">Listing not found.</p>
        <div className="mt-3">
          <Link className="text-sm font-semibold text-white/80 hover:text-white hover:underline" to="/properties">
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const mainImg = images[Math.min(imgIndex, images.length - 1)];

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link className="text-sm font-semibold text-white/80 hover:text-white hover:underline" to="/properties">
            ← Back to properties
          </Link>

          <h1 className="mt-4 text-4xl font-semibold tracking-wide text-white">{property.title}</h1>
          <p className="mt-2 text-white/70">
            {property.city} • {property.status} • {property.type}
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-semibold text-white">{formatPrice(property.price)}</div>
          <div className="text-xs text-white/50 tracking-[0.25em] uppercase mt-2">price</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="panel overflow-hidden">
            <img src={mainImg} alt={property.title} className="h-[380px] w-full object-cover" />

            <div className="p-4 flex gap-3 overflow-x-auto">
              {images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setImgIndex(idx)}
                  className={`h-16 w-24 rounded-xl overflow-hidden border transition ${
                    idx === imgIndex ? "border-white/60" : "border-white/15 hover:border-white/30"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-7">
            <div className="panelTitle">Overview</div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {property.beds} beds
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {property.baths} baths
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>

            <p className="mt-5 text-white/70 leading-relaxed">{property.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button onClick={() => alert("Tour requested (prototype)")} className="btnPrimary">
                Request a tour
              </button>
              <button onClick={() => alert("Application started (prototype)")} className="btnGhost">
                Start application
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="panel p-7">
            <div className="panelTitle">Quick actions</div>
            <div className="mt-5 grid gap-3">
              <button onClick={() => alert("Saved (prototype)")} className="btnGhost">
                Save to favorites
              </button>
              <button onClick={() => navigate("/contact")} className="btnPrimary">
                Contact
              </button>
              <button onClick={() => navigate("/login")} className="btnGhost">
                Sign in for alerts
              </button>
            </div>
          </div>

          {agent && (
            <div className="panel p-7">
              <div className="panelTitle">Agent</div>

              <div className="mt-5 flex items-center gap-3">
                <img src={agent.photo} alt={agent.name} className="h-12 w-12 rounded-2xl object-cover" />
                <div>
                  <div className="font-semibold text-white">{agent.name}</div>
                  <div className="text-sm text-white/70">{agent.title}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/70">{agent.bio}</p>

              <div className="mt-5 grid gap-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-white/50">Phone</span>
                  <span className="font-semibold text-white">{agent.phone}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-white/50">Email</span>
                  <span className="font-semibold text-white">{agent.email}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button onClick={() => alert("Message sent (prototype)")} className="flex-1 btnPrimary">
                  Message
                </button>
                <Link to="/agents" className="btnGhost">
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
