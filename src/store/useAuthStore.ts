import { create } from 'zustand';
import { fetchApi } from '../services/api';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
}

interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isLoading: boolean;
  error: string | null;

  setAuthModalOpen: (open: boolean, mode?: 'login' | 'register') => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const getStoredUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem('vibe_user');
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: getStoredUser(),
  accessToken: localStorage.getItem('vibe_access_token'),
  refreshToken: localStorage.getItem('vibe_refresh_token'),
  isAuthenticated: !!localStorage.getItem('vibe_access_token'),
  isAuthModalOpen: false,
  authModalMode: 'login',
  isLoading: false,
  error: null,

  setAuthModalOpen: (open, mode = 'login') =>
    set({ isAuthModalOpen: open, authModalMode: mode, error: null }),

  setAuthModalMode: (mode) => set({ authModalMode: mode, error: null }),

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchApi<{ user: UserProfile; accessToken: string; refreshToken: string }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        },
      );

      localStorage.setItem('vibe_access_token', data.accessToken);
      localStorage.setItem('vibe_refresh_token', data.refreshToken);
      localStorage.setItem('vibe_user', JSON.stringify(data.user));

      set({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isAuthModalOpen: false,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message || 'Login failed' });
      throw err;
    }
  },

  register: async (email, username, password) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchApi<{ user: UserProfile; accessToken: string; refreshToken: string }>(
        '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({ email, username, password }),
        },
      );

      localStorage.setItem('vibe_access_token', data.accessToken);
      localStorage.setItem('vibe_refresh_token', data.refreshToken);
      localStorage.setItem('vibe_user', JSON.stringify(data.user));

      set({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        isAuthModalOpen: false,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message || 'Registration failed' });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('vibe_access_token');
    localStorage.removeItem('vibe_refresh_token');
    localStorage.removeItem('vibe_user');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('vibe_access_token');
    if (!token) return;

    try {
      const res = await fetchApi<{ user: UserProfile }>('/auth/me');
      if (res.user) {
        localStorage.setItem('vibe_user', JSON.stringify(res.user));
        set({ user: res.user, isAuthenticated: true });
      }
    } catch (_) {
      // If access token check failed, attempt refresh
      const rToken = localStorage.getItem('vibe_refresh_token');
      if (rToken) {
        try {
          const data = await fetchApi<{ user: UserProfile; accessToken: string; refreshToken: string }>(
            '/auth/refresh',
            {
              method: 'POST',
              body: JSON.stringify({ refreshToken: rToken }),
            },
          );
          localStorage.setItem('vibe_access_token', data.accessToken);
          localStorage.setItem('vibe_refresh_token', data.refreshToken);
          localStorage.setItem('vibe_user', JSON.stringify(data.user));
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isAuthenticated: true,
          });
        } catch (error) {
          get().logout();
        }
      } else {
        get().logout();
      }
    }
  },
}));
