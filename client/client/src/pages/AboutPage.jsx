import React from "react";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="bg-white border border-slate-200 rounded-3xl p-8">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          This is a rapid prototype for a real estate website. The goal is to show a realistic UI and
          clickable user flow (Home → Browse → Listing → Contact), without building the full backend yet.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold">What works in this prototype</h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• Navigation between pages</li>
            <li>• Listing cards and a detail page</li>
            <li>• Simple filters + search (front-end only)</li>
            <li>• Contact + sign-in screens (dummy)</li>
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold">What’s next after feedback</h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• Connect to real data (backend + database)</li>
            <li>• Real authentication</li>
            <li>• Saved favorites and messaging</li>
            <li>• Admin/agent listing management</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
