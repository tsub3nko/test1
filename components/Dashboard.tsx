
import React, { useState } from 'react';
import { View } from '../App';
import { PRESET_RANKINGS, SynergyRank } from '../types';
import { Search, Brain, Activity, ShieldCheck, Sparkles, Moon, Battery, Eye, Heart, Utensils, Dumbbell } from 'lucide-react';
import { SynergyModal } from './SynergyModal';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

// Updated chips with distinct color themes
const GOAL_CHIPS = [
  { id: 'All', label: 'VIEW ALL', icon: Sparkles, color: 'text-cyan-400', activeBg: 'bg-cyan-500 border-cyan-400 shadow-cyan-500/20' },
  { id: 'Memory', label: 'MEMORY', icon: Brain, color: 'text-violet-400', activeBg: 'bg-violet-500 border-violet-400 shadow-violet-500/20' },
  { id: 'Energy', label: 'ENERGY', icon: Battery, color: 'text-yellow-400', activeBg: 'bg-yellow-500 border-yellow-400 shadow-yellow-500/20' },
  { id: 'Focus', label: 'FOCUS', icon: Eye, color: 'text-blue-400', activeBg: 'bg-blue-500 border-blue-400 shadow-blue-500/20' },
  { id: 'Sleep', label: 'SLEEP', icon: Moon, color: 'text-indigo-400', activeBg: 'bg-indigo-500 border-indigo-400 shadow-indigo-500/20' },
  { id: 'Immune', label: 'IMMUNITY', icon: ShieldCheck, color: 'text-emerald-400', activeBg: 'bg-emerald-500 border-emerald-400 shadow-emerald-500/20' },
  { id: 'Heart', label: 'HEART', icon: Heart, color: 'text-rose-400', activeBg: 'bg-rose-500 border-rose-400 shadow-rose-500/20' },
  { id: 'Gut', label: 'DIGESTION', icon: Utensils, color: 'text-orange-400', activeBg: 'bg-orange-500 border-orange-400 shadow-orange-500/20' },
  { id: 'Muscle', label: 'MUSCLE', icon: Dumbbell, color: 'text-red-500', activeBg: 'bg-red-600 border-red-500 shadow-red-500/20' },
  { id: 'Skin', label: 'SKIN', icon: Activity, color: 'text-pink-400', activeBg: 'bg-pink-500 border-pink-400 shadow-pink-500/20' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const [activeGoal, setActiveGoal] = useState('All');
  const [selectedSynergy, setSelectedSynergy] = useState<SynergyRank | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRankings = PRESET_RANKINGS.filter(item => {
    // 1. Filter by Goal
    const matchesGoal = activeGoal === 'All' || item.tags.includes(activeGoal);
    
    // 2. Filter by Search Term
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.ingredients.some(ing => ing.toLowerCase().includes(searchLower)) ||
        item.description.toLowerCase().includes(searchLower);

    return matchesGoal && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-slate-800/50">
        <div className="w-full md:w-auto">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Brain className="text-cyan-500" size={28} />
                Top Food Combinations
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
                Explore the database of scientifically proven food pairings.
            </p>
        </div>
        <button 
            onClick={() => onChangeView(View.ANALYZER)}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all text-sm font-bold shadow-lg shadow-cyan-900/20 w-full md:w-auto justify-center"
        >
            <Activity size={18} />
            Check a Pair
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for ingredient (e.g. Spinach), goal (e.g. Sleep) or benefit..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all shadow-inner placeholder:text-slate-600"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
      </div>

      {/* Goal Filters */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {GOAL_CHIPS.map((chip) => {
          const isActive = activeGoal === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveGoal(chip.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold tracking-wider transition-all whitespace-nowrap shadow-lg
                ${isActive 
                  ? `${chip.activeBg} text-slate-950 border-transparent` 
                  : `bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200 hover:bg-slate-800`}
              `}
            >
              <chip.icon size={14} className={isActive ? 'text-slate-950' : chip.color} />
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Synergy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRankings.map((item, index) => (
            <div 
                key={index} 
                onClick={() => setSelectedSynergy(item)}
                className="group relative bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-[320px] hover:shadow-xl hover:shadow-cyan-900/10 cursor-pointer animate-slide-up"
            >
                
                {/* Top Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rank & Name */}
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1" title={item.name}>
                     {item.name}
                   </h3>
                   <span className="text-xs font-mono text-slate-600">#{item.rank}</span>
                </div>

                {/* The Pair/Trio */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300 mb-4 pb-4 border-b border-slate-800">
                    {item.ingredients.map((ing, i) => (
                      <React.Fragment key={i}>
                        <span className="bg-slate-950 px-2 py-1 rounded">{ing}</span>
                        {i < item.ingredients.length - 1 && <span className="text-cyan-500">+</span>}
                      </React.Fragment>
                    ))}
                </div>
                
                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-auto line-clamp-3 font-medium">
                    {item.description}
                </p>

                {/* Stats Footer */}
                <div className="mt-4 flex items-end justify-between">
                    <div>
                       <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Strength</div>
                       <div className="text-2xl font-mono font-bold text-white">{item.amplification}</div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                        <div className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${
                            item.evidence === 'Clinical' ? 'bg-green-950/30 border-green-900 text-green-400' : 'bg-yellow-950/30 border-yellow-900 text-yellow-400'
                        }`}>
                            {item.evidence}
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono uppercase">
                          {item.type === 'Kinetic' ? 'Absorption' : 'Direct Effect'}
                        </div>
                    </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-cyan-500/0 rounded-2xl group-hover:border-cyan-500/20 transition-all pointer-events-none"></div>
            </div>
        ))}
      </div>
      
      {filteredRankings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Search size={48} className="mb-4 opacity-20" />
          <p className="font-mono text-sm mb-2">NO COMBINATIONS FOUND</p>
          <p className="text-xs text-slate-500">Try searching for "Spinach", "Muscle" or "Sleep"</p>
        </div>
      )}

      {/* Floating Window Modal */}
      {selectedSynergy && (
        <SynergyModal 
            item={selectedSynergy} 
            onClose={() => setSelectedSynergy(null)} 
        />
      )}

    </div>
  );
};
