import React, { useEffect, useState } from 'react';
import { fetchHistoricalData, fetchSensorHistory, fetchYearlyData } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, ComposedChart } from 'recharts';
import { History, CalendarClock } from 'lucide-react';

export default function HistoricalData() {
  const [annualData, setAnnualData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    fetchHistoricalData().then(setAnnualData);
    fetchSensorHistory().then(setSensorData);
    fetchYearlyData().then(setYearlyData);
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
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <CalendarClock className="text-emerald-500" size={20} />
          30-Day Sensor Data & Risk Correlation
        </h2>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" label={{ value: 'Rainfall (mm) / Moisture (%)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={{ value: 'Risk Score', angle: 90, position: 'insideRight', fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="rainfall" name="Rainfall (mm)" fill="#3b82f6" opacity={0.8} />
              <Line yAxisId="left" type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#10b981" strokeWidth={3} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="riskScore" name="AI Risk Score" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-sm text-slate-300">
          <strong>Observation:</strong> The AI Risk Score (red line) tightly correlates with the combination of heavy rainfall events and increasing soil saturation. Spikes in risk score visibly trail behind consecutive days of rainfall due to accumulating soil moisture.
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Month-wise Landslide Frequency & Alerts (Current Year)</h2>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={annualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Legend />
              <Bar dataKey="landslides" name="Recorded Landslides" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="alerts" name="Early Warnings Issued" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-sm text-slate-300">
          <strong>Observation:</strong> Historical month-wise data demonstrates a strong correlation between peak monsoon months (June-August) and increased landslide events in the NER.
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">Year-wise Landslide Frequency & Alerts (2020-2026)</h2>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" label={{ value: 'Annual Rainfall (mm)', angle: 90, position: 'insideRight', fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="landslides" name="Recorded Landslides" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="alerts" name="Early Warnings Issued" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="rainfall" name="Annual Rainfall (mm)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg text-sm text-slate-300">
          <strong>Observation:</strong> Year-over-year analysis reveals that years with exceptionally high total annual rainfall (e.g., 2023) experienced a disproportionate surge in landslide events, highlighting the compounding effect of macro-climatic changes.
        </div>
      </div>
    </div>
  );
}
