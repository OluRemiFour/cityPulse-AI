import { useEffect, useState } from 'react';
import { Brain, Sparkles, AlertCircle, RefreshCw, TrendingUp } from 'lucide-react';
import { api, type AutoInsight } from '../api/client';

const SEVERITY_COLOR: Record<string, string> = {
  High:   'border-red-500/40 bg-red-500/10',
  Medium: 'border-yellow-500/40 bg-yellow-500/10',
  Low:    'border-green-500/40 bg-green-500/10',
};

export default function AIInsightsPage() {
  const [insights, setInsights]   = useState<AutoInsight[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed]   = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    api.insights.auto()
      .then(r => setInsights(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const runAnalysis = () => {
    setAnalyzing(true);
    api.insights.analyze()
      .then(r => { setAnalyzed(r.processed); load(); })
      .catch(e => setError(e.message))
      .finally(() => setAnalyzing(false));
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black flex items-center gap-2 uppercase tracking-tight">
            <Brain className="w-5 h-5 text-indigo-400" /> AI Insights
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Neural analysis of citizen sentiment and complaints</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white bg-gray-800 border-2 border-slate-800 px-4 py-2.5 rounded-xl transition-all shadow-xl"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-60"
          >
            <Sparkles className={`w-3.5 h-3.5 ${analyzing ? 'animate-pulse' : ''}`} />
            {analyzing ? 'Synthesizing…' : 'Run Synthesis'}
          </button>
        </div>
      </div>

      {analyzed !== null && (
        <div className="bg-indigo-500/10 border-2 border-indigo-500/20 rounded-2xl p-4 text-xs font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-3 backdrop-blur-sm shadow-xl">
          <Sparkles className="w-4 h-4 animate-pulse" /> 
          <div>Processed <span className="text-white">{analyzed}</span> new complaint signals successfully.</div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-24 text-red-400 gap-2 font-bold uppercase tracking-widest text-xs">
          <AlertCircle className="w-5 h-5" /> Error: {error}
        </div>
      ) : insights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-600 gap-4">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center border-2 border-slate-800 outline outline-4 outline-slate-900">
             <Brain className="w-10 h-10 opacity-20" />
          </div>
          <div className="text-center space-y-1">
            <p className="font-black uppercase tracking-widest text-xs">No Insights Generated</p>
            <p className="text-sm font-medium">System idle. Ready for signal processing.</p>
          </div>
          <button
            onClick={runAnalysis}
            className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-all border-b-2 border-indigo-400/20 pb-1"
          >
            Initiate automated analysis →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 p-6 md:p-8 space-y-4 transition-all hover:scale-[1.02] duration-300 shadow-2xl relative overflow-hidden group ${SEVERITY_COLOR[insight.severity ?? ''] ?? 'border-slate-800 bg-gray-900/50'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-sm md:text-md font-bold text-white leading-snug uppercase tracking-tight line-clamp-2">{insight.title}</h3>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500/20 group-hover:bg-indigo-500/40 transition-colors rounded-full"></div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium pl-2">{insight.summary}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/50">
                {insight.severity && (
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shrink-0 border ${
                    insight.severity === 'High'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : insight.severity === 'Medium'
                      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      : 'bg-green-500/10 text-green-400 border-green-500/20'
                  }`}>
                    {insight.severity}
                  </span>
                )}
                {insight.category && (
                  <span className="bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-700">{insight.category}</span>
                )}
                {insight.created_at && (
                  <span className="text-[10px] font-mono text-slate-600 ml-auto">{new Date(insight.created_at).toISOString().split('T')[0]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
