import { useEffect, useState } from "react";
import api from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export default function AdminReports() {
  const [revenue, setRevenue] = useState([]);
  useEffect(() => { api.get("/admin/reports/revenue").then((r) => setRevenue(r.data)); }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="card">
        <div style={{ height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period" /><YAxis /><Tooltip />
              <Bar dataKey="revenue" fill="#1e6fd9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
