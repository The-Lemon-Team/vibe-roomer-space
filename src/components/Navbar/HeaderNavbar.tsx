import React from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

export const HeaderNavbar: React.FC = () => {
  const { activeTag, setActiveTag, viewMode, setViewMode, setCreateModalOpen } = useAtmosphericStore();

  const handleLogoClick = () => {
    setActiveTag('#ALL');
    setViewMode('vibes');
  };

  return (
    <div className="flex justify-between items-center w-full px-4 md:px-6 py-2.5 h-16 border-b border-zinc-800/80 font-mono">
      {/* Left Title & Status */}
      <div className="flex items-center space-x-3">
        <button
          onClick={handleLogoClick}
          className="font-sans italic font-black text-xl md:text-2xl text-cyan-400 tracking-tighter hover:text-cyan-300 transition-colors focus:outline-none cursor-pointer text-left"
          title="Redirect to #ALL hashtag vibes"
        >
          VIBER ROOMER
        </button>
        <div className="hidden lg:flex items-center space-x-2 border-l border-zinc-800 pl-3">
          <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            [SYS: ONLINE]
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#00ff41]" />
        </div>
      </div>

      {/* Middle Active Hashtag Route Indicator */}
      <div className="hidden md:flex items-center space-x-2 text-xs">
        <span className="text-zinc-500">[ACTIVE_HASHTAG]:</span>
        <span className="font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/60 uppercase shadow-[0_0_8px_rgba(255,176,0,0.2)]">
          {activeTag}
        </span>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode(viewMode === 'vibes' ? 'rooms' : 'vibes')}
          className="px-3 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-cyan-400 transition-colors flex items-center space-x-1"
        >
          <span className="material-symbols-outlined text-sm">
            {viewMode === 'vibes' ? 'sensors' : 'grid_view'}
          </span>
          <span>[{viewMode === 'vibes' ? 'ENTER_ROOMS' : 'MAIN_VIBES'}]</span>
        </button>

        <button 
          onClick={() => setCreateModalOpen(true)}
          className="lg:hidden p-1.5 text-cyan-400 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800"
        >
          <span className="material-symbols-outlined text-lg">add</span>
        </button>
      </div>
    </div>
  );
};
