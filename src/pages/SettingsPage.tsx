import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Globe } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const sections = [
    { title: "Profile Settings", icon: User, desc: "Manage your account information and preferences." },
    { title: "Notifications", icon: Bell, desc: "Configure how you receive alerts and reports." },
    { title: "Security", icon: Shield, desc: "Manage password and authentication settings." },
    { title: "Data Sources", icon: Database, desc: "Configure complaint scraping and API integrations." },
    { title: "City Configuration", icon: Globe, desc: "Manage city boundaries and district definitions." },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your CityPulse AI platform experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, idx) => (
          <button 
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-6 text-left group"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <section.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{section.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{section.desc}</p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-slate-600 transition-all">
              <Globe className="w-5 h-5 rotate-90" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
