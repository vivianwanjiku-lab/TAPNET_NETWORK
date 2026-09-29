import { useEffect, useState } from "react";
import api from "../../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    api.get("/admin/dashboard").then((r) => setStats(r.data));
    api.get("/admin/reports/revenue").then((r) => setRevenue(r.data));
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card"><div className="text-sm text-slate-500">Customers</div><div className="text-3xl font-bold">{stats?.total_customers ?? "—"}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Active Subs</div><div className="text-3xl font-bold">{stats?.active_subscriptions ?? "—"}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Open Tickets</div><div className="text-3xl font-bold">{stats?.open_tickets ?? "—"}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Revenue</div><div className="text-3xl font-bold">KSh {stats?.total_revenue?.toLocaleString() ?? "—"}</div></div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Revenue</h2>
        <div style={{ height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#1e6fd9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
