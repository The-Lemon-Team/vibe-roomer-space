import React from 'react';
import { VibeItem } from '../../store/useAtmosphericStore';

interface DeleteVibeModalProps {
  vibe: VibeItem | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteVibeModal: React.FC<DeleteVibeModalProps> = ({
  vibe,
  onConfirm,
  onCancel,
}) => {
  if (!vibe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none animate-fadeIn">
      <div className="bg-zinc-950 border border-red-500/60 rounded-lg max-w-md w-full overflow-hidden shadow-[0_0_25px_rgba(239,68,68,0.25)] space-y-0 relative">
        {/* Modal Top Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-red-950/40 border-b border-red-500/40">
          <div className="flex items-center space-x-2 text-xs font-bold text-red-400">
            <span className="material-symbols-outlined text-sm animate-pulse">warning</span>
            <span>[ SYSTEM WARNING :: CONFIRM DELETE ]</span>
          </div>
          <button 
            onClick={onCancel}
            className="text-zinc-500 hover:text-zinc-200 text-sm font-bold px-2 py-0.5 rounded hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <p className="text-zinc-200 font-sans text-sm font-semibold">
              Are you sure you want to delete this top level vibe?
            </p>
            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded space-y-1 text-[11px] font-mono">
              <div className="text-amber-400 font-bold truncate">Title: {vibe.title}</div>
              <div className="text-zinc-400">Author: @{vibe.authorName}</div>
              <div className="text-zinc-500">ID: {vibe.id}</div>
              {vibe.tags && vibe.tags.length > 0 && (
                <div className="text-cyan-400/80 text-[10px] truncate">
                  Tags: {vibe.tags.join(', ')}
                </div>
              )}
            </div>
            <p className="text-red-400/90 text-[11px] leading-relaxed">
              ⚠️ Warning: This action is permanent and will remove the vibe log and its atmospheric room configuration.
            </p>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded font-bold uppercase transition-colors"
            >
              [ ABORT / CANCEL ]
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded uppercase shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all flex items-center space-x-1"
            >
              <span>[ 🗑 CONFIRM DELETE ]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
