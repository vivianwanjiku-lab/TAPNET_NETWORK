import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

export default function Login() {
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await dispatch(login({ email, password })).unwrap();
      navigate(user.role === "customer" ? "/dashboard" : "/admin/dashboard");
    } catch {}
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <form onSubmit={onSubmit} className="w-full max-w-sm card">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-slate-500 mt-1 text-sm">Enter your credentials.</p>
        {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        <div className="mt-6 space-y-4">
          <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        </div>
        <button disabled={loading} className="btn-primary w-full mt-6">{loading ? "Signing in..." : "Sign in"}</button>
        <p className="mt-4 text-xs text-center text-slate-500">Don't have an account? <Link to="/register" className="text-brand-600">Register</Link></p>
        <p className="mt-2 text-xs text-center text-slate-500">Admin? <Link to="/admin/login" className="text-brand-600">Sign in here</Link></p>
      </form>
    </div>
  );
}
