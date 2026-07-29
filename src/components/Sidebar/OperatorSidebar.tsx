import React from 'react';
import { useAtmosphericStore, ATMOSPHERIC_CONTEXT_MAP, ActivityContextType } from '../../store/useAtmosphericStore';

export const OperatorSidebar: React.FC = () => {
  const { currentContext, setContext, setCreateModalOpen, viewMode, setViewMode } = useAtmosphericStore();

  return (
    <aside className="hidden lg:flex flex-col h-screen sticky left-0 top-0 z-40 p-4 bg-zinc-950 border-r border-zinc-800/80 w-64 select-none shrink-0 font-mono">
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-3 p-2.5 border border-zinc-800 bg-zinc-900/50 rounded">
        <div className="w-10 h-10 bg-zinc-900 border border-cyan-500/50 flex items-center justify-center overflow-hidden shrink-0">
          <span className="material-symbols-outlined text-cyan-400">person</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-cyan-400 truncate">OPERATOR_01</div>
          <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span>SYS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main View Switcher */}
      <div className="mb-4 grid grid-cols-2 gap-1 bg-zinc-900/90 p-1 border border-zinc-800 rounded text-xs">
        <button
          onClick={() => setViewMode('feed')}
          className={`py-1.5 text-center font-bold rounded transition-colors ${
            viewMode === 'feed' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          [FEED]
        </button>
        <button
          onClick={() => setViewMode('room')}
          className={`py-1.5 text-center font-bold rounded transition-colors ${
            viewMode === 'room' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          [ROOM]
        </button>
      </div>

      {/* Vibe Context Modes */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1 no-scrollbar">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2 border-b border-zinc-800 pb-1">
          Vibe Contexts
        </div>

        {(Object.keys(ATMOSPHERIC_CONTEXT_MAP) as ActivityContextType[]).map((key) => {
          const item = ATMOSPHERIC_CONTEXT_MAP[key];
          const isActive = currentContext === key;

          return (
            <button
              key={key}
              onClick={() => setContext(key)}
              style={{
                borderColor: isActive ? `${item.neonColor}66` : 'transparent',
                color: isActive ? item.neonColor : '#a1a1aa'
              }}
              className={`w-full text-left p-2.5 text-xs font-bold uppercase transition-all rounded border-l-4 flex flex-col gap-0.5 ${
                isActive 
                  ? 'bg-zinc-900/90 border-l-cyan-400 shadow-[0_0_10px_rgba(0,219,233,0.1)]' 
                  : 'bg-transparent border-l-transparent hover:bg-zinc-900/40 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {isActive && <span className="text-[10px]">●</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="w-full bg-cyan-400 text-black py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded hover:bg-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-1.5"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>NEW VIBE</span>
        </button>
      </div>
    </aside>
  );
};
