// ============================================================
// api/client.ts
// Typed API client — wraps all backend endpoints
// ============================================================

const BASE = '/api';

// ── Types ────────────────────────────────────────────────────

export interface Complaint {
  id: string;
  complaint_id?: string;
  category: string;
  description: string;
  address?: string;
  neighborhood?: string;
  status: string;
  open_date: string;
  close_date?: string | null;
  severity?: 'High' | 'Medium' | 'Low' | null;
  sentiment?: string | null;
  ai_summary?: string | null;
  source?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface MapPin {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
  severity?: string | null;
  description?: string;
  neighborhood?: string;
}

export interface StatsByCategory {
  category: string;
  total: number;
  analyzed: number;
  high: number;
  medium: number;
  low: number;
}

export interface Hotspot {
  neighborhood: string;
  total: number;
  high: number;
  latitude?: number;
  longitude?: number;
}

export interface TrendPoint {
  day: string;
  name: string;
  [category: string]: string | number;
}

export interface StatCard {
  title: string;
  value: number;
  change: string;
}

export interface AiInsight {
  label: string;
  value: string;
  icon: string;
}

export interface StatsResponse {
  totalComplaints: number;
  totalAnalyzed: number;
  totalHigh: number;
  totalThisWeek: number;
  weeklyChange: number;
  statCards: StatCard[];
  byCategory: StatsByCategory[];
  trendChart: TrendPoint[];
  hotspots: Hotspot[];
  aiInsights: AiInsight[];
  recentSeverity: { high: number; medium: number; low: number };
}

export interface ComplaintsListResponse {
  data: Complaint[];
  total: number;
  page: number;
  limit: number;
}

export interface MapPinsResponse {
  data: MapPin[];
}

export interface InsightResponse {
  answer: string;
}

export interface AutoInsight {
  title: string;
  summary: string;
  category?: string;
  severity?: string;
  created_at?: string;
}

export interface AutoInsightsResponse {
  data: AutoInsight[];
}

export interface ScrapeJob {
  id: string;
  source: string;
  status: string;
  started_at: string;
  finished_at?: string | null;
  records_scraped?: number;
  error?: string | null;
}

export interface ScrapeJobsResponse {
  data: ScrapeJob[];
}

// ── Helpers ──────────────────────────────────────────────────

async function get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

// ── API ──────────────────────────────────────────────────────

export const api = {
  stats: {
    get: () => get<StatsResponse>('/stats'),
  },

  complaints: {
    list: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      severity?: string;
      search?: string;
    }) => get<ComplaintsListResponse>('/complaints', params as Record<string, string | number | undefined>),

    map: () => get<MapPinsResponse>('/complaints/map'),

    getById: (id: string) => get<Complaint>(`/complaints/${id}`),
  },

  insights: {
    ask: (question: string) => post<InsightResponse>('/insights', { question }),
    auto: () => get<AutoInsightsResponse>('/insights/auto'),
    analyze: () => post<{ processed: number }>('/insights/analyze'),
  },

  scrape: {
    trigger: () => post<{ job_id: string }>('/scrape'),
    jobs: () => get<ScrapeJobsResponse>('/scrape/jobs'),
  },
};
