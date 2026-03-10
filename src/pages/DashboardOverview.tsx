import { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { AlertTriangle, TrendingUp, MapPin, Activity, CheckCircle, AlertCircle, ArrowUpRight, Zap, Shield, Clock } from 'lucide-react';
import { api, type StatsResponse } from '../api/client';

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

const ICON_MAP: Record<string, React.ReactNode> = {
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  TrendingUp:    <TrendingUp    className="w-5 h-5" />,
  MapPin:        <MapPin        className="w-5 h-5" />,
};

export default function DashboardOverview() {
  const [stats, setStats]   = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    api.stats.get()
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400">
        <AlertCircle className="mr-2 w-5 h-5" /> Failed to load dashboard data.
      </div>
    );
  }

  // Determine all category keys present in trend chart
  const categoryKeys = stats.byCategory.map(c => c.category);

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total complaints */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Total Complaints</p>
          <div className="flex items-baseline justify-between lg:block">
            <p className="text-2xl font-bold text-white">{stats.totalComplaints.toLocaleString()}</p>
            <p className={`text-xs mt-1 ${stats.weeklyChange >= 0 ? 'text-red-400' : 'text-green-400'}`}>
              {stats.weeklyChange >= 0 ? `+${stats.weeklyChange}%` : `${stats.weeklyChange}%`} this week
            </p>
          </div>
        </div>

        {/* Total analyzed */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">AI Analyzed</p>
          <div className="flex items-baseline justify-between lg:block">
            <p className="text-2xl font-bold text-white">{stats.totalAnalyzed.toLocaleString()}</p>
            <p className="text-xs mt-1 text-indigo-400">
              {stats.totalComplaints > 0
                ? `${Math.round((stats.totalAnalyzed / stats.totalComplaints) * 100)}% coverage`
                : '0% coverage'}
            </p>
          </div>
        </div>

        {/* High severity */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">High Severity</p>
          <div className="flex items-baseline justify-between lg:block">
            <p className="text-2xl font-bold text-red-400">{stats.totalHigh.toLocaleString()}</p>
            <p className="text-xs mt-1 text-gray-400">Require urgent action</p>
          </div>
        </div>

        {/* This week */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">This Week</p>
          <div className="flex items-baseline justify-between lg:block">
            <p className="text-2xl font-bold text-white">{stats.totalThisWeek.toLocaleString()}</p>
            <p className="text-xs mt-1 flex gap-2">
              <span className="text-red-400">{stats.recentSeverity.high}H</span>
              <span className="text-yellow-400">{stats.recentSeverity.medium}M</span>
              <span className="text-green-400">{stats.recentSeverity.low}L</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Trend Chart ────────────────────────────────────── */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" /> Complaint Trends
        </h2>
        {stats.trendChart.length > 0 ? (
          <div className="h-[200px] sm:h-[240px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trendChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {categoryKeys.map(cat => (
                    <linearGradient key={cat} id={`grad-${cat}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={CATEGORY_COLORS[cat] ?? '#94a3b8'} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={CATEGORY_COLORS[cat] ?? '#94a3b8'} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                  labelStyle={{ color: '#f9fafb' }}
                />
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                {categoryKeys.map(cat => (
                  <Area
                    key={cat}
                    type="monotone"
                    dataKey={cat}
                    stroke={CATEGORY_COLORS[cat] ?? '#94a3b8'}
                    fill={`url(#grad-${cat})`}
                    strokeWidth={2}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-10">No trend data available yet.</p>
        )}
      </div>

      {/* ── Bottom Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* AI Insights */}
        <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
          <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> AI Insights
          </h2>
          <div className="space-y-3">
            {stats.aiInsights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50">
                <span className="text-indigo-400 mt-0.5">{ICON_MAP[insight.icon] ?? <Activity className="w-5 h-5" />}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 truncate">{insight.label}</p>
                  <p className="text-sm font-medium text-white mt-0.5 truncate">{insight.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hotspots */}
        <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
          <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-400" /> Top Hotspots
          </h2>
          {stats.hotspots.length > 0 ? (
            <div className="space-y-2">
              {stats.hotspots.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-200 truncate">{h.neighborhood}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-sm font-semibold text-white">{h.total}</span>
                    <span className="text-xs text-red-400 ml-1.5 hidden sm:inline">({h.high} high)</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-6">No hotspot data yet.</p>
          )}
        </div>
      </div>

      {/* ── Category Breakdown ─────────────────────────────── */}
      <div className="bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Complaints by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {stats.byCategory.map((cat, i) => {
            const pct = cat.total > 0 ? Math.round((cat.high / cat.total) * 100) : 0;
            const color = CATEGORY_COLORS[cat.category] ?? '#94a3b8';
            return (
              <div key={i} className="p-3 rounded-lg bg-gray-700/50 border border-gray-600/50">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <p className="text-xs text-gray-300 truncate">{cat.category}</p>
                </div>
                <p className="text-lg font-bold text-white">{Number(cat.total).toLocaleString()}</p>
                <div className="mt-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{pct}% high severity</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
