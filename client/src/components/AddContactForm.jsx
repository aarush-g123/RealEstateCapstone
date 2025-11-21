// src/components/AddContactForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function AddContactForm({ onAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:4000/api/contacts',
        { name, email },
        { withCredentials: true }
      );
      setName('');
      setEmail('');
      onAdded(res.data.contact);
    } catch (err) {
      console.error(err);
      setError('Could not add contact (maybe you are not admin?)');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          className="border rounded w-full px-2 py-1 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          className="border rounded w-full px-2 py-1 text-sm"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="bg-slate-900 text-white rounded px-3 py-1 text-sm"
      >
        {saving ? 'Saving...' : 'Add Contact'}
      </button>
    </form>
  );
}
