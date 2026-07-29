import React from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

export const BottomNavbar: React.FC = () => {
  const { viewMode, setViewMode, setCreateModalOpen } = useAtmosphericStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 h-14 bg-zinc-950/95 border-t border-zinc-800 backdrop-blur-md font-mono text-[10px]">
      <button 
        onClick={() => setViewMode('vibes')}
        className={`flex flex-col items-center justify-center p-1 w-16 transition-colors ${
          viewMode === 'vibes' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <span className="material-symbols-outlined text-lg">forum</span>
        <span className="mt-0.5">VIBES</span>
      </button>

      <button 
        onClick={() => setViewMode('rooms')}
        className={`flex flex-col items-center justify-center p-1 w-16 transition-colors ${
          viewMode === 'rooms' ? 'text-cyan-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <span className="material-symbols-outlined text-lg">sensors</span>
        <span className="mt-0.5">ROOMS</span>
      </button>

      <button 
        onClick={() => setCreateModalOpen(true)}
        className="flex flex-col items-center justify-center p-1 w-16 text-amber-400 hover:text-amber-300"
      >
        <span className="material-symbols-outlined text-lg">add_box</span>
        <span className="mt-0.5">+VIBE</span>
      </button>

      <button 
        className="flex flex-col items-center justify-center p-1 w-16 text-zinc-500 hover:text-zinc-300"
      >
        <span className="material-symbols-outlined text-lg">account_circle</span>
        <span className="mt-0.5">PROFILE</span>
      </button>
    </nav>
  );
};
