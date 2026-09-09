import React, { useState } from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { BellRing, CheckCircle, Mail, MessageSquare, ShieldAlert } from 'lucide-react';

export default function Alerts() {
  const { alerts, acknowledgeAlert } = useSimulationStore();
  const [toast, setToast] = useState(null);

  const simulateNotification = (type, id) => {
    setToast(`Alert successfully simulated via ${type}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <BellRing className="text-red-500" />
          Active Alerts
        </h1>
      </div>

      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-10">
          <CheckCircle size={18} />
          {toast}
        </div>
      )}

      {alerts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
          <CheckCircle className="mx-auto text-emerald-500 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-slate-100">No Active Alerts</h2>
          <p className="text-slate-400 mt-2">All monitored locations are within safe parameters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-red-600/20 border-b border-red-500/20 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-red-500 animate-pulse" />
                  <h2 className="text-lg font-bold text-red-400">{alert.category} LANDSLIDE RISK</h2>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                  {alert.status}
                </span>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-slate-100 font-semibold text-lg">{alert.locationName}</p>
                  <p className="text-slate-500 text-sm">{alert.district}</p>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm">Risk Score</p>
                  <p className="text-red-400 font-bold text-2xl">{alert.riskScore}/100</p>
                  <p className="text-slate-500 text-sm">{alert.probability}% Probability</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-slate-400 text-sm">Reason</p>
                  <p className="text-slate-200 mt-1">{alert.reason}</p>
                  <p className="text-slate-400 text-sm mt-3">Recommended Action</p>
                  <p className="text-slate-200">Issue local warning and prepare evacuation teams immediately.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap gap-3">
                <button 
                  onClick={() => simulateNotification('SMS', alert.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
                >
                  <MessageSquare size={16} /> Send SMS
                </button>
                <button 
                  onClick={() => simulateNotification('Email', alert.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
                >
                  <Mail size={16} /> Send Email
                </button>
                <button 
                  onClick={() => simulateNotification('Authority Dashboard', alert.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
                >
                  <ShieldAlert size={16} /> Notify Authorities
                </button>
                <div className="flex-1"></div>
                {alert.status === 'Active' && (
                  <button 
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <CheckCircle size={16} /> Acknowledge Alert
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
