import React, { useState, useEffect } from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';
import { useAuthStore } from '../../store/useAuthStore';
import { BaseModal } from '../Common/BaseModal';

export const CreateRoomModal: React.FC = () => {
  const {
    isCreateRoomModalOpen,
    vibeToCreateRoom,
    selectedVibePage,
    setCreateRoomModalOpen,
    createRoomFromVibe,
    createStandaloneRoom,
  } = useAtmosphericStore();

  const { isAuthenticated, setAuthModalOpen } = useAuthStore();

  useEffect(() => {
    if (isCreateRoomModalOpen && !isAuthenticated) {
      setCreateRoomModalOpen(false);
      setAuthModalOpen(true, 'login');
    }
  }, [isCreateRoomModalOpen, isAuthenticated, setCreateRoomModalOpen, setAuthModalOpen]);

  const starterVibe = vibeToCreateRoom || selectedVibePage;

  const [roomTitle, setRoomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [hashtagsInput, setHashtagsInput] = useState('#stream, #lofi');
  const [isPublic, setIsPublic] = useState(true);
  const [themeColor, setThemeColor] = useState('#00F0FF');

  useEffect(() => {
    if (starterVibe) {
      setRoomTitle(`ROOM :: ${starterVibe.title}`);
      setDescription(starterVibe.content || '');
      setThemeColor(starterVibe.roomConfig?.themeColor || '#00F0FF');
      setPosterUrl(
        starterVibe.images?.[0] || starterVibe.roomConfig?.bgImageUrl || '',
      );
      if (starterVibe.tags && starterVibe.tags.length > 0) {
        setHashtagsInput(starterVibe.tags.join(', '));
      }
    } else {
      setRoomTitle('NEON STREAM ROOM');
      setHashtagsInput('#stream, #lofi, #ambient');
    }
  }, [starterVibe, isCreateRoomModalOpen]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim()) return;

    const parsedTags = hashtagsInput
      .split(/[, ]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t.toLowerCase() : `#${t.toLowerCase()}`));

    if (starterVibe) {
      createRoomFromVibe(starterVibe, {
        title: roomTitle.trim(),
        isPublic,
        tags: parsedTags.length > 0 ? parsedTags : ['#stream'],
        roomConfig: {
          themeColor,
          bgImageUrl: posterUrl.trim() || undefined,
        },
      });
    } else {
      createStandaloneRoom({
        title: roomTitle.trim(),
        description: description.trim(),
        poster: posterUrl.trim() || undefined,
        isPublic,
        tags: parsedTags.length > 0 ? parsedTags : ['#stream'],
        roomConfig: {
          themeColor,
          bgImageUrl: posterUrl.trim() || undefined,
        },
      });
    }

    setCreateRoomModalOpen(false);
  };

  return (
    <BaseModal
      isOpen={isCreateRoomModalOpen}
      onClose={() => setCreateRoomModalOpen(false)}
      title="[ CREATE STREAM ROOM ]"
      headerIcon="sensors"
      maxWidth="max-w-lg"
      containerClassName="rounded-xl"
    >
      {/* Form Body */}
      <form onSubmit={handleCreate} className="p-6 space-y-4">
        {starterVibe && (
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded font-mono text-xs space-y-1">
            <div className="text-zinc-500 text-[10px]">STARTER VIBE-POINT:</div>
            <div className="text-amber-400 font-bold truncate">★ {starterVibe.title}</div>
          </div>
        )}

        {/* Room Title */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            ROOM NAME / IDENTIFIER
          </label>
          <input
            type="text"
            required
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
            placeholder="e.g. NEON LOFI STREAM ROOM"
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            STREAM DESCRIPTION
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Atmospheric audio/video stream description..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Attached Hashtags */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            ATTACHED HASHTAGS (Comma-separated)
          </label>
          <input
            type="text"
            value={hashtagsInput}
            onChange={(e) => setHashtagsInput(e.target.value)}
            placeholder="#stream, #lofi, #ambient"
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-amber-400 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Room Poster URL */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            ROOM POSTER / BACKGROUND IMAGE URL
          </label>
          <input
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-cyan-300 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Visibility Option: PUBLIC vs PRIVATE */}
        <div className="space-y-2 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            ROOM PRIVACY CONFIGURATION
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={`p-3 rounded border text-left transition-all ${
                isPublic
                  ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-1.5 font-bold">
                <span className="material-symbols-outlined text-sm">public</span>
                <span>PUBLIC ROOM</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 font-sans">
                Listed in tag rooms directory for all operators.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={`p-3 rounded border text-left transition-all ${
                !isPublic
                  ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(189,0,255,0.2)]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-1.5 font-bold">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>PRIVATE ROOM</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 font-sans">
                Restricted room for select participants.
              </div>
            </button>
          </div>
        </div>

        {/* Theme Color Picker */}
        <div className="space-y-2 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            ATMOSPHERIC NEON THEME COLOR
          </label>
          <div className="flex items-center space-x-3">
            {[
              { label: 'Cyan', color: '#00F0FF' },
              { label: 'Amber', color: '#FFB000' },
              { label: 'Purple', color: '#BD00FF' },
              { label: 'Emerald', color: '#10B981' },
              { label: 'Rose', color: '#F43F5E' },
            ].map((item) => (
              <button
                key={item.color}
                type="button"
                onClick={() => setThemeColor(item.color)}
                style={{ backgroundColor: item.color }}
                className={`w-7 h-7 rounded-full transition-transform ${
                  themeColor === item.color
                    ? 'ring-2 ring-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={item.label}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800 font-mono text-xs">
          <button
            type="button"
            onClick={() => setCreateRoomModalOpen(false)}
            className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all uppercase"
          >
            LAUNCH STREAM ROOM
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
