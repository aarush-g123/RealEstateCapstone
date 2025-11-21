// src/components/ContactTable.jsx
export default function ContactTable({ contacts }) {
  if (!contacts.length) {
    return <p className="text-sm text-slate-500">No contacts yet.</p>;
  }

  return (
    <table className="min-w-full border border-slate-200 text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="border-b px-3 py-2 text-left">Name</th>
          <th className="border-b px-3 py-2 text-left">Email</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c.id}>
            <td className="border-b px-3 py-2">{c.name}</td>
            <td className="border-b px-3 py-2">{c.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
