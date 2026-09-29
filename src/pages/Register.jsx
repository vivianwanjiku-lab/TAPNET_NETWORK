import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/authSlice";
export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "", location: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form)).unwrap();
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <form onSubmit={onSubmit} className="w-full max-w-md card space-y-4">
        <h1 className="text-3xl font-bold">Create account</h1>
        <div><label className="label">Full name</label><input name="full_name" className="input" onChange={onChange} required /></div>
        <div><label className="label">Email</label><input name="email" type="email" className="input" onChange={onChange} required /></div>
        <div><label className="label">Phone</label><input name="phone" className="input" onChange={onChange} required /></div>
        <div><label className="label">Location</label><input name="location" className="input" onChange={onChange} /></div>
        <div><label className="label">Password</label><input name="password" type="password" className="input" onChange={onChange} required minLength={6} /></div>
        <button className="btn-primary w-full">Create account</button>
        <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-brand-600">Sign in</Link></p>
      </form>
    </div>
  );
}
