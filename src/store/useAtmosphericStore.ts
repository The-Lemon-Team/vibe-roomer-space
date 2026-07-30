import { create } from 'zustand';
import { fetchApi } from '../services/api';
import { useAuthStore } from './useAuthStore';
import { checkRoomPostingPermission } from '../utils/roomPermissions';

export type TagMode = 'live' | 'my_tags' | 'admin_config';

export interface RoomConfig {
  ambientLoopUrl?: string;
  themeColor?: string;
  bgImageUrl?: string;
}

export interface VibeWidget {
  id: string;
  type: 'youtube' | 'link';
  url: string;
  title?: string;
}

export interface VibeUpdate {
  id: string;
  content: string;
  mediaUrls?: string[];
  createdAt: string;
}

export interface VibeItem {
  id: string;
  title: string;
  content: string;
  tags: string[]; // tags[0] is "The First Tag" for primary routing
  keywords?: string[];
  images?: string[];
  widgets?: VibeWidget[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  authorName: string;
  authorId: string;
  createdAt: string;
  roomConfig?: RoomConfig | null;
  updates?: VibeUpdate[];
}

export interface RoomNewsItem {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
}

export interface RoomNoteItem {
  id: string;
  title: string;
  content: string; // Markdown formatted string
  authorName: string;
  authorId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface RoomStreamItem {
  id: string;
  type: 'text' | 'image' | 'video' | 'music' | 'youtube';
  content?: string;
  mediaUrls?: string[];
  url?: string;
  title?: string;
  authorName: string;
  authorId: string;
  createdAt: string;
}

export interface CreatedRoom {
  id: string;
  title: string;
  description?: string;
  poster?: string;
  originVibeId?: string;
  originVibeTitle?: string;
  isPublic: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
  tags: string[]; // Attached hashtags for the room (e.g. ['#stream', '#lofi', '#ambient'])
  images?: string[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  youtubeUrl?: string | null;
  streamItems?: RoomStreamItem[];
  news?: RoomNewsItem[];
  notes?: RoomNoteItem[];
  roomConfig?: RoomConfig | null;
}

export type ViewMode = 'vibes' | 'vibe' | 'rooms';

export const parseHashRoute = (): {
  viewMode: ViewMode;
  tag: string;
  vibeId?: string;
  roomId?: string;
  authModalMode?: 'login' | 'register';
} => {
  if (typeof window === 'undefined') return { viewMode: 'vibes', tag: '#ALL' };
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [modePart, queryPart] = hash.split('?');
  let viewMode: ViewMode = 'vibes';
  let authModalMode: 'login' | 'register' | undefined = undefined;

  if (modePart === 'vibe') viewMode = 'vibe';
  else if (modePart === 'rooms' || modePart === 'room') viewMode = 'rooms';
  else if (modePart === 'login') {
    viewMode = 'vibes';
    authModalMode = 'login';
  } else if (modePart === 'register') {
    viewMode = 'vibes';
    authModalMode = 'register';
  }

  const params = new URLSearchParams(queryPart || '');
  const tagParam = params.get('tag');
  const vibeId = params.get('id') || undefined;
  const roomId = params.get('roomId') || (modePart === 'room' ? params.get('id') : undefined) || undefined;

  const activeTag = tagParam
    ? tagParam.startsWith('#')
      ? tagParam
      : `#${tagParam}`
    : '#ALL';
  return { viewMode, tag: activeTag, vibeId, roomId, authModalMode };
};

export const updateHashRoute = (
  mode: ViewMode,
  tag: string,
  vibeId?: string,
  roomId?: string,
) => {
  if (typeof window === 'undefined') return;
  const cleanTag = tag === '#ALL' ? '' : tag.replace(/^#/, '');
  let hash = `/${mode}`;

  if (mode === 'vibe' && vibeId) {
    hash = `/vibe?id=${encodeURIComponent(vibeId)}`;
  } else if (mode === 'rooms' && roomId) {
    hash = `/room?id=${encodeURIComponent(roomId)}`;
  } else if (cleanTag) {
    hash = `/${mode}?tag=${encodeURIComponent(cleanTag)}`;
  }

  if (window.location.hash !== `#${hash}`) {
    window.history.replaceState(null, '', `#${hash}`);
  }
};

interface AtmosphericState {
  // Hashtag Navigation & Filtering
  activeVibeTag: string;
  activeRoomTag: string;
  activeTag: string; // Active tag for current mode
  setActiveTag: (tag: string) => void;

  topHashtags: string[];
  fetchTopHashtags: () => Promise<void>;

  // Admin Configured Public Top Menu Tags (Vibes)
  adminMenuTags: string[];
  addAdminMenuTag: (tag: string) => void;
  removeAdminMenuTag: (tag: string) => void;

  // Logged-in User Personal Saved Tags (Vibes)
  myTags: string[];
  addMyTag: (tag: string) => void;
  removeMyTag: (tag: string) => void;

  // Admin Configured Public Top Menu Tags (Rooms)
  roomsAdminMenuTags: string[];
  addRoomsAdminMenuTag: (tag: string) => void;
  removeRoomsAdminMenuTag: (tag: string) => void;

  // Logged-in User Personal Saved Tags (Rooms)
  roomsMyTags: string[];
  addRoomsMyTag: (tag: string) => void;
  removeRoomsMyTag: (tag: string) => void;

  // Tag View Mode: 'live' (Public tags + trending) | 'my_tags' | 'admin_config'
  tagMode: TagMode;
  setTagMode: (mode: TagMode) => void;

  // Pinned Tags
  pinnedTags: string[];
  pinTag: (tag: string) => void;
  unpinTag: (tag: string) => void;
  togglePinTag: (tag: string) => void;

  // View Mode: 'vibes' | 'vibe' | 'rooms'
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Selected Vibe Page
  selectedVibePage: VibeItem | null;
  setSelectedVibePage: (vibe: VibeItem | null) => void;
  enterVibePage: (vibe: VibeItem) => void;

  // Selected room vibe fallback
  selectedVibeRoom: VibeItem | null;
  setSelectedVibeRoom: (vibe: VibeItem | null) => void;

  // Created Rooms Management
  createdRooms: CreatedRoom[];
  activeCreatedRoom: CreatedRoom | null;
  setActiveCreatedRoom: (room: CreatedRoom | null) => void;
  openRoomPage: (room: CreatedRoom) => void;
  closeRoomPage: () => void;
  createRoomFromVibe: (
    vibe: VibeItem,
    params: { title: string; isPublic: boolean; tags?: string[]; roomConfig?: RoomConfig },
  ) => Promise<CreatedRoom>;
  createStandaloneRoom: (params: {
    title: string;
    description?: string;
    poster?: string;
    isPublic: boolean;
    tags: string[];
    images?: string[];
    videoUrl?: string;
    musicUrl?: string;
    youtubeUrl?: string;
    roomConfig?: RoomConfig;
  }) => Promise<CreatedRoom>;
  addStreamItemToRoom: (
    roomId: string,
    item: {
      type: 'text' | 'image' | 'video' | 'music' | 'youtube';
      content?: string;
      mediaUrls?: string[];
      url?: string;
      title?: string;
    },
  ) => Promise<void>;
  addRoomNews: (roomId: string, news: { title: string; content: string }) => Promise<void>;
  deleteRoomNews: (roomId: string, newsId: string) => Promise<void>;
  addRoomNote: (roomId: string, note: { title: string; content: string }) => Promise<void>;
  updateRoomNote: (roomId: string, noteId: string, note: { title?: string; content?: string }) => Promise<void>;
  deleteRoomNote: (roomId: string, noteId: string) => Promise<void>;
  updateRoomBackground: (roomId: string, bgImageUrl: string | null) => Promise<void>;
  updateRoom: (roomId: string, updates: Partial<CreatedRoom>) => Promise<void>;
  fetchRooms: (tag?: string) => Promise<void>;
  fetchRoomById: (id: string) => Promise<void>;

  // Create Room Modal State
  isCreateRoomModalOpen: boolean;
  vibeToCreateRoom: VibeItem | null;
  setCreateRoomModalOpen: (open: boolean, vibe?: VibeItem | null) => void;

  // Sync route from window URL hash
  syncRouteFromUrl: () => void;

  // Vibe Items Management
  vibes: VibeItem[];
  isLoadingVibes: boolean;
  fetchVibes: (tag?: string) => Promise<void>;
  addVibe: (vibe: Omit<VibeItem, 'id' | 'createdAt'>) => Promise<void>;
  updateVibe: (id: string, updates: Partial<VibeItem>) => Promise<void>;
  deleteVibe: (id: string) => Promise<void>;
  addVibeUpdate: (
    vibeId: string,
    content: string,
    mediaUrls?: string[],
  ) => Promise<void>;
  addTagToVibe: (vibeId: string, newTag: string) => Promise<void>;
  removeTagFromVibe: (vibeId: string, tagToRemove: string) => Promise<void>;

  // Room stream integration
  roomData: any | null;
  isLoadingRoom: boolean;
  fetchRoomData: (tag: string) => Promise<void>;

  // Create Vibe Modal
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;

  // Mobile Sidebar
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;

  // User context
  currentUserId: string;
}

const MOCK_INITIAL_VIBES: VibeItem[] = [
  {
    id: 'vibe-9482-a',
    title: 'Cyber-Coffee & Heavy Code',
    content:
      'System nominal. Caffeine levels critical. Compiling the latest core module while the rain hits the neo-glass.\nThe grid is quiet tonight. Good time for deep optimization.\n> Executing build sequence...',
    tags: ['#deepwork', '#lofi', '#coding', '#night'],
    keywords: ['lofi', 'nestjs', 'night', 'junkpunk'],
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    widgets: [
      {
        id: 'widget-yt-1',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        title: 'Lofi Cyber Station Stream',
      },
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    authorName: 'cyber_junkie',
    authorId: 'user-op-01',
    createdAt: 'T-MINUS 04:22:11',
    roomConfig: {
      themeColor: '#FFB000',
      bgImageUrl:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    },
    updates: [
      {
        id: 'upd-1',
        content: 'Core module compiled successfully. Deploying micro-services to main grid.',
        mediaUrls: [],
        createdAt: '10 MIN AGO',
      },
      {
        id: 'upd-0',
        content: 'Initial transmission initiated. Atmospheric sensors online.',
        mediaUrls: [],
        createdAt: '25 MIN AGO',
      },
    ],
  },
  {
    id: 'vibe-9482-b',
    title: 'Neon Highway Run',
    content:
      'Sensors picking up heavy rain. Engine purring. Navigating the grid perimeter while the synthwave kicks in.\n> Establishing secure connection...',
    tags: ['#nightdrive', '#synthwave', '#cyberpunk', '#rain'],
    keywords: ['synthwave', 'drive', 'rain', 'night-city'],
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: null,
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    authorName: 'cyber_junkie',
    authorId: 'user-op-01',
    createdAt: 'T-MINUS 12:45:00',
    roomConfig: {
      themeColor: '#BD00FF',
      bgImageUrl:
        'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
    },
    updates: [],
  },
  {
    id: 'vibe-9482-c',
    title: 'Rainy Alleyway Meditation',
    content:
      'Midnight stroll through sector 7. Puddles reflecting holographic advertisements. Atmospheric audio calibrated for low-pulse walking.\n> Sensor readings steady...',
    tags: ['#outside', '#walk', '#ambient', '#rain'],
    keywords: ['outside', 'walk', 'rain', 'ambient'],
    images: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    authorName: 'neon_wanderer',
    authorId: 'user-op-02',
    createdAt: 'T-MINUS 18:10:00',
    roomConfig: {
      themeColor: '#00F0FF',
      bgImageUrl:
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
    },
    updates: [],
  },
];

const MOCK_INITIAL_ROOMS: CreatedRoom[] = [
  {
    id: 'room-stream-01',
    title: 'NEON MATRIX LIVE STREAM',
    description: 'High-bandwidth cyber stream featuring ambient synth loops, coding transmissions, and real-time visual drops.',
    poster: '',
    originVibeId: 'vibe-9482-a',
    originVibeTitle: 'Cyber-Coffee & Heavy Code',
    isPublic: true,
    authorId: 'user-op-01',
    authorName: 'cyber_junkie',
    createdAt: 'LIVE NOW',
    tags: ['#stream', '#lofi', '#coding', '#deepwork'],
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    streamItems: [
      {
        id: 'rsi-1',
        type: 'youtube',
        title: 'Lofi Cyber Station Stream',
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '5 MIN AGO',
      },
      {
        id: 'rsi-2',
        type: 'image',
        content: 'Latest tactical terminal visual drop',
        mediaUrls: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'],
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '12 MIN AGO',
      },
      {
        id: 'rsi-3',
        type: 'text',
        content: 'System parameters optimized. Synchronizing stream audio with grid frequency.',
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '20 MIN AGO',
      },
    ],
    news: [
      {
        id: 'news-1',
        title: 'GRID MATRIX UPDATE 2.4 ONLINE',
        content: 'Atmospheric room feeds synced. High bandwidth stream audio loop is active for all grid operators.',
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '15 MIN AGO',
      },
    ],
    notes: [
      {
        id: 'note-1',
        title: 'System Operational Directives',
        content: `# Room Operational Blueprint\n\nWelcome to the **Neon Matrix Room**. Below are the attached note directives:\n\n- [x] Calibrate atmospheric frequencies\n- [x] Establish secure cyber stream endpoint\n- [ ] Deploy secondary backup node\n\n### Code Snippet\n\`\`\`ts\nconst streamStatus = "NOMINAL";\nconsole.log(\`[GRID]: \${streamStatus}\`);\n\`\`\`\n\n> Note: All operators must maintain high caffeine levels.`,
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '30 MIN AGO',
      },
    ],
    roomConfig: {
      themeColor: '#00F0FF',
      bgImageUrl: '',
    },
  },
  {
    id: 'room-stream-02',
    title: 'SYNTHWAVE NIGHT HIGHWAY',
    description: 'Cruising through sector 7 rain. Stream audio loop active. Visual feed transmitting.',
    poster: '',
    originVibeId: 'vibe-9482-b',
    originVibeTitle: 'Neon Highway Run',
    isPublic: true,
    authorId: 'user-op-01',
    authorName: 'cyber_junkie',
    createdAt: '1 HOUR AGO',
    tags: ['#stream', '#nightdrive', '#synthwave', '#ambient'],
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    streamItems: [
      {
        id: 'rsi-4',
        type: 'music',
        title: 'Midnight Synth Stream Track',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        authorName: 'cyber_junkie',
        authorId: 'user-op-01',
        createdAt: '30 MIN AGO',
      },
    ],
    roomConfig: {
      themeColor: '#BD00FF',
      bgImageUrl: '',
    },
  },
  {
    id: 'room-stream-03',
    title: 'AMBIENT RAIN WALK & MEDITATION',
    description: 'Continuous atmospheric transmission. Low pulse walking and field recordings.',
    poster: '',
    originVibeId: 'vibe-9482-c',
    originVibeTitle: 'Rainy Alleyway Meditation',
    isPublic: true,
    authorId: 'user-op-02',
    authorName: 'neon_wanderer',
    createdAt: '2 HOURS AGO',
    tags: ['#ambient', '#outside', '#chill', '#stream'],
    images: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    streamItems: [],
    roomConfig: {
      themeColor: '#FFB000',
      bgImageUrl: '',
    },
  },
];

const DEFAULT_ADMIN_VIBE_TAGS = [
  '#deepwork',
  '#nightdrive',
  '#chill',
  '#outside',
  '#highenergy',
];

const DEFAULT_ADMIN_ROOM_TAGS = [
  '#stream',
  '#lofi',
  '#ambient',
  '#gaming',
  '#coding',
  '#synthwave',
];

const DEFAULT_MY_VIBE_TAGS = ['#deepwork', '#chill', '#nightdrive'];
const DEFAULT_MY_ROOM_TAGS = ['#stream', '#lofi', '#ambient'];

const getStoredTags = (key: string, defaultTags: string[]): string[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultTags;
  } catch (_) {
    return defaultTags;
  }
};

const initialRoute = parseHashRoute();

export const useAtmosphericStore = create<AtmosphericState>((set, get) => ({
  activeVibeTag: initialRoute.viewMode === 'vibes' ? initialRoute.tag : '#ALL',
  activeRoomTag: initialRoute.viewMode === 'rooms' ? initialRoute.tag : '#ALL',
  activeTag: initialRoute.tag,

  setActiveTag: (tag) => {
    const formatted =
      tag === '#ALL' || tag === 'ALL'
        ? '#ALL'
        : tag.startsWith('#')
        ? tag
        : `#${tag}`;

    if (get().viewMode === 'rooms') {
      set({
        activeCreatedRoom: null,
        activeRoomTag: formatted,
        activeTag: formatted,
      });
      updateHashRoute('rooms', formatted);
      get().fetchRooms(formatted === '#ALL' ? undefined : formatted);
    } else {
      set({
        viewMode: 'vibes',
        selectedVibePage: null,
        activeVibeTag: formatted,
        activeTag: formatted,
      });
      updateHashRoute('vibes', formatted);
      get().fetchVibes(formatted === '#ALL' ? undefined : formatted);
    }
  },

  topHashtags: DEFAULT_ADMIN_VIBE_TAGS,
  fetchTopHashtags: async () => {
    try {
      const data = await fetchApi<{ name: string; useCount: number }[]>(
        '/hashtags/top?limit=10',
      );
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item) =>
          item.name.startsWith('#') ? item.name : `#${item.name}`,
        );
        set({ topHashtags: formatted });
      }
    } catch (_) {}
  },

  // Vibes Admin Tags
  adminMenuTags: getStoredTags('vibe_admin_menu_tags', DEFAULT_ADMIN_VIBE_TAGS),
  addAdminMenuTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      if (state.adminMenuTags.some((t) => t.toLowerCase() === formatted.toLowerCase()))
        return state;
      const updated = [...state.adminMenuTags, formatted];
      localStorage.setItem('vibe_admin_menu_tags', JSON.stringify(updated));
      return { adminMenuTags: updated, pinnedTags: updated };
    });
  },
  removeAdminMenuTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const updated = state.adminMenuTags.filter(
        (t) => t.toLowerCase() !== formatted.toLowerCase(),
      );
      localStorage.setItem('vibe_admin_menu_tags', JSON.stringify(updated));
      return { adminMenuTags: updated, pinnedTags: updated };
    });
  },

  // Vibes Personal Tags
  myTags: getStoredTags('vibe_my_tags', DEFAULT_MY_VIBE_TAGS),
  addMyTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      if (state.myTags.some((t) => t.toLowerCase() === formatted.toLowerCase()))
        return state;
      const updated = [...state.myTags, formatted];
      localStorage.setItem('vibe_my_tags', JSON.stringify(updated));
      return { myTags: updated };
    });
  },
  removeMyTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const updated = state.myTags.filter(
        (t) => t.toLowerCase() !== formatted.toLowerCase(),
      );
      localStorage.setItem('vibe_my_tags', JSON.stringify(updated));
      return { myTags: updated };
    });
  },

  // Rooms Admin Tags
  roomsAdminMenuTags: getStoredTags('rooms_admin_menu_tags', DEFAULT_ADMIN_ROOM_TAGS),
  addRoomsAdminMenuTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      if (state.roomsAdminMenuTags.some((t) => t.toLowerCase() === formatted.toLowerCase()))
        return state;
      const updated = [...state.roomsAdminMenuTags, formatted];
      localStorage.setItem('rooms_admin_menu_tags', JSON.stringify(updated));
      return { roomsAdminMenuTags: updated };
    });
  },
  removeRoomsAdminMenuTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const updated = state.roomsAdminMenuTags.filter(
        (t) => t.toLowerCase() !== formatted.toLowerCase(),
      );
      localStorage.setItem('rooms_admin_menu_tags', JSON.stringify(updated));
      return { roomsAdminMenuTags: updated };
    });
  },

  // Rooms Personal Tags
  roomsMyTags: getStoredTags('rooms_my_tags', DEFAULT_MY_ROOM_TAGS),
  addRoomsMyTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      if (state.roomsMyTags.some((t) => t.toLowerCase() === formatted.toLowerCase()))
        return state;
      const updated = [...state.roomsMyTags, formatted];
      localStorage.setItem('rooms_my_tags', JSON.stringify(updated));
      return { roomsMyTags: updated };
    });
  },
  removeRoomsMyTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const updated = state.roomsMyTags.filter(
        (t) => t.toLowerCase() !== formatted.toLowerCase(),
      );
      localStorage.setItem('rooms_my_tags', JSON.stringify(updated));
      return { roomsMyTags: updated };
    });
  },

  tagMode: localStorage.getItem('vibe_access_token') ? 'my_tags' : 'live',
  setTagMode: (mode) => set({ tagMode: mode }),

  pinnedTags: getStoredTags('vibe_admin_menu_tags', DEFAULT_ADMIN_VIBE_TAGS),
  pinTag: (tag) => get().addMyTag(tag),
  unpinTag: (tag) => get().removeMyTag(tag),
  togglePinTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    const exists = get().myTags.some(
      (t) => t.toLowerCase() === formatted.toLowerCase(),
    );
    if (exists) {
      get().removeMyTag(formatted);
    } else {
      get().addMyTag(formatted);
    }
  },

  viewMode: initialRoute.viewMode,
  setViewMode: (mode) => {
    if (mode === 'rooms') {
      get().closeRoomPage();
      get().fetchRooms();
      return;
    }
    const currentActiveTag = get().activeVibeTag;
    set({ viewMode: mode, activeTag: currentActiveTag });
    updateHashRoute(
      mode,
      currentActiveTag,
      get().selectedVibePage?.id,
      undefined,
    );
  },

  selectedVibePage: null,
  setSelectedVibePage: (vibe) => set({ selectedVibePage: vibe }),
  enterVibePage: (vibe) => {
    set({ selectedVibePage: vibe, viewMode: 'vibe' });
    updateHashRoute('vibe', get().activeVibeTag, vibe.id);
  },

  selectedVibeRoom: null,
  setSelectedVibeRoom: (vibe) => set({ selectedVibeRoom: vibe }),

  createdRooms: [],
  activeCreatedRoom: null,
  setActiveCreatedRoom: (room) => set({ activeCreatedRoom: room }),

  openRoomPage: (room) => {
    set({ activeCreatedRoom: room, viewMode: 'rooms' });
    updateHashRoute('rooms', get().activeRoomTag, undefined, room.id);
    get().fetchRoomById(room.id);
  },

  closeRoomPage: () => {
    set({
      activeCreatedRoom: null,
      activeRoomTag: '#ALL',
      activeTag: '#ALL',
      viewMode: 'rooms',
    });
    updateHashRoute('rooms', '#ALL');
  },

  createRoomFromVibe: async (vibe, params) => {
    const roomTags = params.tags && params.tags.length > 0 
      ? params.tags 
      : Array.from(new Set(['#stream', ...(vibe.tags || [])]));

    const roomPayload = {
      title: params.title || `ROOM :: ${vibe.title}`,
      description: vibe.content,
      poster: params.roomConfig?.bgImageUrl || vibe.roomConfig?.bgImageUrl || vibe.images?.[0] || '',
      originVibeId: vibe.id,
      isPublic: params.isPublic,
      tags: roomTags,
      images: vibe.images || [],
      videoUrl: vibe.videoUrl || null,
      musicUrl: vibe.musicUrl || null,
      roomConfig: params.roomConfig || vibe.roomConfig || {
        themeColor: '#00F0FF',
        bgImageUrl: '',
      },
    };

    try {
      const created = await fetchApi<any>('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomPayload),
      });

      const newRoom: CreatedRoom = {
        id: created.id,
        title: created.title,
        description: created.description || '',
        poster: created.poster || '',
        originVibeId: created.originVibeId,
        isPublic: created.isPublic,
        authorId: created.authorId,
        authorName: created.author?.username || 'operator',
        createdAt: 'JUST NOW',
        tags: created.tags || [],
        images: created.images || [],
        videoUrl: created.videoUrl,
        musicUrl: created.musicUrl,
        youtubeUrl: created.youtubeUrl,
        roomConfig: created.roomConfig || null,
        streamItems: [],
        news: [],
        notes: [],
      };

      set((state) => ({
        createdRooms: [newRoom, ...state.createdRooms],
        activeCreatedRoom: newRoom,
        selectedVibeRoom: vibe,
        viewMode: 'rooms',
      }));

      updateHashRoute('rooms', get().activeRoomTag, undefined, newRoom.id);
      return newRoom;
    } catch (_) {
      const currentUser = useAuthStore.getState().user;
      const newRoom: CreatedRoom = {
        id: `room-${Date.now()}`,
        ...roomPayload,
        authorId: currentUser?.id || 'user-op-01',
        authorName: currentUser?.username || 'operator',
        createdAt: 'JUST NOW',
        streamItems: [],
        news: [],
        notes: [],
      };
      set((state) => ({
        createdRooms: [newRoom, ...state.createdRooms],
        activeCreatedRoom: newRoom,
        selectedVibeRoom: vibe,
        viewMode: 'rooms',
      }));
      updateHashRoute('rooms', get().activeRoomTag, undefined, newRoom.id);
      return newRoom;
    }
  },

  createStandaloneRoom: async (params) => {
    const roomPayload = {
      title: params.title,
      description: params.description || '',
      poster: params.poster || params.roomConfig?.bgImageUrl || '',
      isPublic: params.isPublic,
      tags: params.tags && params.tags.length > 0 ? params.tags : ['#stream'],
      images: params.images || [],
      videoUrl: params.videoUrl || null,
      musicUrl: params.musicUrl || null,
      youtubeUrl: params.youtubeUrl || null,
      roomConfig: params.roomConfig || {
        themeColor: '#00F0FF',
        bgImageUrl: params.poster || '',
      },
    };

    try {
      const created = await fetchApi<any>('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomPayload),
      });

      const newRoom: CreatedRoom = {
        id: created.id,
        title: created.title,
        description: created.description || '',
        poster: created.poster || '',
        isPublic: created.isPublic,
        authorId: created.authorId,
        authorName: created.author?.username || 'operator',
        createdAt: 'JUST NOW',
        tags: created.tags || [],
        images: created.images || [],
        videoUrl: created.videoUrl,
        musicUrl: created.musicUrl,
        youtubeUrl: created.youtubeUrl,
        roomConfig: created.roomConfig || null,
        streamItems: [],
        news: [],
        notes: [],
      };

      set((state) => ({
        createdRooms: [newRoom, ...state.createdRooms],
        activeCreatedRoom: newRoom,
        viewMode: 'rooms',
      }));

      updateHashRoute('rooms', get().activeRoomTag, undefined, newRoom.id);
      return newRoom;
    } catch (_) {
      const currentUser = useAuthStore.getState().user;
      const newRoom: CreatedRoom = {
        id: `room-${Date.now()}`,
        ...roomPayload,
        authorId: currentUser?.id || 'user-op-01',
        authorName: currentUser?.username || 'operator',
        createdAt: 'JUST NOW',
        streamItems: [],
        news: [],
        notes: [],
      };
      set((state) => ({
        createdRooms: [newRoom, ...state.createdRooms],
        activeCreatedRoom: newRoom,
        viewMode: 'rooms',
      }));
      updateHashRoute('rooms', get().activeRoomTag, undefined, newRoom.id);
      return newRoom;
    }
  },

  addStreamItemToRoom: async (roomId, item) => {
    try {
      const created = await fetchApi<any>(`/rooms/${roomId}/stream`, {
        method: 'POST',
        body: JSON.stringify(item),
      });
      if (created && created.id) {
        get().fetchRoomById(roomId);
      }
    } catch (_) {
      const currentUser = useAuthStore.getState().user;
      const newItem: RoomStreamItem = {
        id: `rsi-${Date.now()}`,
        ...item,
        authorId: currentUser?.id || 'user-op-01',
        authorName: currentUser?.username || 'operator',
        createdAt: 'JUST NOW',
      };
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            const items = r.streamItems || [];
            const images = [...(r.images || [])];
            if (item.type === 'image' && item.mediaUrls) {
              item.mediaUrls.forEach((img) => {
                if (!images.includes(img)) images.push(img);
              });
            }
            return {
              ...r,
              images,
              videoUrl: item.type === 'video' ? item.url || r.videoUrl : r.videoUrl,
              youtubeUrl: item.type === 'youtube' ? item.url || r.youtubeUrl : r.youtubeUrl,
              musicUrl: item.type === 'music' ? item.url || r.musicUrl : r.musicUrl,
              streamItems: [newItem, ...items],
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  addRoomNews: async (roomId, newsData) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}/news`, {
        method: 'POST',
        body: JSON.stringify(newsData),
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      const currentUser = useAuthStore.getState().user;
      const newNews: RoomNewsItem = {
        id: `news-${Date.now()}`,
        title: newsData.title,
        content: newsData.content,
        authorId: currentUser?.id || 'user-op-01',
        authorName: currentUser?.username || 'operator',
        createdAt: 'JUST NOW',
      };

      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            const existingNews = r.news || [];
            return {
              ...r,
              news: [newNews, ...existingNews],
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  deleteRoomNews: async (roomId, newsId) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}/news/${newsId}`, {
        method: 'DELETE',
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            return {
              ...r,
              news: (r.news || []).filter((n) => n.id !== newsId),
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  addRoomNote: async (roomId, noteData) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}/notes`, {
        method: 'POST',
        body: JSON.stringify(noteData),
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      const currentUser = useAuthStore.getState().user;
      const newNote: RoomNoteItem = {
        id: `note-${Date.now()}`,
        title: noteData.title,
        content: noteData.content,
        authorId: currentUser?.id || 'user-op-01',
        authorName: currentUser?.username || 'operator',
        createdAt: 'JUST NOW',
      };

      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            const existingNotes = r.notes || [];
            return {
              ...r,
              notes: [newNote, ...existingNotes],
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  updateRoomNote: async (roomId, noteId, updatedNote) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}/notes/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedNote),
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            const updatedNotes = (r.notes || []).map((n) => {
              if (n.id === noteId) {
                return {
                  ...n,
                  title: updatedNote.title !== undefined ? updatedNote.title : n.title,
                  content: updatedNote.content !== undefined ? updatedNote.content : n.content,
                  updatedAt: 'EDITED JUST NOW',
                };
              }
              return n;
            });
            return { ...r, notes: updatedNotes };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  deleteRoomNote: async (roomId, noteId) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}/notes/${noteId}`, {
        method: 'DELETE',
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            return {
              ...r,
              notes: (r.notes || []).filter((n) => n.id !== noteId),
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? updatedRooms.find((r) => r.id === roomId) || null
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  updateRoomBackground: async (roomId, bgImageUrl) => {
    const cleanBg = bgImageUrl ? bgImageUrl.trim() : '';
    try {
      await fetchApi<any>(`/rooms/${roomId}`, {
        method: 'PATCH',
        body: JSON.stringify({ poster: cleanBg, roomConfig: { bgImageUrl: cleanBg } }),
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) => {
          if (r.id === roomId) {
            return {
              ...r,
              poster: cleanBg,
              roomConfig: {
                ...r.roomConfig,
                bgImageUrl: cleanBg,
              },
            };
          }
          return r;
        });

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? {
                ...state.activeCreatedRoom,
                poster: cleanBg,
                roomConfig: {
                  ...state.activeCreatedRoom.roomConfig,
                  bgImageUrl: cleanBg,
                },
              }
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  updateRoom: async (roomId, updates) => {
    try {
      await fetchApi<any>(`/rooms/${roomId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
      get().fetchRoomById(roomId);
    } catch (_) {
      set((state) => {
        const updatedRooms = state.createdRooms.map((r) =>
          r.id === roomId ? { ...r, ...updates } : r,
        );

        const updatedActive =
          state.activeCreatedRoom?.id === roomId
            ? { ...state.activeCreatedRoom, ...updates }
            : state.activeCreatedRoom;

        return {
          createdRooms: updatedRooms,
          activeCreatedRoom: updatedActive,
        };
      });
    }
  },

  isCreateRoomModalOpen: false,
  vibeToCreateRoom: null,
  setCreateRoomModalOpen: (open, vibe = null) =>
    set({ isCreateRoomModalOpen: open, vibeToCreateRoom: vibe }),

  syncRouteFromUrl: () => {
    const route = parseHashRoute();
    if (route.authModalMode) {
      useAuthStore.getState().setAuthModalOpen(true, route.authModalMode);
    }

    if (route.viewMode === 'vibe' && route.vibeId) {
      const found = get().vibes.find((v) => v.id === route.vibeId);
      if (found) {
        set({ selectedVibePage: found, viewMode: 'vibe', activeVibeTag: route.tag, activeTag: route.tag });
        return;
      }
    } else if (route.viewMode === 'rooms') {
      if (route.roomId) {
        const foundRoom = get().createdRooms.find((r) => r.id === route.roomId);
        if (foundRoom) {
          set({ activeCreatedRoom: foundRoom, viewMode: 'rooms', activeRoomTag: route.tag, activeTag: route.tag });
          get().fetchRoomById(route.roomId);
          return;
        } else {
          set({ viewMode: 'rooms', activeRoomTag: route.tag, activeTag: route.tag });
          get().fetchRoomById(route.roomId);
          return;
        }
      }
      set({ activeCreatedRoom: null, viewMode: 'rooms', activeRoomTag: route.tag, activeTag: route.tag });
      get().fetchRooms();
      return;
    }

    set({ viewMode: route.viewMode, activeVibeTag: route.tag, activeTag: route.tag });
    get().fetchVibes(route.tag === '#ALL' ? undefined : route.tag);
  },

  vibes: [],
  isLoadingVibes: false,

  fetchVibes: async (tag?: string) => {
    set({ isLoadingVibes: true });
    try {
      const cleanTag = tag ? tag.replace('#', '') : undefined;
      const url = cleanTag
        ? `/vibes?tag=${encodeURIComponent(cleanTag)}`
        : '/vibes';
      const response = await fetchApi<{ data: any[] }>(url);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const mapped: VibeItem[] = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          tags: Array.isArray(item.keywords)
            ? item.keywords.map((k: string) => (k.startsWith('#') ? k : `#${k}`))
            : ['#ALL'],
          keywords: item.keywords || [],
          images: item.images || [],
          videoUrl: item.videoUrl,
          musicUrl: item.musicUrl,
          authorName: item.author?.username || 'operator',
          authorId: item.authorId,
          createdAt: new Date(item.createdAt).toLocaleString(),
          roomConfig: item.roomConfig || null,
          updates: (item.updates || []).map((u: any) => ({
            id: u.id,
            content: u.content,
            mediaUrls: u.mediaUrls || [],
            createdAt: new Date(u.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        }));

        set((state) => {
          const route = parseHashRoute();
          const targetId = route.viewMode === 'vibe' ? route.vibeId : undefined;
          const currentSelected = targetId
            ? mapped.find((m) => m.id === targetId) || state.selectedVibePage
            : state.selectedVibePage
              ? mapped.find((m) => m.id === state.selectedVibePage?.id) || state.selectedVibePage
              : mapped[0] || null;
          return {
            vibes: mapped,
            selectedVibePage: currentSelected,
            selectedVibeRoom: state.selectedVibeRoom || currentSelected,
            isLoadingVibes: false,
          };
        });
        return;
      }
    } catch (_) {}

    set({ isLoadingVibes: false });
  },

  addVibe: async (newVibe) => {
    try {
      const cleanKeywords = (newVibe.tags || []).map((t) => t.replace('#', ''));
      const created = await fetchApi<any>('/vibes', {
        method: 'POST',
        body: JSON.stringify({
          title: newVibe.title,
          content: newVibe.content,
          keywords: cleanKeywords,
          images: newVibe.images || [],
          videoUrl: newVibe.videoUrl || null,
          musicUrl: newVibe.musicUrl || null,
          roomConfig: newVibe.roomConfig || null,
        }),
      });

      const mapped: VibeItem = {
        id: created.id,
        title: created.title,
        content: created.content,
        tags: (created.keywords || []).map((k: string) =>
          k.startsWith('#') ? k : `#${k}`,
        ),
        keywords: created.keywords || [],
        images: created.images || [],
        videoUrl: created.videoUrl,
        musicUrl: created.musicUrl,
        authorName: created.author?.username || 'operator',
        authorId: created.authorId,
        createdAt: 'JUST NOW',
        roomConfig: created.roomConfig || null,
        updates: [],
      };

      set((state) => ({ vibes: [mapped, ...state.vibes] }));
    } catch (_) {
      const created: VibeItem = {
        ...newVibe,
        id: `vibe-${Date.now()}`,
        createdAt: 'JUST NOW',
        updates: [],
      };
      set((state) => ({ vibes: [created, ...state.vibes] }));
    }
  },

  updateVibe: async (id, updates) => {
    try {
      await fetchApi(`/vibes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
      });
    } catch (_) {}

    set((state) => {
      const updatedVibes = state.vibes.map((v) =>
        v.id === id ? { ...v, ...updates } : v,
      );
      const updatedSelected =
        state.selectedVibePage?.id === id
          ? { ...state.selectedVibePage, ...updates }
          : state.selectedVibePage;
      return { vibes: updatedVibes, selectedVibePage: updatedSelected };
    });
  },

  deleteVibe: async (id) => {
    try {
      await fetchApi(`/vibes/${id}`, { method: 'DELETE' });
    } catch (_) {}

    set((state) => {
      const updatedVibes = state.vibes.filter((v) => v.id !== id);
      return {
        vibes: updatedVibes,
        selectedVibePage:
          state.selectedVibePage?.id === id
            ? updatedVibes[0] || null
            : state.selectedVibePage,
        selectedVibeRoom:
          state.selectedVibeRoom?.id === id
            ? updatedVibes[0] || null
            : state.selectedVibeRoom,
      };
    });
  },

  addVibeUpdate: async (vibeId, content, mediaUrls = []) => {
    const newUpdate: VibeUpdate = {
      id: `upd-${Date.now()}`,
      content,
      mediaUrls,
      createdAt: 'JUST NOW',
    };

    try {
      const res = await fetchApi<any>(`/vibes/${vibeId}/updates`, {
        method: 'POST',
        body: JSON.stringify({ content, mediaUrls }),
      });
      if (res?.id) {
        newUpdate.id = res.id;
      }
    } catch (_) {}

    set((state) => {
      const updatedVibes = state.vibes.map((v) => {
        if (v.id === vibeId) {
          const currentUpdates = v.updates || [];
          return { ...v, updates: [newUpdate, ...currentUpdates] };
        }
        return v;
      });

      const updatedSelected =
        state.selectedVibePage?.id === vibeId
          ? {
              ...state.selectedVibePage,
              updates: [newUpdate, ...(state.selectedVibePage.updates || [])],
            }
          : state.selectedVibePage;

      return { vibes: updatedVibes, selectedVibePage: updatedSelected };
    });
  },

  addTagToVibe: async (vibeId, newTag) => {
    const formattedTag = newTag.startsWith('#') ? newTag : `#${newTag}`;
    const cleanKeyword = formattedTag.replace('#', '');

    set((state) => {
      const updatedVibes = state.vibes.map((v) => {
        if (v.id === vibeId) {
          const currentTags = v.tags || [];
          if (currentTags.some((t) => t.toLowerCase() === formattedTag.toLowerCase())) {
            return v;
          }
          const updatedTags = [...currentTags, formattedTag];
          const updatedKeywords = Array.from(
            new Set([...(v.keywords || []), cleanKeyword]),
          );
          return { ...v, tags: updatedTags, keywords: updatedKeywords };
        }
        return v;
      });

      const targetVibe = updatedVibes.find((v) => v.id === vibeId);
      const updatedSelected =
        state.selectedVibePage?.id === vibeId && targetVibe
          ? targetVibe
          : state.selectedVibePage;

      return { vibes: updatedVibes, selectedVibePage: updatedSelected };
    });

    try {
      const target = get().vibes.find((v) => v.id === vibeId);
      if (target) {
        const cleanKeywords = (target.tags || []).map((t) => t.replace('#', ''));
        await fetchApi(`/vibes/${vibeId}`, {
          method: 'PATCH',
          body: JSON.stringify({ keywords: cleanKeywords }),
        });
      }
    } catch (_) {}
  },

  removeTagFromVibe: async (vibeId, tagToRemove) => {
    const formattedTag = tagToRemove.startsWith('#') ? tagToRemove : `#${tagToRemove}`;
    const cleanKeyword = formattedTag.replace('#', '');

    set((state) => {
      const updatedVibes = state.vibes.map((v) => {
        if (v.id === vibeId) {
          const updatedTags = (v.tags || []).filter(
            (t) => t.toLowerCase() !== formattedTag.toLowerCase(),
          );
          const updatedKeywords = (v.keywords || []).filter(
            (k) => k.toLowerCase() !== cleanKeyword.toLowerCase(),
          );
          return { ...v, tags: updatedTags, keywords: updatedKeywords };
        }
        return v;
      });

      const targetVibe = updatedVibes.find((v) => v.id === vibeId);
      const updatedSelected =
        state.selectedVibePage?.id === vibeId && targetVibe
          ? targetVibe
          : state.selectedVibePage;

      return { vibes: updatedVibes, selectedVibePage: updatedSelected };
    });

    try {
      const target = get().vibes.find((v) => v.id === vibeId);
      if (target) {
        const cleanKeywords = (target.tags || []).map((t) => t.replace('#', ''));
        await fetchApi(`/vibes/${vibeId}`, {
          method: 'PATCH',
          body: JSON.stringify({ keywords: cleanKeywords }),
        });
      }
    } catch (_) {}
  },

  roomData: null,
  isLoadingRoom: false,

  fetchRoomData: async (tag: string) => {
    set({ isLoadingRoom: true });
    try {
      const cleanTag = tag.replace('#', '');
      const response = await fetchApi<any>(
        `/rooms/${encodeURIComponent(cleanTag)}`,
      );
      if (response.room) {
        set({ roomData: response.room, isLoadingRoom: false });
        return;
      }
    } catch (_) {}
    set({ roomData: null, isLoadingRoom: false });
  },

  fetchRooms: async (tag?: string) => {
    try {
      const cleanTag = tag ? tag.replace('#', '') : undefined;
      const url = cleanTag
        ? `/rooms?tag=${encodeURIComponent(cleanTag)}`
        : '/rooms';
      const data = await fetchApi<any[]>(url);
      if (Array.isArray(data)) {
        const mapped: CreatedRoom[] = data.map((room) => ({
          id: room.id,
          title: room.title,
          description: room.description || '',
          poster: room.poster || '',
          originVibeId: room.originVibeId,
          isPublic: room.isPublic,
          authorId: room.authorId,
          authorName: room.author?.username || 'operator',
          createdAt: new Date(room.createdAt).toLocaleString(),
          tags: room.tags || [],
          images: room.images || [],
          videoUrl: room.videoUrl,
          musicUrl: room.musicUrl,
          youtubeUrl: room.youtubeUrl,
          roomConfig: room.roomConfig || null,
          streamItems: (room.streamItems || []).map((item: any) => ({
            id: item.id,
            type: item.type,
            content: item.content || '',
            mediaUrls: item.mediaUrls || [],
            url: item.url,
            title: item.title,
            authorName: item.author?.username || 'operator',
            authorId: item.authorId,
            createdAt: new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
          news: (room.news || []).map((n: any) => ({
            id: n.id,
            title: n.title,
            content: n.content,
            authorName: n.author?.username || 'operator',
            authorId: n.authorId,
            createdAt: new Date(n.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
          notes: (room.notes || []).map((n: any) => ({
            id: n.id,
            title: n.title,
            content: n.content,
            authorName: n.author?.username || 'operator',
            authorId: n.authorId,
            createdAt: new Date(n.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            updatedAt: n.updatedAt ? new Date(n.updatedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }) : undefined,
          })),
        }));
        set({ createdRooms: mapped });
        const active = get().activeCreatedRoom;
        if (active) {
          const updatedActive = mapped.find((r) => r.id === active.id);
          if (updatedActive) {
            set({ activeCreatedRoom: updatedActive });
          }
        }
      }
    } catch (_) {}
  },

  fetchRoomById: async (id: string) => {
    try {
      const room = await fetchApi<any>(`/rooms/id/${id}`);
      if (room && room.id) {
        const mapped: CreatedRoom = {
          id: room.id,
          title: room.title,
          description: room.description || '',
          poster: room.poster || '',
          originVibeId: room.originVibeId,
          isPublic: room.isPublic,
          authorId: room.authorId,
          authorName: room.author?.username || 'operator',
          createdAt: new Date(room.createdAt).toLocaleString(),
          tags: room.tags || [],
          images: room.images || [],
          videoUrl: room.videoUrl,
          musicUrl: room.musicUrl,
          youtubeUrl: room.youtubeUrl,
          roomConfig: room.roomConfig || null,
          streamItems: (room.streamItems || []).map((item: any) => ({
            id: item.id,
            type: item.type,
            content: item.content || '',
            mediaUrls: item.mediaUrls || [],
            url: item.url,
            title: item.title,
            authorName: item.author?.username || 'operator',
            authorId: item.authorId,
            createdAt: new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
          news: (room.news || []).map((n: any) => ({
            id: n.id,
            title: n.title,
            content: n.content,
            authorName: n.author?.username || 'operator',
            authorId: n.authorId,
            createdAt: new Date(n.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
          notes: (room.notes || []).map((n: any) => ({
            id: n.id,
            title: n.title,
            content: n.content,
            authorName: n.author?.username || 'operator',
            authorId: n.authorId,
            createdAt: new Date(n.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            updatedAt: n.updatedAt ? new Date(n.updatedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }) : undefined,
          })),
        };
        set((state) => ({
          activeCreatedRoom: mapped,
          createdRooms: state.createdRooms.map((r) => r.id === mapped.id ? mapped : r),
        }));
      }
    } catch (_) {}
  },

  isCreateModalOpen: false,
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  isMobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),

  currentUserId: 'user-op-01',
}));
