import { useEffect, useState, useRef } from 'react';
import { AlertCircle, MapPin, Layers } from 'lucide-react';
import { api, type MapPin as Pin } from '../api/client';
import { cn } from '../utils/cn';

// Uses Leaflet via CDN — make sure index.html includes:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

declare const L: any; // Leaflet global

const SEVERITY_COLORS: Record<string, string> = {
  High:   '#ef4444',
  Medium: '#f59e0b',
  Low:    '#22c55e',
  null:   '#6366f1',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Road Infrastructure':  '#6366f1',
  'Waste Management':     '#22c55e',
  'Water & Sewage':       '#3b82f6',
  'Street Lighting':      '#f59e0b',
  'Parks & Recreation':   '#ec4899',
  'Public Safety':        '#ef4444',
  'Noise Complaints':     '#8b5cf6',
  'Other':                '#94a3b8',
};

type ColorMode = 'severity' | 'category';

export default function HotspotMap() {
  const mapRef    = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null); // State for map instance
  const markersRef = useRef<any[]>([]);

  const [pins, setPins]       = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [colorMode, setColorMode] = useState<ColorMode>('severity');
  const [filter, setFilter]   = useState<string>('All');

  // Load pin data
  useEffect(() => {
    api.complaints.map()
      .then(r => setPins(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Init map
  useEffect(() => {
    if (!mapRef.current || map) return;
    // Wait for Leaflet to be available
    const init = () => {
      if (typeof L === 'undefined') { setTimeout(init, 200); return; }
      const instance = L.map(mapRef.current, {
        center:  [32.3617, -86.2792], // Montgomery, AL
        zoom:    12,
        zoomControl: true,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(instance);
      setMap(instance);
    };
    init();
    return () => { 
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, []);

  // Draw markers whenever pins / colorMode / filter change
  useEffect(() => {
    if (!map || typeof L === 'undefined') return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const visible = filter === 'All'
      ? pins
      : pins.filter(p => colorMode === 'severity' ? p.severity === filter : p.category === filter);

    for (const pin of visible) {
      if (!pin.latitude || !pin.longitude) {
        console.warn(`[HotspotMap] Pin ${pin.id} missing coords:`, pin);
        continue;
      }
      
      const color = colorMode === 'severity'
        ? (SEVERITY_COLORS[pin.severity ?? 'null'] ?? '#6366f1')
        : (CATEGORY_COLORS[pin.category] ?? '#94a3b8');

      const marker = L.circleMarker([pin.latitude, pin.longitude], {
        radius: 6,
        fillColor: color,
        color: '#fff',
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 0.7,
      })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:sans-serif;min-width:160px">
          <b style="font-size:13px">${pin.category}</b><br/>
          ${pin.neighborhood ? `<span style="color:#9ca3af;font-size:11px">${pin.neighborhood}</span><br/>` : ''}
          ${pin.severity ? `<span style="color:${color};font-size:11px;font-weight:600">${pin.severity} severity</span><br/>` : ''}
          ${pin.description ? `<p style="font-size:11px;margin-top:4px;color:#d1d5db">${pin.description.slice(0, 100)}…</p>` : ''}
        </div>
      `);

      markersRef.current.push(marker);
    }
  }, [map, pins, colorMode, filter]);

  // Build filter options
  const severities = ['All', 'High', 'Medium', 'Low'];
  const categories = ['All', ...Array.from(new Set(pins.map(p => p.category))).sort()];
  const filterOptions = colorMode === 'severity' ? severities : categories;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black flex items-center gap-2 uppercase tracking-tight">
            <MapPin className="w-5 h-5 text-red-500" /> Geospatial Intelligence
          </h1>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mt-1">
             Active Nodes: <span className="text-indigo-400">{pins.filter(p => p.latitude && p.longitude).length.toLocaleString()}</span> compliant signals mapped
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-900/50 border-2 border-slate-800 rounded-xl p-1 shadow-xl">
            {(['severity', 'category'] as ColorMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setColorMode(m); setFilter('All'); }}
                className={`flex-1 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  colorMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                {m === 'severity' ? 'Severity' : 'Category'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-900/50 border-2 border-slate-800 rounded-xl px-4 py-2 shadow-xl group hover:border-indigo-500/30 transition-colors">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-300 outline-none w-full cursor-pointer"
            >
              {filterOptions.map(o => <option key={o} className="bg-slate-900 border-none">{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-slate-900 h-[400px] sm:h-[500px] md:h-[600px]">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initializing Neural Grid...</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80 text-red-400 gap-2 p-6 text-center">
            <AlertCircle className="w-5 h-5 shrink-0" /> 
            <span className="text-xs font-bold uppercase tracking-widest">Grid Error: {error}</span>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full z-0" />
      </div>

      {/* Legend */}
      <div className="bg-gray-800/30 border-2 border-slate-800/50 rounded-2xl p-5 backdrop-blur-sm">
         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Color Spectrum Legend</p>
         <div className="flex flex-wrap gap-x-6 gap-y-3">
          {colorMode === 'severity'
            ? Object.entries(SEVERITY_COLORS).filter(([k]) => k !== 'null').map(([label, color]) => (
                <div key={label} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.3)] shadow-current" style={{ background: color, color }} />
                  {label}
                </div>
              ))
            : Object.entries(CATEGORY_COLORS).map(([label, color]) => (
                <div key={label} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.3)] shadow-current" style={{ background: color, color }} />
                  {label}
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
