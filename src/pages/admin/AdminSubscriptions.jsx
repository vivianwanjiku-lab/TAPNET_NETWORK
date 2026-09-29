import { useEffect, useState } from "react";
import api from "../../services/api";
const statusClass = { active: "badge-success", pending: "badge-warning", suspended: "badge-danger", expired: "badge-gray" };
export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);
  const load = () => api.get("/subscriptions").then((r) => setSubs(r.data));
  useEffect(() => { load(); }, []);
  const setStatus = async (s, status) => { await api.post(`/subscriptions/${s.id}/status`, { status }); load(); };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscriptions</h1>
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="px-4 py-3">Package</th><th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Expiry</th><th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr></thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 font-medium">{s.package?.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.customer_id.slice(0, 8)}</td>
                <td className="px-4 py-3">{s.expiry_date ? new Date(s.expiry_date).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3"><span className={statusClass[s.status] || "badge-gray"}>{s.status}</span></td>
                <td className="px-4 py-3 text-right space-x-2">
                  {s.status !== "active" && <button onClick={() => setStatus(s, "active")} className="text-xs text-green-600">Activate</button>}
                  {s.status === "active" && <button onClick={() => setStatus(s, "suspended")} className="text-xs text-red-600">Suspend</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
