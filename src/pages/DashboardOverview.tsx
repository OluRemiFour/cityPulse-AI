import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Lightbulb,
  ArrowUpRight,
  Activity,
  Layers
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { STATS, TREND_DATA, MOCK_COMPLAINTS, AI_INSIGHTS } from '../data/mockData';
import { HotspotMap } from '../components/HotspotMap';
import { cn } from '../utils/cn';
import { motion } from 'motion/react';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header Section - Recipe 11 inspired bold layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live System Status</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">City Intelligence</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-md leading-relaxed">
            Real-time civic analytics engine processing public complaints and infrastructure data for Montgomery City.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
            System Online
          </div>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2">
            Generate Report <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid - Recipe 1 inspired technical look */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {STATS.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 hover:bg-slate-50 transition-colors group"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{stat.title}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl font-mono font-medium text-slate-900 tracking-tighter">{stat.value}</h3>
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5",
                stat.change.startsWith('+') ? "text-success" : 
                stat.change === '0%' ? "text-slate-400" : "text-danger"
              )}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trend Chart - Recipe 1 inspired data grid */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Complaint Velocity</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">7-Day Rolling Average</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider">Export Data</button>
            </div>
          </div>
          <div className="p-8 h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorRoads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="roads" 
                  name="Road Infrastructure"
                  stroke="#1E3A8A" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRoads)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="waste" 
                  name="Waste Management"
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Panels */}
        <div className="lg:col-span-4 space-y-8">
          {/* AI Insights - Recipe 3 inspired hardware look */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight">AI Intelligence</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Predictive Engine</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              
              <div className="space-y-8">
                {AI_INSIGHTS.map((insight, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{insight.label}</p>
                      <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{insight.value}</p>
                    <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: idx === 0 ? '85%' : idx === 1 ? '65%' : '45%' }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>

          {/* Recent Activity - Recipe 1 inspired grid */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Recent Activity</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Feed</span>
            </div>
            <div className="divide-y divide-slate-100">
              {MOCK_COMPLAINTS.slice(0, 4).map((complaint) => (
                <div key={complaint.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                      complaint.severity === 'High' ? "bg-danger shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                      complaint.severity === 'Medium' ? "bg-warning" : "bg-success"
                    )}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400">{complaint.id}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{complaint.timestamp}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                        {complaint.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3" /> {complaint.location}
                        </p>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{complaint.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:text-primary transition-all border-t border-slate-100">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Map Section - Full bleed feel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Geospatial Distribution</h3>
            <p className="text-xs text-slate-500 mt-1">AI-mapped complaint density and high-priority zones.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <Layers className="w-3 h-3" />
              Heatmap Overlay
            </div>
          </div>
        </div>
        <div className="h-[600px] w-full relative">
          <HotspotMap />
          {/* Overlay Stats on Map */}
          <div className="absolute top-6 right-6 z-10 space-y-3">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl max-w-[200px]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Hotspots</p>
              <p className="text-2xl font-mono font-medium text-slate-900">12</p>
              <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-danger w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
