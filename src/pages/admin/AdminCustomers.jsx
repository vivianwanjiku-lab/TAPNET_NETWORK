import { useEffect, useState } from "react";
import api from "../../services/api";
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const load = () => api.get("/admin/customers").then((r) => setCustomers(r.data));
  useEffect(() => { load(); }, []);
  const toggle = async (c) => { await api.post(`/admin/customers/${c.id}/status`, { is_active: !c.is_active }); load(); };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th><th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr></thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3">{c.full_name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3"><span className={c.is_active ? "badge-success" : "badge-gray"}>{c.is_active ? "active" : "suspended"}</span></td>
                <td className="px-4 py-3 text-right"><button onClick={() => toggle(c)} className="text-xs text-brand-600">{c.is_active ? "Suspend" : "Activate"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
