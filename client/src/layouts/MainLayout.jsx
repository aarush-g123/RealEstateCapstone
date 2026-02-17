import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className={isHome ? "w-full" : "max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-24"}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
