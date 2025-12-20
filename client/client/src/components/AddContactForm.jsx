import React, { useState } from 'react';
import axios from 'axios';

export default function AddContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');

    try {
      await axios.post('/contacts', { name, email });
      setStatus('Contact created!');
      setName('');
      setEmail('');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setStatus('You do not have permission to add contacts.');
      } else {
        setStatus('Failed to create contact.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 space-y-3">
      <div className="flex gap-3">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
        >
          Add
        </button>
      </div>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
