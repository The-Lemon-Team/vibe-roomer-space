import { create } from 'zustand';

export type ActivityContextType = 
  | 'WORK' 
  | 'WALK' 
  | 'NIGHT_DRIVE' 
  | 'RELAX' 
  | 'SPORT' 
  | 'CUSTOM';

export interface AtmosphericConfig {
  neonColor: string;
  ambientSoundUrl: string | null;
  backgroundTexture: string;
  label: string;
}

export const ATMOSPHERIC_CONTEXT_MAP: Record<ActivityContextType, AtmosphericConfig> = {
  WORK: {
    label: 'DEEP WORK',
    neonColor: '#FFB000', // Amber glow
    ambientSoundUrl: '/audio/ambient_work.mp3',
    backgroundTexture: 'bg-amber-industrial'
  },
  WALK: {
    label: 'OUTSIDE WALK',
    neonColor: '#00F0FF', // Cyan glow
    ambientSoundUrl: '/audio/ambient_walk.mp3',
    backgroundTexture: 'bg-cyan-industrial'
  },
  NIGHT_DRIVE: {
    label: 'NIGHT DRIVE',
    neonColor: '#BD00FF', // Purple/Violet glow
    ambientSoundUrl: '/audio/ambient_drive.mp3',
    backgroundTexture: 'bg-purple-industrial'
  },
  RELAX: {
    label: 'CHILL & RELAX',
    neonColor: '#00FF66', // Soft Neon Green
    ambientSoundUrl: '/audio/ambient_relax.mp3',
    backgroundTexture: 'bg-green-industrial'
  },
  SPORT: {
    label: 'HIGH ENERGY',
    neonColor: '#FF0055', // Neon Red/Pink
    ambientSoundUrl: '/audio/ambient_sport.mp3',
    backgroundTexture: 'bg-red-industrial'
  },
  CUSTOM: {
    label: 'GENERAL VIBE',
    neonColor: '#39FF14', // Classic Terminal Green
    ambientSoundUrl: null,
    backgroundTexture: 'bg-default-industrial'
  }
};

export interface VibeItem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  activity: ActivityContextType;
  images?: string[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  authorName: string;
  authorId: string;
  createdAt: string;
  roomConfig?: {
    ambientLoopUrl?: string;
    themeColor?: string;
    bgImageUrl?: string;
  } | null;
}

interface AtmosphericState {
  currentContext: ActivityContextType;
  config: AtmosphericConfig;
  setContext: (context: ActivityContextType) => void;
  
  // Navigation & View Mode
  viewMode: 'feed' | 'room';
  setViewMode: (mode: 'feed' | 'room') => void;
  selectedVibeRoom: VibeItem | null;
  setSelectedVibeRoom: (vibe: VibeItem | null) => void;
  
  // Vibe Data Management
  vibes: VibeItem[];
  addVibe: (vibe: Omit<VibeItem, 'id' | 'createdAt'>) => void;
  deleteVibe: (id: string) => void;
  
  // Create Modal
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  
  // Current user ID for owner controls demo
  currentUserId: string;
}

const MOCK_INITIAL_VIBES: VibeItem[] = [
  {
    id: 'vibe-9482-a',
    title: 'Cyber-Coffee & Heavy Code',
    content: 'System nominal. Caffeine levels critical. Compiling the latest core module while the rain hits the neo-glass.\nThe grid is quiet tonight. Good time for deep optimization.\n> Executing build sequence...',
    keywords: ['lofi', 'nestjs', 'night', 'junkpunk'],
    activity: 'WORK',
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
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
    keywords: ['synthwave', 'drive', 'rain', 'night-city'],
    activity: 'NIGHT_DRIVE',
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
    keywords: ['outside', 'walk', 'rain', 'ambient'],
    activity: 'WALK',
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
    keywords: ['chill', 'lofi', 'rooftop', 'relax'],
    activity: 'RELAX',
    images: [],
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    authorName: 'operator_alpha',
    authorId: 'user-op-03',
    createdAt: 'T-MINUS 22:30:00',
    roomConfig: {
      themeColor: '#00FF66',
      bgImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80'
    }
  }
];

export const useAtmosphericStore = create<AtmosphericState>((set) => ({
  currentContext: 'CUSTOM',
  config: ATMOSPHERIC_CONTEXT_MAP.CUSTOM,
  setContext: (context: ActivityContextType) => {
    set({
      currentContext: context,
      config: ATMOSPHERIC_CONTEXT_MAP[context] || ATMOSPHERIC_CONTEXT_MAP.CUSTOM
    });
  },

  viewMode: 'feed',
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
    set((state) => ({ vibes: state.vibes.filter((v) => v.id !== id) }));
  },

  isCreateModalOpen: false,
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

  currentUserId: 'user-op-01',
}));
