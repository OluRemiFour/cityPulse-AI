import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map as MapIcon, 
  Lightbulb, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Complaints', path: '/complaints', icon: MessageSquare },
    { name: 'Map View', path: '/map', icon: MapIcon },
    { name: 'AI Insights', path: '/insights', icon: Lightbulb },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col",
        // Desktop sizing
        isCollapsed ? "lg:w-20" : "lg:w-64",
        // Mobile behavior
        "w-64 -translate-x-full lg:translate-x-0",
        isMobileMenuOpen && "translate-x-0"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          {(!isCollapsed || isMobileMenuOpen) && (
            <span className="font-bold text-xl tracking-tight text-primary whitespace-nowrap">CityPulse AI</span>
          )}
        </div>
        
        {/* Mobile Close Button */}
        {setIsMobileMenuOpen && (
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen?.(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0", isCollapsed && !isMobileMenuOpen && "lg:mx-auto")} />
            {(!isCollapsed || isMobileMenuOpen) && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Desktop Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="m-4 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hidden lg:flex items-center justify-center transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
};
