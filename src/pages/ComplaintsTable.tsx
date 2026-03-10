import { useEffect, useState, useCallback } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, MessageSquare, Calendar, MapPin, X, ExternalLink } from 'lucide-react';
import { api, type Complaint } from '../api/client';
import { cn } from '../utils/cn';

const SEVERITY_COLOR: Record<string, string> = {
  High:   'bg-red-500/20 text-red-400 border border-red-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Low:    'bg-green-500/20 text-green-400 border border-green-500/30',
};

const STATUS_COLOR: Record<string, string> = {
  Open:       'bg-blue-500/20 text-blue-400',
  Closed:     'bg-gray-500/20 text-gray-400',
  'In Progress': 'bg-purple-500/20 text-purple-400',
};

const CATEGORIES = [
  'All Categories',
  'Road Infrastructure',
  'Waste Management',
  'Water & Sewage',
  'Street Lighting',
  'Parks & Recreation',
  'Public Safety',
  'Noise Complaints',
  'Other',
];

const SEVERITIES = ['All Severities', 'High', 'Medium', 'Low'];

export default function ComplaintsTable() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [limit]                     = useState(20);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const [search, setSearch]         = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory]     = useState('');
  const [severity, setSeverity]     = useState('');

  const [selected, setSelected]     = useState<Complaint | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    api.complaints.list({
      page,
      limit,
      ...(search   ? { search }   : {}),
      ...(category ? { category } : {}),
      ...(severity ? { severity } : {}),
    })
      .then(r => { setComplaints(r.data); setTotal(r.total); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, limit, search, category, severity]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-black tracking-tight">Complaints</h1>
          <p className="text-sm text-gray-400 font-medium">{total.toLocaleString()} total records</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-all self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Feed
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <form
          onSubmit={e => { e.preventDefault(); setPage(1); setSearch(searchInput); }}
          className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 flex-1 shadow-inner shadow-black/20"
        >
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search diagnostics…"
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
          />
        </form>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 flex-1 sm:flex-none">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={category}
              onChange={e => { setPage(1); setCategory(e.target.value === 'All Categories' ? '' : e.target.value); }}
              className="bg-transparent text-sm text-white outline-none w-full sm:w-auto"
            >
              {CATEGORIES.map(c => <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>)}
            </select>
          </div>

          {/* Severity */}
          <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 flex-1 sm:flex-none">
            <AlertCircle className="w-4 h-4 text-gray-400" />
            <select
              value={severity}
              onChange={e => { setPage(1); setSeverity(e.target.value === 'All Severities' ? '' : e.target.value); }}
              className="bg-transparent text-sm text-white outline-none w-full sm:w-auto"
            >
              {SEVERITIES.map(s => <option key={s} value={s === 'All Severities' ? '' : s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
        {loading && complaints.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-24 text-red-400 gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  {['ID', 'Category', 'Description', 'Neighborhood', 'Status', 'Severity', 'Date'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-500 font-medium italic">No signal detected matching criteria.</td>
                  </tr>
                ) : complaints.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="hover:bg-gray-700/30 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 text-gray-500 font-mono text-[10px]">
                      {(c.complaint_id ?? c.id).slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-indigo-400 font-bold text-xs uppercase tracking-tighter">{c.category}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 max-w-[200px] md:max-w-xs">
                      <p className="truncate text-xs font-medium">
                        {c.ai_summary ?? c.description ?? '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">{c.neighborhood ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${STATUS_COLOR[c.status] ?? 'bg-gray-700 text-gray-400'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.severity ? (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${SEVERITY_COLOR[c.severity] ?? ''}`}>
                          {c.severity}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-[10px] font-mono whitespace-nowrap">
                      {new Date(c.open_date).toISOString().split('T')[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
          <p>Sequence {page} <span className="text-gray-700">/</span> {totalPages}</p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:bg-gray-700 transition-all shadow-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-xl bg-gray-800 border border-gray-700 disabled:opacity-20 hover:bg-gray-700 transition-all shadow-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-auto space-y-6 shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelected(null)} 
              className="absolute right-6 top-6 p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4 rotate-45" /> 
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Complaint Data Archive</span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">{selected.category}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {selected.severity && (
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${SEVERITY_COLOR[selected.severity]}`}>
                  {selected.severity} SEVERITY
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-800 text-slate-400 border-2 border-slate-700`}>
                STATUS: {selected.status}
              </span>
            </div>

            {selected.ai_summary && (
              <div className="bg-indigo-500/5 border-2 border-indigo-500/10 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                  Neural Synthesis
                </p>
                <p className="text-sm md:text-md text-gray-200 leading-relaxed font-medium italic">"{selected.ai_summary}"</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <ModalRow label="ID" value={selected.complaint_id ?? selected.id} mono />
              <ModalRow label="Neighborhood" value={selected.neighborhood} />
              <ModalRow label="Location" value={selected.address} />
              <ModalRow label="Timestamp" value={new Date(selected.open_date).toLocaleString()} mono />
              <div className="sm:col-span-2">
                 <ModalRow label="Full Report" value={selected.description} />
              </div>
              <ModalRow label="Protocol" value={selected.source} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalRow({ label, value, mono }: { label: string; value?: string | null, mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className={cn(
        "text-sm font-medium text-slate-200 leading-snug",
        mono && "font-mono text-xs text-indigo-300"
      )}>{value}</p>
    </div>
  );
}
