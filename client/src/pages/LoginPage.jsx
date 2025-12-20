import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function continueDemo(role) {
    // Prototype-only: pretend login succeeded and route to browse
    alert(`Signed in as ${role} (prototype)`);
    navigate("/properties");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 items-center">
      <div className="bg-white border border-slate-200 rounded-3xl p-8">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-slate-600">
          Demo screen for the rapid prototype. No real authentication yet.
        </p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => continueDemo(email ? email : "Buyer")}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
            >
              Continue
            </button>
            <button
              onClick={() => continueDemo("Agent")}
              className="px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold hover:bg-slate-50"
            >
              Continue as agent
            </button>
          </div>

          <div className="text-sm text-slate-600">
            Don’t want to sign in?{" "}
            <Link to="/properties" className="font-semibold hover:underline">
              Browse anyway
            </Link>
            .
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8">
        <h2 className="text-xl font-bold">What you can demo</h2>
        <ul className="mt-3 space-y-2 text-slate-600">
          <li>• Home → Search</li>
          <li>• Properties → Filter</li>
          <li>• Detail page → Request tour</li>
          <li>• Contact form → Send message</li>
        </ul>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex px-5 py-3 rounded-xl border border-slate-200 bg-white font-semibold hover:bg-slate-50"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
