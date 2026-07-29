import { create } from 'zustand';

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
  keywords?: string[]; // backwards compatibility
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
  addVibe: (vibe: Omit<VibeItem, 'id' | 'createdAt'>) => void;
  deleteVibe: (id: string) => void;
  
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
  '#highenergy'
];

const MOCK_INITIAL_VIBES: VibeItem[] = [
  {
    id: 'vibe-9482-a',
    title: 'Cyber-Coffee & Heavy Code',
    content: 'System nominal. Caffeine levels critical. Compiling the latest core module while the rain hits the neo-glass.\nThe grid is quiet tonight. Good time for deep optimization.\n> Executing build sequence...',
    tags: ['#deepwork', '#lofi', '#coding', '#night'],
    keywords: ['lofi', 'nestjs', 'night', 'junkpunk'],
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    widgets: [
      {
        id: 'widget-yt-1',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        title: 'Lofi Cyber Station Stream'
      }
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    authorName: 'cyber_junkie',
    authorId: 'user-op-01',
    createdAt: 'T-MINUS 04:22:11',
    roomConfig: {
      themeColor: '#FFB000',
      bgImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80'
    }
  },
  {
    id: 'vibe-9482-b',
    title: 'Neon Highway Run',
    content: 'Sensors picking up heavy rain. Engine purring. Navigating the grid perimeter while the synthwave kicks in.\n> Establishing secure connection...',
    tags: ['#nightdrive', '#synthwave', '#cyberpunk', '#rain'],
    keywords: ['synthwave', 'drive', 'rain', 'night-city'],
    images: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    authorName: 'cyber_junkie',
    authorId: 'user-op-01',
    createdAt: 'T-MINUS 12:45:00',
    roomConfig: {
      themeColor: '#BD00FF',
      bgImageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80'
    }
  },
  {
    id: 'vibe-9482-c',
    title: 'Rainy Alleyway Meditation',
    content: 'Midnight stroll through sector 7. Puddles reflecting holographic advertisements. Atmospheric audio calibrated for low-pulse walking.\n> Sensor readings steady...',
    tags: ['#outside', '#walk', '#ambient', '#rain'],
    keywords: ['outside', 'walk', 'rain', 'ambient'],
    images: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'
    ],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    authorName: 'neon_wanderer',
    authorId: 'user-op-02',
    createdAt: 'T-MINUS 18:10:00',
    roomConfig: {
      themeColor: '#00F0FF',
      bgImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80'
    }
  },
  {
    id: 'vibe-9482-d',
    title: 'Post-Compilation Chill',
    content: 'All tests green. Terminal logs cleared. Enjoying lofi beats on the rooftop balcony watching drone traffic.\n> Cooldown sequence engaged...',
    tags: ['#chill', '#lofi', '#rooftop', '#relax'],
    keywords: ['chill', 'lofi', 'rooftop', 'relax'],
    images: [],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    authorName: 'operator_alpha',
    authorId: 'user-op-03',
    createdAt: 'T-MINUS 22:30:00',
    roomConfig: {
      themeColor: '#00FF66',
      bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80'
    }
  },
  {
    id: 'vibe-9482-e',
    title: 'High-Octane Workout Stream',
    content: 'Adrenaline maxed out. Pushing physical limits while darksynth baseline pulses through the neuro-interface.\n> Heart rate 145 BPM...',
    tags: ['#highenergy', '#workout', '#darksynth', '#fitness'],
    keywords: ['highenergy', 'workout', 'darksynth'],
    images: [],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    authorName: 'cyber_junkie',
    authorId: 'user-op-01',
    createdAt: 'T-MINUS 1 DAY',
    roomConfig: {
      themeColor: '#FF0055',
      bgImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80'
    }
  }
];

export const useAtmosphericStore = create<AtmosphericState>((set) => ({
  activeTag: '#ALL',
  setActiveTag: (tag) => {
    // Standardize tag string to have leading # unless it is '#ALL'
    const formatted = tag === '#ALL' || tag === 'ALL' ? '#ALL' : (tag.startsWith('#') ? tag : `#${tag}`);
    set({ activeTag: formatted });
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
      pinnedTags: state.pinnedTags.filter((t) => t.toLowerCase() !== formatted.toLowerCase())
    }));
  },
  togglePinTag: (tag) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    set((state) => {
      const exists = state.pinnedTags.some((t) => t.toLowerCase() === formatted.toLowerCase());
      if (exists) {
        return { pinnedTags: state.pinnedTags.filter((t) => t.toLowerCase() !== formatted.toLowerCase()) };
      }
      return { pinnedTags: [...state.pinnedTags, formatted] };
    });
  },

  viewMode: 'vibes',
  setViewMode: (mode) => set({ viewMode: mode }),
  selectedVibeRoom: MOCK_INITIAL_VIBES[0],
  setSelectedVibeRoom: (vibe) => set({ selectedVibeRoom: vibe }),

  vibes: MOCK_INITIAL_VIBES,
  addVibe: (newVibe) => {
    const created: VibeItem = {
      ...newVibe,
      id: `vibe-${Date.now()}`,
      createdAt: 'JUST NOW'
    };
    set((state) => ({ vibes: [created, ...state.vibes] }));
  },
  deleteVibe: (id) => {
    set((state) => {
      const updatedVibes = state.vibes.filter((v) => v.id !== id);
      const newSelectedRoom = state.selectedVibeRoom?.id === id 
        ? (updatedVibes[0] || null) 
        : state.selectedVibeRoom;

      return {
        vibes: updatedVibes,
        selectedVibeRoom: newSelectedRoom
      };
    });
  },

  isCreateModalOpen: false,
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  currentUserId: 'user-op-01',
}));
