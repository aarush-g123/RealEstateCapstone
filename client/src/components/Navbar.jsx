import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
            SP
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-semibold">Sweta Patel Realtor</h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkClass}>
            Properties
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>


<div className="flex items-center gap-2">
  {localStorage.getItem("ownerAuthed") === "true" ? (
    <Link
      to="/dashboard"
      className="px-3 py-2 rounded-md text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50"
      title="Owner dashboard"
    >
      Owner
    </Link>
  ) : (
    <Link
      to="/owner-login"
      className="px-3 py-2 rounded-md text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50"
      title="Owner sign in"
    >
      Owner Sign In
    </Link>
  )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex gap-2 overflow-x-auto">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkClass}>
            Properties
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
}
