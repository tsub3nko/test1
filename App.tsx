
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatDrawer } from './components/ChatDrawer';
import { Dashboard } from './components/Dashboard';
import { SynergyAnalyzer } from './components/SynergyAnalyzer';
import { DatabaseView } from './components/DatabaseView';

export enum View {
  DASHBOARD = 'DASHBOARD',
  ANALYZER = 'ANALYZER',
  DATABASE = 'DATABASE',
  SETTINGS = 'SETTINGS'
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case View.DASHBOARD:
        return <Dashboard onChangeView={setActiveView} />;
      case View.ANALYZER:
        return <SynergyAnalyzer onOpenChat={() => setIsChatOpen(true)} />;
      case View.DATABASE:
        return <DatabaseView />;
      case View.SETTINGS:
        return (
          <div className="glass-panel p-8 rounded-2xl h-full flex items-center justify-center">
             <div className="text-center">
                <h2 className="font-bold text-xl text-cyan-400 mb-2">Settings</h2>
                <p className="text-slate-400">Settings are not available yet.</p>
             </div>
          </div>
        );
      default:
        return <Dashboard onChangeView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 text-slate-200 selection:bg-cyan-500/30">
      {/* Left Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto min-h-screen flex flex-col">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                SYNERGY<span className="text-cyan-400">CORE</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">Discover the best food combinations</p>
            </div>
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium text-sm text-slate-300 group-hover:text-cyan-400">Ask AI</span>
            </button>
          </header>

          {/* Dynamic Content */}
          <div className="flex-1 animate-fade-in">
            {renderContent()}
          </div>
          
        </div>
      </main>

      {/* Right Chat Drawer */}
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;