/**
 * uiSlice – pure Redux slice for all client-only UI state that was
 * previously embedded inside useAtmosphericStore.
 *
 * Covers:
 *  • activeTag / activeVibeTag / activeRoomTag
 *  • tagMode, pinnedTags, myTags, adminMenuTags (vibes + rooms variants)
 *  • viewMode, selectedVibePage, selectedVibeRoom, activeCreatedRoom
 *  • modal open states (isCreateModalOpen, isCreateRoomModalOpen, vibeToCreateRoom)
 *  • isMobileSidebarOpen
 *  • currentUserId
 *
 * No async thunks live here – all server-state mutations go through
 * vibesApi / roomsApi RTK Query endpoints.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VibeItem, CreatedRoom, TagMode, ViewMode } from './useAtmosphericStore';
import {
  parseHashRoute,
  updateHashRoute,
} from './useAtmosphericStore';

// ── helpers ────────────────────────────────────────────────────────────────

const getStoredTags = (key: string, defaultTags: string[]): string[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultTags;
  } catch {
    return defaultTags;
  }
};

const DEFAULT_ADMIN_VIBE_TAGS = ['#deepwork', '#chill'];
const DEFAULT_ADMIN_ROOM_TAGS = ['#stream', '#ambient'];
const DEFAULT_MY_VIBE_TAGS = ['#deepwork', '#chill'];
const DEFAULT_MY_ROOM_TAGS = ['#stream', '#ambient'];

// ── state shape ────────────────────────────────────────────────────────────

const initialRoute = parseHashRoute();

interface UiState {
  // Routing
  viewMode: ViewMode;
  activeTag: string;
  activeVibeTag: string;
  activeRoomTag: string;

  // Vibe admin / my tags
  adminMenuTags: string[];
  myTags: string[];
  pinnedTags: string[];

  // Room admin / my tags
  roomsAdminMenuTags: string[];
  roomsMyTags: string[];

  tagMode: TagMode;

  // Selected items (client navigation state)
  selectedVibePage: VibeItem | null;
  selectedVibeRoom: VibeItem | null;
  activeCreatedRoom: CreatedRoom | null;

  // Modals
  isCreateModalOpen: boolean;
  isCreateRoomModalOpen: boolean;
  vibeToCreateRoom: VibeItem | null;

  // Layout
  isMobileSidebarOpen: boolean;

  // Current user id (duplicated from auth for convenience)
  currentUserId: string;
}

const initialState: UiState = {
  viewMode: initialRoute.viewMode,
  activeTag: initialRoute.tag,
  activeVibeTag: initialRoute.viewMode === 'vibes' ? initialRoute.tag : '#ALL',
  activeRoomTag: initialRoute.viewMode === 'rooms' ? initialRoute.tag : '#ALL',

  adminMenuTags: getStoredTags('vibe_admin_menu_tags', DEFAULT_ADMIN_VIBE_TAGS),
  myTags: getStoredTags('vibe_my_tags', DEFAULT_MY_VIBE_TAGS),
  pinnedTags: getStoredTags('vibe_admin_menu_tags', DEFAULT_ADMIN_VIBE_TAGS),

  roomsAdminMenuTags: getStoredTags('rooms_admin_menu_tags', DEFAULT_ADMIN_ROOM_TAGS),
  roomsMyTags: getStoredTags('rooms_my_tags', DEFAULT_MY_ROOM_TAGS),

  tagMode: localStorage.getItem('vibe_access_token') ? 'my_tags' : 'live',

  selectedVibePage: null,
  selectedVibeRoom: null,
  activeCreatedRoom: null,

  isCreateModalOpen: false,
  isCreateRoomModalOpen: false,
  vibeToCreateRoom: null,

  isMobileSidebarOpen: false,
  currentUserId: '',
};

// ── slice ──────────────────────────────────────────────────────────────────

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ── Tag / navigation ─────────────────────────────────────────────
    setActiveTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      const formatted =
        tag === '#ALL' || tag === 'ALL'
          ? '#ALL'
          : tag.startsWith('#')
          ? tag
          : `#${tag}`;

      if (state.viewMode === 'rooms') {
        state.activeCreatedRoom = null;
        state.activeRoomTag = formatted;
        state.activeTag = formatted;
        updateHashRoute('rooms', formatted);
      } else {
        state.viewMode = 'vibes';
        state.selectedVibePage = null;
        state.activeVibeTag = formatted;
        state.activeTag = formatted;
        updateHashRoute('vibes', formatted);
      }
    },

    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      const mode = action.payload;
      if (mode === 'rooms') {
        state.activeCreatedRoom = null;
        state.viewMode = 'rooms';
        state.activeTag = state.activeRoomTag;
        updateHashRoute('rooms', state.activeRoomTag);
      } else {
        state.viewMode = mode;
        state.activeTag = state.activeVibeTag;
        updateHashRoute(mode, state.activeVibeTag, state.selectedVibePage?.id);
      }
    },

    syncRouteFromUrl: (state) => {
      const route = parseHashRoute();
      state.viewMode = route.viewMode;
      state.activeTag = route.tag;
      if (route.viewMode === 'vibes') state.activeVibeTag = route.tag;
      if (route.viewMode === 'rooms') state.activeRoomTag = route.tag;
    },

    // ── Vibe page navigation ─────────────────────────────────────────
    setSelectedVibePage: (state, action: PayloadAction<VibeItem | null>) => {
      state.selectedVibePage = action.payload;
    },

    enterVibePage: (state, action: PayloadAction<VibeItem>) => {
      state.selectedVibePage = action.payload;
      state.viewMode = 'vibe';
      updateHashRoute('vibe', state.activeVibeTag, action.payload.id);
    },

    setSelectedVibeRoom: (state, action: PayloadAction<VibeItem | null>) => {
      state.selectedVibeRoom = action.payload;
    },

    // ── Room navigation ──────────────────────────────────────────────
    setActiveCreatedRoom: (state, action: PayloadAction<CreatedRoom | null>) => {
      state.activeCreatedRoom = action.payload;
    },

    openRoomPage: (state, action: PayloadAction<CreatedRoom>) => {
      state.activeCreatedRoom = action.payload;
      state.viewMode = 'rooms';
      updateHashRoute('rooms', state.activeRoomTag, undefined, action.payload.id);
    },

    closeRoomPage: (state) => {
      state.activeCreatedRoom = null;
      state.viewMode = 'rooms';
      updateHashRoute('rooms', state.activeRoomTag);
    },

    // ── Admin / user tag management ──────────────────────────────────
    addAdminMenuTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      if (!state.adminMenuTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        state.adminMenuTags.push(tag);
        state.pinnedTags = [...state.adminMenuTags];
        localStorage.setItem('vibe_admin_menu_tags', JSON.stringify(state.adminMenuTags));
      }
    },
    removeAdminMenuTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      state.adminMenuTags = state.adminMenuTags.filter(
        (t) => t.toLowerCase() !== tag.toLowerCase(),
      );
      state.pinnedTags = [...state.adminMenuTags];
      localStorage.setItem('vibe_admin_menu_tags', JSON.stringify(state.adminMenuTags));
    },

    addMyTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      if (!state.myTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        state.myTags.push(tag);
        localStorage.setItem('vibe_my_tags', JSON.stringify(state.myTags));
      }
    },
    removeMyTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      state.myTags = state.myTags.filter((t) => t.toLowerCase() !== tag.toLowerCase());
      localStorage.setItem('vibe_my_tags', JSON.stringify(state.myTags));
    },
    togglePinTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      const idx = state.myTags.findIndex((t) => t.toLowerCase() === tag.toLowerCase());
      if (idx >= 0) {
        state.myTags.splice(idx, 1);
      } else {
        state.myTags.push(tag);
      }
      localStorage.setItem('vibe_my_tags', JSON.stringify(state.myTags));
    },

    addRoomsAdminMenuTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      if (!state.roomsAdminMenuTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        state.roomsAdminMenuTags.push(tag);
        localStorage.setItem('rooms_admin_menu_tags', JSON.stringify(state.roomsAdminMenuTags));
      }
    },
    removeRoomsAdminMenuTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      state.roomsAdminMenuTags = state.roomsAdminMenuTags.filter(
        (t) => t.toLowerCase() !== tag.toLowerCase(),
      );
      localStorage.setItem('rooms_admin_menu_tags', JSON.stringify(state.roomsAdminMenuTags));
    },
    addRoomsMyTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      if (!state.roomsMyTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        state.roomsMyTags.push(tag);
        localStorage.setItem('rooms_my_tags', JSON.stringify(state.roomsMyTags));
      }
    },
    removeRoomsMyTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload.startsWith('#') ? action.payload : `#${action.payload}`;
      state.roomsMyTags = state.roomsMyTags.filter(
        (t) => t.toLowerCase() !== tag.toLowerCase(),
      );
      localStorage.setItem('rooms_my_tags', JSON.stringify(state.roomsMyTags));
    },

    setTagMode: (state, action: PayloadAction<TagMode>) => {
      state.tagMode = action.payload;
    },

    // ── Modals ───────────────────────────────────────────────────────
    setCreateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalOpen = action.payload;
    },

    setCreateRoomModalOpen: (
      state,
      action: PayloadAction<{ open: boolean; vibe?: VibeItem | null }>,
    ) => {
      state.isCreateRoomModalOpen = action.payload.open;
      state.vibeToCreateRoom = action.payload.vibe ?? null;
    },

    // ── Layout ───────────────────────────────────────────────────────
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileSidebarOpen = action.payload;
    },

    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
  },
});

export const {
  setActiveTag,
  setViewMode,
  syncRouteFromUrl,
  setSelectedVibePage,
  enterVibePage,
  setSelectedVibeRoom,
  setActiveCreatedRoom,
  openRoomPage,
  closeRoomPage,
  addAdminMenuTag,
  removeAdminMenuTag,
  addMyTag,
  removeMyTag,
  togglePinTag,
  addRoomsAdminMenuTag,
  removeRoomsAdminMenuTag,
  addRoomsMyTag,
  removeRoomsMyTag,
  setTagMode,
  setCreateModalOpen,
  setCreateRoomModalOpen,
  setMobileSidebarOpen,
  setCurrentUserId,
} = uiSlice.actions;

export default uiSlice.reducer;
