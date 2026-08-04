import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCreateRoomModalOpen } from '../../store/uiSlice';
import { setAuthModalOpen } from '../../store/authSlice';
import { useCreateRoomMutation } from '../../store/api/roomsApi';
import { useGetVibesQuery } from '../../store/api/vibesApi';
import type { VibeItem } from '../../store/useAtmosphericStore';
import { BaseModal } from '../Common/BaseModal';
import { BackgroundImageModal } from './BackgroundImageModal';
import { HashtagAutocomplete } from '../VibeForm/HashtagAutocomplete';

const EMPTY_VIBES: VibeItem[] = [];

export const CreateRoomModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isCreateRoomModalOpen = useAppSelector((s) => s.ui.isCreateRoomModalOpen);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  const [createRoom] = useCreateRoomMutation();
  const { data: vibes = EMPTY_VIBES } = useGetVibesQuery(undefined, {
    skip: !isCreateRoomModalOpen,
  });

  useEffect(() => {
    if (isCreateRoomModalOpen && !isAuthenticated) {
      dispatch(setCreateRoomModalOpen({ open: false }));
      dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
    }
  }, [isCreateRoomModalOpen, isAuthenticated, dispatch]);

  const [sourceVibe, setSourceVibe] = useState<VibeItem | null>(null);
  const [vibeQuery, setVibeQuery] = useState('');
  const [isVibeDropdownOpen, setIsVibeDropdownOpen] = useState(false);
  const vibePickerRef = useRef<HTMLDivElement>(null);

  const [roomTitle, setRoomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#stream', '#lofi']);
  const [isPublic, setIsPublic] = useState(true);
  const [themeColor, setThemeColor] = useState('#00F0FF');
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  const resetForm = () => {
    setSourceVibe(null);
    setVibeQuery('');
    setIsVibeDropdownOpen(false);
    setRoomTitle(t('createRoom.defaultTitle'));
    setDescription('');
    setPosterUrl('');
    setSelectedTags(['#stream', '#lofi', '#ambient']);
    setIsPublic(true);
    setThemeColor('#00F0FF');
  };

  useEffect(() => {
    if (isCreateRoomModalOpen) {
      resetForm();
    }
  }, [isCreateRoomModalOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (vibePickerRef.current && !vibePickerRef.current.contains(e.target as Node)) {
        setIsVibeDropdownOpen(false);
      }
    };
    if (isVibeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVibeDropdownOpen]);

  const applySourceVibe = (vibe: VibeItem | null) => {
    setSourceVibe(vibe);
    setVibeQuery('');
    setIsVibeDropdownOpen(false);
    if (vibe) {
      setRoomTitle(`ROOM :: ${vibe.title}`);
      setDescription(vibe.content || '');
      setThemeColor(vibe.roomConfig?.themeColor || '#00F0FF');
      setPosterUrl(vibe.roomConfig?.bgImageUrl || '');
      if (vibe.tags && vibe.tags.length > 0) {
        setSelectedTags(vibe.tags);
      }
    }
  };

  const filteredVibes = vibes.filter((v) => {
    if (!vibeQuery.trim()) return true;
    const q = vibeQuery.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      (v.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle.trim()) return;

    const parsedTags = selectedTags;

    createRoom({
      title: roomTitle.trim(),
      description: description.trim(),
      poster: posterUrl.trim() || undefined,
      isPublic,
      tags: parsedTags.length > 0 ? parsedTags : ['#stream'],
      originVibeId: sourceVibe?.id,
      originVibeTitle: sourceVibe?.title,
      roomConfig: {
        themeColor,
        bgImageUrl: posterUrl.trim() || undefined,
      },
    });

    dispatch(setCreateRoomModalOpen({ open: false }));
  };

  return (
    <>
      <BaseModal
      isOpen={isCreateRoomModalOpen}
      onClose={() => dispatch(setCreateRoomModalOpen({ open: false }))}
      title={t('createRoom.title')}
      headerIcon="sensors"
      maxWidth="max-w-lg"
      containerClassName="rounded-xl"
    >
      {/* Form Body */}
      <form onSubmit={handleCreate} className="p-6 space-y-4">
        {/* Source Vibe selector */}
        <div className="space-y-1 font-mono text-xs" ref={vibePickerRef}>
          <label className="block text-zinc-300 font-semibold">
            {t('createRoom.sourceVibe')}
          </label>
          {sourceVibe ? (
            <div className="flex items-center justify-between gap-2 p-3 bg-zinc-900/60 border border-amber-500/40 rounded">
              <div className="min-w-0 space-y-0.5">
                <div className="text-zinc-500 text-[10px]">{t('createRoom.starter')}</div>
                <div className="text-amber-400 font-bold truncate">★ {sourceVibe.title}</div>
              </div>
              <button
                type="button"
                onClick={() => applySourceVibe(null)}
                className="shrink-0 px-2 py-1 text-[10px] text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-500/50 rounded transition-colors uppercase"
              >
                {t('createRoom.clearSource')}
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={vibeQuery}
                onChange={(e) => {
                  setVibeQuery(e.target.value);
                  setIsVibeDropdownOpen(true);
                }}
                onFocus={() => setIsVibeDropdownOpen(true)}
                placeholder={t('createRoom.sourceVibePlaceholder')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-cyan-400 focus:outline-none"
              />
              {isVibeDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto bg-zinc-950 border border-zinc-700 rounded shadow-xl">
                  {filteredVibes.length === 0 ? (
                    <div className="px-3 py-2 text-zinc-500 text-[10px]">
                      {t('createRoom.sourceVibeEmpty')}
                    </div>
                  ) : (
                    filteredVibes.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => applySourceVibe(v)}
                        className="w-full text-left px-3 py-2 hover:bg-cyan-950/50 border-b border-zinc-800/60 last:border-0 transition-colors"
                      >
                        <div className="text-zinc-100 font-bold truncate">{v.title}</div>
                        {v.tags && v.tags.length > 0 && (
                          <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                            {v.tags.slice(0, 4).join(' ')}
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          <p className="text-[10px] text-zinc-500">{t('createRoom.sourceVibeHelp')}</p>
        </div>

        {/* Room Title */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            {t('createRoom.name')}
          </label>
          <input
            type="text"
            required
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
            placeholder={t('createRoom.namePlaceholder')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            {t('createRoom.description')}
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('createRoom.descriptionPlaceholder')}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        {/* Attached Hashtags */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold">
            {t('createRoom.hashtags')}
          </label>
          <HashtagAutocomplete
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        {/* Room Poster URL */}
        <div className="space-y-1 font-mono text-xs">
          <label className="block text-zinc-300 font-semibold flex justify-between items-center">
            <span>{t('createRoom.background')}</span>
            <button
              type="button"
              onClick={() => setIsBgModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-bold uppercase text-[10px] tracking-wider transition-colors"
            >
              {t('createRoom.chooseTheme')}
            </button>
          </label>
          <input
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="Default: Empty -> Standard Black Cells Grid"
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-cyan-300 focus:border-cyan-400 focus:outline-none"
          />
          {posterUrl && (
            <div className="mt-2 relative rounded overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video w-full max-w-sm">
              <img
                src={posterUrl}
                alt="Background Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm border border-zinc-700 text-cyan-400 text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
                {t('createRoom.preview')}
              </div>
            </div>
          )}
          <p className="text-[10px] text-zinc-500">
            {t('createRoom.help')}
          </p>
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
                <span>{t('createRoom.public')}</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 font-sans">
                {t('createRoom.publicDesc')}
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
                <span>{t('createRoom.private')}</span>
              </div>
              <div className="text-[10px] text-zinc-400 mt-1 font-sans">
                {t('createRoom.privateDesc')}
              </div>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800 font-mono text-xs">
          <button
            type="button"
            onClick={() => dispatch(setCreateRoomModalOpen({ open: false }))}
            className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {t('createRoom.cancel')}
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all uppercase"
          >
            {t('createRoom.launch')}
          </button>
        </div>
      </form>
    </BaseModal>
    <BackgroundImageModal
      isOpen={isBgModalOpen}
      onClose={() => setIsBgModalOpen(false)}
      onSelect={(url) => setPosterUrl(url)}
      currentUrl={posterUrl}
    />
    </>
  );
};
