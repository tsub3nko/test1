
import React, { useEffect, useState } from 'react';
import { X, TrendingUp, Zap, AlertTriangle, Microscope, GitMerge, Brain, ShieldCheck, Loader2, ScanLine, BarChart2, HelpCircle, Layers } from 'lucide-react';
import { SynergyRank, SynergyAnalysis } from '../types';
import { analyzeSynergy } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SynergyModalProps {
  item: SynergyRank;
  onClose: () => void;
}

const INGREDIENT_COLORS = ['#8b5cf6', '#ec4899', '#10b981']; // Violet, Pink, Emerald

export const SynergyModal: React.FC<SynergyModalProps> = ({ item, onClose }) => {
  const [analysis, setAnalysis] = useState<SynergyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalysis = async () => {
      try {
        // Artificial delay to match analyzer feel
        const [result] = await Promise.all([
            analyzeSynergy(item.ingredients),
            new Promise(resolve => setTimeout(resolve, 1500)) 
        ]);
        
        if (isMounted) {
          setAnalysis(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Analysis failed", error);
        if (isMounted) setLoading(false);
      }
    };
    
    fetchAnalysis();
    
    return () => { isMounted = false; };
  }, [item]);

  // Fallback/Initial Data during loading
  const displayData = analysis || {
    score: item.magnitude,
    synergyName: item.name,
    summary: item.description,
    pros: item.tags, 
    cons: [],
    scientificConsensus: item.evidence === 'Clinical' ? 'High' : 'Medium',
    mechanism: "Analyzing biological pathway...",
    riskLevel: 'Low',
    impactDomain: item.domain,
    magnitude: item.magnitude,
    amplification: item.amplification,
    type: item.type,
    chartData: []
  };

  const isTrio = item.ingredients.length > 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl animate-slide-up scrollbar-hide overflow-x-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur">
           <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-800 text-cyan-400`}>
                  <Brain size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-wrap">
                    {item.ingredients.map((ing, i) => (
                        <React.Fragment key={i}>
                            <span>{ing}</span>
                            {i < item.ingredients.length - 1 && <span className="text-cyan-500">+</span>}
                        </React.Fragment>
                    ))}
                </div>
              </div>
           </div>
           <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
             <X size={24} />
           </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
            
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {/* 1. Strength Card */}
                <div className="md:col-span-1 lg:col-span-1 glass-panel p-6 rounded-2xl border-t-4 border-t-cyan-500 relative flex flex-col items-center justify-center text-center min-h-[240px] overflow-hidden">
                    {loading && <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent animate-pulse"></div>}
                    
                    <div className="absolute top-4 right-4">
                        {isTrio ? (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 animate-pulse">
                                <Layers size={10} /> TRIO
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/50 text-[10px] font-bold text-cyan-400">
                                <GitMerge size={10} /> DUO
                            </div>
                        )}
                    </div>

                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 relative z-10">Synergy Strength</h3>
                    
                    <div className="flex flex-col items-center mb-4 relative z-10">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-16 gap-2">
                                <div className="w-16 h-10 bg-slate-800/50 rounded animate-shimmer"></div>
                                <div className="w-20 h-3 bg-slate-800/50 rounded animate-shimmer"></div>
                            </div>
                        ) : (
                            <>
                                <span className="text-5xl font-bold font-mono text-white tracking-tighter neon-text animate-scale-in">
                                    {displayData.amplification}
                                </span>
                                <span className="text-xs text-cyan-500 mt-1">Boost Multiplier</span>
                            </>
                        )}
                    </div>

                    {loading ? (
                         <div className="w-24 h-6 bg-slate-800/50 rounded-full animate-shimmer relative z-10"></div>
                    ) : (
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border flex items-center gap-2 relative z-10 ${
                            displayData.type === 'Kinetic' ? 'bg-emerald-950 border-emerald-800 text-emerald-400' : 'bg-violet-950 border-violet-800 text-violet-400'
                        }`}>
                            {displayData.type === 'Kinetic' ? <GitMerge size={12} /> : <Zap size={12} />}
                            {displayData.type === 'Kinetic' ? 'Absorption' : 'Direct Effect'}
                        </div>
                    )}
                </div>

                {/* 2. Overview Card */}
                <div className="md:col-span-2 lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col bg-slate-800/20 relative overflow-hidden">
                    {loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent animate-shimmer"></div>}

                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="text-slate-200 font-bold flex items-center gap-2">
                        <Microscope size={18} className="text-cyan-400" />
                        Deep Analysis
                        </h3>
                         {loading ? (
                            <div className="w-20 h-6 bg-slate-800/50 rounded animate-pulse"></div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-900/50">
                             <span className="text-[10px] font-bold text-cyan-400">AI GENERATED</span>
                          </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-3 mb-6">
                             <div className="w-full h-4 bg-slate-800/50 rounded animate-shimmer"></div>
                             <div className="w-5/6 h-4 bg-slate-800/50 rounded animate-shimmer"></div>
                             <div className="w-4/6 h-4 bg-slate-800/50 rounded animate-shimmer"></div>
                        </div>
                    ) : (
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium animate-fade-in">
                            {displayData.summary}
                        </p>
                    )}

                    <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Mechanism</div>
                             {loading ? <div className="w-24 h-4 bg-slate-800 rounded animate-pulse mt-1"></div> : <div className="text-slate-200 font-medium text-sm truncate" title={(displayData as any).mechanism}>{displayData.mechanism}</div>}
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                            <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Goal</div>
                             {loading ? <div className="w-16 h-4 bg-slate-800 rounded animate-pulse mt-1"></div> : <div className="text-slate-200 font-medium text-sm">{displayData.impactDomain}</div>}
                        </div>
                    </div>
                </div>

                {/* 3. Chart Card (Bar Chart) */}
                <div className="md:col-span-3 lg:col-span-1 glass-panel p-6 rounded-2xl flex flex-col relative">
                    <div className="flex items-center justify-between mb-4 relative z-20">
                        <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <BarChart2 size={14} /> {isTrio ? 'Triple-Stack' : 'Ingredient'} Benefit Index
                            <div className="group relative">
                                <HelpCircle size={14} className="text-slate-600 cursor-help hover:text-cyan-400 transition-colors" />
                                <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                                    Score (1-10) derived from bio-availability, metabolic impact, and absorption efficiency.
                                </div>
                            </div>
                        </h3>
                    </div>
                    
                    <div className="flex-1 min-h-[150px] relative rounded-xl overflow-hidden z-10">
                        {loading ? (
                             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                                 <div className="absolute inset-0 border-t-2 border-cyan-500/20 animate-[scan_1.5s_linear_infinite]"></div>
                                 <ScanLine className="text-cyan-500/30 w-10 h-10 animate-pulse" />
                             </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={displayData.chartData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                                  <defs>
                                     <linearGradient id="synergyGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={1}/>
                                     </linearGradient>
                                     {INGREDIENT_COLORS.map((color, index) => (
                                         <linearGradient key={index} id={`ingGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                                            <stop offset="100%" stopColor={color} stopOpacity={0.3}/>
                                        </linearGradient>
                                     ))}
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                  <XAxis 
                                    dataKey="name" 
                                    tick={false} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    interval={0}
                                    height={10}
                                  />
                                  <YAxis hide domain={[0, 12]} />
                                  <Tooltip 
                                    cursor={{fill: 'rgba(30, 41, 59, 0.3)'}}
                                    contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '12px', borderRadius: '8px'}} 
                                    itemStyle={{color: '#fff'}}
                                  />
                                  <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
                                    {displayData.chartData.map((entry, index) => {
                                       const isSynergy = entry.name.includes('Synergy');
                                       const trioGlow = isTrio && isSynergy ? 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))' : isSynergy ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' : 'none';
                                       const trioStroke = isTrio && isSynergy ? '#eab308' : 'none';
                                       
                                       return (
                                          <Cell 
                                             key={`cell-${index}`} 
                                             fill={isSynergy ? 'url(#synergyGradient)' : `url(#ingGradient${index % INGREDIENT_COLORS.length})`}
                                             stroke={trioStroke}
                                             strokeWidth={isTrio && isSynergy ? 2 : 0}
                                             strokeDasharray={isTrio && isSynergy ? '4 2' : '0'}
                                             style={{ filter: trioGlow }}
                                          />
                                       );
                                    })}
                                  </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                     {/* Custom Legend */}
                     {!loading && (
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-slate-800 pt-3">
                            {displayData.chartData.map((entry, index) => {
                                const isSynergy = entry.name.includes('Synergy');
                                const color = isSynergy ? '#22d3ee' : INGREDIENT_COLORS[index % INGREDIENT_COLORS.length];
                                return (
                                    <div key={index} className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: isSynergy ? `0 0 5px ${color}` : 'none' }}></div>
                                        <span className={isSynergy ? 'text-white font-bold' : ''}>{entry.name.replace(' Alone', '')}</span>
                                    </div>
                                );
                            })}
                        </div>
                     )}
                </div>

                {/* 4. Pros & Cons */}
                <div className="md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-green-500 bg-slate-800/20 relative overflow-hidden">
                        <h4 className="text-green-400 font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
                            <ShieldCheck size={16} /> BENEFITS
                        </h4>
                        {loading ? (
                             <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                   <div key={i} className="flex items-center gap-3">
                                       <div className="w-1.5 h-1.5 rounded-full bg-green-900"></div>
                                       <div className="h-3 bg-slate-800/50 rounded w-full relative overflow-hidden">
                                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                       </div>
                                   </div>
                                ))}
                             </div>
                        ) : (
                            <ul className="space-y-2 animate-fade-in">
                                {displayData.pros.map((pro, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                                    {pro}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-red-500 bg-slate-800/20 relative overflow-hidden">
                        <h4 className="text-red-400 font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
                            <AlertTriangle size={16} /> DOWNSIDES
                        </h4>
                         {loading ? (
                             <div className="space-y-4">
                                {[1, 2].map(i => (
                                   <div key={i} className="flex items-center gap-3">
                                       <div className="w-1.5 h-1.5 rounded-full bg-red-900"></div>
                                       <div className="h-3 bg-slate-800/50 rounded w-3/4 relative overflow-hidden">
                                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.5s]"></div>
                                       </div>
                                   </div>
                                ))}
                             </div>
                        ) : (
                            <ul className="space-y-2 animate-fade-in">
                                {displayData.cons.length > 0 ? displayData.cons.map((con, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                                    {con}
                                    </li>
                                )) : (
                                  <li className="text-slate-500 text-sm italic flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                    No major downsides detected.
                                  </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};
