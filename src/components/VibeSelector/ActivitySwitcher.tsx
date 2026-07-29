import React, { useState } from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

export const ActivitySwitcher: React.FC = () => {
  const { activeTag, setActiveTag, pinnedTags, pinTag, unpinTag } = useAtmosphericStore();
  const [newTagInput, setNewTagInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.trim().startsWith('#') 
      ? newTagInput.trim().toLowerCase() 
      : `#${newTagInput.trim().toLowerCase()}`;
    pinTag(formatted);
    setActiveTag(formatted);
    setNewTagInput('');
    setIsAdding(false);
  };

  return (
    <div className="w-full bg-zinc-950/80 p-3 overflow-x-auto no-scrollbar font-mono text-xs select-none backdrop-blur-md">
      <div className="flex items-center space-x-2 min-w-max">
        <span className="text-zinc-500 uppercase tracking-widest mr-1 text-[11px] font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-sm text-cyan-400">tag</span>
          <span>[MENU_TAGS]:</span>
        </span>

        {/* All Vibes Button */}
        <button
          onClick={() => setActiveTag('#ALL')}
          className={`px-3 py-1.5 font-bold uppercase transition-all duration-200 rounded border flex items-center space-x-1 ${
            activeTag === '#ALL'
              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
              : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
          }`}
        >
          {activeTag === '#ALL' && <span className="text-cyan-400 text-[10px]">●</span>}
          <span>#ALL</span>
        </button>

        {/* Pinned Hashtags List */}
        {pinnedTags.map((tag) => {
          const isActive = activeTag.toLowerCase() === tag.toLowerCase();

          return (
            <div key={tag} className="relative group flex items-center">
              <button
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 font-bold uppercase transition-all duration-200 rounded border flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {isActive && <span className="text-amber-400 text-[10px]">●</span>}
                <span>{tag}</span>
              </button>

              {/* Unpin Action Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  unpinTag(tag);
                }}
                title="Unpin tag from menu"
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-zinc-600 hover:text-red-400 p-0.5"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* Add Tag to Menu Button / Input */}
        {isAdding ? (
          <form onSubmit={handleAddTag} className="flex items-center space-x-1 bg-zinc-900 border border-cyan-500/60 rounded px-2 py-0.5">
            <span className="text-cyan-400 font-bold">#</span>
            <input
              type="text"
              autoFocus
              placeholder="newtag"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              className="bg-transparent border-none outline-none text-zinc-100 w-20 text-xs"
            />
            <button type="submit" className="text-cyan-400 font-bold hover:text-cyan-300">
              +
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-zinc-500 hover:text-zinc-300 ml-1 text-xs"
            >
              ✕
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="px-2.5 py-1.5 text-zinc-500 hover:text-cyan-400 border border-dashed border-zinc-800 hover:border-cyan-500/50 rounded flex items-center space-x-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>PIN TAG</span>
          </button>
        )}
      </div>
    </div>
  );
};
