import React, { useEffect, useState } from 'react';
import useSimulationStore from '../../store/useSimulationStore';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

export default function Header() {
  const { isOffline, setOfflineMode, alerts } = useSimulationStore();
  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlerts = alerts.filter(a => a.status === 'Active').length;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-slate-100">AI-Powered Landslide Early Warning & Risk Monitoring System</h2>
        <span className="text-xs text-slate-400">North Eastern Region • Real-Time Risk Monitoring</span>
      </div>

      <div className="flex items-center gap-6">
        {activeAlerts > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm animate-pulse">
            <AlertTriangle size={16} />
            <span className="font-medium">{activeAlerts} Active Alert{activeAlerts > 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="text-sm text-slate-400">
          Last updated: {time}
        </div>

        <button 
          onClick={() => setOfflineMode(!isOffline)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
            isOffline ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'
          }`}
        >
          {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
          <span className="font-medium">System Status: {isOffline ? 'OFFLINE' : 'ONLINE'}</span>
        </button>
      </div>
    </header>
  );
}
