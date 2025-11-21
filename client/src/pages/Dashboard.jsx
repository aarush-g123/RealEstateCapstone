// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ContactTable from '../components/ContactTable';
import AddContactForm from '../components/AddContactForm';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await axios.get('http://localhost:4000/api/contacts', {
          withCredentials: true,
        });
        setContacts(res.data.contacts);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, []);

  function handleContactAdded(contact) {
    setContacts((prev) => [...prev, contact]);
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="font-semibold">Hello Contacts</h1>
          <div className="flex items-center gap-3 text-sm">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-500">
                {user.email} · {user.role.toUpperCase()}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-xs border border-slate-300 rounded px-2 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2 text-sm">Contacts</h2>
          <ContactTable contacts={contacts} />
        </section>

        <section className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-sm">Add Contact</h2>
            {!isAdmin && (
              <span className="text-xs text-slate-500">
                Viewers cannot add contacts.
              </span>
            )}
          </div>

          {isAdmin ? (
            <AddContactForm onAdded={handleContactAdded} />
          ) : (
            <p className="text-sm text-slate-500">
              You are logged in as a <b>viewer</b>. Only admins can create
              contacts. (RBAC demo)
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
