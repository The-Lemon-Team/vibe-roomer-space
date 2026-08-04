import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { VibeItem } from './store/useAtmosphericStore';
import {
  FEED_SCOPE_OPTIONS,
  isFeedScope,
  type FeedScope,
} from './store/useAtmosphericStore';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  syncRouteFromUrl,
  setActiveTag,
  setCreateModalOpen,
  openEditVibeModal,
  setAdminMenuTags,
  setRoomsAdminMenuTags,
  setTagMode,
} from './store/uiSlice';
import { setAuthModalOpen } from './store/authSlice';
import {
  useGetVibesQuery,
  useDeleteVibeMutation,
  useGetTopHashtagsQuery,
  useGetMenuTagsQuery,
} from './store/api/vibesApi';
import {
  useGetAdminFeedQuery,
  useDeleteAdminFeedItemMutation,
  useToggleMainFeedMutation,
} from './store/api/adminFeedApi';
import { useMeQuery } from './store/api/authApi';
import { HeaderNavbar } from './components/Navbar/HeaderNavbar';
import { ActivitySwitcher } from './components/VibeSelector/ActivitySwitcher';
import { OperatorSidebar } from './components/Sidebar/OperatorSidebar';
import { VibeCard } from './components/VibeList/VibeCard';
import { VibePage } from './components/VibePage/VibePage';
import { RoomListView } from './components/VibeRoom/RoomListView';
import { AtmosphericRoomView } from './components/VibeRoom/AtmosphericRoomView';
import { CreateRoomModal } from './components/VibeRoom/CreateRoomModal';
import { CreateVibeModal } from './components/VibeForm/CreateVibeModal';
import { DeleteVibeModal } from './components/VibeList/DeleteVibeModal';
import { AuthModal } from './components/Auth/AuthModal';
import { PrivateRoute } from './components/Auth/PrivateRoute';

const filterByActiveTag = (vibes: VibeItem[], activeTag: string) => {
  if (activeTag === '#ALL') return vibes;
  return vibes.filter(
    (v) =>
      v.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
      v.keywords?.some((k) => `#${k.toLowerCase()}` === activeTag.toLowerCase()),
  );
};

export const App: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // ── UI selectors ────────────────────────────────────────────────────────
  const viewMode = useAppSelector((s) => s.ui.viewMode);
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const tagMode = useAppSelector((s) => s.ui.tagMode);
  const myTags = useAppSelector((s) => s.ui.myTags);
  const selectedVibeRoom = useAppSelector((s) => s.ui.selectedVibeRoom);
  const activeCreatedRoom = useAppSelector((s) => s.ui.activeCreatedRoom);

  // ── Auth selectors ──────────────────────────────────────────────────────
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  // Feed filter select: hidden on main [Все вайбы]. Shown on My vibes / My Tags / Private.
  const showFeedScope = isFeedScope(tagMode) && tagMode !== 'all_vibes';
  const activeFeedOption = FEED_SCOPE_OPTIONS.find((o) => o.mode === tagMode);

  // ── Mode-aware vibe queries ─────────────────────────────────────────────
  // [Мои вайбы]: vibes authored by the signed-in user (browse filter)
  const liveArgs = useMemo(
    () => ({
      authorId: user?.id,
      tag: activeTag !== '#ALL' ? activeTag : undefined,
      limit: 50,
    }),
    [user?.id, activeTag],
  );
  const { data: liveVibes = [] } = useGetVibesQuery(liveArgs, {
    skip: tagMode !== 'live' || !user?.id,
  });

  // [Все вайбы]: main page — full catalog
  const allVibesArgs = useMemo(
    () => ({
      tag: activeTag !== '#ALL' ? activeTag : undefined,
      limit: 50,
    }),
    [activeTag],
  );
  const { data: allVibes = [] } = useGetVibesQuery(allVibesArgs, {
    skip: tagMode !== 'all_vibes',
  });

  // [Мои теги]: shared vibes; specific tag hits API, #ALL filters by personal tags client-side
  const myTagsArgs = useMemo(
    () => ({
      tag: activeTag !== '#ALL' ? activeTag : undefined,
      limit: activeTag === '#ALL' ? 100 : 50,
    }),
    [activeTag],
  );
  const { data: taggedSharedVibes = [] } = useGetVibesQuery(myTagsArgs, {
    skip: tagMode !== 'my_tags',
  });

  // [Приватные]: private workspace — posts authored by the signed-in user (create/edit)
  const myVibesArgs = useMemo(
    () => ({
      authorId: user?.id,
      tag: activeTag !== '#ALL' ? activeTag : undefined,
      limit: 50,
    }),
    [user?.id, activeTag],
  );
  const { data: myVibes = [] } = useGetVibesQuery(myVibesArgs, {
    skip: tagMode !== 'my_vibes' || !user?.id,
  });

  // Admin: full catalog for editing Main Feed (toggle inMainFeed)
  const { data: adminVibes = [] } = useGetAdminFeedQuery(undefined, {
    skip: tagMode !== 'admin_config' || !isAdmin,
  });

  const [deleteVibeMutation] = useDeleteVibeMutation();
  const [deleteAdminFeedItem] = useDeleteAdminFeedItemMutation();
  const [toggleMainFeed] = useToggleMainFeedMutation();

  // Validate session on mount (skip if not authenticated)
  useMeQuery(undefined, { skip: !isAuthenticated });

  // Pre-fetch top hashtags (used in tag menus & autocomplete)
  useGetTopHashtagsQuery(10);

  // Public homepage menu tags (admin-configured, shared for all users)
  const { data: vibeMenuTags } = useGetMenuTagsQuery('VIBES');
  const { data: roomMenuTags } = useGetMenuTagsQuery('ROOMS');

  const [vibeToDelete, setVibeToDelete] = useState<VibeItem | null>(null);

  // Sync URL hash → store on mount and on hash changes
  useEffect(() => {
    dispatch(syncRouteFromUrl());
    const handleHashChange = () => dispatch(syncRouteFromUrl());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [dispatch]);

  // Hydrate uiSlice from server menu tags so LIVE mode is shared across users
  useEffect(() => {
    if (vibeMenuTags) {
      dispatch(setAdminMenuTags(vibeMenuTags.map((t) => t.name)));
    }
  }, [vibeMenuTags, dispatch]);

  useEffect(() => {
    if (roomMenuTags) {
      dispatch(setRoomsAdminMenuTags(roomMenuTags.map((t) => t.name)));
    }
  }, [roomMenuTags, dispatch]);

  const sourceVibes =
    tagMode === 'admin_config'
      ? adminVibes
      : tagMode === 'my_vibes'
        ? myVibes
        : tagMode === 'my_tags'
          ? taggedSharedVibes
          : tagMode === 'all_vibes'
            ? allVibes
            : liveVibes;

  const filteredVibes = useMemo(() => {
    // [Мои теги] + #ALL → vibes matching any personal tag shortcut
    if (tagMode === 'my_tags' && activeTag === '#ALL') {
      if (myTags.length === 0) return [];
      const normalized = myTags.map((t) => t.toLowerCase());
      return sourceVibes.filter(
        (v) =>
          v.tags?.some((t) => normalized.includes(t.toLowerCase())) ||
          v.keywords?.some((k) => normalized.includes(`#${k.toLowerCase()}`)),
      );
    }
    return filterByActiveTag(sourceVibes, activeTag);
  }, [tagMode, activeTag, myTags, sourceVibes]);

  const feedLabel =
    tagMode === 'live'
      ? t('feed.badge.live')
      : tagMode === 'all_vibes'
        ? t('feed.badge.all')
        : tagMode === 'my_tags'
          ? t('feed.badge.myTags')
          : tagMode === 'my_vibes'
            ? t('feed.badge.myVibes')
            : t('feed.badge.admin');

  const feedHelper =
    tagMode === 'live'
      ? t('feed.helper.live')
      : tagMode === 'all_vibes'
        ? t('feed.helper.all')
        : tagMode === 'my_tags'
          ? t('feed.helper.myTags')
          : tagMode === 'my_vibes'
            ? t('feed.helper.myVibes')
            : t('feed.helper.admin');

  const canCreate =
    tagMode === 'my_vibes' || (tagMode === 'admin_config' && isAdmin);
  // [Все вайбы] / [Мои вайбы] / [Мои теги] are browse-only; creation belongs to [Приватные] / Admin

  const handleFeedScope = (scope: FeedScope) => {
    if ((scope === 'my_tags' || scope === 'live') && !isAuthenticated) {
      dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
      return;
    }
    dispatch(setTagMode(scope));
  };

  const handleDelete = async () => {
    if (!vibeToDelete) return;
    if (tagMode === 'admin_config') {
      await deleteAdminFeedItem(vibeToDelete.id);
    } else {
      await deleteVibeMutation(vibeToDelete.id);
    }
    setVibeToDelete(null);
  };

  const renderVibesFeed = () => (
    <main className="flex-1 w-full h-full overflow-y-auto bg-zinc-950 bg-[radial-gradient(#1a779d50_1px,transparent_1px)] bg-[size:16px_16px] pb-8">
      <div
        className="toolbar w-full border-b border-zinc-800/80 backdrop-blur-sm"
        style={{ backgroundColor: 'rgb(13 13 18 / 95%)' }}
      >
        <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center gap-2 flex-wrap font-mono text-xs text-zinc-400 px-4 md:px-6 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-bold px-2 py-0.5 rounded border ${
                tagMode === 'all_vibes'
                  ? 'bg-gradient-to-r from-cyan-950/80 to-red-950/80 border-cyan-500/50 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                  : tagMode === 'live'
                    ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                    : tagMode === 'admin_config'
                      ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                      : tagMode === 'my_vibes'
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                        : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
              }`}
            >
              [{feedLabel}]
            </span>
            <span className="inline-flex items-center gap-1.5">
              {t('common.route')}{' '}
              {activeTag === '#ALL' ? (
                <span className="text-zinc-200 font-bold">{activeTag}</span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-zinc-800/80 border border-zinc-600 text-zinc-200 font-bold px-2 py-0.5 rounded">
                  <span>{activeTag}</span>
                  <button
                    type="button"
                    onClick={() => dispatch(setActiveTag('#ALL'))}
                    className="text-zinc-400 hover:text-white ml-0.5 text-[11px] leading-none"
                    title={t('feed.clearFilter')}
                    aria-label={t('feed.clearFilter')}
                  >
                    ✕
                  </button>
                </span>
              )}
            </span>
            <span className="text-zinc-600 hidden sm:inline">— {feedHelper}</span>
          </div>
          <div className="flex items-center gap-3">
            {canCreate && (
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    dispatch(setCreateModalOpen(true));
                  } else {
                    dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
                  }
                }}
                className={`px-2.5 py-1 font-bold rounded border uppercase transition-colors ${
                  tagMode === 'admin_config'
                    ? 'border-purple-600/60 text-purple-300 hover:bg-purple-950/50'
                    : 'border-emerald-600/60 text-emerald-300 hover:bg-emerald-950/50'
                }`}
              >
                {tagMode === 'admin_config' ? t('feed.mainFeedItem') : t('feed.transmit')}
              </button>
            )}
            <div className="text-zinc-500">{t('feed.vibeLogs', { count: filteredVibes.length })}</div>
          </div>
        </div>
      </div>

      <div className="content-section w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-2 md:pt-3 lg:pt-4">
        <div className="max-w-4xl mx-auto">
          {showFeedScope && (
            <div className="feed-scope-select mb-3 md:mb-4 flex items-center gap-2 font-mono text-xs">
              <label
                htmlFor="feed-scope-select"
                className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold shrink-0"
              >
                {t('feed.label')}
              </label>
              <div className="relative min-w-[13rem]">
                <select
                  id="feed-scope-select"
                  value={tagMode}
                  onChange={(e) => handleFeedScope(e.target.value as FeedScope)}
                  title={activeFeedOption ? t(activeFeedOption.titleKey) : undefined}
                  className={`w-full appearance-none bg-zinc-900 border rounded px-3 py-1.5 pr-8 font-bold cursor-pointer outline-none transition-colors focus:ring-1 ${
                    tagMode === 'all_vibes'
                      ? 'border-zinc-600 text-zinc-100 focus:ring-zinc-500/40'
                      : tagMode === 'live'
                        ? 'border-cyan-700/50 text-cyan-300 focus:ring-cyan-500/40'
                        : tagMode === 'my_tags'
                          ? 'border-cyan-700/50 text-cyan-400 focus:ring-cyan-500/40'
                          : 'border-emerald-700/50 text-emerald-300 focus:ring-emerald-500/40'
                  }`}
                >
                  {FEED_SCOPE_OPTIONS.map((opt) => (
                    <option key={opt.mode} value={opt.mode} title={t(opt.titleKey)}>
                      {opt.locked ? `🔒 ${t(opt.labelKey)}` : t(opt.labelKey)}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 material-symbols-outlined text-base">
                  expand_more
                </span>
              </div>
            </div>
          )}
          <p className="sm:hidden font-mono text-[10px] text-zinc-600 mb-3 px-1">{feedHelper}</p>
          {tagMode === 'my_vibes' && !isAuthenticated ? (
            <div className="flex items-start gap-2 font-mono text-xs">
              {showFeedScope && (
                <span
                  aria-hidden
                  className="invisible uppercase tracking-widest text-[10px] font-bold shrink-0"
                >
                  {t('feed.label')}
                </span>
              )}
              <div className="min-w-0 flex-1 text-left py-8 border border-dashed border-zinc-800 rounded bg-zinc-900/40 px-3 text-zinc-500 space-y-3">
                <div>{t('feed.signInPrivate')}</div>
                <button
                  onClick={() => dispatch(setAuthModalOpen({ open: true, mode: 'login' }))}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/60 text-cyan-400 font-bold rounded hover:bg-cyan-500/30 transition-colors uppercase"
                >
                  {t('feed.authenticate')}
                </button>
              </div>
            </div>
          ) : tagMode === 'my_tags' && !isAuthenticated ? (
            <div className="flex items-start gap-2 font-mono text-xs">
              {showFeedScope && (
                <span
                  aria-hidden
                  className="invisible uppercase tracking-widest text-[10px] font-bold shrink-0"
                >
                  {t('feed.label')}
                </span>
              )}
              <div className="min-w-0 flex-1 text-left py-8 border border-dashed border-zinc-800 rounded bg-zinc-900/40 px-3 text-zinc-500 space-y-3">
                <div>{t('feed.signInTags')}</div>
                <button
                  onClick={() => dispatch(setAuthModalOpen({ open: true, mode: 'login' }))}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/60 text-cyan-400 font-bold rounded hover:bg-cyan-500/30 transition-colors uppercase"
                >
                  {t('feed.authenticate')}
                </button>
              </div>
            </div>
          ) : filteredVibes.length === 0 ? (
            <div className="flex items-start gap-2 font-mono text-xs">
              {showFeedScope && (
                <span
                  aria-hidden
                  className="invisible uppercase tracking-widest text-[10px] font-bold shrink-0"
                >
                  {t('feed.label')}
                </span>
              )}
              <div className="min-w-0 flex-1 text-left py-8 border border-dashed border-zinc-800 rounded bg-zinc-900/40 px-3 text-zinc-500 space-y-3">
                <div>
                  {tagMode === 'live'
                    ? t('feed.empty.live', { tag: activeTag })
                    : tagMode === 'all_vibes'
                      ? t('feed.empty.all', { tag: activeTag })
                      : tagMode === 'admin_config'
                        ? t('feed.empty.admin', { tag: activeTag })
                        : tagMode === 'my_tags'
                          ? t('feed.empty.myTags', { tag: activeTag })
                          : t('feed.empty.myVibes', { tag: activeTag })}
                </div>
                {canCreate && (
                  <>
                    <div>
                      {tagMode === 'admin_config'
                        ? t('feed.emptyHint.admin')
                        : t('feed.emptyHint.create')}
                    </div>
                    <button
                      onClick={() => {
                        if (isAuthenticated) {
                          dispatch(setCreateModalOpen(true));
                        } else {
                          dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
                        }
                      }}
                      className="px-4 py-2 bg-amber-500/20 border border-amber-500/60 text-amber-400 font-bold rounded hover:bg-amber-500/30 transition-colors uppercase"
                    >
                      {t('feed.transmitFor', { tag: activeTag })}
                    </button>
                  </>
                )}
                {(tagMode === 'all_vibes' || tagMode === 'live') && (
                  <div className="text-zinc-600">
                    {t('feed.browseOnly')}
                  </div>
                )}
                {tagMode === 'my_tags' && (
                  <div className="text-zinc-600">
                    {t('feed.myTagsHint')}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVibes.map((vibe) => (
                <VibeCard
                  key={vibe.id}
                  id={vibe.id}
                  title={vibe.title}
                  content={vibe.content}
                  tags={vibe.tags}
                  keywords={vibe.keywords}
                  images={vibe.images}
                  widgets={vibe.widgets}
                  videoUrl={vibe.videoUrl}
                  musicUrl={vibe.musicUrl}
                  authorName={vibe.authorName}
                  authorId={vibe.authorId}
                  currentUserId={user?.id || ''}
                  createdAt={vibe.createdAt}
                  vibeItem={vibe}
                  editable={
                    tagMode === 'admin_config' ||
                    (tagMode === 'my_vibes' && user?.id === vibe.authorId)
                  }
                  showMainFeedToggle={tagMode === 'admin_config'}
                  onToggleMainFeed={
                    tagMode === 'admin_config'
                      ? () =>
                          toggleMainFeed({
                            id: vibe.id,
                            inMainFeed: !vibe.inMainFeed,
                          })
                      : undefined
                  }
                  onDelete={() => setVibeToDelete(vibe)}
                  onEdit={() => dispatch(openEditVibeModal(vibe))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-hidden">
      {/* Scanline CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-50 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />

      <div className="flex flex-1 overflow-hidden h-full">
        <OperatorSidebar />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <header className="sticky top-0 z-40 shrink-0 backdrop-blur-md border-b border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)] top-header">
            <HeaderNavbar />
            <ActivitySwitcher />
          </header>

          {viewMode === 'vibe' ? (
            <VibePage />
          ) : viewMode === 'vibes' ? (
            tagMode === 'admin_config' ? (
              <PrivateRoute requireAdmin>{renderVibesFeed()}</PrivateRoute>
            ) : (
              renderVibesFeed()
            )
          ) : activeCreatedRoom ? (
            <AtmosphericRoomView
              vibeTitle={activeCreatedRoom.title}
              roomConfig={activeCreatedRoom.roomConfig}
              vibeItem={selectedVibeRoom || undefined}
            />
          ) : (
            <RoomListView />
          )}
        </div>
      </div>

      <AuthModal />
      <CreateVibeModal />
      <CreateRoomModal />

      <DeleteVibeModal
        vibe={vibeToDelete}
        onConfirm={handleDelete}
        onCancel={() => setVibeToDelete(null)}
      />
    </div>
  );
};

export default App;
