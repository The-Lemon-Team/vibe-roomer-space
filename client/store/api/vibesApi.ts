/**
 * vibesApi – RTK Query slice for Vibe endpoints.
 *
 * Feed modes:
 *  • [Все вайбы]  → GET /vibes?tag=…          (main page)
 *  • [Мои вайбы]  → GET /vibes?authorId=…&tag=…
 *  • [Мои теги]   → GET /vibes?tag=…          (shared; #ALL = any personal tags)
 *  • [Приватные]  → GET /vibes?authorId=…&tag=… (sidebar CTA, not in feed select)
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { mapVibe, type ServerVibe } from './mapVibe';
import type {
  VibeItem,
  VibeWidget,
  RoomConfig,
  VibeUpdate,
} from '../useAtmosphericStore';

// ── Request / response shapes ──────────────────────────────────────────────

export interface GetVibesArgs {
  tag?: string;
  authorId?: string;
  /** Live / main page streams */
  inMainFeed?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

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
  inMainFeed?: boolean;
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

export type MenuTagScope = 'VIBES' | 'ROOMS';

export interface MenuTag {
  id: string;
  name: string;
  scope: MenuTagScope;
  sortOrder: number;
}

interface PaginatedVibes {
  data: ServerVibe[];
  total: number;
  page: number;
  limit: number;
}

const cleanTagParam = (tag?: string) => {
  if (!tag || tag === '#ALL') return undefined;
  return tag.replace(/^#/, '').toLowerCase();
};

// ── Slice ──────────────────────────────────────────────────────────────────

export const vibesApi = createApi({
  reducerPath: 'vibesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vibe', 'Hashtag', 'MenuTag'],
  endpoints: (builder) => ({
    // ── GET /vibes?… ────────────────────────────────────────────────
    getVibes: builder.query<VibeItem[], GetVibesArgs | string | undefined>({
      query: (arg) => {
        const params: Record<string, string | number | boolean> = {};

        if (typeof arg === 'string' || arg === undefined) {
          const tag = cleanTagParam(arg);
          if (tag) params.tag = tag;
        } else {
          const tag = cleanTagParam(arg.tag);
          if (tag) params.tag = tag;
          if (arg.authorId) params.authorId = arg.authorId;
          if (arg.inMainFeed !== undefined) params.inMainFeed = arg.inMainFeed;
          if (arg.search) params.search = arg.search;
          if (arg.page) params.page = arg.page;
          if (arg.limit) params.limit = arg.limit;
        }

        return { url: '/vibes', params };
      },
      transformResponse: (response: PaginatedVibes | ServerVibe[]) => {
        const rows = Array.isArray(response) ? response : response?.data ?? [];
        return rows.map(mapVibe);
      },
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
      transformResponse: (response: ServerVibe) => mapVibe(response),
      providesTags: (_result, _err, id) => [{ type: 'Vibe', id }],
    }),

    // ── POST /vibes ─────────────────────────────────────────────────
    createVibe: builder.mutation<VibeItem, CreateVibeRequest>({
      query: (body) => ({
        url: '/vibes',
        method: 'POST',
        body: {
          title: body.title,
          content: body.content,
          keywords: (body.keywords || body.tags || []).map((t) =>
            t.replace(/^#/, ''),
          ),
          images: body.images || [],
          videoUrls:
            body.widgets
              ?.filter((w) => w.type === 'youtube')
              .map((w) => w.url) ||
            (body.videoUrl ? [body.videoUrl] : []),
          musicUrls: body.musicUrl ? [body.musicUrl] : [],
          roomConfig: body.roomConfig || null,
        },
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: [{ type: 'Vibe', id: 'LIST' }, { type: 'Hashtag', id: 'TOP' }],
    }),

    // ── PATCH /vibes/:id ────────────────────────────────────────────
    updateVibe: builder.mutation<VibeItem, UpdateVibeRequest>({
      query: ({ id, updates }) => ({
        url: `/vibes/${id}`,
        method: 'PATCH',
        body: {
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.content !== undefined && { content: updates.content }),
          ...(updates.keywords !== undefined && {
            keywords: updates.keywords.map((k) => k.replace(/^#/, '')),
          }),
          ...(updates.tags !== undefined && {
            keywords: updates.tags.map((t) => t.replace(/^#/, '')),
          }),
          ...(updates.images !== undefined && { images: updates.images }),
          ...(updates.widgets !== undefined && {
            videoUrls: updates.widgets
              .filter((w) => w.type === 'youtube')
              .map((w) => w.url),
          }),
          ...(updates.videoUrl !== undefined &&
            updates.widgets === undefined && {
              videoUrls: updates.videoUrl ? [updates.videoUrl] : [],
            }),
          ...(updates.musicUrl !== undefined && {
            musicUrls: updates.musicUrl ? [updates.musicUrl] : [],
          }),
          ...(updates.roomConfig !== undefined && { roomConfig: updates.roomConfig }),
        },
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: (_result, _err, { id }) => [
        { type: 'Vibe', id },
        { type: 'Vibe', id: 'LIST' },
      ],
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
      async onQueryStarted({ vibeId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newUpdate } = await queryFulfilled;
          dispatch(
            vibesApi.util.updateQueryData('getVibeById', vibeId, (draft) => {
              draft.updates = [...(draft.updates || []), newUpdate];
            }),
          );
        } catch {
          // queryFulfilled rejection is handled by RTK
        }
      },
      invalidatesTags: (_result, _err, { vibeId }) => [{ type: 'Vibe', id: vibeId }],
    }),

    // ── POST /vibes/:id/tags ────────────────────────────────────────
    addTagToVibe: builder.mutation<VibeItem, AddTagRequest>({
      query: ({ vibeId, tag }) => ({
        url: `/vibes/${vibeId}/tags`,
        method: 'POST',
        body: { tag },
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: (_result, _err, { vibeId }) => [{ type: 'Vibe', id: vibeId }],
    }),

    // ── DELETE /vibes/:id/tags/:tag ─────────────────────────────────
    removeTagFromVibe: builder.mutation<VibeItem, RemoveTagRequest>({
      query: ({ vibeId, tag }) => ({
        url: `/vibes/${vibeId}/tags/${encodeURIComponent(tag.replace(/^#/, ''))}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ServerVibe) => mapVibe(response),
      invalidatesTags: (_result, _err, { vibeId }) => [{ type: 'Vibe', id: vibeId }],
    }),

    // ── GET /hashtags/top?limit=10 ──────────────────────────────────
    getTopHashtags: builder.query<TopHashtag[], number | undefined>({
      query: (limit = 10) => `/hashtags/top?limit=${limit}`,
      providesTags: [{ type: 'Hashtag', id: 'TOP' }],
    }),

    // ── GET /menu-tags?scope=VIBES|ROOMS ─────────────────────────────
    getMenuTags: builder.query<MenuTag[], MenuTagScope | undefined>({
      query: (scope) => ({
        url: '/menu-tags',
        params: scope ? { scope } : {},
      }),
      providesTags: (_result, _err, scope) => [
        { type: 'MenuTag', id: scope || 'ALL' },
      ],
    }),

    // ── POST /admin/menu-tags ───────────────────────────────────────
    addMenuTag: builder.mutation<MenuTag, { name: string; scope: MenuTagScope }>({
      query: ({ name, scope }) => ({
        url: '/admin/menu-tags',
        method: 'POST',
        body: { name: name.replace(/^#/, ''), scope },
      }),
      async onQueryStarted({ name, scope }, { dispatch, queryFulfilled }) {
        const normalized = name.replace(/^#/, '').toLowerCase().trim();
        const formatted = `#${normalized}`;
        const tempId = `temp-${scope}-${normalized}`;
        const patch = dispatch(
          vibesApi.util.updateQueryData('getMenuTags', scope, (draft) => {
            if (draft.some((t) => t.name.toLowerCase() === formatted)) return;
            draft.push({
              id: tempId,
              name: formatted,
              scope,
              sortOrder: draft.length,
            });
          }),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            vibesApi.util.updateQueryData('getMenuTags', scope, (draft) => {
              const idx = draft.findIndex((t) => t.id === tempId);
              if (idx >= 0) draft[idx] = data;
              else if (!draft.some((t) => t.id === data.id)) draft.push(data);
            }),
          );
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_r, _e, { scope }) => [{ type: 'MenuTag', id: scope }],
    }),

    // ── DELETE /admin/menu-tags/:id ─────────────────────────────────
    removeMenuTag: builder.mutation<void, { id: string; scope: MenuTagScope }>({
      query: ({ id }) => ({
        url: `/admin/menu-tags/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id, scope }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          vibesApi.util.updateQueryData('getMenuTags', scope, (draft) => {
            const idx = draft.findIndex((t) => t.id === id);
            if (idx >= 0) draft.splice(idx, 1);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_r, _e, { scope }) => [{ type: 'MenuTag', id: scope }],
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
  useGetMenuTagsQuery,
  useAddMenuTagMutation,
  useRemoveMenuTagMutation,
} = vibesApi;
