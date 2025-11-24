import React from 'react';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-600">Loading...</p>
      </div>
    );
  }

  // Not logged in → show login screen
  if (!user) {
    return <LoginPage />;
  }

  // Logged in → show dashboard
  return <Dashboard />;
}
