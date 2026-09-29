import { useEffect, useState } from "react";
import api from "../../services/api";
export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { api.get("/admin/audit-logs").then((r) => setLogs(r.data)); }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="px-4 py-3">Time</th><th className="px-4 py-3">Actor</th>
            <th className="px-4 py-3">Action</th><th className="px-4 py-3">Entity</th>
          </tr></thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="px-4 py-3 text-xs">{new Date(l.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs">{l.actor_id}</td>
                <td className="px-4 py-3">{l.action}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{l.entity_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
