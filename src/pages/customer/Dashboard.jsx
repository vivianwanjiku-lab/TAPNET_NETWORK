import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get("/customer/dashboard").then((r) => setData(r.data)); }, []);
  if (!data) return <div>Loading...</div>;
  const sub = data.subscription; const pkg = data.current_package; const isActive = data.internet_status === "ONLINE";
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-slate-500">Your internet at a glance.</p></div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card"><div className="text-sm text-slate-500">Status</div><div className={`mt-2 text-2xl font-bold ${isActive ? "text-green-600" : "text-red-600"}`}>{data.internet_status}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Package</div><div className="mt-2 text-2xl font-bold">{pkg?.name || "None"}</div></div>
        <div className="card"><div className="text-sm text-slate-500">Expires</div><div className="mt-2 text-2xl font-bold">{sub?.expiry_date ? new Date(sub.expiry_date).toLocaleDateString() : "—"}</div></div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/packages" className="btn-primary">Buy Package</Link>
          <Link to="/pay" className="btn-secondary">Make Payment</Link>
          <Link to="/usage" className="btn-secondary">View Usage</Link>
          <Link to="/support" className="btn-secondary">Support</Link>
        </div>
      </div>
    </div>
  );
}
