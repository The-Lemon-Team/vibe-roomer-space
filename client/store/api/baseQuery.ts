/**
 * RTK Query base query with automatic JWT token injection and transparent token-refresh.
 *
 * Flow:
 *  1. Attach `Authorization: Bearer <accessToken>` from localStorage.
 *  2. On 401, attempt token refresh via POST /auth/refresh.
 *  3. On successful refresh, persist the new tokens and retry the original request.
 *  4. On failed refresh, call logout() and return the original error.
 */
import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const API_BASE_URL =
  typeof window !== 'undefined'
    ? import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`
    : 'http://localhost:3001';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('vibe_access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh
    const refreshToken = localStorage.getItem('vibe_refresh_token');
    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
          user: object;
        };
        localStorage.setItem('vibe_access_token', data.accessToken);
        localStorage.setItem('vibe_refresh_token', data.refreshToken);
        localStorage.setItem('vibe_user', JSON.stringify(data.user));

        // Retry original request with new token
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // Refresh failed – wipe tokens
        localStorage.removeItem('vibe_access_token');
        localStorage.removeItem('vibe_refresh_token');
        localStorage.removeItem('vibe_user');
      }
    } else {
      localStorage.removeItem('vibe_access_token');
      localStorage.removeItem('vibe_refresh_token');
      localStorage.removeItem('vibe_user');
    }
  }

  return result;
};
