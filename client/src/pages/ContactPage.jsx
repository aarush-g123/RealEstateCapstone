import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="mt-2 text-slate-600">
          This form is for UI demonstration. Submitting just shows a confirmation.
        </p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200"
              placeholder="Alex Johnson"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200"
              placeholder="alex.johnson@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 min-h-[140px]"
              placeholder="I’d like to schedule a tour for the Austin home this weekend..."
            />
          </div>

          <button
            onClick={() => alert("Message sent! (prototype)")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
          >
            Send message
          </button>
        </div>
      </div>

      <aside className="bg-white border border-slate-200 rounded-3xl p-6">
        <h2 className="text-xl font-bold">Office</h2>
        <p className="mt-2 text-slate-600 text-sm">
          500 Market Street<br />
          Suite 1200<br />
          New York, NY 10010
        </p>

        <div className="mt-4 text-sm text-slate-600 grid gap-2">
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Phone</span>
            <span className="font-semibold">(212) 555-0100</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Email</span>
            <span className="font-semibold">hello@horizonhomes.com</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Hours</h3>
          <p className="mt-2 text-sm text-slate-600">
            Mon–Fri: 9:00am–6:00pm<br />
            Sat: 10:00am–3:00pm<br />
            Sun: Closed
          </p>
        </div>
      </aside>
    </div>
  );
}
