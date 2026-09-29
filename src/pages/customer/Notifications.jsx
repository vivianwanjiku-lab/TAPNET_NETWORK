import { useEffect, useState } from "react";
import api from "../../services/api";
export default function Notifications() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/notifications").then((r) => setItems(r.data)); }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      {items.map((n) => (
        <div key={n.id} className="card">
          <div className="font-medium">{n.title}</div>
          <div className="text-sm text-slate-600">{n.message}</div>
        </div>
      ))}
    </div>
  );
}
