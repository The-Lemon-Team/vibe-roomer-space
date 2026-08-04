/**
 * uiSlice – pure Redux slice for all client-only UI state that was
 * previously embedded inside useAtmosphericStore.
 *
 * Covers:
 *  • activeTag / activeVibeTag / activeRoomTag
 *  • tagMode, pinnedTags, myTags, adminMenuTags (vibes + rooms variants)
 *  • viewMode, selectedVibePage, selectedVibeRoom, activeCreatedRoom
 *  • modal open states (isCreateModalOpen, isCreateRoomModalOpen)
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

const DEFAULT_MY_VIBE_TAGS: string[] = [];
const DEFAULT_MY_ROOM_TAGS: string[] = [];

// ── state shape ────────────────────────────────────────────────────────────

const initialRoute = parseHashRoute();

interface UiState {
  // Routing
  viewMode: ViewMode;
  activeTag: string;
  activeVibeTag: string;
  activeRoomTag: string;

  // Vibe admin / my tags (admin tags are hydrated from GET /menu-tags)
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
  /** When set, CreateVibeModal opens in edit mode for this vibe */
  editingVibe: VibeItem | null;
  isCreateRoomModalOpen: boolean;

  // Layout
  isMobileSidebarOpen: boolean;

  // Current user id (duplicated from auth for convenience)
  currentUserId: string;
}

const initialState: UiState = {
  viewMode: initialRoute.viewMode,
  activeTag: initialRoute.tag,
  activeVibeTag:
    initialRoute.viewMode === 'vibes' || initialRoute.viewMode === 'vibe'
      ? initialRoute.tag
      : '#ALL',
  activeRoomTag: initialRoute.viewMode === 'rooms' ? initialRoute.tag : '#ALL',

  adminMenuTags: [],
  myTags: getStoredTags('vibe_my_tags', DEFAULT_MY_VIBE_TAGS),
  pinnedTags: [],

  roomsAdminMenuTags: [],
  roomsMyTags: getStoredTags('rooms_my_tags', DEFAULT_MY_ROOM_TAGS),

  // URL is source of truth: #/ = [Все вайбы], #/live = [Мои вайбы], #/my-tags, #/admin
  tagMode: initialRoute.tagMode,

  selectedVibePage: null,
  selectedVibeRoom: null,
  activeCreatedRoom: null,

  isCreateModalOpen: false,
  editingVibe: null,
  isCreateRoomModalOpen: false,

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
        updateHashRoute('vibes', formatted, undefined, undefined, state.tagMode);
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
        updateHashRoute(
          mode,
          state.activeVibeTag,
          state.selectedVibePage?.id,
          undefined,
          state.tagMode,
        );
      }
    },

    syncRouteFromUrl: (state) => {
      const route = parseHashRoute();
      state.viewMode = route.viewMode;
      state.activeTag = route.tag;
      // Only sync tagMode from vibes feed URLs (/, /vibes, /all-vibes, /my-tags, /my-vibes, /admin)
      if (route.viewMode === 'vibes') {
        state.tagMode = route.tagMode;
        state.activeVibeTag = route.tag;
      }
      if (route.viewMode === 'vibe') {
        state.activeVibeTag = route.tag;
      }
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
    /** Hydrate public vibe menu tags from GET /menu-tags (server source of truth). */
    setAdminMenuTags: (state, action: PayloadAction<string[]>) => {
      state.adminMenuTags = action.payload;
      state.pinnedTags = [...action.payload];
    },
    /** Hydrate public room menu tags from GET /menu-tags. */
    setRoomsAdminMenuTags: (state, action: PayloadAction<string[]>) => {
      state.roomsAdminMenuTags = action.payload;
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
      // Switching feed scope / My Tags / Admin always lands on the vibes feed list
      if (state.viewMode === 'vibe') {
        state.viewMode = 'vibes';
        state.selectedVibePage = null;
      }
      if (state.viewMode === 'vibes') {
        updateHashRoute('vibes', state.activeVibeTag, undefined, undefined, action.payload);
      }
    },

    // ── Modals ───────────────────────────────────────────────────────
    setCreateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalOpen = action.payload;
      if (!action.payload) {
        state.editingVibe = null;
      }
    },

    /** Open create modal prefilled for editing an existing vibe */
    openEditVibeModal: (state, action: PayloadAction<VibeItem>) => {
      state.editingVibe = action.payload;
      state.isCreateModalOpen = true;
    },

    setCreateRoomModalOpen: (
      state,
      action: PayloadAction<{ open: boolean }>,
    ) => {
      state.isCreateRoomModalOpen = action.payload.open;
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
  setAdminMenuTags,
  setRoomsAdminMenuTags,
  addMyTag,
  removeMyTag,
  togglePinTag,
  addRoomsMyTag,
  removeRoomsMyTag,
  setTagMode,
  setCreateModalOpen,
  openEditVibeModal,
  setCreateRoomModalOpen,
  setMobileSidebarOpen,
  setCurrentUserId,
} = uiSlice.actions;

export default uiSlice.reducer;
