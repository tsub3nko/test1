
import React, { useState } from 'react';
import { PRESET_RANKINGS } from '../types';
import { Search, Database, GitMerge, Zap, Shield } from 'lucide-react';

export const DatabaseView: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Cognitive' | 'Physical' | 'Metabolic' | 'Kinetic' | 'Dynamic'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = PRESET_RANKINGS.filter(item => {
    let matchesFilter = false;
    if (filter === 'All') matchesFilter = true;
    else if (filter === 'Kinetic' || filter === 'Dynamic') matchesFilter = item.type === filter;
    else matchesFilter = item.domain === filter;

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.ingredients.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Database className="text-cyan-500" size={24} />
                    All Combinations
                </h2>
                <p className="text-slate-400 text-sm">A complete list of healthy food pairings we track.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800 flex-wrap">
                {['All', 'Cognitive', 'Physical', 'Kinetic', 'Dynamic'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                            filter === f 
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-900' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {f === 'Kinetic' ? 'ABSORPTION' : f === 'Dynamic' ? 'EFFECT' : f.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        <div className="relative">
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for foods or benefits..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-cyan-500 outline-none font-sans placeholder:text-slate-600"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-10">
            {filteredData.map((item, i) => (
                <div key={i} className="glass-panel p-5 rounded-xl hover:bg-slate-800 transition-all border border-slate-800 hover:border-cyan-500/30 flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                            item.type === 'Kinetic' ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' :
                            'bg-violet-950/30 border-violet-900 text-violet-400'
                        }`}>
                            {item.type === 'Kinetic' ? <GitMerge size={20} /> : <Zap size={20} />}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-900">
                               <Shield size={10} /> {item.evidence.toUpperCase()}
                           </div>
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mt-1 mb-3">
                        {item.ingredients.map((ing, j) => (
                            <React.Fragment key={j}>
                                <span>{ing}</span>
                                {j < item.ingredients.length - 1 && <span>+</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[9px] bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 uppercase">{tag}</span>
                        ))}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1 font-medium">
                        {item.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-mono text-slate-500">STRENGTH</span>
                            <span className="text-sm font-mono font-bold text-cyan-400">{item.amplification}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-600">
                            <span className="uppercase">{item.domain}</span>
                        </div>
                    </div>
                </div>
            ))}
            
            {filteredData.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-500 font-mono">
                    No results found.
                </div>
            )}
        </div>
    </div>
  );
};
