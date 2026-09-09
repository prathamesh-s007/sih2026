import React from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { PlayCircle, RefreshCw, CloudRain, ShieldAlert } from 'lucide-react';

export default function Simulation() {
  const { locations, simulateExtremeRainfall, resetSimulation } = useSimulationStore();
  const aizawl = locations.find(l => l.location === 'Aizawl');

  if (!aizawl) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <PlayCircle className="text-blue-500" />
          Demo Simulation
        </h1>
        <p className="text-slate-400 mt-2">
          This panel allows you to simulate extreme weather events to demonstrate the system's real-time prediction and alerting capabilities.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        {aizawl.risk_category === 'HIGH' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
        )}
        
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Scenario: Aizawl Extreme Rainfall</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Current Sensor Data</h3>
            <div className="bg-slate-950 rounded-lg p-4 space-y-3 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rainfall (24h)</span>
                <span className={`font-bold ${aizawl.rainfall > 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {aizawl.rainfall} mm
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Soil Moisture</span>
                <span className={`font-bold ${aizawl.soil_moisture > 70 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {aizawl.soil_moisture}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Terrain Slope</span>
                <span className="font-bold text-slate-300">{aizawl.slope}°</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">AI Prediction Output</h3>
            <div className="bg-slate-950 rounded-lg p-4 space-y-3 border border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Risk Score</span>
                <span className="font-bold text-slate-300">{aizawl.risk_score}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Probability</span>
                <span className="font-bold text-slate-300">{(aizawl.landslide_probability * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Category</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  aizawl.risk_category === 'HIGH' ? 'bg-orange-500 text-white animate-pulse' : 'bg-yellow-500 text-white'
                }`}>
                  {aizawl.risk_category}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => simulateExtremeRainfall(aizawl.id)}
            disabled={aizawl.risk_category === 'HIGH'}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            <CloudRain size={20} />
            Simulate Extreme Rainfall
          </button>
          
          <button 
            onClick={resetSimulation}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors"
          >
            <RefreshCw size={20} />
            Reset Data
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Simulation Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${aizawl.risk_category === 'MODERATE' ? 'bg-blue-600' : 'bg-slate-800'}`}>1</div>
            <div>
              <p className="font-medium text-slate-200">Normal Conditions</p>
              <p className="text-sm text-slate-400">Sensors reading baseline data. Aizawl is at MODERATE risk.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${aizawl.risk_category === 'HIGH' ? 'bg-red-600 animate-pulse' : 'bg-slate-800'}`}>2</div>
            <div>
              <p className="font-medium text-slate-200">Extreme Weather Event</p>
              <p className="text-sm text-slate-400">Rainfall spikes to 145mm. Soil moisture reaches 76%.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${aizawl.risk_category === 'HIGH' ? 'bg-orange-500' : 'bg-slate-800'}`}>3</div>
            <div>
              <p className="font-medium text-slate-200">AI Recalculation</p>
              <p className="text-sm text-slate-400">Risk score updates to 82/100. Category changes to HIGH. GIS Map updates automatically.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${aizawl.risk_category === 'HIGH' ? 'bg-red-500' : 'bg-slate-800'}`}>4</div>
            <div>
              <p className="font-medium text-slate-200">Early Warning Generated</p>
              <p className="text-sm text-slate-400">Alerts dispatched to Authority Dashboard. SMS/Email notifications queued.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
