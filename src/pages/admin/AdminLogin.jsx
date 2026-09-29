import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
export default function AdminLogin() {
  const [email, setEmail] = useState("admin@tapnet.co.ke");
  const [password, setPassword] = useState("password");
  const dispatch = useDispatch(); const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password, admin: true })).unwrap();
    navigate("/admin/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-8">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-lg p-8">
        <div className="text-2xl font-bold text-brand-700">TapNet Admin</div>
        <div className="mt-6 space-y-4">
          <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        </div>
        <button className="btn-primary w-full mt-6">Sign in</button>
      </form>
    </div>
  );
}
