import React, { useState } from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

export const OperatorSidebar: React.FC = () => {
  const { 
    activeTag, 
    setActiveTag, 
    pinnedTags, 
    pinTag, 
    unpinTag, 
    setCreateModalOpen, 
    viewMode, 
    setViewMode,
    vibes 
  } = useAtmosphericStore();

  const [sidebarTagInput, setSidebarTagInput] = useState('');

  // Extract all unique hashtags across all vibes
  const allDiscoveredTags = Array.from(
    new Set(vibes.flatMap((v) => v.tags || []))
  );

  // Tags that are not yet pinned to the menu
  const unpinnedDiscoveredTags = allDiscoveredTags.filter(
    (t) => !pinnedTags.some((pt) => pt.toLowerCase() === t.toLowerCase())
  );

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarTagInput.trim()) return;
    const formatted = sidebarTagInput.trim().startsWith('#')
      ? sidebarTagInput.trim().toLowerCase()
      : `#${sidebarTagInput.trim().toLowerCase()}`;
    pinTag(formatted);
    setActiveTag(formatted);
    setSidebarTagInput('');
  };

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
          onClick={() => setViewMode('vibes')}
          className={`py-1.5 text-center font-bold rounded transition-colors ${
            viewMode === 'vibes' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          [VIBES]
        </button>
        <button
          onClick={() => setViewMode('rooms')}
          className={`py-1.5 text-center font-bold rounded transition-colors ${
            viewMode === 'rooms' ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          [ROOMS]
        </button>
      </div>

      {/* Dynamic Hashtag Section */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
        {/* Pinned Menu Tags */}
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2 border-b border-zinc-800 pb-1 flex justify-between items-center">
            <span>PINNED MENU HASHTAGS</span>
            <span className="text-cyan-400">{pinnedTags.length}</span>
          </div>

          {/* All Tag Option */}
          <button
            onClick={() => setActiveTag('#ALL')}
            className={`w-full text-left p-2 text-xs font-bold uppercase transition-all rounded border-l-2 mb-1 flex items-center justify-between ${
              activeTag === '#ALL'
                ? 'bg-zinc-900 border-l-cyan-400 text-cyan-400'
                : 'text-zinc-400 border-l-transparent hover:bg-zinc-900/40 hover:text-zinc-200'
            }`}
          >
            <span>#ALL (SHOW EVERY VIBE)</span>
            {activeTag === '#ALL' && <span className="text-[10px]">●</span>}
          </button>

          {/* List of Pinned Tags */}
          <div className="space-y-1">
            {pinnedTags.map((tag) => {
              const isActive = activeTag.toLowerCase() === tag.toLowerCase();
              const tagCount = vibes.filter((v) => 
                v.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
              ).length;

              return (
                <div key={tag} className="flex items-center group">
                  <button
                    onClick={() => setActiveTag(tag)}
                    className={`flex-1 text-left p-2 text-xs font-bold uppercase transition-all rounded-l border-l-2 flex items-center justify-between ${
                      isActive
                        ? 'bg-zinc-900 border-l-amber-400 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.15)]'
                        : 'text-zinc-400 border-l-transparent hover:bg-zinc-900/40 hover:text-zinc-200'
                    }`}
                  >
                    <span className="truncate">{tag}</span>
                    <span className="text-[10px] text-zinc-600 font-normal">[{tagCount}]</span>
                  </button>

                  <button
                    onClick={() => unpinTag(tag)}
                    title="Unpin tag from menu"
                    className="p-2 text-zinc-600 hover:text-red-400 bg-zinc-900/20 hover:bg-zinc-900 rounded-r text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pin Custom Tag Form */}
        <form onSubmit={handleAddCustomTag} className="pt-1">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
            <input
              type="text"
              placeholder="+ Pin custom #tag"
              value={sidebarTagInput}
              onChange={(e) => setSidebarTagInput(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-zinc-200 p-2 w-full placeholder-zinc-600"
            />
            <button 
              type="submit" 
              className="px-2.5 py-2 bg-zinc-800 text-cyan-400 hover:bg-cyan-950 font-bold text-xs border-l border-zinc-800 transition-colors"
            >
              +
            </button>
          </div>
        </form>

        {/* Discovered / Unpinned Tags */}
        {unpinnedDiscoveredTags.length > 0 && (
          <div className="pt-2 border-t border-zinc-800/80">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2">
              DISCOVERED HASHTAGS
            </div>
            <div className="flex flex-wrap gap-1.5 px-1">
              {unpinnedDiscoveredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => pinTag(tag)}
                  title="Click to pin tag to menu"
                  className="text-[10px] bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400 px-2 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <span className="text-[9px] text-cyan-500 font-bold">+</span>
                </button>
              ))}
            </div>
          </div>
        )}
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
