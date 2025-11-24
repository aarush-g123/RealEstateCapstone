import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AddContactForm from '../components/AddContactForm.jsx';
import ContactTable from '../components/ContactTable.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div>
          <h1 className="text-xl font-bold">Contacts Dashboard</h1>
          {user && (
            <p className="text-sm text-slate-600">
              Signed in as <span className="font-semibold">{user.email}</span> ({user.role})
            </p>
          )}
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        {user?.role === 'admin' && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Add Contact (admin only)</h2>
            <AddContactForm />
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold mb-2">All Contacts</h2>
          <ContactTable />
        </section>
      </main>
    </div>
  );
}
