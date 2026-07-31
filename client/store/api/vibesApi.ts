/**
 * vibesApi – RTK Query slice for Vibe endpoints.
 *
 * Endpoints:
 *  • getVibes           GET  /vibes?tag=…
 *  • getVibeById        GET  /vibes/:id
 *  • createVibe         POST /vibes
 *  • updateVibe         PATCH /vibes/:id
 *  • deleteVibe         DELETE /vibes/:id
 *  • addVibeUpdate      POST /vibes/:id/updates
 *  • addTagToVibe       POST /vibes/:id/tags
 *  • removeTagFromVibe  DELETE /vibes/:id/tags/:tag
 *  • getTopHashtags     GET  /hashtags/top?limit=10
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import type {
  VibeItem,
  VibeWidget,
  RoomConfig,
  VibeUpdate,
} from '../useAtmosphericStore';

// ── Request / response shapes ──────────────────────────────────────────────

export interface CreateVibeRequest {
  title: string;
  content: string;
  tags: string[];
  keywords?: string[];
  images?: string[];
  widgets?: VibeWidget[];
  musicUrl?: string | null;
  videoUrl?: string | null;
  authorName: string;
  authorId: string;
  roomConfig?: RoomConfig;
}

export interface UpdateVibeRequest {
  id: string;
  updates: Partial<Omit<VibeItem, 'id' | 'createdAt'>>;
}

export interface AddVibeUpdateRequest {
  vibeId: string;
  content: string;
  mediaUrls?: string[];
}

export interface AddTagRequest {
  vibeId: string;
  tag: string;
}

export interface RemoveTagRequest {
  vibeId: string;
  tag: string;
}

export interface TopHashtag {
  name: string;
  useCount: number;
}

// ── Slice ──────────────────────────────────────────────────────────────────

export const vibesApi = createApi({
  reducerPath: 'vibesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vibe', 'Hashtag'],
  endpoints: (builder) => ({
    // ── GET /vibes?tag=… ────────────────────────────────────────────
    getVibes: builder.query<VibeItem[], string | undefined>({
      query: (tag) => ({
        url: '/vibes',
        params: tag && tag !== '#ALL' ? { tag } : {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Vibe' as const, id })),
              { type: 'Vibe', id: 'LIST' },
            ]
          : [{ type: 'Vibe', id: 'LIST' }],
    }),

    // ── GET /vibes/:id ──────────────────────────────────────────────
    getVibeById: builder.query<VibeItem, string>({
      query: (id) => `/vibes/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Vibe', id }],
    }),

    // ── POST /vibes ─────────────────────────────────────────────────
    createVibe: builder.mutation<VibeItem, CreateVibeRequest>({
      query: (body) => ({
        url: '/vibes',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Vibe', id: 'LIST' }, { type: 'Hashtag', id: 'TOP' }],
    }),

    // ── PATCH /vibes/:id ────────────────────────────────────────────
    updateVibe: builder.mutation<VibeItem, UpdateVibeRequest>({
      query: ({ id, updates }) => ({
        url: `/vibes/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Vibe', id }],
    }),

    // ── DELETE /vibes/:id ───────────────────────────────────────────
    deleteVibe: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vibes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: 'Vibe', id },
        { type: 'Vibe', id: 'LIST' },
      ],
    }),

    // ── POST /vibes/:id/updates ─────────────────────────────────────
    addVibeUpdate: builder.mutation<VibeUpdate, AddVibeUpdateRequest>({
      query: ({ vibeId, content, mediaUrls }) => ({
        url: `/vibes/${vibeId}/updates`,
        method: 'POST',
        body: { content, mediaUrls },
      }),
      // Optimistic update: append the new update to the cached vibe immediately
      async onQueryStarted({ vibeId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newUpdate } = await queryFulfilled;
          dispatch(
            vibesApi.util.updateQueryData('getVibes', undefined, (draft) => {
              const vibe = draft.find((v) => v.id === vibeId);
              if (vibe) {
                vibe.updates = [...(vibe.updates || []), newUpdate];
              }
            }),
          );
          dispatch(
            vibesApi.util.updateQueryData('getVibeById', vibeId, (draft) => {
              draft.updates = [...(draft.updates || []), newUpdate];
            }),
          );
        } catch {
          // queryFulfilled rejection is handled by RTK
        }
      },
    }),

    // ── POST /vibes/:id/tags ────────────────────────────────────────
    addTagToVibe: builder.mutation<VibeItem, AddTagRequest>({
      query: ({ vibeId, tag }) => ({
        url: `/vibes/${vibeId}/tags`,
        method: 'POST',
        body: { tag },
      }),
      invalidatesTags: (_result, _err, { vibeId }) => [{ type: 'Vibe', id: vibeId }],
    }),

    // ── DELETE /vibes/:id/tags/:tag ─────────────────────────────────
    removeTagFromVibe: builder.mutation<VibeItem, RemoveTagRequest>({
      query: ({ vibeId, tag }) => ({
        url: `/vibes/${vibeId}/tags/${encodeURIComponent(tag)}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, { vibeId }) => [{ type: 'Vibe', id: vibeId }],
    }),

    // ── GET /hashtags/top?limit=10 ──────────────────────────────────
    getTopHashtags: builder.query<TopHashtag[], number | undefined>({
      query: (limit = 10) => `/hashtags/top?limit=${limit}`,
      providesTags: [{ type: 'Hashtag', id: 'TOP' }],
    }),
  }),
});

export const {
  useGetVibesQuery,
  useGetVibeByIdQuery,
  useCreateVibeMutation,
  useUpdateVibeMutation,
  useDeleteVibeMutation,
  useAddVibeUpdateMutation,
  useAddTagToVibeMutation,
  useRemoveTagFromVibeMutation,
  useGetTopHashtagsQuery,
} = vibesApi;
