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
    <div className="panel p-10">
      <h1 className="text-4xl font-semibold tracking-wide text-white">Owner Dashboard</h1>

      <p className="mt-3 text-white/70">
        This page is restricted to the site owner.{" "}
        {email ? (
          <>
            Signed in as <span className="font-semibold text-white">{email}</span>.
          </>
        ) : null}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Listings</div>
          <div className="mt-3 text-white/80 font-semibold">Manage property cards</div>
          <div className="text-sm text-white/70 mt-2">
            Update active listings shown on the site.
          </div>

          <Link
            to="/properties"
            className="mt-5 inline-block text-sm font-semibold text-white/80 hover:text-white hover:underline transition"
          >
            View properties →
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm tracking-[0.35em] uppercase text-white/60">Messages</div>
          <div className="mt-3 text-white/80 font-semibold">Inquiries and tour requests</div>
          <div className="text-sm text-white/70 mt-2">
            View contact submissions from visitors.
          </div>

          <Link
            to="/contact"
            className="mt-5 inline-block text-sm font-semibold text-white/80 hover:text-white hover:underline transition"
          >
            Contact page →
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => {
            localStorage.removeItem("ownerAuthed");
            localStorage.removeItem("ownerEmail");
            navigate("/");
          }}
          className="btnGhost"
        >
          Sign out
        </button>

        <Link to="/" className="btnPrimary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
