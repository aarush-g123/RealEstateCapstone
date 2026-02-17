import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-semibold text-slate-900">Sweta Patel Realtor</div>
          <p className="text-sm text-slate-600 mt-2">
            Example
          </p>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-slate-900">Explore</div>
          <div className="mt-2 grid gap-2 text-slate-600">
            <Link className="hover:text-slate-900" to="/properties">Browse properties</Link>
            <Link className="hover:text-slate-900" to="/about">About</Link>
            <Link className="hover:text-slate-900" to="/contact">Contact</Link>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} Sweta Patel Realtor</span>
        </div>
      </div>
    </footer>
  );
}
