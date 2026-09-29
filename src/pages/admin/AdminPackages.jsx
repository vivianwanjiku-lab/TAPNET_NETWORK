import { useEffect, useState } from "react";
import api from "../../services/api";
const empty = { name: "", price: "", duration_days: 30, speed_mbps: 20, data_limit_gb: 100 };
export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(empty);
  const [show, setShow] = useState(false);
  const load = () => api.get("/packages?all=true").then((r) => setPackages(r.data));
  useEffect(() => { load(); }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/packages", { ...form, price: parseFloat(form.price), duration_days: parseInt(form.duration_days), speed_mbps: parseInt(form.speed_mbps), data_limit_gb: parseInt(form.data_limit_gb) });
    setForm(empty); setShow(false); load();
  };
  const toggle = async (p) => {
    if (p.status === "active") await api.delete(`/packages/${p.id}`);
    else await api.put(`/packages/${p.id}`, { status: "active" });
    load();
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Packages</h1>
        <button onClick={() => setShow(!show)} className="btn-primary">{show ? "Cancel" : "New Package"}</button>
      </div>
      {show && (
        <form onSubmit={onSubmit} className="card grid md:grid-cols-2 gap-4">
          <div><label className="label">Name</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className="label">Price</label><input type="number" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
          <div><label className="label">Days</label><input type="number" className="input" value={form.duration_days} onChange={(e) => setForm({ ...form, duration_days: e.target.value })} /></div>
          <div><label className="label">Speed (Mbps)</label><input type="number" className="input" value={form.speed_mbps} onChange={(e) => setForm({ ...form, speed_mbps: e.target.value })} /></div>
          <div className="md:col-span-2"><button className="btn-primary">Create</button></div>
        </form>
      )}
      <div className="grid md:grid-cols-4 gap-6">
        {packages.map((p) => (
          <div key={p.id} className="card">
            <div className="flex justify-between"><div className="text-sm uppercase text-brand-600 font-semibold">{p.name}</div><span className={p.status === "active" ? "badge-success" : "badge-gray"}>{p.status}</span></div>
            <div className="text-2xl font-bold mt-2">KSh {p.price.toLocaleString()}</div>
            <div className="text-sm text-slate-600 mt-2">{p.speed_mbps} Mbps · {p.data_limit_gb || "∞"} GB</div>
            <button onClick={() => toggle(p)} className="btn-secondary w-full mt-4 text-xs">{p.status === "active" ? "Deactivate" : "Activate"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
