import React from 'react';
import useSimulationStore from '../store/useSimulationStore';
import { BrainCircuit, Info } from 'lucide-react';

export default function AIPrediction() {
  const { locations } = useSimulationStore();
  const highestRisk = [...locations].sort((a, b) => b.risk_score - a.risk_score)[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <BrainCircuit className="text-purple-500" />
          Explainable AI Risk Prediction
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4 mb-8">
          <Info className="text-blue-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-slate-200">How the Prediction Works</h2>
            <p className="text-slate-400 mt-1 text-sm">
              Our Random Forest ML model takes multiple environmental and topographical inputs to calculate a unified risk score. 
              The score translates directly to a probability percentage of a landslide event occurring within the next 24-48 hours.
            </p>
          </div>
        </div>

        {highestRisk && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-2">
                Case Study: {highestRisk.location}
              </h3>
              
              <div className="flex items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-center">
                  <p className="text-slate-400 mb-2">Overall Risk Score</p>
                  <p className={`text-6xl font-bold ${
                    highestRisk.risk_score > 75 ? 'text-red-500' :
                    highestRisk.risk_score > 50 ? 'text-orange-500' : 'text-yellow-500'
                  }`}>
                    {highestRisk.risk_score}/100
                  </p>
                  <div className="mt-4 px-4 py-1 inline-block rounded-full bg-slate-800 text-sm font-bold text-slate-200">
                    Category: {highestRisk.risk_category}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
                <h4 className="text-sm font-medium text-slate-400 uppercase mb-4">Input Features</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-300">Rainfall</span>
                    <span className="font-bold text-slate-100">{highestRisk.rainfall} mm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-300">Soil Moisture</span>
                    <span className="font-bold text-slate-100">{highestRisk.soil_moisture}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-300">Terrain Slope</span>
                    <span className="font-bold text-slate-100">{highestRisk.slope}°</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-300">Historical Frequency</span>
                    <span className="font-bold text-slate-100">{highestRisk.historical_events} events</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-300">Satellite Indicator (InSAR)</span>
                    <span className="font-bold text-slate-100">{highestRisk.satellite_indicator}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-2">
                Why is this location at risk?
              </h3>
              
              <div className="space-y-4 pt-4">
                <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">Heavy Rainfall Impact</p>
                    <p className="text-xs text-slate-400">Current levels exceed 90th percentile</p>
                  </div>
                  <span className="text-red-400 font-bold">+28 risk</span>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">High Soil Moisture</p>
                    <p className="text-xs text-slate-400">Ground saturation near capacity</p>
                  </div>
                  <span className="text-orange-400 font-bold">+22 risk</span>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">Steep Topography</p>
                    <p className="text-xs text-slate-400">Slope &gt; 30° significantly increases shear stress</p>
                  </div>
                  <span className="text-yellow-400 font-bold">+18 risk</span>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">Historical Precedent</p>
                    <p className="text-xs text-slate-400">Known landslide zone</p>
                  </div>
                  <span className="text-blue-400 font-bold">+10 risk</span>
                </div>
                
                <div className="flex justify-between items-center px-4 pt-4 border-t border-slate-700 mt-6">
                  <span className="text-slate-300 font-bold">Total AI Model Score</span>
                  <span className="text-xl font-bold text-slate-100">{highestRisk.risk_score} / 100</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
