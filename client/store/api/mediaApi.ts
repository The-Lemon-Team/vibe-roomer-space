/**
 * mediaApi – RTK Query slice for Media library endpoints.
 *
 * Mirrors server MediaController:
 *  • GET  /media                  – list registered assets
 *  • POST /media/upload           – upload image (FormData `file`)
 *  • DELETE /media/:filename      – remove asset
 *  • GET  /media/unsplash/search  – Unsplash proxy
 *
 * Vibe forms stay URL-first: upload resolves to a public `url`, then that
 * string is stored on `Vibe.images[]` (index 0 = main cover / theme bg).
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export interface MediaLibraryItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaUploadResult extends MediaLibraryItem {
  message: string;
}

export interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

export interface UnsplashSearchResult {
  results: UnsplashPhoto[];
}

export const mediaApi = createApi({
  reducerPath: 'mediaApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MediaLibrary'],
  endpoints: (builder) => ({
    listMedia: builder.query<MediaLibraryItem[], void>({
      query: () => '/media',
      providesTags: ['MediaLibrary'],
    }),

    uploadMedia: builder.mutation<MediaUploadResult, File>({
      query: (file) => {
        const body = new FormData();
        body.append('file', file);
        return {
          url: '/media/upload',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MediaLibrary'],
    }),

    deleteMedia: builder.mutation<{ message: string }, string>({
      query: (filename) => ({
        url: `/media/${encodeURIComponent(filename)}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MediaLibrary'],
    }),

    searchUnsplash: builder.query<UnsplashSearchResult, string>({
      query: (query) => `/media/unsplash/search?query=${encodeURIComponent(query)}`,
    }),
  }),
});

export const {
  useListMediaQuery,
  useLazyListMediaQuery,
  useUploadMediaMutation,
  useDeleteMediaMutation,
  useLazySearchUnsplashQuery,
} = mediaApi;
