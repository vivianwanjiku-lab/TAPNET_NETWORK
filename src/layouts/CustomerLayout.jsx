import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/packages", label: "Packages", icon: "📦" },
  { to: "/pay", label: "Make Payment", icon: "💳" },
  { to: "/payments", label: "Payments", icon: "📜" },
  { to: "/usage", label: "Data Usage", icon: "📊" },
  { to: "/devices", label: "Devices", icon: "📱" },
  { to: "/notifications", label: "Notifications", icon: "🔔" },
  { to: "/support", label: "Support", icon: "🎧" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function CustomerLayout() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => { dispatch(logout()); navigate("/login"); };
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-brand-900 text-white flex flex-col">
        <div className="p-6 border-b border-brand-700">
          <div className="text-2xl font-bold">TapNet</div>
          <div className="text-xs text-brand-100 mt-1">Customer Portal</div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "bg-brand-600 text-white" : "text-brand-100 hover:bg-brand-700"
                }`}>
              <span>{n.icon}</span><span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-700 text-sm">
          <div className="font-medium">{user?.full_name}</div>
          <div className="text-brand-200 text-xs mb-3">{user?.email}</div>
          <button onClick={handleLogout} className="text-red-300 hover:text-red-200 text-xs">Sign out</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto"><Outlet /></main>
    </div>
  );
}
