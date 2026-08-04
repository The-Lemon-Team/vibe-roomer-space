/**
 * Maps a raw NestJS Vibe entity into the client VibeItem shape.
 */
import type {
  VibeItem,
  VibeUpdate,
  VibeWidget,
  YoutubeWidgetLayout,
} from '../useAtmosphericStore';

export interface ServerVibe {
  id: string;
  title: string;
  content: string;
  keywords?: string[];
  images?: string[];
  videoUrls?: string[];
  musicUrls?: string[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  roomConfig?: VibeItem['roomConfig'];
  authorId: string;
  author?: { id?: string; username?: string };
  createdAt: string;
  updates?: Array<{
    id: string;
    content: string;
    mediaUrls?: string[];
    createdAt: string;
  }>;
  inMainFeed?: boolean;
  widgets?: VibeItem['widgets'];
}

function resolveYoutubeLayout(item: ServerVibe): YoutubeWidgetLayout {
  if (item.roomConfig?.youtubeLayout === 'player') return 'player';
  // Legacy: any widget marked player → vibe-level player
  const legacy = item.roomConfig?.widgets || item.widgets || [];
  if (legacy.some((w) => w.type === 'youtube' && w.layout === 'player')) {
    return 'player';
  }
  return 'full';
}

function buildWidgets(item: ServerVibe, youtubeLayout: YoutubeWidgetLayout): VibeWidget[] {
  const fromExplicit = item.widgets && item.widgets.length > 0 ? item.widgets : null;
  const fromRoom =
    item.roomConfig?.widgets && item.roomConfig.widgets.length > 0
      ? item.roomConfig.widgets
      : null;
  const base = fromExplicit || fromRoom || [];

  const videoUrls =
    item.videoUrls && item.videoUrls.length > 0
      ? item.videoUrls
      : item.videoUrl
        ? [item.videoUrl]
        : [];

  // Prefer stored widgets; fill gaps from videoUrls so all YT links appear in the list
  const byUrl = new Map<string, VibeWidget>();
  for (const w of base) {
    byUrl.set(w.url, {
      ...w,
      ...(w.type === 'youtube' ? { layout: youtubeLayout } : {}),
    });
  }
  for (let i = 0; i < videoUrls.length; i++) {
    const url = videoUrls[i];
    if (!byUrl.has(url)) {
      byUrl.set(url, {
        id: `yt-${item.id}-${i}`,
        type: 'youtube',
        url,
        layout: youtubeLayout,
      });
    }
  }

  return Array.from(byUrl.values());
}

export function mapVibe(item: ServerVibe): VibeItem {
  const keywords = item.keywords || [];
  const youtubeLayout = resolveYoutubeLayout(item);
  const widgets = buildWidgets(item, youtubeLayout);
  const videoUrl = item.videoUrl ?? item.videoUrls?.[0] ?? null;

  const roomConfig = item.roomConfig
    ? { ...item.roomConfig, youtubeLayout, widgets }
    : widgets.length > 0
      ? { youtubeLayout, widgets }
      : { youtubeLayout };

  return {
    id: item.id,
    title: item.title,
    content: item.content,
    tags: keywords.map((k) => (k.startsWith('#') ? k : `#${k}`)),
    keywords,
    images: item.images || [],
    widgets,
    videoUrl,
    musicUrl: item.musicUrl ?? item.musicUrls?.[0] ?? null,
    authorName: item.author?.username || 'operator',
    authorId: item.authorId,
    createdAt: new Date(item.createdAt).toLocaleString(),
    roomConfig,
    inMainFeed: item.inMainFeed ?? false,
    updates: (item.updates || []).map(
      (u): VibeUpdate => ({
        id: u.id,
        content: u.content,
        mediaUrls: u.mediaUrls || [],
        createdAt: new Date(u.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }),
    ),
  };
}
