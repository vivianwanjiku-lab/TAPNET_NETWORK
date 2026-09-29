import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  useEffect(() => { api.get("/customer/devices").then((r) => setDevices(r.data)); }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Connected Devices</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {devices.map((d) => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-lg">📱</div>
              <div>
                <div className="font-medium">{d.device_name}</div>
                <div className="text-xs text-slate-500 font-mono">{d.mac_address}</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Last connected: {new Date(d.last_connected).toLocaleString()}
            </div>
          </div>
        ))}
        {devices.length === 0 && <p className="text-sm text-slate-500">No devices.</p>}
      </div>
    </div>
  );
}
