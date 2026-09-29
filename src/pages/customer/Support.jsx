import { useEffect, useState } from "react";
import api from "../../services/api";

const statusClass = { open: "badge-warning", in_progress: "badge-info", resolved: "badge-success" };

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ ticket_type: "internet_problem", subject: "", description: "" });

  const load = () => api.get("/customer/tickets").then((r) => setTickets(r.data));
  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/customer/tickets", form);
    setForm({ ticket_type: "internet_problem", subject: "", description: "" });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={onSubmit} className="card space-y-3">
          <h2 className="text-lg font-semibold">New Ticket</h2>
          <select className="input" value={form.ticket_type} onChange={(e) => setForm({ ...form, ticket_type: e.target.value })}>
            <option value="internet_problem">Internet problem</option>
            <option value="slow_internet">Slow internet</option>
            <option value="payment_issue">Payment issue</option>
            <option value="package_issue">Package issue</option>
            <option value="router_issue">Router issue</option>
            <option value="account_issue">Account issue</option>
          </select>
          <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
          <textarea className="input" rows="3" placeholder="Describe the issue" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <button className="btn-primary w-full">Submit</button>
        </form>
        <div className="md:col-span-2 card">
          <h2 className="text-lg font-semibold mb-4">Your Tickets</h2>
          {tickets.length === 0 && <p className="text-sm text-slate-500">No tickets yet.</p>}
          {tickets.map((t) => (
            <div key={t.id} className="border rounded-md p-4 mb-3">
              <div className="flex justify-between">
                <div className="font-medium">{t.subject}</div>
                <span className={statusClass[t.status] || "badge-gray"}>{t.status.replace(/_/g, " ")}</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
