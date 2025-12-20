import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ContactTable() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await axios.get('/contacts');
        setContacts(res.data.contacts || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, []);

  if (!contacts.length) {
    return <p className="text-sm text-slate-600">No contacts yet.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-4 py-2">ID</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
