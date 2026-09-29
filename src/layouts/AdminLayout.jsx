import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/customers", label: "Customers", icon: "👥" },
  { to: "/admin/packages", label: "Packages", icon: "📦" },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: "🔄" },
  { to: "/admin/payments", label: "Payments", icon: "💳" },
  { to: "/admin/network", label: "Network", icon: "🛰️" },
  { to: "/admin/reports", label: "Reports", icon: "📈" },
  { to: "/admin/tickets", label: "Support", icon: "🎧" },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: "📋" },
];

export default function AdminLayout() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => { dispatch(logout()); navigate("/admin/login"); };
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="text-2xl font-bold">TapNet</div>
          <div className="text-xs text-slate-400 mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "bg-brand-600 text-white" : "text-slate-300 hover:bg-slate-800"
                }`}>
              <span>{n.icon}</span><span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 text-sm">
          <div className="font-medium">{user?.full_name}</div>
          <div className="text-slate-400 text-xs uppercase mb-3">{user?.role}</div>
          <button onClick={handleLogout} className="text-red-300 hover:text-red-200 text-xs">Sign out</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto bg-slate-50"><Outlet /></main>
    </div>
  );
}
