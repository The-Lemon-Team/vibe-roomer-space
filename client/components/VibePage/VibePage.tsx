import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setViewMode,
  setActiveTag,
  openEditVibeModal,
  setSelectedVibePage,
} from '../../store/uiSlice';
import { parseHashRoute } from '../../store/useAtmosphericStore';
import {
  useGetVibeByIdQuery,
  useAddVibeUpdateMutation,
  useAddTagToVibeMutation,
  useRemoveTagFromVibeMutation,
} from '../../store/api/vibesApi';
import { CyberAudioPlayer } from '../Player/CyberAudioPlayer';
import { YouTubeWidgetView, YouTubePlayerList, renderVibeWidgets } from '../VibeForm/YouTubeWidgetView';
import { ImageLightbox } from '../Common/ImageLightbox';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';
import { youtubeUrlsMatch } from '../../utils/youtube';
import type { VibeWidget } from '../../store/useAtmosphericStore';

export const VibePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const storedVibePage = useAppSelector((s) => s.ui.selectedVibePage);
  const user = useAppSelector((s) => s.auth.user);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  // Deep links (`#/vibe?id=…`) only set viewMode; hydrate the vibe via GET /vibes/:id
  const routeVibeId = parseHashRoute().vibeId;
  const vibeId = routeVibeId || storedVibePage?.id;
  const {
    data: fetchedVibe,
    isLoading: isLoadingVibe,
    isError: isVibeError,
  } = useGetVibeByIdQuery(vibeId!, { skip: !vibeId });

  useEffect(() => {
    if (fetchedVibe) {
      dispatch(setSelectedVibePage(fetchedVibe));
    }
  }, [fetchedVibe, dispatch]);

  const selectedVibePageResolved =
    fetchedVibe ??
    (storedVibePage && storedVibePage.id === vibeId ? storedVibePage : null);

  const [addVibeUpdateMutation] = useAddVibeUpdateMutation();
  const [addTagToVibeMutation] = useAddTagToVibeMutation();
  const [removeTagFromVibeMutation] = useRemoveTagFromVibeMutation();


  // Layout View Mode: 'unified' (In One Bar/Container) vs 'constructor' (Separated Modular Blocks)
  const [layoutMode, setLayoutMode] = useState<'unified' | 'constructor'>('unified');

  // Live update state
  const [updateContent, setUpdateContent] = useState('');
  const [updateMediaUrl, setUpdateMediaUrl] = useState('');
  const [isPostingUpdate, setIsPostingUpdate] = useState(false);

  // Tag adding state
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);

  // Settings dropdown state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!vibeId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-400 font-mono">
        <div className="text-amber-400 font-bold mb-2">{t('vibePage.noVibe')}</div>
        <button
          onClick={() => dispatch(setViewMode('vibes'))}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-cyan-500 text-xs"
        >
          {t('vibePage.returnFeed')}
        </button>
      </div>
    );
  }

  if (isLoadingVibe && !selectedVibePageResolved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-400 font-mono">
        <div className="text-cyan-400 font-bold mb-2">{t('vibePage.loading')}</div>
      </div>
    );
  }

  if (isVibeError || !selectedVibePageResolved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-400 font-mono">
        <div className="text-amber-400 font-bold mb-2">{t('vibePage.notFound')}</div>
        <button
          onClick={() => dispatch(setViewMode('vibes'))}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-cyan-500 text-xs"
        >
          {t('vibePage.returnFeed')}
        </button>
      </div>
    );
  }

  const selectedVibePage = selectedVibePageResolved;

  const isCreator =
    isAuthenticated &&
    !!user &&
    (user.id === selectedVibePage.authorId || user.username === selectedVibePage.authorName);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateContent.trim()) return;

    setIsPostingUpdate(true);
    const mediaUrls = updateMediaUrl.trim() ? [updateMediaUrl.trim()] : [];
    await addVibeUpdateMutation({ vibeId: selectedVibePage.id, content: updateContent.trim(), mediaUrls }).unwrap();
    setUpdateContent('');
    setUpdateMediaUrl('');
    setIsPostingUpdate(false);
  };

  const handleAddTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    setIsAddingTag(true);
    await addTagToVibeMutation({ vibeId: selectedVibePage.id, tag: newTagInput.trim() }).unwrap();
    setNewTagInput('');
    setIsAddingTag(false);
  };

  const vibeImages = selectedVibePage.images?.filter(Boolean) ?? [];
  const posterYoutubeUrl = selectedVibePage.roomConfig?.posterYoutubeUrl?.trim() || null;
  const allWidgets: VibeWidget[] = [...(selectedVibePage.widgets || [])];
  if (allWidgets.length === 0 && selectedVibePage.videoUrl) {
    allWidgets.push({
      id: `widget-legacy-yt`,
      type: 'youtube',
      url: selectedVibePage.videoUrl,
      title: t('vibeCard.youtubeLink'),
    });
  }
  const posterYoutubeWidget: VibeWidget | null = posterYoutubeUrl
    ? allWidgets.find(
        (w) => w.type === 'youtube' && youtubeUrlsMatch(w.url, posterYoutubeUrl),
      ) || {
        id: 'widget-poster-yt',
        type: 'youtube',
        url: posterYoutubeUrl,
        title: t('vibeCard.youtubeLink'),
      }
    : null;
  const streamWidgets = posterYoutubeUrl
    ? allWidgets.filter(
        (w) => !(w.type === 'youtube' && youtubeUrlsMatch(w.url, posterYoutubeUrl)),
      )
    : allWidgets;
  const coverImage = resolveMediaUrl(
    posterYoutubeWidget
      ? undefined
      : vibeImages[0] || selectedVibePage.roomConfig?.bgImageUrl,
  );

  /* Attached images gallery (all vibe images, URL-resolved for local uploads) */
  const renderImagesSection = () => {
    if (vibeImages.length === 0) return null;

    return (
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-1.5">
          <span className="font-bold uppercase tracking-wider flex items-center space-x-1 text-emerald-400">
            <span className="material-symbols-outlined text-sm">photo_library</span>
            <span>{t('vibePage.gallery')}</span>
          </span>
          <span className="text-[10px] text-zinc-500">
            {t('vibePage.photos')}
          </span>
        </div>

        <div
          className={`grid gap-3 ${
            vibeImages.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-2 sm:grid-cols-3'
          }`}
        >
          {vibeImages.map((url, idx) => {
            const isMain = !posterYoutubeWidget && idx === 0;
            return (
              <button
                type="button"
                key={`${url}-${idx}`}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-video rounded-lg border border-zinc-800 overflow-hidden bg-black group shadow cursor-pointer p-0 text-left"
                aria-label={t('common.galleryImage', { n: idx + 1 })}
              >
                <img
                  src={resolveMediaUrl(url)}
                  alt={`${selectedVibePage.title} — photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-1 right-1 pointer-events-none bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 border border-zinc-800">
                  {isMain ? t('vibePage.mainCover') : `IMG_0${idx + 1}`}
                </div>
                {isMain && vibeImages.length > 1 && (
                  <div className="absolute top-1 left-1 pointer-events-none bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    {t('vibePage.cover')}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* Creator action buttons */
  const renderOwnerActions = () => {
    if (!isAuthenticated || !isCreator) return null;
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(openEditVibeModal(selectedVibePage))}
          className="px-2.5 py-1.5 bg-zinc-900/90 hover:bg-amber-950 border border-zinc-700 hover:border-amber-400 text-amber-400 hover:text-amber-200 rounded transition-all shadow-md flex items-center gap-1 cursor-pointer font-mono text-[11px] font-bold uppercase"
          aria-label={t("vibePage.editVibe")}
        >
          <span className="material-symbols-outlined text-base">edit</span>
          <span>{t('vibePage.edit')}</span>
        </button>
      </div>
    );
  };

  /* Tag Management Render Block */
  const renderTagsSection = () => (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-1.5">
        <span className="font-bold uppercase tracking-wider flex items-center space-x-1">
          <span className="material-symbols-outlined text-sm text-amber-400">label</span>
          <span>{t('vibePage.hashtags')}</span>
        </span>
        <span className="text-[10px] text-zinc-500">
          {selectedVibePage.tags?.length || 0} {t('vibePage.tags')}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Existing Tags Chips */}
        {selectedVibePage.tags?.map((tag) => (
          <div
            key={tag}
            className="flex items-center space-x-1 px-2.5 py-1 bg-zinc-950 border border-zinc-800 hover:border-amber-500/80 text-amber-300 rounded transition-all group"
          >
            <button
              onClick={() => dispatch(setActiveTag(tag))}
              className="hover:underline flex items-center space-x-1"
            >
              <span>{tag}</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={() => removeTagFromVibeMutation({ vibeId: selectedVibePage.id, tag })}
                title={t("vibePage.removeTag")}
                className="text-zinc-600 hover:text-red-400 text-xs ml-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Dynamic Tag Adding Block */}
        {isAuthenticated && (
          <form
            onSubmit={handleAddTagSubmit}
            className="flex items-center bg-zinc-900 border border-zinc-700/80 rounded px-2 py-0.5 focus-within:border-cyan-400 transition-colors"
          >
            <span className="text-zinc-500 text-xs font-bold mr-1">#</span>
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder={t('vibePage.addTagPlaceholder')}
              className="bg-transparent text-xs text-zinc-200 focus:outline-none w-24 sm:w-28 font-mono"
            />
            <button
              type="submit"
              disabled={isAddingTag || !newTagInput.trim()}
              className="ml-1 text-[10px] px-2 py-0.5 bg-cyan-950 border border-cyan-700 text-cyan-400 hover:bg-cyan-900 rounded font-bold transition-colors uppercase disabled:opacity-50"
            >
              {t('vibePage.add')}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-zinc-950 bg-[radial-gradient(#1a779d50_1px,transparent_1px)] bg-[size:16px_16px] pb-20 lg:pb-8">
      {/* Header Navigation & Layout Mode Switcher */}
      <header className="sticky top-0 z-30 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md px-4 py-3 font-mono text-xs">
        <div className="max-w-[980px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => dispatch(setViewMode('vibes'))}
              className="flex items-center space-x-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/60 rounded text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>{t('vibePage.returnFeedBtn')}</span>
            </button>

            <span className="text-amber-400 font-bold truncate max-w-[220px] sm:max-w-[320px]">
              {selectedVibePage.title}
            </span>
          </div>

          {/* Mode Switcher: View Mode (One Bar Container) vs Constructor Mode (Modular Blocks) */}
          <div className="flex items-center bg-zinc-900 p-1 rounded border border-zinc-800 space-x-1">
            <button
              onClick={() => setLayoutMode('unified')}
              className={`px-3 py-1 rounded text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                layoutMode === 'unified'
                  ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(255,176,0,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">view_agenda</span>
              <span>{t('vibePage.unified')}</span>
            </button>

            <button
              onClick={() => setLayoutMode('constructor')}
              className={`px-3 py-1 rounded text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
                layoutMode === 'constructor'
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">widgets</span>
              <span>{t('vibePage.constructor')}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[980px] mx-auto p-4 md:p-6 space-y-6">
        {/* MODE 1: UNIFIED VIEW MODE ("In One Bar / Container") */}
        {layoutMode === 'unified' ? (
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md space-y-0 relative">
            {/* Top Accent Strip */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-cyan-500 to-purple-500" />

            {/* Unified Container Cover Header — image or YouTube poster slot */}
            {posterYoutubeWidget ? (
              <div className="relative w-full bg-black overflow-hidden border-b border-zinc-800">
                <YouTubeWidgetView widget={posterYoutubeWidget} className="w-full rounded-none border-0" />
                <div className="absolute top-2 left-2 z-[1] bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                  {t('vibePage.cover')}
                </div>
              </div>
            ) : (
              coverImage && (
                <div className="relative h-64 sm:h-80 w-full bg-black overflow-hidden">
                  <img
                    src={coverImage}
                    alt={selectedVibePage.title}
                    className="w-full h-full object-cover opacity-70 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                </div>
              )
            )}

            {/* Unified Container Content Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Vibe Meta Info & Create Room Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 group">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/70 text-amber-400 font-bold">
                    {t('vibePage.vibePoint')}
                  </span>
                  <span className="text-zinc-300 font-semibold">
                    @{selectedVibePage.authorName}
                  </span>
                  <span className="text-zinc-600">• {selectedVibePage.createdAt}</span>
                </div>

                {renderOwnerActions()}
              </div>

              {/* Title & Description Body */}
              <div className="space-y-3">
                <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-100 tracking-tight font-sans">
                  {selectedVibePage.title}
                </h1>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                  {selectedVibePage.content}
                </p>
              </div>

              {/* Attached Images Gallery */}
              {vibeImages.length > 0 && (
                <div className="pt-2">
                  {renderImagesSection()}
                </div>
              )}

              {/* Integrated Cyber Audio Stream */}
              {selectedVibePage.musicUrl && (
                <div className="pt-2">
                  <div className="text-xs font-mono text-cyan-400 font-bold mb-2 uppercase">
                    {t('vibePage.audioBlock')}
                  </div>
                  <CyberAudioPlayer
                    src={selectedVibePage.musicUrl}
                    title={selectedVibePage.title}
                    accentColor="#FFB000"
                  />
                </div>
              )}

              {/* Integrated Widgets (YouTube Embeds) — poster YT excluded (shown in cover) */}
              {streamWidgets.length > 0 && (() => {
                const youtubeLayout =
                  selectedVibePage.roomConfig?.youtubeLayout === 'player' ? 'player' : 'full';
                const { fullYoutube, playerYoutube } = renderVibeWidgets(
                  streamWidgets,
                  youtubeLayout,
                );
                if (fullYoutube.length === 0 && playerYoutube.length === 0) return null;
                return (
                  <div className="pt-2 space-y-3 w-full">
                    <div className="text-xs font-mono text-zinc-400 font-bold uppercase">
                      {t('vibePage.streamBlock')}
                    </div>
                    {fullYoutube.map((widget) => (
                      <YouTubeWidgetView key={widget.id} widget={widget} className="w-full" />
                    ))}
                    {playerYoutube.length > 0 && (
                      <YouTubePlayerList widgets={playerYoutube} className="w-full" />
                    )}
                  </div>
                );
              })()}

              {/* Unified Container Tags Section with Tag Adding Block */}
              <div className="pt-4 border-t border-zinc-800/80">
                {renderTagsSection()}
              </div>

              {/* Time-by-Time Updates Timeline inside Container */}
              <div className="pt-6 border-t border-zinc-800/80 font-mono space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <span className="material-symbols-outlined text-sm">history</span>
                    <span>{t('vibePage.logsBlock')} ({selectedVibePage.updates?.length || 0})</span>
                  </h3>
                  {isCreator && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      {t('vibePage.creatorModeration')}
                    </span>
                  )}
                </div>

                {isCreator && (
                  <form onSubmit={handlePostUpdate} className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                    <div className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                      <span>{t('vibePage.transmitUpdate')}</span>
                      <span className="text-[10px] text-zinc-500">{t('vibePage.creatorLog')}</span>
                    </div>
                    <textarea
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      placeholder={t('vibePage.updatePlaceholder')}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none min-h-[60px] font-sans"
                    />
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                      <input
                        type="url"
                        value={updateMediaUrl}
                        onChange={(e) => setUpdateMediaUrl(e.target.value)}
                        placeholder={t('vibePage.mediaUrlPlaceholder')}
                        className="w-full sm:flex-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none font-mono"
                      />
                      <button
                        type="submit"
                        disabled={isPostingUpdate || !updateContent.trim()}
                        className="w-full sm:w-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs rounded transition-colors uppercase"
                      >
                        {isPostingUpdate ? t('vibePage.posting') : t('vibePage.postUpdate')}
                      </button>
                    </div>
                  </form>
                )}

                {selectedVibePage.updates && selectedVibePage.updates.length > 0 && (
                  <div className="relative border-l-2 border-amber-500/40 ml-2 pl-4 space-y-3 pt-2">
                    {selectedVibePage.updates.map((update) => (
                      <div key={update.id} className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-amber-500 border border-zinc-950" />
                        <div className="bg-zinc-950/90 border border-zinc-800 rounded p-3 space-y-1">
                          <div className="flex justify-between items-center text-[10px] text-zinc-500">
                            <span className="text-amber-400 font-bold">{t('vibePage.vibeLog')}</span>
                            <span>{update.createdAt}</span>
                          </div>
                          <p className="text-xs text-zinc-300 font-sans">{update.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* MODE 2: CONSTRUCTOR MODE (Separated Modular Blocks Layout) */
          <div className="space-y-6">
            {/* Block 1: Banner & Header Block */}
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl">
              {posterYoutubeWidget ? (
                <div className="relative w-full overflow-hidden bg-black border-b border-zinc-800">
                  <YouTubeWidgetView widget={posterYoutubeWidget} className="w-full rounded-none border-0" />
                  <div className="absolute top-2 left-2 z-[1] bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    {t('vibePage.cover')}
                  </div>
                </div>
              ) : (
                coverImage && (
                  <div className="relative h-64 md:h-80 w-full overflow-hidden bg-black">
                    <img
                      src={coverImage}
                      alt={selectedVibePage.title}
                      className="w-full h-full object-cover opacity-60 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  </div>
                )
              )}

              <div className="p-6 relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3 group">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/60 text-amber-400 font-bold">
                      {t('vibePage.blockConstructor')}
                    </span>
                    <span className="text-zinc-400">@{selectedVibePage.authorName}</span>
                    <span className="text-zinc-600">• {selectedVibePage.createdAt}</span>
                  </div>

                  {renderOwnerActions()}
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-100 tracking-tight font-sans">
                  {selectedVibePage.title}
                </h1>

                <p className="text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                  {selectedVibePage.content}
                </p>
              </div>
            </div>

            {/* Block 2: Attached Photo Gallery */}
            {vibeImages.length > 0 && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5">
                {renderImagesSection()}
              </div>
            )}

            {/* Block 3: Tags Management Block with Add Tag Input */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5">
              {renderTagsSection()}
            </div>

            {/* Block 4: Audio Stream Player Block */}
            {selectedVibePage.musicUrl && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 font-mono space-y-2">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  {t('vibePage.audioBlock')}
                </div>
                <CyberAudioPlayer
                  src={selectedVibePage.musicUrl}
                  title={selectedVibePage.title}
                  accentColor="#00F0FF"
                />
              </div>
            )}

            {/* Block 5: Media Widgets Block — poster YT excluded (shown in cover) */}
            {streamWidgets.length > 0 && (() => {
              const youtubeLayout =
                selectedVibePage.roomConfig?.youtubeLayout === 'player' ? 'player' : 'full';
              const { fullYoutube, playerYoutube } = renderVibeWidgets(
                streamWidgets,
                youtubeLayout,
              );
              if (fullYoutube.length === 0 && playerYoutube.length === 0) return null;
              return (
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 font-mono space-y-4 w-full">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {t('vibePage.streamBlock')}
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {fullYoutube.map((widget) => (
                      <YouTubeWidgetView key={widget.id} widget={widget} className="w-full" />
                    ))}
                    {playerYoutube.length > 0 && (
                      <YouTubePlayerList widgets={playerYoutube} className="w-full" />
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Block 6: Time-by-Time Updates Timeline Block */}
            <section className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 font-mono space-y-6">
              <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                <div>
                  <h2 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-base">history</span>
                    <span>{t('vibePage.logsBlock')}</span>
                  </h2>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    {t('vibePage.logsHelper')}
                  </p>
                </div>

                {isCreator && (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    {t('vibePage.creatorModerationActive')}
                  </span>
                )}
              </div>

              {/* Form for Creator to Post Live Update */}
              {isCreator && (
                <form onSubmit={handlePostUpdate} className="bg-zinc-950 p-4 rounded border border-zinc-800 space-y-3">
                  <div className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                    <span>{t('vibePage.transmitUpdate')}</span>
                    <span className="text-[10px] text-zinc-500">{t('vibePage.creatorMode')}</span>
                  </div>
                  <textarea
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                    placeholder={t('vibePage.updatePlaceholder')}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none min-h-[70px] font-sans"
                  />
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                    <input
                      type="url"
                      value={updateMediaUrl}
                      onChange={(e) => setUpdateMediaUrl(e.target.value)}
                      placeholder={t('vibePage.mediaUrlPlaceholder')}
                      className="w-full sm:flex-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:border-amber-500 focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isPostingUpdate || !updateContent.trim()}
                      className="w-full sm:w-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs rounded transition-colors uppercase"
                    >
                      {isPostingUpdate ? t('vibePage.posting') : t('vibePage.postLive')}
                    </button>
                  </div>
                </form>
              )}

              {/* Updates Feed */}
              {!selectedVibePage.updates || selectedVibePage.updates.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-zinc-800/80 rounded bg-zinc-950/40 text-xs text-zinc-600">
                  {t('vibePage.noUpdates')}
                </div>
              ) : (
                <div className="relative border-l-2 border-amber-500/40 ml-3 pl-4 space-y-4">
                  {selectedVibePage.updates.map((update) => (
                    <div key={update.id} className="relative group">
                      <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-zinc-950" />
                      <div className="bg-zinc-950/80 border border-zinc-800 rounded p-3 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-zinc-500">
                          <span className="text-amber-400 font-bold">{t('vibePage.updateLog')}</span>
                          <span>{update.createdAt}</span>
                        </div>
                        <p className="text-xs text-zinc-300 whitespace-pre-line font-sans">
                          {update.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <ImageLightbox
        images={vibeImages}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        altPrefix={selectedVibePage.title}
      />
    </div>
  );
};
