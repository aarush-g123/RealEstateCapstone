import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";

import HomePage from "./pages/HomePage.jsx";
import PropertiesPage from "./pages/PropertiesPage.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import AgentsPage from "./pages/AgentsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OwnerLoginPage from "./pages/OwnerLoginPage.jsx";
import DashboardPage from "./pages/Dashboard.jsx";

function NotFound() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-600">That route doesn’t exist in this prototype.</p>
      <a className="mt-4 inline-block font-semibold hover:underline" href="/">
        Go home →
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/owner-login" element={<OwnerLoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
