import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Payment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const packageId = params.get("package_id");

  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(packageId || "");
  const [phone, setPhone] = useState("254712345678");
  const [method, setMethod] = useState("mpesa");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/packages").then((r) => {
      setPackages(r.data);
      if (!selected && r.data[0]) setSelected(r.data[0].id);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const payload = { package_id: selected, method };
      if (method === "mpesa" || method === "airtel") payload.phone = phone;

      const { data } = await api.post("/payments/initiate", payload);

      // Stripe: redirect to hosted checkout
      if (method === "stripe" && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }

      // M-Pesa / Airtel: show confirmation
      setResult({
        success: true,
        payment: data.payment,
        message: data.message,
      });

      setTimeout(() => navigate("/payments"), 3000);
    } catch (err) {
      setResult({
        success: false,
        message: err.response?.data?.error || "Payment failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPkg = packages.find((p) => p.id === selected);
  const methods = [
    { id: "mpesa", label: "M-Pesa", icon: "📱" },
    { id: "airtel", label: "Airtel Money", icon: "📶" },
    { id: "stripe", label: "Card (Stripe)", icon: "💳" },
    { id: "cash", label: "Cash", icon: "💵" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Make Payment</h1>
        <p className="text-slate-500">Pay for your internet package securely.</p>
      </div>

      <form onSubmit={onSubmit} className="card space-y-5">
        <div>
          <label className="label">Select Package</label>
          <select
            className="input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — KSh {p.price} ({p.duration_days}d, {p.speed_mbps} Mbps)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Payment Method</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {methods.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`px-3 py-3 rounded-md border text-sm font-medium flex flex-col items-center gap-1 ${
                  method === m.id
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white border-slate-300 text-slate-700"
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {(method === "mpesa" || method === "airtel") && (
          <div>
            <label className="label">
              {method === "mpesa" ? "M-Pesa Phone Number" : "Airtel Phone Number"}
            </label>
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="254712345678"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              {method === "mpesa"
                ? "You'll receive an STK Push prompt on this number."
                : "Approve the Airtel Money prompt on your phone."}
            </p>
          </div>
        )}

        {method === "stripe" && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
            You'll be redirected to Stripe's secure checkout page to enter your card details.
          </div>
        )}

        {selectedPkg && (
          <div className="bg-slate-50 rounded-md p-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Package</span>
              <span className="font-medium">{selectedPkg.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>{selectedPkg.duration_days} days</span>
            </div>
            <div className="flex justify-between text-base mt-2 pt-2 border-t border-slate-200">
              <span className="font-medium">Total</span>
              <span className="font-bold">KSh {selectedPkg.price.toLocaleString()}</span>
            </div>
          </div>
        )}

        {result && (
          <div
            className={`p-3 rounded-md text-sm ${
              result.success
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {result.success
              ? `${result.message} Ref: ${result.payment.reference}`
              : result.message}
          </div>
        )}

        <button disabled={submitting} className="btn-primary w-full">
          {submitting
            ? "Processing..."
            : `Pay KSh ${selectedPkg?.price?.toLocaleString() || 0}`}
        </button>
      </form>
    </div>
  );
}
