import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_COMPLAINTS } from '../data/mockData';
import { cn } from '../utils/cn';

// Standard Leaflet icon fix for React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const getMarkerColor = (severity: string) => {
  switch (severity) {
    case 'High': return '#EF4444';
    case 'Medium': return '#F59E0B';
    case 'Low': return '#22C55E';
    default: return '#3B82F6';
  }
};

const createCustomIcon = (severity: string) => {
  const color = getMarkerColor(severity);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.2);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

export const HotspotMap: React.FC = () => {
  const montgomeryCenter: [number, number] = [32.3668, -86.3000];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
      <MapContainer 
        center={montgomeryCenter} 
        zoom={12} 
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {MOCK_COMPLAINTS.map((complaint) => (
          <Marker 
            key={complaint.id} 
            position={[complaint.lat, complaint.lng]}
            icon={createCustomIcon(complaint.severity)}
          >
            <Popup className="rounded-xl overflow-hidden">
              <div className="p-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                    complaint.severity === 'High' ? "bg-danger/10 text-danger" :
                    complaint.severity === 'Medium' ? "bg-warning/10 text-warning" :
                    "bg-success/10 text-success"
                  )}>
                    {complaint.severity} Severity
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{complaint.location}</h4>
                <p className="text-xs text-slate-500 font-medium mb-2">{complaint.category}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{complaint.text}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-lg text-[10px] space-y-2">
        <p className="font-bold text-slate-900 uppercase tracking-wider mb-2">Severity Legend</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger"></div>
          <span className="text-slate-600">High Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span className="text-slate-600">Medium Severity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-slate-600">Low Severity</span>
        </div>
      </div>
    </div>
  );
};
