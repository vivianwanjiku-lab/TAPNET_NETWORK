import { useEffect, useState } from "react";
import api from "../../services/api";
const statusClass = { successful: "badge-success", pending: "badge-warning", failed: "badge-danger" };
export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  useEffect(() => { api.get("/payments").then((r) => setPayments(r.data)); }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>
      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="px-4 py-3">Reference</th><th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Method</th><th className="px-4 py-3">Status</th>
          </tr></thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{p.reference}</td>
                <td className="px-4 py-3">KSh {p.amount}</td>
                <td className="px-4 py-3 capitalize">{p.method}</td>
                <td className="px-4 py-3"><span className={statusClass[p.status] || "badge-gray"}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
