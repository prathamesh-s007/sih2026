import React, { useState } from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { Search, Filter } from 'lucide-react';

export default function RiskAnalysis() {
  const { locations } = useSimulationStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(loc => 
    loc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.district.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.risk_score - a.risk_score);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Risk Analysis</h1>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search locations or districts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-slate-300 text-sm">
              <tr>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Probability</th>
                <th className="p-4 font-semibold">Risk Score</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Rainfall (mm)</th>
                <th className="p-4 font-semibold">Moisture (%)</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredLocations.map(loc => (
                <tr key={loc.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-200">{loc.location}</p>
                    <p className="text-xs text-slate-500">{loc.district}</p>
                  </td>
                  <td className="p-4 font-medium">{(loc.landslide_probability * 100).toFixed(0)}%</td>
                  <td className="p-4 font-bold">{loc.risk_score}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      loc.risk_category === 'CRITICAL' ? 'bg-red-500 text-white' :
                      loc.risk_category === 'HIGH' ? 'bg-orange-500 text-white' :
                      loc.risk_category === 'MODERATE' ? 'bg-yellow-500 text-white' :
                      'bg-emerald-500 text-white'
                    }`}>
                      {loc.risk_category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{loc.rainfall}</td>
                  <td className="p-4 text-slate-300">{loc.soil_moisture}</td>
                  <td className="p-4 text-slate-300">{loc.sensor_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
