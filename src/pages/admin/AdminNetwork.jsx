import { useEffect, useState } from "react";
import api from "../../services/api";
const statusClass = { online: "badge-success", offline: "badge-danger", maintenance: "badge-warning" };
export default function AdminNetwork() {
  const [routers, setRouters] = useState([]);
  const load = () => api.get("/network/routers").then((r) => setRouters(r.data));
  useEffect(() => { load(); }, []);
  const setStatus = async (r, status) => { await api.put(`/network/routers/${r.id}`, { status }); load(); };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Network</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {routers.map((r) => (
          <div key={r.id} className="card">
            <div className="flex justify-between">
              <div><div className="font-medium">{r.name}</div><div className="text-xs font-mono text-slate-500">{r.ip_address}</div></div>
              <span className={statusClass[r.status] || "badge-gray"}>{r.status}</span>
            </div>
            <div className="text-sm text-slate-600 mt-3">📍 {r.location}</div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStatus(r, "online")} className="text-xs px-2 py-1 rounded bg-green-50 text-green-700">Online</button>
              <button onClick={() => setStatus(r, "offline")} className="text-xs px-2 py-1 rounded bg-red-50 text-red-700">Offline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
