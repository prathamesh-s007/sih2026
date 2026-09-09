import React, { useEffect, useState } from 'react';
import { fetchHistoricalData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { History } from 'lucide-react';

export default function HistoricalData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHistoricalData().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <History className="text-blue-500" />
          Historical Analysis
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Annual Landslide Frequency & Alerts</h2>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Legend />
              <Bar dataKey="landslides" name="Recorded Landslides" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alerts" name="Early Warnings Issued" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-sm text-slate-300">
          <strong>Observation:</strong> Historical data demonstrates a strong correlation between peak monsoon months (June-August) and increased landslide events in the NER.
        </div>
      </div>
    </div>
  );
}
