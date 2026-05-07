import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { trackPageView } from "../utils/metricsStore.js";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const lastPathRef = useRef(null);

  // Basic site analytics: counts a view whenever the route changes.
  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

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
