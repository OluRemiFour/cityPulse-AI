export interface Complaint {
  id: string;
  text: string;
  category: 'Road Infrastructure' | 'Waste Management' | 'Traffic Problems' | 'Utilities' | 'Public Safety' | 'Other';
  severity: 'High' | 'Medium' | 'Low';
  location: string;
  lat: number;
  lng: number;
  source: string;
  date: string;
  timestamp: string;
}

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-001',
    text: 'Large potholes on Carter Hill Road causing traffic delays and potential vehicle damage.',
    category: 'Road Infrastructure',
    severity: 'High',
    location: 'Carter Hill Road',
    lat: 32.3668,
    lng: -86.2821,
    source: '311 Mobile App',
    date: '2026-03-05',
    timestamp: '2 hours ago'
  },
  {
    id: 'CMP-002',
    text: 'Trash pickup delayed downtown for the third day in a row. Overflowing bins on Commerce St.',
    category: 'Waste Management',
    severity: 'Medium',
    location: 'Commerce Street',
    lat: 32.3792,
    lng: -86.3077,
    source: 'Web Portal',
    date: '2026-03-05',
    timestamp: '4 hours ago'
  },
  {
    id: 'CMP-003',
    text: 'Heavy traffic near I-85 interchange due to malfunctioning signal light.',
    category: 'Traffic Problems',
    severity: 'High',
    location: 'I-85 & Eastern Blvd',
    lat: 32.3512,
    lng: -86.2345,
    source: 'Twitter/X',
    date: '2026-03-05',
    timestamp: '1 hour ago'
  },
  {
    id: 'CMP-004',
    text: 'Street light out on Woodmere Blvd near the park entrance.',
    category: 'Utilities',
    severity: 'Low',
    location: 'Woodmere Blvd',
    lat: 32.3456,
    lng: -86.2123,
    source: '311 Mobile App',
    date: '2026-03-04',
    timestamp: '1 day ago'
  },
  {
    id: 'CMP-005',
    text: 'Illegal dumping reported in the alleyway behind Perry St.',
    category: 'Waste Management',
    severity: 'Medium',
    location: 'Perry Street',
    lat: 32.3745,
    lng: -86.3012,
    source: 'Phone Call',
    date: '2026-03-05',
    timestamp: '5 hours ago'
  },
  {
    id: 'CMP-006',
    text: 'Suspicious activity reported near the community center.',
    category: 'Public Safety',
    severity: 'Medium',
    location: 'Madison Ave',
    lat: 32.3789,
    lng: -86.2956,
    source: '311 Mobile App',
    date: '2026-03-05',
    timestamp: '30 mins ago'
  }
];

export const TREND_DATA = [
  { name: 'Mon', roads: 45, waste: 32, traffic: 20 },
  { name: 'Tue', roads: 52, waste: 38, traffic: 25 },
  { name: 'Wed', roads: 48, waste: 45, traffic: 30 },
  { name: 'Thu', roads: 61, waste: 42, traffic: 28 },
  { name: 'Fri', roads: 55, waste: 50, traffic: 35 },
  { name: 'Sat', roads: 40, waste: 55, traffic: 22 },
  { name: 'Sun', roads: 38, waste: 48, traffic: 18 },
];

export const STATS = [
  { title: 'Total Complaints Today', value: 327, change: '+12%' },
  { title: 'Road Infrastructure', value: 120, change: '+5%' },
  { title: 'Waste Management', value: 76, change: '+18%' },
  { title: 'Traffic Issues', value: 54, change: '-2%' },
  { title: 'Utilities', value: 42, change: '+1%' },
  { title: 'Public Safety', value: 35, change: '0%' },
];

export const AI_INSIGHTS = [
  { label: 'Top Issue This Week', value: 'Road Infrastructure', icon: 'AlertTriangle' },
  { label: 'Fastest Growing Problem', value: 'Waste Pickup Delays (+18%)', icon: 'TrendingUp' },
  { label: 'Most Affected Area', value: 'East Montgomery', icon: 'MapPin' },
];
