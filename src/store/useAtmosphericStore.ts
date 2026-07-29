import { create } from 'zustand';
import { fetchApi } from '../services/api';

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
}

interface AtmosphericState {
  // Hashtag Navigation & Filtering
  activeTag: string; // '#ALL' or specific tag like '#deepwork'
  setActiveTag: (tag: string) => void;

  topHashtags: string[];
  fetchTopHashtags: () => Promise<void>;

  pinnedTags: string[];
  pinTag: (tag: string) => void;
  unpinTag: (tag: string) => void;
  togglePinTag: (tag: string) => void;

  // View Mode: 'vibes' | 'rooms'
  viewMode: 'vibes' | 'rooms';
  setViewMode: (mode: 'vibes' | 'rooms') => void;
  selectedVibeRoom: VibeItem | null;
  setSelectedVibeRoom: (vibe: VibeItem | null) => void;

  // Vibe Items Management
  vibes: VibeItem[];
  isLoadingVibes: boolean;
  fetchVibes: (tag?: string) => Promise<void>;
  addVibe: (vibe: Omit<VibeItem, 'id' | 'createdAt'>) => Promise<void>;
  deleteVibe: (id: string) => Promise<void>;

  // Room stream integration
  roomData: any | null;
  isLoadingRoom: boolean;
  fetchRoomData: (tag: string) => Promise<void>;

  // Create Modal
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;

  // User context
  currentUserId: string;
}

const DEFAULT_PINNED_TAGS = [
  '#deepwork',
  '#nightdrive',
  '#chill',
  '#outside',
  '#highenergy',
];

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
  },
];

export const useAtmosphericStore = create<AtmosphericState>((set, get) => ({
  activeTag: '#ALL',
  setActiveTag: (tag) => {
    const formatted =
      tag === '#ALL' || tag === 'ALL'
        ? '#ALL'
        : tag.startsWith('#')
        ? tag
        : `#${tag}`;
    set({ activeTag: formatted });
    get().fetchVibes(formatted === '#ALL' ? undefined : formatted);
  },

  topHashtags: DEFAULT_PINNED_TAGS,
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
    } catch (_) {
      // Fallback to default pinned tags if backend server is starting
    }
  },

  pinnedTags: DEFAULT_PINNED_TAGS,
  pinTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      if (state.pinnedTags.includes(formatted)) return state;
      return { pinnedTags: [...state.pinnedTags, formatted] };
    });
  },
  unpinTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => ({
      pinnedTags: state.pinnedTags.filter(
        (t) => t.toLowerCase() !== formatted.toLowerCase(),
      ),
    }));
  },
  togglePinTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const exists = state.pinnedTags.some(
        (t) => t.toLowerCase() === formatted.toLowerCase(),
      );
      if (exists) {
        return {
          pinnedTags: state.pinnedTags.filter(
            (t) => t.toLowerCase() !== formatted.toLowerCase(),
          ),
        };
      }
      return { pinnedTags: [...state.pinnedTags, formatted] };
    });
  },

  viewMode: 'vibes',
  setViewMode: (mode) => set({ viewMode: mode }),
  selectedVibeRoom: MOCK_INITIAL_VIBES[0],
  setSelectedVibeRoom: (vibe) => set({ selectedVibeRoom: vibe }),

  vibes: MOCK_INITIAL_VIBES,
  isLoadingVibes: false,

  fetchVibes: async (tag?: string) => {
    set({ isLoadingVibes: true });
    try {
      const cleanTag = tag ? tag.replace('#', '') : undefined;
      const url = cleanTag ? `/vibes?tag=${encodeURIComponent(cleanTag)}` : '/vibes';
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
        }));
        set({ vibes: mapped, isLoadingVibes: false });
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
        tags: (created.keywords || []).map((k: string) => (k.startsWith('#') ? k : `#${k}`)),
        keywords: created.keywords || [],
        images: created.images || [],
        videoUrl: created.videoUrl,
        musicUrl: created.musicUrl,
        authorName: created.author?.username || 'operator',
        authorId: created.authorId,
        createdAt: 'JUST NOW',
        roomConfig: created.roomConfig || null,
      };

      set((state) => ({ vibes: [mapped, ...state.vibes] }));
    } catch (_) {
      // Fallback local add if server unreachable
      const created: VibeItem = {
        ...newVibe,
        id: `vibe-${Date.now()}`,
        createdAt: 'JUST NOW',
      };
      set((state) => ({ vibes: [created, ...state.vibes] }));
    }
  },

  deleteVibe: async (id) => {
    try {
      await fetchApi(`/vibes/${id}`, { method: 'DELETE' });
    } catch (_) {}

    set((state) => {
      const updatedVibes = state.vibes.filter((v) => v.id !== id);
      return {
        vibes: updatedVibes,
        selectedVibeRoom:
          state.selectedVibeRoom?.id === id ? updatedVibes[0] || null : state.selectedVibeRoom,
      };
    });
  },

  roomData: null,
  isLoadingRoom: false,

  fetchRoomData: async (tag: string) => {
    set({ isLoadingRoom: true });
    try {
      const cleanTag = tag.replace('#', '');
      const response = await fetchApi<any>(`/rooms/${encodeURIComponent(cleanTag)}`);
      if (response.room) {
        set({ roomData: response.room, isLoadingRoom: false });
        return;
      }
    } catch (_) {}
    set({ roomData: null, isLoadingRoom: false });
  },

  isCreateModalOpen: false,
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  currentUserId: 'user-op-01',
}));
