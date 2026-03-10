import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import { Outlet } from "react-router-dom";
import { cn } from "../utils/cn";

export const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      {/* Sidebar - responsive behavior handled inside component */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 w-full min-w-0",
          "lg:ml-64", // Default desktop margin
          isCollapsed && "lg:ml-20", // Collapsed desktop margin
          "ml-0" // No margin on mobile/tablet
        )}
      >
        <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <div className="p-4 md:p-8 flex-1 w-full max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      <ChatWidget />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
