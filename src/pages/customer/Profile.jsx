import { useEffect, useState } from "react";
import api from "../../services/api";
export default function Profile() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", location: "" });
  const [saved, setSaved] = useState(false);
  useEffect(() => { api.get("/customer/profile").then((r) => setForm(r.data)); }, []);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <form onSubmit={onSubmit} className="card space-y-4">
        <div><label className="label">Full name</label><input name="full_name" className="input" value={form.full_name || ""} onChange={onChange} /></div>
        <div><label className="label">Email</label><input className="input bg-slate-50" value={form.email || ""} disabled /></div>
        <div><label className="label">Phone</label><input name="phone" className="input" value={form.phone || ""} onChange={onChange} /></div>
        <div><label className="label">Location</label><input name="location" className="input" value={form.location || ""} onChange={onChange} /></div>
        {saved && <div className="text-sm text-green-700">Saved.</div>}
        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
}
