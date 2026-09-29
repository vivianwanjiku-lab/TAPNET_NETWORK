import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
export default function ForgotPassword() {
  const [id, setId] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/forgot-password", { email: id, phone: id });
    setSent(true);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <form onSubmit={onSubmit} className="w-full max-w-md card">
        <h1 className="text-2xl font-bold">Reset password</h1>
        {sent ? (
          <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-sm">If an account exists, reset instructions have been sent.</div>
        ) : (
          <>
            <div className="mt-6"><label className="label">Email or Phone</label><input className="input" value={id} onChange={(e) => setId(e.target.value)} required /></div>
            <button className="btn-primary w-full mt-6">Send instructions</button>
          </>
        )}
        <p className="mt-6 text-sm text-center"><Link to="/login" className="text-brand-600">Back to sign in</Link></p>
      </form>
    </div>
  );
}
