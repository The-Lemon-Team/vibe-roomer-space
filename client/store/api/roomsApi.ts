/**
 * roomsApi – RTK Query slice for Room endpoints.
 *
 * Endpoints:
 *  • getRooms              GET  /rooms?tag=…
 *  • getRoomById           GET  /rooms/:id
 *  • createRoom            POST /rooms
 *  • updateRoom            PATCH /rooms/:id
 *  • deleteRoom            DELETE /rooms/:id
 *  • addStreamItem         POST /rooms/:id/stream
 *  • addRoomNews           POST /rooms/:id/news
 *  • deleteRoomNews        DELETE /rooms/:id/news/:newsId
 *  • addRoomNote           POST /rooms/:id/notes
 *  • updateRoomNote        PATCH /rooms/:id/notes/:noteId
 *  • deleteRoomNote        DELETE /rooms/:id/notes/:noteId
 *  • updateRoomBackground  PATCH /rooms/:id/background
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import type {
  CreatedRoom,
  RoomConfig,
  RoomStreamItem,
  RoomNewsItem,
  RoomNoteItem,
} from '../useAtmosphericStore';

// ── Request shapes ─────────────────────────────────────────────────────────

export interface CreateRoomRequest {
  title: string;
  description?: string;
  poster?: string;
  originVibeId?: string;
  originVibeTitle?: string;
  isPublic: boolean;
  tags: string[];
  images?: string[];
  videoUrl?: string | null;
  musicUrl?: string | null;
  youtubeUrl?: string | null;
  roomConfig?: RoomConfig;
}

export interface UpdateRoomRequest {
  id: string;
  updates: Partial<Omit<CreatedRoom, 'id' | 'createdAt'>>;
}

export interface AddStreamItemRequest {
  roomId: string;
  item: {
    type: 'text' | 'image' | 'video' | 'music' | 'youtube';
    content?: string;
    mediaUrls?: string[];
    url?: string;
    title?: string;
  };
}

export interface AddRoomNewsRequest {
  roomId: string;
  title: string;
  content: string;
}

export interface DeleteRoomNewsRequest {
  roomId: string;
  newsId: string;
}

export interface AddRoomNoteRequest {
  roomId: string;
  title: string;
  content: string;
}

export interface UpdateRoomNoteRequest {
  roomId: string;
  noteId: string;
  updates: { title?: string; content?: string };
}

export interface DeleteRoomNoteRequest {
  roomId: string;
  noteId: string;
}

export interface UpdateRoomBackgroundRequest {
  roomId: string;
  bgImageUrl: string | null;
}

export interface CreateRoomFromVibeRequest {
  vibeId: string;
  title: string;
  isPublic: boolean;
  tags: string[];
  roomConfig?: RoomConfig;
}

// ── Slice ──────────────────────────────────────────────────────────────────

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Room'],
  endpoints: (builder) => ({
    // ── GET /rooms?tag=… ────────────────────────────────────────────
    getRooms: builder.query<CreatedRoom[], string | undefined>({
      query: (tag) => ({
        url: '/rooms',
        params: tag && tag !== '#ALL' ? { tag } : {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Room' as const, id })),
              { type: 'Room', id: 'LIST' },
            ]
          : [{ type: 'Room', id: 'LIST' }],
    }),

    // ── GET /rooms/:id ──────────────────────────────────────────────
    getRoomById: builder.query<CreatedRoom, string>({
      query: (id) => `/rooms/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Room', id }],
    }),

    // ── POST /rooms ─────────────────────────────────────────────────
    createRoom: builder.mutation<CreatedRoom, CreateRoomRequest>({
      query: (body) => ({
        url: '/rooms',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Room', id: 'LIST' }],
    }),

    // ── PATCH /rooms/:id ────────────────────────────────────────────
    updateRoom: builder.mutation<CreatedRoom, UpdateRoomRequest>({
      query: ({ id, updates }) => ({
        url: `/rooms/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: 'Room', id }],
    }),

    // ── DELETE /rooms/:id ───────────────────────────────────────────
    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, id) => [
        { type: 'Room', id },
        { type: 'Room', id: 'LIST' },
      ],
    }),

    // ── POST /rooms/:id/stream ───────────────────────────────────────
    addStreamItem: builder.mutation<RoomStreamItem, AddStreamItemRequest>({
      query: ({ roomId, item }) => ({
        url: `/rooms/${roomId}/stream`,
        method: 'POST',
        body: item,
      }),
      // Optimistic update: append stream item immediately
      async onQueryStarted({ roomId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newItem } = await queryFulfilled;
          dispatch(
            roomsApi.util.updateQueryData('getRooms', undefined, (draft) => {
              const room = draft.find((r) => r.id === roomId);
              if (room) {
                room.streamItems = [...(room.streamItems || []), newItem];
              }
            }),
          );
          dispatch(
            roomsApi.util.updateQueryData('getRoomById', roomId, (draft) => {
              draft.streamItems = [...(draft.streamItems || []), newItem];
            }),
          );
        } catch {
          // noop
        }
      },
    }),

    // ── POST /rooms/:id/news ─────────────────────────────────────────
    addRoomNews: builder.mutation<RoomNewsItem, AddRoomNewsRequest>({
      query: ({ roomId, title, content }) => ({
        url: `/rooms/${roomId}/news`,
        method: 'POST',
        body: { title, content },
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── DELETE /rooms/:id/news/:newsId ───────────────────────────────
    deleteRoomNews: builder.mutation<void, DeleteRoomNewsRequest>({
      query: ({ roomId, newsId }) => ({
        url: `/rooms/${roomId}/news/${newsId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── POST /rooms/:id/notes ────────────────────────────────────────
    addRoomNote: builder.mutation<RoomNoteItem, AddRoomNoteRequest>({
      query: ({ roomId, title, content }) => ({
        url: `/rooms/${roomId}/notes`,
        method: 'POST',
        body: { title, content },
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── PATCH /rooms/:id/notes/:noteId ───────────────────────────────
    updateRoomNote: builder.mutation<RoomNoteItem, UpdateRoomNoteRequest>({
      query: ({ roomId, noteId, updates }) => ({
        url: `/rooms/${roomId}/notes/${noteId}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── DELETE /rooms/:id/notes/:noteId ──────────────────────────────
    deleteRoomNote: builder.mutation<void, DeleteRoomNoteRequest>({
      query: ({ roomId, noteId }) => ({
        url: `/rooms/${roomId}/notes/${noteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── PATCH /rooms/:id/background ──────────────────────────────────
    updateRoomBackground: builder.mutation<CreatedRoom, UpdateRoomBackgroundRequest>({
      query: ({ roomId, bgImageUrl }) => ({
        url: `/rooms/${roomId}/background`,
        method: 'PATCH',
        body: { bgImageUrl },
      }),
      invalidatesTags: (_result, _err, { roomId }) => [{ type: 'Room', id: roomId }],
    }),

    // ── GET /rooms/data?tag=… (legacy room-data endpoint) ───────────
    getRoomData: builder.query<unknown, string>({
      query: (tag) => ({
        url: '/rooms/data',
        params: tag && tag !== '#ALL' ? { tag } : {},
      }),
    }),

    // ── POST /rooms (from vibe origin) ─────────────────────────────
    createRoomFromVibe: builder.mutation<CreatedRoom, CreateRoomFromVibeRequest>({
      query: ({ vibeId, title, isPublic, tags, roomConfig }) => ({
        url: '/rooms',
        method: 'POST',
        body: {
          title,
          isPublic,
          tags,
          originVibeId: vibeId,
          originVibeTitle: title,
          roomConfig,
        },
      }),
      invalidatesTags: [{ type: 'Room', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useCreateRoomFromVibeMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useAddStreamItemMutation,
  useAddRoomNewsMutation,
  useDeleteRoomNewsMutation,
  useAddRoomNoteMutation,
  useUpdateRoomNoteMutation,
  useDeleteRoomNoteMutation,
  useUpdateRoomBackgroundMutation,
  useGetRoomDataQuery,
} = roomsApi;
