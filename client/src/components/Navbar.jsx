import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const baseText = isHome ? "text-white" : "text-slate-900";
  const hoverText = isHome ? "hover:text-white" : "hover:text-slate-900";

  return (
    <header
      className={`w-full z-50 ${
        isHome
          ? "absolute top-0 left-0 bg-transparent"
          : "sticky top-0 bg-white border-b border-slate-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-slate-900 text-white w-10 h-10 rounded-lg flex items-center justify-center font-semibold">
            SP
          </div>
          <span className={`font-semibold text-lg ${baseText}`}>
            Sweta Patel Realtor
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/properties"
            className={`${baseText} ${hoverText} text-sm tracking-widest uppercase`}
          >
            Properties
          </NavLink>

          <NavLink
            to="/contact"
            className={`${baseText} ${hoverText} text-sm tracking-widest uppercase`}
          >
            Let’s Connect
          </NavLink>

          {/* Owner Button */}
          <Link
            to="/owner-login"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition ${
              isHome
                ? "border border-white text-white hover:bg-white hover:text-black"
                : "border border-slate-300 text-slate-900 hover:bg-slate-100"
            }`}
          >
            Owner
          </Link>
        </div>
      </div>
    </header>
  );
}
