import React from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { ShieldAlert, CheckCircle, AlertTriangle, Users } from 'lucide-react';

export default function AuthorityResponse() {
  const { alerts, acknowledgeAlert } = useSimulationStore();
  const activeAlerts = alerts.filter(a => a.status === 'Active');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="text-blue-500" />
          Authority Response Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-lg">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Critical Zones</p>
            <p className="text-2xl font-bold text-red-400">{activeAlerts.length}</p>
          </div>
        </div>
        
        <div className="bg-orange-900/20 border border-orange-500/30 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-orange-500/20 text-orange-500 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Response Teams Deployed</p>
            <p className="text-2xl font-bold text-orange-400">{activeAlerts.length * 2}</p>
          </div>
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Nearby Shelters Ready</p>
            <p className="text-2xl font-bold text-emerald-400">12</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-slate-100">Incident Management Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-slate-300 text-sm">
              <tr>
                <th className="p-4 font-semibold">Alert ID</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Risk Level</th>
                <th className="p-4 font-semibold">Time</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No incident reports logged.
                  </td>
                </tr>
              ) : (
                alerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-400">{alert.id.substring(0, 13)}...</td>
                    <td className="p-4 font-bold text-slate-200">{alert.locationName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        alert.category === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                      }`}>
                        {alert.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(alert.timestamp).toLocaleTimeString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        alert.status === 'Active' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {alert.status === 'Active' ? (
                        <button 
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs transition-colors">
                          Escalate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
