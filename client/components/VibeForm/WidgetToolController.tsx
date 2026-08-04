import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VibeWidget, YoutubeWidgetLayout } from '../../store/useAtmosphericStore';
import { extractYouTubeId, getYouTubeThumbnail, youtubeUrlsMatch } from '../../utils/youtube';

interface WidgetToolControllerProps {
  widgets: VibeWidget[];
  onChange: (widgets: VibeWidget[]) => void;
  /** Vibe-level YouTube display mode — applies to all YouTube links on this vibe */
  youtubeLayout: YoutubeWidgetLayout;
  onYoutubeLayoutChange: (layout: YoutubeWidgetLayout) => void;
  /** YouTube URL currently occupying the main poster slot (mutually exclusive with image main) */
  posterYoutubeUrl?: string | null;
  onPosterYoutubeChange?: (url: string | null) => void;
}

export const WidgetToolController: React.FC<WidgetToolControllerProps> = ({
  widgets,
  onChange,
  youtubeLayout,
  onYoutubeLayoutChange,
  posterYoutubeUrl = null,
  onPosterYoutubeChange,
}) => {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = useState<'youtube' | 'link' | null>(null);
  const [widgetUrl, setWidgetUrl] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');

  const youtubeCount = widgets.filter((w) => w.type === 'youtube').length;
  const previewYtId =
    activeTool === 'youtube' && widgetUrl.trim()
      ? extractYouTubeId(widgetUrl.trim())
      : null;

  const handleAddWidget = () => {
    if (!widgetUrl.trim() || !activeTool) return;
    const url = widgetUrl.trim();

    let title = widgetTitle.trim();
    if (!title && activeTool === 'youtube') {
      const ytId = extractYouTubeId(url);
      title = ytId ? `${t('widgets.defaultYoutube')} [${ytId}]` : t('widgets.defaultYoutube');
    } else if (!title) {
      title = t('widgets.defaultLink');
    }

    const newWidget: VibeWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: activeTool,
      url,
      title,
      ...(activeTool === 'youtube' ? { layout: youtubeLayout } : {}),
    };

    onChange([...widgets, newWidget]);
    setWidgetUrl('');
    setWidgetTitle('');
    setActiveTool(null);
  };

  const handleRemoveWidget = (id: string) => {
    const removed = widgets.find((w) => w.id === id);
    onChange(widgets.filter((w) => w.id !== id));
    if (
      removed?.type === 'youtube' &&
      posterYoutubeUrl &&
      youtubeUrlsMatch(removed.url, posterYoutubeUrl)
    ) {
      onPosterYoutubeChange?.(null);
    }
  };

  const handleLayoutChange = (layout: YoutubeWidgetLayout) => {
    onYoutubeLayoutChange(layout);
    // Keep stored widgets in sync with vibe-level setting
    onChange(
      widgets.map((w) => (w.type === 'youtube' ? { ...w, layout } : w)),
    );
  };

  const handleTogglePoster = (url: string) => {
    if (!onPosterYoutubeChange) return;
    if (youtubeUrlsMatch(url, posterYoutubeUrl)) {
      onPosterYoutubeChange(null);
    } else {
      onPosterYoutubeChange(url);
    }
  };

  return (
    <div className="space-y-2 font-mono">
      <div className="flex justify-between items-center">
        <label className="block text-zinc-400 font-bold uppercase text-xs">
          {t('widgets.controller')} ({widgets.length})
        </label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'youtube' ? null : 'youtube')}
            className={`text-xs px-2 py-1 rounded font-bold uppercase border transition-colors ${
              activeTool === 'youtube'
                ? 'bg-red-950/80 border-red-500 text-red-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-red-400'
            }`}
          >
            {t('widgets.addYoutube')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'link' ? null : 'link')}
            className={`text-xs px-2 py-1 rounded font-bold uppercase border transition-colors ${
              activeTool === 'link'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400'
            }`}
          >
            {t('widgets.addLink')}
          </button>
        </div>
      </div>

      {/* Vibe-level YouTube layout — applies to every YouTube link on this vibe */}
      <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 rounded space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] font-bold text-zinc-500 uppercase">
            {t('widgets.layoutLabel')}
            {youtubeCount > 0 && (
              <span className="text-zinc-600 font-normal normal-case ml-1">
                ({t('widgets.layoutAppliesToAll', { count: youtubeCount })})
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleLayoutChange('full')}
            className={`flex-1 text-[10px] px-2 py-1.5 rounded font-bold uppercase border transition-colors ${
              youtubeLayout === 'full'
                ? 'bg-red-950/80 border-red-500 text-red-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {t('widgets.layoutFull')}
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange('player')}
            className={`flex-1 text-[10px] px-2 py-1.5 rounded font-bold uppercase border transition-colors ${
              youtubeLayout === 'player'
                ? 'bg-red-950/80 border-red-500 text-red-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {t('widgets.layoutPlayer')}
          </button>
        </div>
        <p className="text-[9px] text-zinc-600 leading-snug">{t('widgets.layoutHint')}</p>
      </div>

      {youtubeCount > 0 && onPosterYoutubeChange && (
        <p className="text-[9px] text-amber-600/90 leading-snug flex items-start gap-1">
          <span className="material-symbols-outlined text-[12px] text-amber-400 shrink-0 mt-px">
            star
          </span>
          <span>{t('widgets.posterHint')}</span>
        </p>
      )}

      {activeTool && (
        <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>[ATTACH_{activeTool.toUpperCase()}_WIDGET]</span>
            <button
              type="button"
              onClick={() => setActiveTool(null)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            <input
              type="url"
              required
              placeholder={t('widgets.urlPlaceholder')}
              value={widgetUrl}
              onChange={(e) => setWidgetUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded p-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
            />
            <input
              type="text"
              placeholder={t('widgets.titlePlaceholder')}
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded p-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
            />
          </div>

          {activeTool === 'youtube' && previewYtId && youtubeLayout === 'player' && (
            <div className="flex items-center gap-2 p-2 bg-zinc-950 border border-zinc-800 rounded">
              <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 border border-zinc-700">
                <img
                  src={getYouTubeThumbnail(previewYtId, 'mq')}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-lg">
                    play_arrow
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-zinc-500">
                {t('widgets.thumbnailPreview')}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTool(null)}
              className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded text-xs"
            >
              {t('widgets.cancel')}
            </button>
            <button
              type="button"
              onClick={handleAddWidget}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-xs uppercase"
            >
              {t('widgets.attach')}
            </button>
          </div>
        </div>
      )}

      {widgets.length > 0 && (
        <div className="space-y-1.5">
          {widgets.map((widget) => {
            const ytId = widget.type === 'youtube' ? extractYouTubeId(widget.url) : null;
            const isPoster =
              widget.type === 'youtube' && youtubeUrlsMatch(widget.url, posterYoutubeUrl);

            return (
              <div
                key={widget.id}
                className={`p-2 bg-zinc-950 rounded flex items-center justify-between text-xs gap-2 border transition-colors ${
                  isPoster
                    ? 'border-amber-500/80 shadow-[0_0_10px_rgba(255,176,0,0.15)]'
                    : 'border-zinc-800'
                }`}
              >
                <div className="flex items-center space-x-2 truncate min-w-0">
                  {widget.type === 'youtube' && ytId ? (
                    <div className="relative w-9 h-9 rounded overflow-hidden shrink-0 border border-zinc-700 bg-zinc-900">
                      <img
                        src={getYouTubeThumbnail(ytId, 'mq')}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-base drop-shadow">
                          play_arrow
                        </span>
                      </div>
                    </div>
                  ) : widget.type === 'youtube' ? (
                    <span className="material-symbols-outlined text-red-500 text-base shrink-0">
                      play_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-cyan-400 text-base shrink-0">
                      link
                    </span>
                  )}
                  <div className="truncate min-w-0">
                    <div className="font-bold text-zinc-200 truncate flex items-center gap-1.5">
                      {isPoster && (
                        <span className="shrink-0 bg-amber-500 text-black font-bold text-[8px] px-1 py-0.5 rounded shadow">
                          {t('widgets.main')}
                        </span>
                      )}
                      <span className="truncate">{widget.title || widget.url}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">{widget.url}</div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  {widget.type === 'youtube' && onPosterYoutubeChange && (
                    <button
                      type="button"
                      onClick={() => handleTogglePoster(widget.url)}
                      className={`p-1 rounded transition-colors ${
                        isPoster
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-zinc-600 hover:text-amber-400 hover:bg-white/5'
                      }`}
                      title={
                        isPoster ? t('widgets.clearMainPoster') : t('widgets.setMainPoster')
                      }
                      aria-label={
                        isPoster ? t('widgets.clearMainPoster') : t('widgets.setMainPoster')
                      }
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={isPoster ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        star
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="text-zinc-500 hover:text-red-400 px-1 py-0.5 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
