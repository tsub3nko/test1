
import React, { useState } from 'react';
import { analyzeSynergy } from '../services/geminiService';
import { SynergyAnalysis } from '../types';
import { Search, Zap, AlertTriangle, Microscope, GitMerge, X, Leaf, Flame, TrendingUp, ArrowRight, Plus, BarChart2, Layers, HelpCircle, Loader2, ScanLine } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SynergyAnalyzerProps {
  onOpenChat: () => void;
}

// Curated lists to guide the user
const SUGGESTED_BASES = ["Turmeric", "Spinach", "Green Tea", "Tomato", "Kale", "Salmon", "Oats", "Mushrooms"];
const SUGGESTED_ACTIVATORS = ["Black Pepper", "Lemon Juice", "Olive Oil", "Avocado", "Yogurt", "Vitamin C", "Mustard Seed"];

const INGREDIENT_COLORS = ['#8b5cf6', '#ec4899', '#10b981']; // Violet, Pink, Emerald

export const SynergyAnalyzer: React.FC<SynergyAnalyzerProps> = ({ onOpenChat }) => {
  // Initialize with pre-opened example data
  const [foodA, setFoodA] = useState('Turmeric');
  const [foodB, setFoodB] = useState('Black Pepper');
  const [foodC, setFoodC] = useState(''); 

  const [analysis, setAnalysis] = useState<SynergyAnalysis | null>({
    score: 94,
    synergyName: "The Golden Boost",
    summary: "Turmeric's powerful active ingredient, curcumin, is poorly absorbed by the body on its own. Adding black pepper, which contains piperine, acts like a supercharger. Piperine drastically increases how much curcumin your body can actually use, making turmeric's health benefits much more potent than if you took it alone.",
    pros: [
      "Massively increases how much turmeric your body absorbs.",
      "Makes turmeric's anti-inflammatory and antioxidant effects significantly stronger.",
      "A simple and natural way to boost turmeric's benefits.",
      "You get more bang for your buck from your turmeric supplements or spices."
    ],
    cons: [
      "Black pepper might affect how other medications are absorbed, so consult a doctor if on other drugs.",
      "Some people might experience mild digestive discomfort from black pepper.",
      "The exact absorption increase can vary from person to person."
    ],
    scientificConsensus: 'High',
    mechanism: "Piperine in black pepper inhibits the liver enzyme that breaks down curcumin.",
    riskLevel: 'Low',
    impactDomain: 'Physical',
    magnitude: 94,
    amplification: "2000%",
    type: 'Kinetic',
    chartData: [
      { name: 'Turmeric Alone', value: 3 },
      { name: 'Pepper Alone', value: 3 },
      { name: 'Synergy (All)', value: 10 },
    ]
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!foodA || !foodB) {
      setError("Please input at least two ingredients.");
      return;
    }
    setLoading(true);
    setError('');
    setAnalysis(null); // Clear previous analysis to trigger loading state

    try {
      // Artificial delay for demo purposes if API is too fast, to show off skeleton
      const [result] = await Promise.all([
          analyzeSynergy([foodA, foodB, foodC].filter(Boolean)),
          new Promise(resolve => setTimeout(resolve, 1500)) 
      ]);
      setAnalysis(result);
    } catch (e) {
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSampleSelect = (food: string) => {
    if (!foodA) {
      setFoodA(food);
    } else if (!foodB) {
      setFoodB(food);
    } else if (!foodC) {
      setFoodC(food); 
    } else {
      setFoodA(food);
      setFoodB('');
      setFoodC('');
      setAnalysis(null); 
    }
  };

  const synergyType = foodC ? 'TRIO' : 'DUO';
  const isTrio = !!foodC;

  // Dummy object for skeleton rendering
  const displayData = analysis || {
      score: 0, synergyName: '', summary: '', pros: [], cons: [], 
      scientificConsensus: '', mechanism: '', riskLevel: '', impactDomain: '', 
      magnitude: 0, amplification: '', type: 'Kinetic', chartData: []
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 opacity-50"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-end">
          {/* Input A */}
          <div className="lg:col-span-3 space-y-2">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Leaf size={12} /> First Ingredient
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={foodA}
                onChange={(e) => setFoodA(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-cyan-500/50 transition-all group-hover:border-slate-600 text-white placeholder:text-slate-600"
                placeholder="e.g. Turmeric"
              />
              {foodA ? (
                <button onClick={() => setFoodA('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
              ) : (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700 group-focus-within:bg-cyan-500 transition-colors"></div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 flex justify-center items-center pb-4">
             <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <span className="font-mono text-slate-400 text-xs">+</span>
             </div>
          </div>

          {/* Input B */}
          <div className="lg:col-span-3 space-y-2">
            <label className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-2">
                <Flame size={12} /> Second Ingredient
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={foodB}
                onChange={(e) => setFoodB(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-violet-500/50 transition-all group-hover:border-slate-600 text-white placeholder:text-slate-600"
                placeholder="e.g. Black Pepper"
              />
              {foodB ? (
                 <button onClick={() => setFoodB('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
              ) : (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700 group-focus-within:bg-violet-500 transition-colors"></div>
              )}
            </div>
          </div>

           <div className="lg:col-span-1 flex justify-center items-center pb-4">
             <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <span className="font-mono text-slate-400 text-xs">+</span>
             </div>
          </div>

          {/* Input C (Optional) */}
          <div className="lg:col-span-3 space-y-2">
            <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Plus size={12} /> Enhancer (Optional)
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={foodC}
                onChange={(e) => setFoodC(e.target.value)}
                className={`w-full bg-slate-950/50 border rounded-lg px-4 py-4 text-lg focus:outline-none transition-all group-hover:border-slate-600 text-white placeholder:text-slate-600 ${
                    foodC ? 'border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-slate-700 focus:border-emerald-500/50'
                }`}
                placeholder="e.g. Olive Oil"
              />
               {foodC ? (
                 <button onClick={() => setFoodC('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
              ) : (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700 group-focus-within:bg-emerald-500 transition-colors"></div>
              )}
            </div>
          </div>
        </div>

        {/* Button Row */}
        <div className="mt-6 flex justify-end">
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full sm:w-auto px-8 h-[50px] bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 rounded-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white uppercase tracking-wide"
            >
              {loading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Analyzing...</span>
                </>
              ) : (
                <>
                    <Search size={20} />
                    <span>Analyze Synergy</span>
                </>
              )}
            </button>
        </div>

        {/* Suggestions */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 border-t border-slate-800/50 pt-4">
             <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-[10px] font-bold text-cyan-500/70 uppercase tracking-wide whitespace-nowrap">Popular Bases:</span>
                {SUGGESTED_BASES.map(food => (
                <button key={food} onClick={() => handleSampleSelect(food)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-md border border-slate-700 hover:border-cyan-500/30 transition-all whitespace-nowrap">{food}</button>
                ))}
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-800"></div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <span className="text-[10px] font-bold text-violet-500/70 uppercase tracking-wide whitespace-nowrap">Potent Boosters:</span>
                {SUGGESTED_ACTIVATORS.map(food => (
                <button key={food} onClick={() => handleSampleSelect(food)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-violet-400 px-3 py-1.5 rounded-md border border-slate-700 hover:border-violet-500/30 transition-all whitespace-nowrap">{food}</button>
                ))}
            </div>
        </div>
        
        {error && <p className="mt-4 text-red-400 text-sm font-medium bg-red-950/20 p-2 rounded border border-red-900/50">{error}</p>}
      </div>

      {/* Results Section - Bento Grid */}
      {(analysis || loading) && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-slide-up">
          
          {/* Card 1: Strength */}
          <div className="md:col-span-1 lg:col-span-1 glass-panel p-6 rounded-2xl border-t-4 border-t-cyan-500 relative flex flex-col items-center justify-center text-center min-h-[240px] overflow-hidden">
             {loading && <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent animate-pulse"></div>}

             {!loading && (
                 <div className="absolute top-4 right-4">
                    {synergyType === 'TRIO' ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 animate-pulse">
                            <Layers size={10} /> TRIO
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/50 text-[10px] font-bold text-cyan-400">
                            <GitMerge size={10} /> DUO
                        </div>
                    )}
                 </div>
             )}

             <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 relative z-10">Synergy Strength</h3>
             
             <div className="flex flex-col items-center mb-4 relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-16 gap-2">
                        <div className="w-16 h-10 bg-slate-800/50 rounded animate-shimmer"></div>
                        <div className="w-20 h-3 bg-slate-800/50 rounded animate-shimmer"></div>
                    </div>
                ) : (
                    <>
                        <span className="text-5xl font-bold font-mono text-white tracking-tighter neon-text">
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
                     {displayData.type === 'Kinetic' ? 'Absorption' : 'Effect'}
                 </div>
             )}

             {!loading && <p className="mt-4 text-sm text-slate-300 font-medium border-t border-slate-800 pt-3 w-full">{displayData.synergyName}</p>}
             {loading && <div className="mt-4 w-full h-4 bg-slate-800/50 rounded animate-shimmer border-t border-slate-800"></div>}
          </div>

          {/* Card 2: Overview */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden">
             {loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent animate-shimmer"></div>}
             
             <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-slate-200 font-bold flex items-center gap-2">
                  <Microscope size={18} className="text-cyan-400" />
                  Overview
                </h3>
                {loading ? (
                  <div className="w-20 h-6 bg-slate-800/50 rounded animate-pulse"></div>
                ) : (
                    <div className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${
                    displayData.riskLevel === 'None' ? 'bg-green-900/30 border-green-800 text-green-400' : 
                    displayData.riskLevel === 'High' ? 'bg-red-900/30 border-red-800 text-red-400' : 
                    'bg-yellow-900/30 border-yellow-800 text-yellow-400'
                    }`}>
                    Risk: {displayData.riskLevel}
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
                 <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    {displayData.summary}
                 </p>
             )}

             <div className="mt-auto grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                   <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Evidence</div>
                   {loading ? <div className="w-16 h-4 bg-slate-800 rounded animate-pulse mt-1"></div> : <div className="text-slate-200 font-medium">{displayData.scientificConsensus}</div>}
                </div>
                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                   <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Mechanism</div>
                   {loading ? <div className="w-24 h-4 bg-slate-800 rounded animate-pulse mt-1"></div> : <div className="text-slate-200 font-medium truncate" title={displayData.mechanism}>{displayData.mechanism}</div>}
                </div>
             </div>
          </div>

          {/* Card 3: Ingredient Benefit Index (BAR CHART) */}
          <div className="md:col-span-3 lg:col-span-1 glass-panel p-6 rounded-2xl flex flex-col relative">
            <div className="flex items-center justify-between mb-4 relative z-20">
                <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                    <BarChart2 size={14} /> {synergyType === 'TRIO' ? 'Triple-Stack' : 'Ingredient'} Benefit Index
                    <div className="group relative">
                        <HelpCircle size={14} className="text-slate-600 cursor-help hover:text-cyan-400 transition-colors" />
                        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
                            Score (1-10) derived from bio-availability, metabolic impact, and absorption efficiency.
                        </div>
                    </div>
                </h3>
            </div>
            
            {/* Chart Container */}
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
            <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-green-500">
               <h4 className="text-green-400 font-bold text-sm mb-4 flex items-center gap-2">
                  <Zap size={16} /> BENEFITS
               </h4>
               {loading ? (
                   <div className="space-y-3">
                       {[1,2,3].map(i => <div key={i} className="w-full h-4 bg-slate-800/50 rounded animate-shimmer"></div>)}
                   </div>
               ) : (
                    <ul className="space-y-2">
                        {displayData.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                            {pro}
                            </li>
                        ))}
                    </ul>
               )}
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-2 border-l-red-500">
               <h4 className="text-red-400 font-bold text-sm mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} /> DOWNSIDES
               </h4>
               {loading ? (
                   <div className="space-y-3">
                       {[1,2].map(i => <div key={i} className="w-full h-4 bg-slate-800/50 rounded animate-shimmer"></div>)}
                   </div>
               ) : (
                   <ul className="space-y-2">
                        {displayData.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                            {con}
                            </li>
                        ))}
                   </ul>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
