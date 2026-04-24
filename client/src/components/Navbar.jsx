import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navLinkClass = ({ isActive }) =>
    `relative rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] transition duration-200 ${
      isHome
        ? isActive
          ? "bg-white text-slate-950 shadow-lg shadow-black/20"
          : "text-white/80 hover:bg-white/10 hover:text-white"
        : isActive
          ? "bg-slate-950 text-white shadow-lg shadow-slate-200"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <header
      className={`w-full z-50 px-4 pt-5 ${
        isHome ? "absolute top-0 left-0" : "sticky top-0 bg-white/85 backdrop-blur-xl"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl rounded-full border px-5 py-3 shadow-2xl backdrop-blur-xl ${
          isHome
            ? "border-white/15 bg-black/35 shadow-black/30"
            : "border-slate-200 bg-white/90 shadow-slate-200/70"
        }`}
      >
        <div className="flex items-center justify-between gap-5">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-950 via-slate-800 to-amber-600 text-sm font-black tracking-tight text-white shadow-lg">
              SP
              <span className="absolute inset-x-2 bottom-1 h-px bg-amber-200/70" />
            </div>
            <div className="leading-tight">
              <p
                className={`text-base font-black tracking-tight ${
                  isHome ? "text-white" : "text-slate-950"
                }`}
              >
                Sweta Patel
              </p>
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
                  isHome ? "text-amber-100/80" : "text-amber-700"
                }`}
              >
                Realtor
              </p>
            </div>
          </Link>

          <nav
            className={`hidden items-center rounded-full border p-1 md:flex ${
              isHome ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-50"
            }`}
          >
            <NavLink to="/properties" className={navLinkClass}>
              Properties
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Let’s Connect
            </NavLink>
          </nav>

          <Link
            to="/owner-login"
            className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition duration-200 ${
              isHome
                ? "bg-amber-300 text-slate-950 hover:bg-white"
                : "bg-slate-950 text-white hover:bg-amber-600"
            }`}
          >
            Owner
          </Link>
        </div>
      </div>
    </header>
  );
}
