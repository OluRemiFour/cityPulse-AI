import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { ChatWidget } from '../components/ChatWidget';
import { Outlet } from 'react-router-dom';
import { cn } from '../utils/cn';

export const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <main 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <Navbar />
        <div className="p-8 flex-1">
          <Outlet />
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};
