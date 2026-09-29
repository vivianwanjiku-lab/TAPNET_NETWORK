import { useEffect, useState } from "react";
import api from "../../services/api";
export default function Usage() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get("/customer/dashboard").then((r) => setData(r.data)); }, []);
  const pkg = data?.current_package;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Usage</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card"><div className="text-sm text-slate-500">Used</div><div className="text-3xl font-bold">42.8 GB</div></div>
        <div className="card"><div className="text-sm text-slate-500">Remaining</div><div className="text-3xl font-bold">57.2 GB</div></div>
        <div className="card"><div className="text-sm text-slate-500">Total</div><div className="text-3xl font-bold">{pkg?.data_limit_gb || 100} GB</div></div>
      </div>
      <div className="card"><div className="w-full bg-slate-100 rounded-full h-3"><div className="h-3 rounded-full bg-brand-600" style={{ width: "42.8%" }} /></div></div>
    </div>
  );
}
