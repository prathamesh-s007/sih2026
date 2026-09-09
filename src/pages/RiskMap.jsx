import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useSimulationStore from '../store/useSimulationStore';
import L from 'leaflet';
import { ShieldAlert, CheckCircle } from 'lucide-react';

// Fix Leaflet's default icon paths in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getRiskColor = (category) => {
  switch (category) {
    case 'LOW': return '#10b981'; // emerald-500
    case 'MODERATE': return '#eab308'; // yellow-500
    case 'HIGH': return '#f97316'; // orange-500
    case 'CRITICAL': return '#ef4444'; // red-500
    default: return '#3b82f6';
  }
};

export default function RiskMap() {
  const { locations } = useSimulationStore();
  const [toast, setToast] = useState(null);
  
  // Center roughly on NER
  const center = [25.5, 92.5];

  const handleTakeAction = (loc) => {
    setToast(`Emergency response dispatched to ${loc.location} district.`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-slate-100">Interactive GIS Risk Map</h1>
        <div className="flex gap-4 items-center text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Low</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderate</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> High</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Critical</div>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-800 shadow-xl relative z-0">
        {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
            <CheckCircle size={18} />
            {toast}
          </div>
        )}
        <MapContainer center={center} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {locations.map((loc) => (
            <CircleMarker
              key={loc.id}
              center={[loc.latitude, loc.longitude]}
              radius={8}
              pathOptions={{ 
                fillColor: getRiskColor(loc.risk_category), 
                color: '#1e293b', 
                weight: 2,
                fillOpacity: 0.9,
                className: loc.risk_category === 'CRITICAL' ? 'marker-critical' : ''
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-lg border-b pb-1 mb-2">{loc.location}</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>District:</strong> {loc.district}</p>
                    <p><strong>Risk Score:</strong> {loc.risk_score}/100</p>
                    <p>
                      <strong>Category:</strong> 
                      <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold text-white" style={{backgroundColor: getRiskColor(loc.risk_category)}}>
                        {loc.risk_category}
                      </span>
                    </p>
                    <p><strong>Probability:</strong> {(loc.landslide_probability * 100).toFixed(0)}%</p>
                    <p><strong>Rainfall:</strong> {loc.rainfall} mm</p>
                    <p><strong>Soil Moisture:</strong> {loc.soil_moisture}%</p>
                    <p><strong>Slope:</strong> {loc.slope}°</p>
                    <p><strong>Sensor Status:</strong> {loc.sensor_status}</p>
                  </div>
                  {(loc.risk_category === 'HIGH' || loc.risk_category === 'CRITICAL') && (
                    <button 
                      onClick={() => handleTakeAction(loc)}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-colors"
                    >
                      <ShieldAlert size={14} />
                      Take Immediate Action
                    </button>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
