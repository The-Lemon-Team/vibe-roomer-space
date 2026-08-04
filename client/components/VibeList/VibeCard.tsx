import React from "react";
import { useTranslation } from "react-i18next";
import type {
  GalleryLayout,
  VibeItem,
  VibeWidget,
} from "../../store/useAtmosphericStore";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  enterVibePage,
  setActiveTag,
  addMyTag,
  removeMyTag,
} from "../../store/uiSlice";
import { CyberAudioPlayer } from "../Player/CyberAudioPlayer";
import { YouTubeWidgetView, YouTubePlayerList, renderVibeWidgets } from "../VibeForm/YouTubeWidgetView";
import { resolveMediaUrl } from "../../utils/resolveMediaUrl";
import { youtubeUrlsMatch } from "../../utils/youtube";

function resolveGalleryLayout(layout?: GalleryLayout): GalleryLayout {
  if (layout === "main_focus" || layout === "main_only") return layout;
  return "gallery";
}

function VibeGallery({
  images,
  title,
  layout,
  posterYoutube,
}: {
  images: string[];
  title: string;
  layout: GalleryLayout;
  posterYoutube?: VibeWidget | null;
}) {
  const { t } = useTranslation();
  const galleryImages = images.filter(Boolean);
  const hasYoutubePoster = Boolean(posterYoutube);
  if (galleryImages.length === 0 && !hasYoutubePoster) return null;

  const coverAlt = title || t("vibeCard.coverAlt");
  const isMainOnly = layout === "main_only";
  // When YouTube holds the poster, all images are gallery extras
  const extras = hasYoutubePoster
    ? galleryImages
    : galleryImages.slice(1);
  const showExtras = !isMainOnly && extras.length > 0;
  const isMainFocus = layout === "main_focus";

  const coverHeight = isMainOnly
    ? "h-64 sm:h-80 md:h-96"
    : isMainFocus
      ? "h-48 sm:h-64"
      : "h-40 sm:h-52";

  return (
    <div
      className={`flex flex-col gap-[6px] overflow-hidden bg-zinc-950 ${
        isMainOnly
          ? "w-[calc(100%+2rem)] -mx-4 my-1 border-y border-zinc-800 p-0"
          : "my-1 w-[90%] mx-auto rounded-lg border border-zinc-800 p-[6px]"
      }`}
    >
      <div className={`relative overflow-hidden ${isMainOnly ? "" : "rounded"}`}>
        {posterYoutube ? (
          <YouTubeWidgetView widget={posterYoutube} className="w-full" />
        ) : (
          <img
            src={resolveMediaUrl(galleryImages[0])}
            alt={coverAlt}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${coverHeight}`}
          />
        )}
        {!isMainOnly && !posterYoutube && (
          <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 border border-zinc-800">
            {t("vibeCard.mainCover")}
          </div>
        )}
        {(showExtras || posterYoutube) && (
          <div className="absolute top-1 left-1 z-[1] bg-amber-500 text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
            {t("vibeCard.cover")}
          </div>
        )}
      </div>

      {showExtras && isMainFocus && (
        <div className="flex flex-wrap gap-[6px]">
          {extras.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden rounded border border-zinc-800 bg-zinc-950"
            >
              <img
                src={resolveMediaUrl(url)}
                alt={`${coverAlt} — ${idx + (hasYoutubePoster ? 1 : 2)}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}

      {showExtras && !isMainFocus && (
        <div
          className={`grid gap-[6px] ${
            extras.length === 1
              ? "grid-cols-1"
              : extras.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
          }`}
        >
          {extras.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative h-24 sm:h-28 overflow-hidden rounded bg-zinc-950"
            >
              <img
                src={resolveMediaUrl(url)}
                alt={`${coverAlt} — ${idx + (hasYoutubePoster ? 1 : 2)}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 border border-zinc-800">
                IMG_0{idx + (hasYoutubePoster ? 1 : 2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
  /** Owner or admin editor controls */
  editable?: boolean;
  /** Admin: show Main Feed toggle */
  showMainFeedToggle?: boolean;
  onToggleMainFeed?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

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
  editable,
  showMainFeedToggle,
  onToggleMainFeed,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const myTags = useAppSelector((s) => s.ui.myTags);
  const tagMode = useAppSelector((s) => s.ui.tagMode);

  const isOwner = currentUserId === authorId;
  const canEdit = editable ?? isOwner;

  // Combine tags and keywords fallback
  const displayTags =
    tags.length > 0
      ? tags
      : keywords.map((k) => (k.startsWith("#") ? k : `#${k}`));

  // The first tag is the primary routing tag
  const firstTag = displayTags[0] || "#general";

  // Combine item widgets with fallback legacy videoUrl
  const allWidgets: VibeWidget[] = [...(widgets.length ? widgets : vibeItem?.widgets || [])];
  if (allWidgets.length === 0 && videoUrl) {
    allWidgets.push({
      id: `widget-legacy-yt`,
      type: "youtube",
      url: videoUrl,
      title: t("vibeCard.youtubeLink"),
    });
  }

  const posterYoutubeUrl = vibeItem?.roomConfig?.posterYoutubeUrl?.trim() || null;
  const posterYoutubeWidget =
    posterYoutubeUrl
      ? allWidgets.find(
          (w) => w.type === "youtube" && youtubeUrlsMatch(w.url, posterYoutubeUrl),
        ) || {
          id: "widget-poster-yt",
          type: "youtube" as const,
          url: posterYoutubeUrl,
          title: t("vibeCard.youtubeLink"),
        }
      : null;

  const streamWidgets = posterYoutubeUrl
    ? allWidgets.filter(
        (w) => !(w.type === "youtube" && youtubeUrlsMatch(w.url, posterYoutubeUrl)),
      )
    : allWidgets;

  const youtubeLayout =
    vibeItem?.roomConfig?.youtubeLayout === "player" ? "player" : "full";
  const { fullYoutube, playerYoutube, links } = renderVibeWidgets(
    streamWidgets,
    youtubeLayout,
  );

  const galleryLayout = resolveGalleryLayout(vibeItem?.roomConfig?.galleryLayout);

  const handleEnterVibe = () => {
    if (vibeItem) {
      dispatch(enterVibePage(vibeItem));
    }
  };

  const isRouteActive = firstTag.toLowerCase() === activeTag.toLowerCase();
  const routeActiveStyle =
    tagMode === "all_vibes"
      ? "bg-cyan-950/80 text-red-200 border border-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.15)] hover:border-red-400"
      : "bg-cyan-950/80 text-cyan-400 border border-cyan-500/60 shadow-[0_0_8px_rgba(0,240,255,0.15)] hover:border-cyan-400";

  // Personal pin on My Tags / My vibes / Private. Public menu tags are curated on Admin.
  const canPinPersonalTag =
    tagMode === "my_tags" || tagMode === "my_vibes" || tagMode === "live";

  return (
    <article className="w-full mx-auto my-4 bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden shadow-xl backdrop-blur-sm relative group font-sans">
      {/* Top Cyber Accent strip */}
      <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-amber-500 to-purple-500 opacity-60" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/60 border-b border-zinc-800/60">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-mono text-zinc-300 font-semibold">
            @{authorName}
          </span>
          <span className="text-xs font-mono text-zinc-600">• {createdAt}</span>
        </div>

        {/* Primary Route Tag Header Badge */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(setActiveTag(firstTag))}
            title={t("vibeCard.routeByTag")}
            className={`text-[10px] font-mono px-2.5 py-0.5 rounded uppercase tracking-widest transition-colors flex items-center space-x-1 ${
              isRouteActive
                ? routeActiveStyle
                : "bg-zinc-950/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            <span className="text-zinc-500 text-[9px]">{t("common.route")}</span>
            <span className="font-bold">{firstTag}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3">
        {title && (
          <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-100 font-sans tracking-tight flex justify-between items-start gap-3">
            <span>{title}</span>
            {vibeItem && (
              <button
                onClick={handleEnterVibe}
                className="shrink-0 text-[10px] font-mono px-2.5 py-1 bg-amber-950/60 border border-amber-500/80 text-amber-400 hover:bg-amber-900/60 hover:text-amber-300 rounded transition-colors flex items-center space-x-1 shadow-[0_0_8px_rgba(255,176,0,0.2)]"
              >
                <span>{t('vibeCard.enterVibe')}</span>
                <span className="material-symbols-outlined text-xs">
                  arrow_forward
                </span>
              </button>
            )}
          </h3>
        )}

        <VibeGallery
          images={images}
          title={title}
          layout={galleryLayout}
          posterYoutube={posterYoutubeWidget}
        />

        <p className="text-base md:text-lg text-zinc-200 leading-relaxed whitespace-pre-line font-sans">
          {content}
        </p>

        {/* Widgets Render Block (YouTube Embeds & External Link Widgets) */}
        {streamWidgets.length > 0 && (
          <div className="space-y-2 my-3 w-full">
            {fullYoutube.map((w, idx) => (
              <YouTubeWidgetView key={w.id || idx} widget={w} className="w-full" />
            ))}

            {playerYoutube.length > 0 && (
              <YouTubePlayerList widgets={playerYoutube} className="w-full" />
            )}

            {links.map((w, idx) => (
              <div
                key={w.id || idx}
                className="p-2.5 bg-zinc-950/90 border border-zinc-800 rounded flex items-center justify-between text-xs font-mono text-cyan-400"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="material-symbols-outlined text-cyan-400 text-sm">
                    link
                  </span>
                  <span className="text-zinc-200 font-bold truncate">
                    {w.title || w.url}
                  </span>
                </div>
                <a
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-zinc-400 hover:text-cyan-300 underline ml-2 shrink-0"
                >
                  {t('vibeCard.openLink')}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Media Block: Cyber Audio Player */}
        {musicUrl && (
          <div className="pt-2">
            <CyberAudioPlayer
              src={musicUrl}
              title={title ? `${title} Stream` : "VIBE_AUDIO_STREAM"}
              accentColor={firstTag === activeTag ? "#FFB000" : "#00F0FF"}
            />
          </div>
        )}

        {/* Hashtags Section with Menu Pinning */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 font-mono">
            {displayTags.map((tag, i) => {
              const formatted = tag.startsWith("#") ? tag : `#${tag}`;
              const isPinned = myTags.some(
                (pt) => pt.toLowerCase() === formatted.toLowerCase(),
              );
              const isActive =
                activeTag.toLowerCase() === formatted.toLowerCase();

              return (
                <div
                  key={i}
                  className={`group/chip flex items-center rounded border text-sm md:text-base font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                      : "bg-amber-950/40 border-amber-500/60 text-amber-400 hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_8px_rgba(251,191,36,0.2)]"
                  }`}
                >
                  <button
                    onClick={() => dispatch(setActiveTag(formatted))}
                    className="px-3 py-1 hover:underline flex items-center space-x-1"
                  >
                    <span>{formatted}</span>
                  </button>

                  {canPinPersonalTag && (
                    <button
                      onClick={() => {
                        if (isPinned) dispatch(removeMyTag(formatted));
                        else dispatch(addMyTag(formatted));
                      }}
                      title={isPinned ? t("vibeCard.removeFromMyTags") : t("vibeCard.saveToMyTags")}
                      className={`px-2 py-1 border-l border-amber-500/40 text-xs transition-colors ${
                        isPinned
                          ? "text-amber-300 font-bold hover:text-red-400"
                          : "text-amber-600 hover:text-amber-300"
                      }`}
                    >
                      {isPinned ? "📌" : t("vibeCard.addMenu")}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer / Owner & Admin Controls */}
      {(canEdit || showMainFeedToggle) && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-zinc-950/40 border-t border-zinc-800/40 font-mono">
          <div className="flex items-center gap-2">
            {showMainFeedToggle && (
              <button
                onClick={onToggleMainFeed}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  vibeItem?.inMainFeed
                    ? "border-emerald-600/70 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40"
                    : "border-zinc-700 text-zinc-500 hover:text-emerald-400 hover:border-emerald-700"
                }`}
                title={vibeItem?.inMainFeed ? t("vibeCard.removeFromMainFeed") : t("vibeCard.addToMainFeed")}
              >
                {vibeItem?.inMainFeed
                  ? `[ ● ${t("vibeCard.inMainFeed")} ]`
                  : `[ ○ ${t("vibeCard.addToMainFeed")} ]`}
              </button>
            )}
          </div>
          {canEdit && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit?.(id)}
                className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded transition-colors"
              >
                {t('vibeCard.edit')}
              </button>
              <button
                onClick={() => onDelete?.(id)}
                className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
              >
                {t('vibeCard.delete')}
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
