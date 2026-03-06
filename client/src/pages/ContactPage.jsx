import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
axios.defaults.withCredentials = true;

export default function ContactPage() {
  const location = useLocation();
  const propertyContext = location.state?.property || null;

  const defaultMessage = useMemo(() => {
    if (!propertyContext?.title) return "";
    return `Hi, I am interested in ${propertyContext.title}. Please let me know the next steps.`;
  }, [propertyContext]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
  });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit() {
    setStatus({ type: "idle", text: "" });

    try {
      await axios.post("/contacts", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        propertyId: propertyContext?.id,
        propertyTitle: propertyContext?.title,
        source: propertyContext ? "property-detail" : "contact-page",
      });

      setStatus({ type: "success", text: "Message sent to the dashboard." });
      setForm({ name: "", email: "", phone: "", message: defaultMessage });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Failed to send message." });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2 bg-white text-slate-900 border border-slate-200 rounded-3xl p-8">
        <h1 className="text-3xl font-bold">Contact</h1>

        {propertyContext ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            Inquiry for <span className="font-semibold">{propertyContext.title}</span>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-900">Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              placeholder="Alex Johnson"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              placeholder="alex.johnson@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              placeholder="(555) 555-5555"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 min-h-[140px]"
              placeholder="I would like to schedule a tour..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 min-h-[140px]"
          >
            Send message
          </button>

          {status.text ? (
            <p className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
              {status.text}
            </p>
          ) : null}
        </div>
      </div>

      <aside className="bg-white text-slate-900 border border-slate-200 rounded-3xl p-6">
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
            <span className="font-semibold">swetapatel@corcoraninfinities.com</span>
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
