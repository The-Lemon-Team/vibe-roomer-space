/**
 * adminFeedApi – RTK Query slice for Admin Feed (edit Main / Live page).
 *
 * Admin proxies the same vibe entities that power Live, but with CRUD
 * and toggle-inMainFeed controls.
 *
 *  • getAdminFeed          GET    /admin/feed
 *  • createAdminFeedItem   POST   /admin/feed
 *  • updateAdminFeedItem   PATCH  /admin/feed/:id
 *  • toggleMainFeed        PATCH  /admin/feed/:id/toggle
 *  • deleteAdminFeedItem   DELETE /admin/feed/:id
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { mapVibe, type ServerVibe } from './mapVibe';
import { vibesApi } from './vibesApi';
import type { VibeItem } from '../useAtmosphericStore';

export interface CreateAdminFeedItemRequest {
  title: string;
  content: string;
  keywords?: string[];
  images?: string[];
  videoUrls?: string[];
  musicUrls?: string[];
  inMainFeed?: boolean;
}

export interface UpdateAdminFeedItemRequest {
  id: string;
  title?: string;
  content?: string;
  keywords?: string[];
  images?: string[];
  videoUrls?: string[];
  musicUrls?: string[];
  inMainFeed?: boolean;
}

export const adminFeedApi = createApi({
  reducerPath: 'adminFeedApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AdminFeed'],
  endpoints: (builder) => ({
    getAdminFeed: builder.query<VibeItem[], void>({
      query: () => '/admin/feed',
      transformResponse: (response: ServerVibe[]) =>
        (Array.isArray(response) ? response : []).map(mapVibe),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'AdminFeed' as const, id })),
              { type: 'AdminFeed', id: 'LIST' },
            ]
          : [{ type: 'AdminFeed', id: 'LIST' }],
    }),

    createAdminFeedItem: builder.mutation<VibeItem, CreateAdminFeedItemRequest>({
      query: (body) => ({
        url: '/admin/feed',
        method: 'POST',
        body: {
          ...body,
          keywords: (body.keywords || []).map((k) => k.replace(/^#/, '')),
          inMainFeed: body.inMainFeed !== undefined ? body.inMainFeed : true,
        },
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: [{ type: 'AdminFeed', id: 'LIST' }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(vibesApi.util.invalidateTags([{ type: 'Vibe', id: 'LIST' }]));
        } catch {
          /* noop */
        }
      },
    }),

    updateAdminFeedItem: builder.mutation<VibeItem, UpdateAdminFeedItemRequest>({
      query: ({ id, ...body }) => ({
        url: `/admin/feed/${id}`,
        method: 'PATCH',
        body: {
          ...body,
          ...(body.keywords !== undefined && {
            keywords: body.keywords.map((k) => k.replace(/^#/, '')),
          }),
        },
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'AdminFeed', id },
        { type: 'AdminFeed', id: 'LIST' },
      ],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(vibesApi.util.invalidateTags([{ type: 'Vibe', id: 'LIST' }]));
        } catch {
          /* noop */
        }
      },
    }),

    toggleMainFeed: builder.mutation<VibeItem, { id: string; inMainFeed?: boolean }>({
      query: ({ id, inMainFeed }) => ({
        url: `/admin/feed/${id}/toggle`,
        method: 'PATCH',
        body: inMainFeed !== undefined ? { inMainFeed } : {},
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'AdminFeed', id },
        { type: 'AdminFeed', id: 'LIST' },
      ],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(vibesApi.util.invalidateTags([{ type: 'Vibe', id: 'LIST' }]));
        } catch {
          /* noop */
        }
      },
    }),

    deleteAdminFeedItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/feed/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'AdminFeed', id },
        { type: 'AdminFeed', id: 'LIST' },
      ],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(vibesApi.util.invalidateTags([{ type: 'Vibe', id: 'LIST' }]));
        } catch {
          /* noop */
        }
      },
    }),
  }),
});

export const {
  useGetAdminFeedQuery,
  useCreateAdminFeedItemMutation,
  useUpdateAdminFeedItemMutation,
  useToggleMainFeedMutation,
  useDeleteAdminFeedItemMutation,
} = adminFeedApi;
