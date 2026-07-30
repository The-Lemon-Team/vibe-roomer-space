import React from 'react';
import { useAtmosphericStore, VibeItem, VibeWidget } from '../../store/useAtmosphericStore';
import { CyberAudioPlayer } from '../Player/CyberAudioPlayer';

export interface VibeCardProps {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  keywords?: string[];
  images?: string[];
  widgets?: VibeWidget[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  authorName: string;
  authorId: string;
  currentUserId?: string;
  createdAt: string;
  vibeItem?: VibeItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const VibeCard: React.FC<VibeCardProps> = ({
  id,
  title,
  content,
  tags = [],
  keywords = [],
  images = [],
  widgets = [],
  videoUrl,
  musicUrl,
  authorName,
  authorId,
  currentUserId,
  createdAt,
  vibeItem,
  onEdit,
  onDelete,
}) => {
  const isOwner = currentUserId === authorId;
  const { 
    enterVibePage, 
    setSelectedVibeRoom, 
    setViewMode, 
    activeTag, 
    setActiveTag, 
    pinnedTags, 
    pinTag, 
    unpinTag,
    tagMode,
  } = useAtmosphericStore();

  // Combine tags and keywords fallback
  const displayTags = tags.length > 0 
    ? tags 
    : keywords.map((k) => (k.startsWith('#') ? k : `#${k}`));
  
  // The first tag is the primary routing tag
  const firstTag = displayTags[0] || '#general';

  // Combine item widgets with fallback legacy videoUrl
  const allWidgets: VibeWidget[] = [...(widgets || [])];
  if (allWidgets.length === 0 && videoUrl) {
    allWidgets.push({
      id: `widget-legacy-yt`,
      type: 'youtube',
      url: videoUrl,
      title: 'YouTube Stream Link'
    });
  }

  const handleEnterVibe = () => {
    if (vibeItem) {
      enterVibePage(vibeItem);
    }
  };

  const isRouteActive = firstTag.toLowerCase() === activeTag.toLowerCase();
  const routeActiveStyle = tagMode === 'live'
    ? 'bg-cyan-950/80 text-red-200 border border-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.15)] hover:border-red-400'
    : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/60 shadow-[0_0_8px_rgba(0,240,255,0.15)] hover:border-cyan-400';

  return (
    <article className="w-full max-w-2xl mx-auto my-4 bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden shadow-xl backdrop-blur-sm relative group font-sans">
      {/* Top Cyber Accent strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-amber-500 to-purple-500 opacity-60" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/60 border-b border-zinc-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-mono text-zinc-300 font-semibold">@{authorName}</span>
          <span className="text-xs font-mono text-zinc-600">• {createdAt}</span>
        </div>

        {/* Primary Route Tag Header Badge */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTag(firstTag)}
            title="Route feed by primary tag"
            className={`text-[10px] font-mono px-2.5 py-0.5 rounded uppercase tracking-widest transition-colors flex items-center space-x-1 ${
              isRouteActive
                ? routeActiveStyle
                : 'bg-zinc-950/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <span className="text-zinc-500 text-[9px]">ROUTE:</span>
            <span className="font-bold">{firstTag}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3">
        {title && (
          <h3 className="text-lg font-bold text-zinc-100 font-sans tracking-wide flex justify-between items-center">
            <span>{title}</span>
            {vibeItem && (
              <button
                onClick={handleEnterVibe}
                className="text-[10px] font-mono px-2.5 py-1 bg-amber-950/60 border border-amber-500/80 text-amber-400 hover:bg-amber-900/60 hover:text-amber-300 rounded transition-colors flex items-center space-x-1 shadow-[0_0_8px_rgba(255,176,0,0.2)]"
              >
                <span>[ ENTER VIBE ]</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            )}
          </h3>
        )}
        
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
          {content}
        </p>

        {/* Media Block: Image Grid & Main Cover Badge */}
        {images.length > 0 && (
          <div className={`grid gap-2 my-3 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {images.map((url, idx) => {
              const isMain = idx === 0;

              return (
                <div key={idx} className="relative overflow-hidden rounded border border-zinc-800 bg-zinc-950">
                  <img
                    src={url}
                    alt={`Media ${idx + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 border border-zinc-800">
                    {isMain ? 'MAIN COVER' : `IMG_0${idx + 1}`}
                  </div>
                  {isMain && images.length > 1 && (
                    <div className="absolute top-1 left-1 bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      ★ COVER
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Widgets Render Block (YouTube Embeds & External Link Widgets) */}
        {allWidgets.length > 0 && (
          <div className="space-y-2 my-3">
            {allWidgets.map((w, idx) => {
              if (w.type === 'youtube') {
                const ytId = extractYouTubeId(w.url);
                return (
                  <div key={w.id || idx} className="rounded overflow-hidden border border-zinc-800 bg-zinc-950 shadow-md">
                    {ytId ? (
                      <div className="relative pt-[56.25%] w-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                          title={w.title || 'YouTube Player'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full border-0"
                        />
                      </div>
                    ) : (
                      <div className="p-2.5 flex items-center justify-between text-xs font-mono text-cyan-400">
                        <div className="flex items-center space-x-2 truncate">
                          <span className="material-symbols-outlined text-red-500">play_circle</span>
                          <span className="text-zinc-300 truncate">{w.url}</span>
                        </div>
                        <a 
                          href={w.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[10px] text-zinc-500 hover:text-cyan-400 underline ml-2 shrink-0"
                        >
                          [WATCH]
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              // Default Link Widget
              return (
                <div key={w.id || idx} className="p-2.5 bg-zinc-950/90 border border-zinc-800 rounded flex items-center justify-between text-xs font-mono text-cyan-400">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="material-symbols-outlined text-cyan-400 text-sm">link</span>
                    <span className="text-zinc-200 font-bold truncate">{w.title || w.url}</span>
                  </div>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-zinc-400 hover:text-cyan-300 underline ml-2 shrink-0"
                  >
                    [OPEN LINK]
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Media Block: Cyber Audio Player */}
        {musicUrl && (
          <div className="pt-2">
            <CyberAudioPlayer 
              src={musicUrl}
              title={title ? `${title} Stream` : 'VIBE_AUDIO_STREAM'} 
              accentColor={firstTag === activeTag ? '#FFB000' : '#00F0FF'}
            />
          </div>
        )}

        {/* Hashtags Section with Menu Pinning */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 font-mono">
            {displayTags.map((tag, i) => {
              const formatted = tag.startsWith('#') ? tag : `#${tag}`;
              const isPinned = pinnedTags.some((pt) => pt.toLowerCase() === formatted.toLowerCase());
              const isActive = activeTag.toLowerCase() === formatted.toLowerCase();

              const activeStyle = tagMode === 'live'
                ? 'bg-cyan-950/60 border-red-500/80 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                : 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.2)]';

              return (
                <div 
                  key={i} 
                  className={`group/chip flex items-center rounded border text-xs transition-all ${
                    isActive 
                      ? activeStyle 
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveTag(formatted)}
                    className="px-2 py-0.5 hover:underline flex items-center space-x-1"
                  >
                    <span>{formatted}</span>
                  </button>

                  {/* Pin to Menu Button */}
                  <button
                    onClick={() => {
                      if (isPinned) unpinTag(formatted);
                      else pinTag(formatted);
                    }}
                    title={isPinned ? 'Unpin tag from menu' : 'Pin tag to top menu & sidebar'}
                    className={`px-1.5 py-0.5 border-l border-zinc-800 text-[10px] transition-colors ${
                      isPinned 
                        ? 'text-cyan-400 font-bold hover:text-red-400' 
                        : 'text-zinc-600 hover:text-cyan-400'
                    }`}
                  >
                    {isPinned ? '📌' : '+menu'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer / Owner Controls */}
      {isOwner && (
        <div className="flex items-center justify-end space-x-2 px-4 py-2 bg-zinc-950/40 border-t border-zinc-800/40 font-mono">
          <button
            onClick={() => onEdit?.(id)}
            className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded transition-colors"
          >
            [ ✏️ EDIT ]
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
          >
            [ 🗑 DELETE ]
          </button>
        </div>
      )}
    </article>
  );
};
