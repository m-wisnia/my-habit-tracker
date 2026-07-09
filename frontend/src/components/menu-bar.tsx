import React from 'react';
import { Astroid } from "lucide-react";

interface MenuBarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const MenuBar: React.FC<MenuBarProps> = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-slate-900 text-white flex-row items-center justify-between px-6 shadow-md z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Astroid />
      </div>

      {/* Middle Section: Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        <button 
        //   onClick={() => onNavigate?.('dashboard')} 
          className="hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
        >
          Events
        </button>
        <button 
        //   onClick={() => onNavigate?.('calendar')} 
          className="hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
        >
          Wellbeing
        </button>
        <button 
        //   onClick={() => onNavigate?.('categories')} 
          className="hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
        >
          Habits
        </button>
      </div>
    </div>
  );
};