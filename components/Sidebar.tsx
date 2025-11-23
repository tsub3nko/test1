
import React, { useState } from 'react';
import { View } from '../App';
import { LayoutDashboard, Activity, Network, Settings, Hexagon, Layers } from 'lucide-react';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { id: View.DASHBOARD, label: 'Best Combinations', icon: LayoutDashboard },
    { id: View.ANALYZER, label: 'Check Your Food', icon: Activity },
    { id: View.DATABASE, label: 'Browse All', icon: Network },
    { id: View.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`
        relative z-30 h-full bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out
        ${isHovered ? 'w-64' : 'w-20'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <div className={`transition-all duration-300 ${isHovered ? 'rotate-180' : 'rotate-0'}`}>
           <Hexagon className="text-cyan-500 w-8 h-8" strokeWidth={1.5} />
        </div>
        {isHovered && (
          <span className="ml-3 font-mono font-bold text-lg tracking-widest text-slate-100 animate-fade-in">
            CORE
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                ${isActive ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
              `}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />}
              
              <item.icon size={22} className={`min-w-[22px] ${isActive ? 'text-cyan-400' : 'group-hover:text-slate-100'}`} />
              
              <span className={`
                ml-4 text-sm font-medium whitespace-nowrap transition-all duration-300 font-sans
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute pointer-events-none'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800">
         <div className={`flex items-center text-xs text-slate-600 font-mono transition-all duration-300 ${!isHovered && 'justify-center'}`}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            {isHovered && <span>ONLINE</span>}
         </div>
      </div>
    </aside>
  );
};