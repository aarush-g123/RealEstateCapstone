import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-semibold text-white">Sweta Patel Realtor</div>
          <p className="text-sm text-white/70 mt-2">Example</p>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-white/80 tracking-widest uppercase">
            Explore
          </div>
          <div className="mt-4 grid gap-2 text-white/60">
            <Link className="hover:text-white transition" to="/properties">
              Browse properties
            </Link>
            <Link className="hover:text-white transition" to="/about">
              About
            </Link>
            <Link className="hover:text-white transition" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-white/50 flex justify-between">
          <span>© {new Date().getFullYear()} Sweta Patel Realtor</span>
        </div>
      </div>
    </footer>
  );
}
