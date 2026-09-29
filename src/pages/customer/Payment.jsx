import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
export default function Payment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const packageId = params.get("package_id");
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(packageId || "");
  const [method, setMethod] = useState("mpesa");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  useEffect(() => {
    api.get("/packages").then((r) => { setPackages(r.data); if (!selected && r.data[0]) setSelected(r.data[0].id); });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      const { data } = await api.post("/payments/initiate", { package_id: selected, method });
      setResult({ success: true, payment: data });
      setTimeout(() => navigate("/payments"), 2000);
    } catch { setResult({ success: false, message: "Payment failed" }); }
    finally { setSubmitting(false); }
  };
  const selectedPkg = packages.find((p) => p.id === selected);
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">Make Payment</h1>
      <form onSubmit={onSubmit} className="card space-y-5">
        <div><label className="label">Package</label>
          <select className="input" value={selected} onChange={(e) => setSelected(e.target.value)} required>
            {packages.map((p) => <option key={p.id} value={p.id}>{p.name} — KSh {p.price}</option>)}
          </select>
        </div>
        <div><label className="label">Method</label>
          <div className="grid grid-cols-4 gap-2">
            {["mpesa", "airtel", "stripe", "cash"].map((m) => (
              <button type="button" key={m} onClick={() => setMethod(m)}
                className={`px-3 py-2 rounded-md border text-sm capitalize ${method === m ? "bg-brand-600 text-white" : "bg-white"}`}>{m}</button>
            ))}
          </div>
        </div>
        {result && <div className={`p-3 rounded-md text-sm ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{result.success ? `Success! Ref: ${result.payment.reference}` : result.message}</div>}
        <button disabled={submitting} className="btn-primary w-full">{submitting ? "..." : `Pay KSh ${selectedPkg?.price || 0}`}</button>
      </form>
    </div>
  );
}
