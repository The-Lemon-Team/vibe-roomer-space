/**
 * authSlice – pure Redux slice that holds client-side auth state:
 *  user, tokens, modal open/close, loading, error.
 *
 * The slice is kept in sync with localStorage in the same way the
 * old useAuthStore Zustand store was, so existing localStorage keys
 * (vibe_access_token, vibe_refresh_token, vibe_user) are preserved.
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import type { UserProfile } from './useAuthStore';

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isLoading: boolean;
  error: string | null;
}

const getStoredUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem('vibe_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  accessToken: localStorage.getItem('vibe_access_token'),
  refreshToken: localStorage.getItem('vibe_refresh_token'),
  isAuthenticated: !!localStorage.getItem('vibe_access_token'),
  isAuthModalOpen: false,
  authModalMode: 'login',
  isLoading: false,
  error: null,
};

// Helper to persist tokens
function persistTokens(data: { user: UserProfile; accessToken: string; refreshToken: string }) {
  localStorage.setItem('vibe_access_token', data.accessToken);
  localStorage.setItem('vibe_refresh_token', data.refreshToken);
  localStorage.setItem('vibe_user', JSON.stringify(data.user));
}

function clearTokens() {
  localStorage.removeItem('vibe_access_token');
  localStorage.removeItem('vibe_refresh_token');
  localStorage.removeItem('vibe_user');
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Open / close the auth modal
    setAuthModalOpen: (
      state,
      action: PayloadAction<{ open: boolean; mode?: 'login' | 'register' }>,
    ) => {
      state.isAuthModalOpen = action.payload.open;
      if (action.payload.mode) state.authModalMode = action.payload.mode;
      state.error = null;
    },

    // Switch between login / register tab
    setAuthModalMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.authModalMode = action.payload;
      state.error = null;
    },

    // Clear error banner
    clearError: (state) => {
      state.error = null;
    },

    // Logout – wipe all auth state and localStorage
    logout: (state) => {
      clearTokens();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },

    // Manually set user (e.g. after checkAuth / token refresh)
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    // ── login ──────────────────────────────────────────────────────
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        persistTokens(action.payload);
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isAuthModalOpen = false;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as any)?.data?.message || 'auth.loginFailed';
      });

    // ── register ───────────────────────────────────────────────────
    builder
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        persistTokens(action.payload);
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.isAuthModalOpen = false;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as any)?.data?.message || 'auth.registrationFailed';
      });

    // ── me (validate session on app load) ─────────────────────────
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('vibe_user', JSON.stringify(action.payload.user));
    });

    // ── refresh ────────────────────────────────────────────────────
    builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
      persistTokens(action.payload);
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });

    // ── logout ─────────────────────────────────────────────────────
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      clearTokens();
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const {
  setAuthModalOpen,
  setAuthModalMode,
  clearError,
  logout,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
