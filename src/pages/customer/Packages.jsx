import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function Packages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { api.get("/packages").then((r) => setPackages(r.data)); }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Internet Packages</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((p) => (
          <div key={p.id} className="card flex flex-col">
            <div className="text-sm uppercase tracking-wide text-brand-600 font-semibold">{p.name}</div>
            <div className="text-3xl font-bold mt-2">KSh {p.price.toLocaleString()}</div>
            <div className="text-sm text-slate-500">{p.duration_days} day(s)</div>
            <ul className="mt-4 space-y-1 text-sm text-slate-700 flex-1">
              <li>⚡ {p.speed_mbps} Mbps</li>
              <li>📶 {p.data_limit_gb ? `${p.data_limit_gb} GB` : "Unlimited"}</li>
            </ul>
            <button onClick={() => navigate(`/pay?package_id=${p.id}`)} className="btn-primary w-full mt-4">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
}
