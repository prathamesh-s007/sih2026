import React from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { ShieldAlert, Activity, MapPin, Zap } from 'lucide-react';

export default function Dashboard() {
  const { locations, alerts } = useSimulationStore();

  const total = locations.length;
  const low = locations.filter(l => l.risk_category === 'LOW').length;
  const moderate = locations.filter(l => l.risk_category === 'MODERATE').length;
  const high = locations.filter(l => l.risk_category === 'HIGH').length;
  const critical = locations.filter(l => l.risk_category === 'CRITICAL').length;
  const avgRisk = Math.round(locations.reduce((acc, curr) => acc + curr.risk_score, 0) / total);
  
  const activeAlerts = alerts.filter(a => a.status === 'Active').length;
  const onlineSensors = locations.filter(l => l.sensor_status === 'Online').length;

  const StatCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-start justify-between shadow-lg">
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${colorClass}`}>{value}</p>
        {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('400', '500/20').replace('500', '500/20')}`}>
        <Icon size={24} className={colorClass} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Command Center Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monitored Locations" 
          value={total} 
          subtitle="Across NER" 
          icon={MapPin} 
          colorClass="text-blue-400" 
        />
        <StatCard 
          title="High/Critical Zones" 
          value={high + critical} 
          subtitle={`${high} High, ${critical} Critical`}
          icon={ShieldAlert} 
          colorClass="text-orange-500" 
        />
        <StatCard 
          title="Active Alerts" 
          value={activeAlerts} 
          subtitle="Require immediate action"
          icon={Activity} 
          colorClass="text-red-500" 
        />
        <StatCard 
          title="Average Risk Score" 
          value={`${avgRisk}/100`} 
          subtitle="System wide average"
          icon={Zap} 
          colorClass="text-emerald-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-100">Risk Distribution</h2>
          <div className="space-y-4">
            {[
              { label: 'CRITICAL', count: critical, color: 'bg-red-500' },
              { label: 'HIGH', count: high, color: 'bg-orange-500' },
              { label: 'MODERATE', count: moderate, color: 'bg-yellow-500' },
              { label: 'LOW', count: low, color: 'bg-emerald-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-24 text-sm text-slate-400 font-medium">{item.label}</span>
                <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`} 
                    style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-bold text-slate-300">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-100">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400 text-sm">Sensors Online</span>
              <span className="font-semibold text-emerald-400">{onlineSensors} / {total}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <span className="text-slate-400 text-sm">AI Model Status</span>
              <span className="font-semibold text-emerald-400">Optimal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Data Pipeline</span>
              <span className="font-semibold text-emerald-400">Synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
