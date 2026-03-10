import { useEffect, useState } from 'react';
import {
  Settings, Database, RefreshCw, CheckCircle,
  XCircle, Clock, Play, AlertCircle, ExternalLink,
} from 'lucide-react';
import { api, type ScrapeJob } from '../api/client';
import { cn } from '../utils/cn';

const STATUS_STYLE: Record<string, string> = {
  completed: 'text-green-400',
  running:   'text-yellow-400',
  pending:   'text-blue-400',
  failed:    'text-red-400',
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  completed: <CheckCircle className="w-4 h-4 text-green-400" />,
  running:   <RefreshCw   className="w-4 h-4 text-yellow-400 animate-spin" />,
  pending:   <Clock       className="w-4 h-4 text-blue-400" />,
  failed:    <XCircle     className="w-4 h-4 text-red-400" />,
};

export default function SettingsPage() {
  const [jobs, setJobs]         = useState<ScrapeJob[]>([]);
  const [scraping, setScraping] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [message, setMessage]   = useState<{ text: string; type: 'ok' | 'err' } | null>(null);

  const loadJobs = () => {
    setJobsLoading(true);
    api.scrape.jobs()
      .then(r => setJobs(r.data))
      .catch(() => {})
      .finally(() => setJobsLoading(false));
  };

  useEffect(() => { loadJobs(); }, []);

  const triggerScrape = async () => {
    setScraping(true);
    setMessage(null);
    try {
      await api.scrape.trigger();
      setMessage({ text: 'Scrape started! Check the audit log below for progress.', type: 'ok' });
      // Refresh jobs after a short delay
      setTimeout(loadJobs, 2000);
    } catch {
      setMessage({ text: 'Failed to trigger scrape. Check your Bright Data API key.', type: 'err' });
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-black flex items-center gap-2 uppercase tracking-tight">
          <Settings className="w-5 h-5 text-indigo-400" /> Settings & Data Control
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-medium">Configure network parameters and data acquisition protocols</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Data Sources */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 md:p-6 space-y-5 shadow-xl">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" /> Active Data Channels
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Montgomery 311 Open Data', desc: 'Official city service requests', status: 'Active' },
                { name: 'Bright Data Web Scraper', desc: 'Social (Reddit) + City Portals', status: 'Configured' },
                { name: 'Google Gemini AI', desc: 'Neural analysis & synthesis', status: 'Active' }
              ].map((src, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 group hover:border-indigo-500/30 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{src.name}</p>
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5 truncate uppercase tracking-wider">{src.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">{src.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrape Controls */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 md:p-6 space-y-5 shadow-xl">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-indigo-400" /> Intelligence Acquisition
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                Initiate a deep horizontal scan of public digital spaces. This protocol aggregates sentiment from local forums and official bulletins.
              </p>

              {message && (
                <div className={`flex items-center gap-3 p-4 rounded-xl text-xs font-bold uppercase tracking-widest border-2 backdrop-blur-sm ${
                  message.type === 'ok'
                    ? 'bg-green-500/5 border-green-500/20 text-green-400'
                    : 'bg-red-500/5 border-red-500/20 text-red-400'
                }`}>
                  {message.type === 'ok' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {message.text}
                </div>
              )}

              <button
                onClick={triggerScrape}
                disabled={scraping}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
              >
                <Play className={`w-4 h-4 ${scraping ? 'animate-pulse' : ''}`} />
                {scraping ? 'Scan in progress' : 'Initiate Full Scan'}
              </button>
            </div>
          </div>
        </div>

        {/* Scrape Audit Log */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-5 md:p-6 space-y-5 shadow-xl flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
              acquisition history <span className="opacity-40 font-normal">(audit log)</span>
            </h2>
            <button
              onClick={loadJobs}
              className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${jobsLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>

          <div className="flex-1 bg-gray-900/50 rounded-2xl border border-gray-700/50 overflow-hidden min-h-[300px]">
            {jobsLoading && jobs.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-3 px-6 text-center">
                <Database className="w-8 h-8 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-loose">No acquisition telemetry found.<br/>Start a scan to generate log data.</p>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-hide h-full">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-gray-900 border-b border-gray-700">
                    <tr>
                      {['Source', 'Status', 'Records', 'Timestamp'].map(h => (
                        <th key={h} className="py-3 px-4 text-[9px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {jobs.map((job, i) => (
                      <tr key={i} className="hover:bg-indigo-500/5 transition-colors">
                        <td className="py-3 px-4 text-[10px] font-bold text-gray-300 truncate max-w-[80px]">{job.source}</td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                            STATUS_STYLE[job.status] ?? 'text-gray-400'
                          )}>
                            <div className={cn("w-1 h-1 rounded-full", (STATUS_STYLE[job.status] ?? 'text-gray-400').replace('text-', 'bg-'))}></div>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[10px] font-mono text-gray-400">{job.records_scraped ?? 0}</td>
                        <td className="py-3 px-4 text-[9px] font-mono text-gray-500 whitespace-nowrap">
                          {new Date(job.started_at).toISOString().split('T')[1].slice(0, 5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 pt-2">
            <ExternalLink className="w-3 h-3 text-indigo-500/50" />
            Endpoint Reference: <code className="text-indigo-400/70 border border-indigo-400/20 px-1.5 py-0.5 rounded">/api/scrape/jobs</code>
          </div>
        </div>
      </div>
    </div>
  );
}
