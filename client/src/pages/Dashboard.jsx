import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const authed = localStorage.getItem("ownerAuthed") === "true";
    if (!authed) navigate("/owner-login");
  }, [navigate]);

  const email = localStorage.getItem("ownerEmail");

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>
      <p className="mt-2 text-slate-600">
        This page is restricted to the site owner. {email ? <>Signed in as <span className="font-semibold">{email}</span>.</> : null}
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
          <div className="font-semibold">Listings</div>
          <div className="text-sm text-slate-600 mt-1">Manage property cards.</div>
          <Link to="/properties" className="mt-3 inline-block text-sm font-semibold hover:underline">
            View properties →
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
          <div className="font-semibold">Messages</div>
          <div className="text-sm text-slate-600 mt-1">View inquiries and tour requests.</div>
          <Link to="/contact" className="mt-3 inline-block text-sm font-semibold hover:underline">
            Contact page →
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => {
            localStorage.removeItem("ownerAuthed");
            localStorage.removeItem("ownerEmail");
            navigate("/");
          }}
          className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold hover:bg-slate-50"
        >
          Sign out
        </button>

        <Link
          to="/"
          className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
