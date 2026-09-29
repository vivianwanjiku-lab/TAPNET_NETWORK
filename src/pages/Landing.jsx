import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">TapNet</div>
        <div className="space-x-3 flex items-center">
          <Link to="/login" className="text-white/90 hover:text-white">Login</Link>
          <Link to="/register" className="bg-white text-brand-700 px-4 py-2 rounded-md font-medium hover:bg-slate-100">Get Started</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">Fast, reliable Wi-Fi for your home and business.</h1>
        <p className="mt-6 text-xl text-white/80 max-w-2xl">Manage your internet package, pay with M-Pesa, track data usage, and get support — all in one place.</p>
        <div className="mt-10 flex gap-4 flex-wrap">
          <Link to="/register" className="bg-white text-brand-700 px-6 py-3 rounded-md font-semibold hover:bg-slate-100">Create Account</Link>
          <Link to="/login" className="border border-white/40 px-6 py-3 rounded-md font-semibold hover:bg-white/10">Sign In</Link>
        </div>
      </section>
    </div>
  );
}
