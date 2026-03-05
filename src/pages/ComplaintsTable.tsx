import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  MapPin, 
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Database
} from 'lucide-react';
import { MOCK_COMPLAINTS, Complaint } from '../data/mockData';
import { cn } from '../utils/cn';
import { motion } from 'motion/react';
import { Modal } from '../components/Modal';

export const ComplaintsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filteredComplaints = MOCK_COMPLAINTS.filter(c => {
    const matchesSearch = c.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesSeverity = severityFilter === 'All' || c.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const categories = ['All', 'Road Infrastructure', 'Waste Management', 'Traffic Problems', 'Utilities', 'Public Safety'];
  const severities = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Complaints Database</h1>
          <p className="text-slate-500 mt-1 text-sm">Systematic record of all civic issues analyzed by CityPulse AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Add Manual Entry
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by text or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filters</span>
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select 
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {severities.map(sev => <option key={sev} value={sev}>{sev}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complaint Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((complaint, idx) => (
                <motion.tr 
                  key={complaint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => setSelectedComplaint(complaint)}
                  className="hover:bg-slate-50 transition-all group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-medium text-slate-500">{complaint.id}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{complaint.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                        <Database className="w-3 h-3" /> {complaint.source}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{complaint.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border",
                      complaint.severity === 'High' ? "bg-danger/5 text-danger border-danger/20" :
                      complaint.severity === 'Medium' ? "bg-warning/5 text-warning border-warning/20" : 
                      "bg-success/5 text-success border-success/20"
                    )}>
                      {complaint.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {complaint.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {complaint.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComplaint(complaint);
                        }}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-slate-500 font-medium">No complaints found matching your filters.</p>
                      <button 
                        onClick={() => {setSearchTerm(''); setCategoryFilter('All'); setSeverityFilter('All');}}
                        className="text-primary text-sm font-bold mt-2"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredComplaints.length}</span> of <span className="font-bold text-slate-900">{MOCK_COMPLAINTS.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 bg-primary text-white text-xs font-bold rounded-lg">1</button>
              <button className="w-8 h-8 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors">2</button>
              <button className="w-8 h-8 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors">3</button>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title="Complaint Details"
        className="max-w-2xl"
      >
        {selectedComplaint && (
          <div className="space-y-8">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{selectedComplaint.id}</span>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                    selectedComplaint.severity === 'High' ? "bg-danger/5 text-danger border-danger/20" :
                    selectedComplaint.severity === 'Medium' ? "bg-warning/5 text-warning border-warning/20" : 
                    "bg-success/5 text-success border-success/20"
                  )}>
                    {selectedComplaint.severity} Severity
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">{selectedComplaint.location}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/20">Analyzed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Info className="w-3 h-3" /> Category
                </p>
                <p className="text-sm font-semibold text-slate-700">{selectedComplaint.category}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Reported
                </p>
                <p className="text-sm font-semibold text-slate-700">{selectedComplaint.date} ({selectedComplaint.timestamp})</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Database className="w-3 h-3" /> Source
                </p>
                <p className="text-sm font-semibold text-slate-700">{selectedComplaint.source}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Coordinates
                </p>
                <p className="text-sm font-mono text-slate-700">{selectedComplaint.lat.toFixed(4)}, {selectedComplaint.lng.toFixed(4)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Description</p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed italic font-serif text-lg">
                  "{selectedComplaint.text}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Assign to Department
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
                Mark as Resolved
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
