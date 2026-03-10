import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      title: "Real-time Scraping",
      description: "Autonomous agents monitor public web sources, social media, and official portals 24/7.",
      icon: Zap,
      color: "bg-amber-500"
    },
    {
      title: "Neural Categorization",
      description: "Advanced LLMs categorize complaints by severity and location with human-level precision.",
      icon: Brain,
      color: "bg-indigo-500"
    },
    {
      title: "Civic Intelligence",
      description: "Convert raw noise into actionable intelligence for city planning and resource allocation.",
      icon: BarChart3,
      color: "bg-emerald-500"
    }
  ];

  const topIssues = [
    { name: "Road Infrastructure", count: 120, trend: "up" },
    { name: "Waste Management", count: 76, trend: "up" },
    { name: "Traffic Problems", count: 54, trend: "up" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 md:py-8 flex items-center justify-between border-b border-slate-100 relative z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BarChart3 className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-black text-xl md:text-2xl tracking-tighter text-slate-900">CITYPULSE<span className="text-primary">.AI</span></span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <a href="#features" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Platform</a>
          <a href="#data" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Intelligence</a>
          <Link to="/dashboard" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/20">
            Access Dashboard
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
        >
           {isMenuOpen ? <Zap className="w-6 h-6 rotate-45" /> : <BarChart3 className="w-6 h-6 rotate-90" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-8 flex flex-col gap-6 lg:hidden shadow-2xl"
          >
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-900 underline decoration-primary decoration-4">Platform</a>
            <a href="#data" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-900">Intelligence</a>
            <Link to="/dashboard" className="w-full py-4 bg-primary text-white rounded-2xl text-center text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20">
              Access Dashboard
            </Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-24 md:pb-40 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-px w-8 md:w-12 bg-primary"></div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">Civic Intelligence Protocol v4.0</span>
            </div>
            
            <h1 className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-black text-slate-900 leading-[0.85] tracking-[-0.04em] mb-10 md:mb-12 uppercase">
              Civic <br />
              <span className="text-primary">Intelligence</span> <br />
              Redefined.
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-end">
              <div className="lg:col-span-12 xl:col-span-5">
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl">
                  CityPulse AI converts unorganized citizen complaints into structured, real-time intelligence for the modern city official.
                </p>
              </div>
              <div className="lg:col-span-12 xl:col-span-7 flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full">
                <Link to="/dashboard" className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-2xl shadow-primary/30 group">
                  Launch Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/map" className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center">
                  Live Network
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Marquee */}
      <div className="bg-slate-900 py-4 md:py-6 overflow-hidden border-y border-slate-800">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-12 mx-8 md:mx-12">
              <span className="text-white/20 font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 md:gap-4">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Real-time Processing
              </span>
              <span className="text-white/20 font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 md:gap-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Secure Infrastructure
              </span>
              <span className="text-white/20 font-black text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 md:gap-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Global Deployment
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-40 px-6 md:px-8 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
            <div className="lg:col-span-12 xl:col-span-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6 md:mb-8">
                The Engine of <br />
                Modern Governance.
              </h2>
              <p className="text-slate-500 text-md md:text-lg leading-relaxed max-w-xl">
                We've built the world's most advanced civic data pipeline, designed to handle the complexity of modern urban environments.
              </p>
            </div>
            <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 hover:bg-slate-50 transition-colors group">
                  <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-white shadow-xl", feature.color)}>
                    <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-md md:text-lg">{feature.description}</p>
                </div>
              ))}
              <div className="bg-primary p-8 md:p-12 flex flex-col justify-between text-white min-h-[240px]">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Ready to transform your city?</h3>
                <Link to="/dashboard" className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-[10px] md:text-xs hover:translate-x-2 transition-transform self-start">
                  Contact Sales <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Section */}
      <section id="data" className="py-24 md:py-40 px-6 md:px-8 bg-primary text-white overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-6 md:mb-8 block">Network Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter mb-8 md:mb-12">
                Predictive <br />
                Civic <br />
                Response.
              </h2>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 md:mb-12 max-w-md">
                Our AI doesn't just report problems—it predicts them. By analyzing historical patterns and real-time signals, we help you act before the crisis.
              </p>
              <div className="space-y-4 md:space-y-6">
                {topIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 md:py-6 border-b border-white/10">
                    <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">{issue.name}</span>
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-3xl md:text-4xl font-mono font-medium">{issue.count}</span>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center">
                        <TrendingUp className={cn("w-5 h-5", issue.trend === 'down' && "rotate-180")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-full blur-3xl absolute inset-0 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-danger animate-pulse"></div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Live Analysis Feed</span>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                          <Brain className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-white/80 truncate">Anomaly detected in District {i + 1}</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-mono text-white/40 shrink-0">0.00{i}s</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-6 md:px-8 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900">CITYPULSE<span className="text-primary">.AI</span></span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <a href="#" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">API</a>
          </div>
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-300">© 2026 Montgomery Intelligence Systems</p>
        </div>
      </footer>
    </div>
  );
};
