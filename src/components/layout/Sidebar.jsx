import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Activity, 
  BrainCircuit, 
  TableProperties, 
  BellRing, 
  ShieldAlert, 
  History, 
  Workflow, 
  PlayCircle 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/map', icon: Map, label: 'Risk Map' },
  { path: '/monitoring', icon: Activity, label: 'Environmental Monitoring' },
  { path: '/prediction', icon: BrainCircuit, label: 'AI Prediction' },
  { path: '/analysis', icon: TableProperties, label: 'Risk Analysis' },
  { path: '/alerts', icon: BellRing, label: 'Alerts' },
  { path: '/authority', icon: ShieldAlert, label: 'Authority Response' },
  { path: '/historical', icon: History, label: 'Historical Data' },
  { path: '/pipeline', icon: Workflow, label: 'Data Pipeline' },
  { path: '/simulation', icon: PlayCircle, label: 'Simulation' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed top-0 left-0">
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="text-blue-500" />
          Apexx
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">SIH26001 Prototype</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600/20 text-blue-400 font-medium' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        Prototype Demo Mode
      </div>
    </div>
  );
}
