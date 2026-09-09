import React from 'react';
import { Workflow, Database, Cpu, Globe, Map as MapIcon, Bell, Users, ArrowDown } from 'lucide-react';

export default function DataPipeline() {
  const Node = ({ icon: Icon, label, color }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-700 bg-slate-800 w-40 text-center shadow-lg ${color}`}>
      <Icon size={32} className="mb-2" />
      <span className="font-semibold text-sm">{label}</span>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Workflow className="text-blue-500" />
          Data Sources & Processing Pipeline
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 shadow-lg flex flex-col items-center">
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 w-full">
          <Node icon={Database} label="Rainfall Data" color="text-blue-400" />
          <Node icon={Database} label="Soil Moisture" color="text-emerald-400" />
          <Node icon={Globe} label="Satellite (InSAR)" color="text-purple-400" />
          <Node icon={MapIcon} label="DEM / Terrain" color="text-yellow-400" />
          <Node icon={Cpu} label="IoT Sensors" color="text-orange-400" />
        </div>

        <ArrowDown className="text-slate-600 mb-8" size={32} />

        <div className="w-full max-w-2xl bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl text-center mb-8">
          <h3 className="font-bold text-blue-400 text-xl mb-2">Random Forest AI Model</h3>
          <p className="text-slate-300 text-sm">Feature Engineering & Probability Calculation</p>
        </div>

        <ArrowDown className="text-slate-600 mb-8" size={32} />

        <div className="flex justify-center gap-8 mb-8 w-full">
          <Node icon={MapIcon} label="GIS Risk Map" color="text-emerald-500" />
          <Node icon={Bell} label="Early Warning" color="text-red-500" />
        </div>

        <ArrowDown className="text-slate-600 mb-8" size={32} />

        <Node icon={Users} label="Authorities & Communities" color="text-slate-200" />

      </div>
    </div>
  );
}
