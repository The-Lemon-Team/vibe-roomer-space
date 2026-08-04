import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VibeWidget, YoutubeWidgetLayout } from '../../store/useAtmosphericStore';
import { extractYouTubeId, getYouTubeThumbnail } from '../../utils/youtube';

interface YouTubeWidgetViewProps {
  widget: VibeWidget;
  className?: string;
  /** Controlled play state for list mode (only one track at a time) */
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

function sendYtCommand(iframe: HTMLIFrameElement | null, func: 'playVideo' | 'pauseVideo' | 'stopVideo') {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args: [] }),
    '*',
  );
}

/**
 * Compact player row: thumbnail + title. Audio plays via a visually hidden
 * YouTube iframe so the widget UI stays unchanged while sound runs in the background.
 */
export const YouTubePlayerRow: React.FC<{
  widget: VibeWidget;
  isPlaying: boolean;
  onTogglePlay: () => void;
}> = ({ widget, isPlaying, onTogglePlay }) => {
  const { t } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const ytId = extractYouTubeId(widget.url);
  const thumb = ytId ? getYouTubeThumbnail(ytId, 'hq') : null;
  const title = widget.title || t('widgets.defaultYoutube');
  const [iframeReady, setIframeReady] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  // Mount iframe only after the first play so idle rows stay light
  const [everPlayed, setEverPlayed] = useState(false);
  useEffect(() => {
    if (isPlaying) setEverPlayed(true);
  }, [isPlaying]);

  useEffect(() => {
    if (!iframeReady || !iframeRef.current) return;
    sendYtCommand(iframeRef.current, isPlaying ? 'playVideo' : 'pauseVideo');
  }, [isPlaying, iframeReady]);

  // Stop audio if this row unmounts while playing
  useEffect(() => {
    return () => {
      sendYtCommand(iframeRef.current, 'stopVideo');
    };
  }, []);

  if (!ytId) {
    return (
      <div className="p-2.5 flex items-center justify-between text-xs font-mono border-b border-zinc-800/80 last:border-b-0">
        <div className="flex items-center space-x-2 truncate text-zinc-300 min-w-0">
          <span className="material-symbols-outlined text-red-500 shrink-0">play_circle</span>
          <span className="truncate">{widget.url}</span>
        </div>
        <a
          href={widget.url}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-zinc-500 hover:text-cyan-400 underline ml-2 shrink-0"
        >
          {t('widgetsUi.watch')}
        </a>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-b border-zinc-800/80 last:border-b-0">
      {thumb && (
        <div
          className="absolute inset-0 opacity-20 blur-[2px] scale-110 pointer-events-none"
          style={{
            backgroundImage: `url(${thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-zinc-950/80 pointer-events-none" aria-hidden />

      {/* Hidden YouTube player — audio only, UI unchanged */}
      {everPlayed && (
        <iframe
          ref={iframeRef}
          key={ytId}
          src={`https://www.youtube-nocookie.com/embed/${ytId}?enablejsapi=1&autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => {
            setIframeReady(true);
            window.setTimeout(() => {
              sendYtCommand(
                iframeRef.current,
                isPlayingRef.current ? 'playVideo' : 'pauseVideo',
              );
            }, 150);
          }}
          className="absolute w-px h-px opacity-0 pointer-events-none -z-10"
          tabIndex={-1}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex items-center gap-3 p-3 w-full">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`relative w-12 h-12 rounded overflow-hidden shrink-0 border transition-colors ${
            isPlaying
              ? 'border-red-500/70 ring-1 ring-red-500/30'
              : 'border-zinc-700 hover:border-red-500/60'
          }`}
          aria-label={isPlaying ? t('widgets.pauseYoutube') : t('widgets.playYoutube')}
        >
          {thumb && (
            <img
              src={thumb}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/45 hover:bg-black/30 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-white text-2xl drop-shadow">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            {isPlaying && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            )}
            {t('widgets.layoutPlayer')}
          </div>
          <div className="text-xs font-bold text-zinc-100 truncate uppercase tracking-wide">
            {title}
          </div>
        </div>

        <a
          href={widget.url}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-zinc-400 hover:text-cyan-300 underline shrink-0"
        >
          [YT]
        </a>
      </div>
    </div>
  );
};

/** Full-width list of player-layout YouTube widgets (one playing at a time). */
export const YouTubePlayerList: React.FC<{
  widgets: VibeWidget[];
  className?: string;
}> = ({ widgets, className = '' }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (widgets.length === 0) return null;

  return (
    <div
      className={`w-full rounded-lg border border-zinc-800 bg-zinc-950/90 font-mono shadow-lg overflow-hidden ${className}`}
    >
      {widgets.map((widget) => (
        <YouTubePlayerRow
          key={widget.id}
          widget={widget}
          isPlaying={playingId === widget.id}
          onTogglePlay={() =>
            setPlayingId((prev) => (prev === widget.id ? null : widget.id))
          }
        />
      ))}
    </div>
  );
};

/**
 * Renders a YouTube vibe widget in either full-width embed or (standalone) player row.
 * Prefer YouTubePlayerList when showing several player-layout items together.
 */
export const YouTubeWidgetView: React.FC<YouTubeWidgetViewProps> = ({
  widget,
  className = '',
  isPlaying,
  onTogglePlay,
}) => {
  const { t } = useTranslation();
  const ytId = extractYouTubeId(widget.url);
  const layout = widget.layout === 'player' ? 'player' : 'full';
  const [localPlaying, setLocalPlaying] = useState(false);
  const playing = isPlaying ?? localPlaying;
  const toggle =
    onTogglePlay ??
    (() => {
      setLocalPlaying((p) => !p);
    });

  if (layout === 'player') {
    return (
      <div className={`w-full rounded-lg border border-zinc-800 overflow-hidden ${className}`}>
        <YouTubePlayerRow widget={widget} isPlaying={playing} onTogglePlay={toggle} />
      </div>
    );
  }

  const title = widget.title || t('widgets.defaultYoutube');

  if (!ytId) {
    return (
      <div
        className={`p-2.5 bg-zinc-950/90 border border-zinc-800 rounded flex items-center justify-between text-xs font-mono ${className}`}
      >
        <div className="flex items-center space-x-2 truncate text-zinc-300">
          <span className="material-symbols-outlined text-red-500">play_circle</span>
          <span className="truncate">{widget.url}</span>
        </div>
        <a
          href={widget.url}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-zinc-500 hover:text-cyan-400 underline ml-2 shrink-0"
        >
          {t('widgetsUi.watch')}
        </a>
      </div>
    );
  }

  return (
    <div
      className={`rounded overflow-hidden border border-zinc-800 bg-zinc-950 shadow-md w-full ${className}`}
    >
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
};

/** Split widgets into full embeds, player list, and link chips — for feed / vibe page. */
export function renderVibeWidgets(
  widgets: VibeWidget[],
  youtubeLayout: YoutubeWidgetLayout = 'full',
): {
  fullYoutube: VibeWidget[];
  playerYoutube: VibeWidget[];
  links: VibeWidget[];
} {
  const fullYoutube: VibeWidget[] = [];
  const playerYoutube: VibeWidget[] = [];
  const links: VibeWidget[] = [];
  const usePlayer = youtubeLayout === 'player';

  for (const w of widgets) {
    if (w.type === 'link') {
      links.push(w);
    } else if (usePlayer) {
      playerYoutube.push(w);
    } else {
      fullYoutube.push(w);
    }
  }

  return { fullYoutube, playerYoutube, links };
}
