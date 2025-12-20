import React from "react";
import { Link } from "react-router-dom";
import { agents } from "../data/agents.js";

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agents</h1>
          <p className="text-slate-600">Meet the team (dummy profiles).</p>
        </div>
        <Link to="/contact" className="text-sm font-semibold hover:underline">
          Contact →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <div key={a.id} className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <img src={a.photo} alt={a.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <div className="font-semibold text-lg">{a.name}</div>
                <div className="text-sm text-slate-600">{a.title}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{a.bio}</p>

            <div className="mt-4 text-sm grid gap-2">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Phone</span>
                <span className="font-semibold">{a.phone}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold">{a.email}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => alert(`Requested a call with ${a.name} (prototype)`)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold"
              >
                Request call
              </button>
              <Link
                to="/properties"
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
              >
                Listings
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
