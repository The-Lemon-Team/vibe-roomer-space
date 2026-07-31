/**
 * authApi – RTK Query slice for authentication endpoints.
 *
 * Endpoints:
 *  • login        POST /auth/login
 *  • register     POST /auth/register
 *  • me           GET  /auth/me   (validate session)
 *  • refresh      POST /auth/refresh
 *  • logout       POST /auth/logout
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import type { UserProfile } from '../useAuthStore';

interface AuthTokens {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface RefreshRequest {
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // ── GET /auth/me ────────────────────────────────────────────────
    me: builder.query<{ user: UserProfile }, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    // ── POST /auth/login ────────────────────────────────────────────
    login: builder.mutation<AuthTokens, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // ── POST /auth/register ─────────────────────────────────────────
    register: builder.mutation<AuthTokens, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    // ── POST /auth/refresh ──────────────────────────────────────────
    refresh: builder.mutation<AuthTokens, RefreshRequest>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),

    // ── POST /auth/logout ───────────────────────────────────────────
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
