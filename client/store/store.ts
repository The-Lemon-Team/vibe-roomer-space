/**
 * Redux root store.
 *
 * Combines:
 *  • authSlice    – client auth state (user, tokens, modal)
 *  • uiSlice      – all UI / navigation state (tags, viewMode, modals…)
 *  • authApi      – RTK Query: auth endpoints
 *  • vibesApi     – RTK Query: vibes + hashtags endpoints
 *  • roomsApi     – RTK Query: rooms endpoints
 *  • mediaApi     – RTK Query: media library / upload endpoints
 */
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { vibesApi } from './api/vibesApi';
import { roomsApi } from './api/roomsApi';
import { adminFeedApi } from './api/adminFeedApi';
import { mediaApi } from './api/mediaApi';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [vibesApi.reducerPath]: vibesApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [adminFeedApi.reducerPath]: adminFeedApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // VibeItem objects contain Date strings, which are serialisable; no changes needed
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(vibesApi.middleware)
      .concat(roomsApi.middleware)
      .concat(adminFeedApi.middleware)
      .concat(mediaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
