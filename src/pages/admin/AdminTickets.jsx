import { useEffect, useState } from "react";
import api from "../../services/api";
const statusClass = { open: "badge-warning", in_progress: "badge-info", resolved: "badge-success" };
export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const load = () => api.get("/support/tickets").then((r) => setTickets(r.data));
  useEffect(() => { load(); }, []);
  const update = async (t, status) => { await api.put(`/support/tickets/${t.id}`, { status }); load(); };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support Tickets</h1>
      {tickets.map((t) => (
        <div key={t.id} className="card">
          <div className="flex justify-between"><div className="font-medium">{t.subject}</div><span className={statusClass[t.status] || "badge-gray"}>{t.status}</span></div>
          <p className="text-sm text-slate-600 mt-2">{t.description}</p>
          <div className="mt-3 flex gap-2">
            {["open", "in_progress", "resolved"].map((s) => (
              <button key={s} onClick={() => update(t, s)} className={`text-xs px-3 py-1 rounded border ${t.status === s ? "bg-brand-600 text-white" : ""}`}>{s}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
