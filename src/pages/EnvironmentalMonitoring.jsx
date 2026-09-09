import React from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '00:00', rainfall: 20, moisture: 45 },
  { time: '04:00', rainfall: 35, moisture: 48 },
  { time: '08:00', rainfall: 50, moisture: 52 },
  { time: '12:00', rainfall: 45, moisture: 50 },
  { time: '16:00', rainfall: 80, moisture: 58 },
  { time: '20:00', rainfall: 120, moisture: 68 },
];

export default function EnvironmentalMonitoring() {
  const { locations } = useSimulationStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Environmental Monitoring</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Average Rainfall Trend (24h)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Average Soil Moisture Trend (24h)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Line type="monotone" dataKey="moisture" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-slate-100">Live IoT Sensor Feeds</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-sm">
              <tr>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Rainfall (mm)</th>
                <th className="p-4 font-medium">Soil Moisture (%)</th>
                <th className="p-4 font-medium">Temperature (°C)</th>
                <th className="p-4 font-medium">Ground Vib.</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {locations.map(loc => (
                <tr key={loc.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-medium text-slate-200">{loc.location}</td>
                  <td className={`p-4 ${loc.rainfall > 100 ? 'text-red-400 font-bold' : ''}`}>{loc.rainfall}</td>
                  <td className={`p-4 ${loc.soil_moisture > 70 ? 'text-red-400 font-bold' : ''}`}>{loc.soil_moisture}</td>
                  <td className="p-4">{loc.temperature}</td>
                  <td className="p-4">Normal</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      loc.sensor_status === 'Online' ? 'bg-emerald-500/20 text-emerald-400' :
                      loc.sensor_status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {loc.sensor_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
