import React from 'react';
import { Brain, TrendingUp, MapPin, AlertTriangle, ArrowUpRight, BarChart2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export const AIInsightsPage: React.FC = () => {
  const deepInsights = [
    {
      title: "Pothole Cluster Analysis",
      description: "AI has identified a 24% increase in pothole reports specifically in the East Montgomery district. Correlation analysis suggests recent heavy rainfall combined with high heavy-vehicle traffic as the primary cause.",
      impact: "High",
      recommendation: "Prioritize resurfacing of Carter Hill Road and Eastern Blvd within the next 14 days.",
      icon: AlertTriangle,
      color: "text-danger bg-danger/10"
    },
    {
      title: "Waste Collection Efficiency",
      description: "Analysis of truck GPS data vs complaint timestamps shows a 15-minute delay increase in Route 7. AI predicts a potential backlog of 200+ bins if not addressed by Friday.",
      impact: "Medium",
      recommendation: "Deploy backup collection vehicle to Route 7 for the remainder of the week.",
      icon: TrendingUp,
      color: "text-warning bg-warning/10"
    },
    {
      title: "Traffic Signal Optimization",
      description: "Malfunctioning signal patterns detected at 3 major intersections. AI suggests a temporary manual override during peak hours (4 PM - 6 PM) to reduce congestion by 18%.",
      impact: "Medium",
      recommendation: "Dispatch traffic engineering team to recalibrate sensors at I-85 interchange.",
      icon: BarChart2,
      color: "text-primary bg-primary/10"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Brain className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Intelligence Hub</h1>
          <p className="text-slate-500 mt-1">Advanced predictive analytics and automated problem identification.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Priority Insights</h2>
          {deepInsights.map((insight, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl shrink-0", insight.color)}>
                  <insight.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{insight.title}</h3>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                      insight.impact === 'High' ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"
                    )}>
                      {insight.impact} Impact
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{insight.description}</p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">AI Recommendation</p>
                    <p className="text-sm font-bold text-primary">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Problem Heatmap</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-900">East Montgomery</span>
                </div>
                <span className="text-danger font-bold text-sm">+24%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-danger h-full w-[85%]"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-900">Downtown</span>
                </div>
                <span className="text-warning font-bold text-sm">+12%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-warning h-full w-[60%]"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-900">West Side</span>
                </div>
                <span className="text-success font-bold text-sm">-5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-success h-full w-[35%]"></div>
              </div>
            </div>
            <button className="mt-8 w-full py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Explore Map <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
