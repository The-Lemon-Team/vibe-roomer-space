import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTag,
  setViewMode,
  setCreateModalOpen,
  setTagMode,
  closeRoomPage,
  setMobileSidebarOpen,
  addMyTag,
  removeMyTag,
  addRoomsMyTag,
  removeRoomsMyTag,
} from '../../store/uiSlice';
import { setAuthModalOpen } from '../../store/authSlice';
import {
  useGetVibesQuery,
  useGetMenuTagsQuery,
  useAddMenuTagMutation,
  useRemoveMenuTagMutation,
  type MenuTagScope,
} from '../../store/api/vibesApi';
import { useGetAdminFeedQuery } from '../../store/api/adminFeedApi';
import { useGetRoomsQuery } from '../../store/api/roomsApi';

export const OperatorSidebar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // ── UI selectors ─────────────────────────────────────────────────────────
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const adminMenuTags = useAppSelector((s) => s.ui.adminMenuTags);
  const myTags = useAppSelector((s) => s.ui.myTags);
  const roomsAdminMenuTags = useAppSelector((s) => s.ui.roomsAdminMenuTags);
  const roomsMyTags = useAppSelector((s) => s.ui.roomsMyTags);
  const viewMode = useAppSelector((s) => s.ui.viewMode);
  const tagMode = useAppSelector((s) => s.ui.tagMode);
  const isMobileSidebarOpen = useAppSelector((s) => s.ui.isMobileSidebarOpen);

  // ── Auth selectors ────────────────────────────────────────────────────────
  const user = useAppSelector((s) => s.auth.user);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  // ── Mode-aware vibes (discovered-tag counts match current feed) ──────────
  const liveArgs = useMemo(
    () => ({ authorId: user?.id, limit: 50 }),
    [user?.id],
  );
  const allVibesArgs = useMemo(() => ({ limit: 50 }), []);
  const myTagsFeedArgs = useMemo(() => ({ limit: 50 }), []);
  const myVibesArgs = useMemo(
    () => ({ authorId: user?.id, limit: 50 }),
    [user?.id],
  );
  const { data: liveVibes = [] } = useGetVibesQuery(liveArgs, {
    skip: tagMode !== 'live' || !user?.id,
  });
  const { data: allVibes = [] } = useGetVibesQuery(allVibesArgs, {
    skip: tagMode !== 'all_vibes',
  });
  const { data: taggedSharedVibes = [] } = useGetVibesQuery(myTagsFeedArgs, {
    skip: tagMode !== 'my_tags',
  });
  const { data: myVibes = [] } = useGetVibesQuery(myVibesArgs, {
    skip: tagMode !== 'my_vibes' || !user?.id,
  });
  const { data: adminVibes = [] } = useGetAdminFeedQuery(undefined, {
    skip: tagMode !== 'admin_config' || !isAdmin,
  });
  const vibes =
    tagMode === 'admin_config'
      ? adminVibes
      : tagMode === 'my_vibes'
        ? myVibes
        : tagMode === 'my_tags'
          ? taggedSharedVibes
          : tagMode === 'all_vibes'
            ? allVibes
            : liveVibes;

  const { data: createdRooms = [] } = useGetRoomsQuery(undefined);

  const isRoomsMode = viewMode === 'rooms';
  const menuScope: MenuTagScope = isRoomsMode ? 'ROOMS' : 'VIBES';
  const { data: menuTagsData } = useGetMenuTagsQuery(menuScope);
  const [addMenuTag] = useAddMenuTagMutation();
  const [removeMenuTag] = useRemoveMenuTagMutation();

  const [sidebarTagInput, setSidebarTagInput] = useState('');

  const handleSelectTag = (tag: string) => {
    dispatch(setActiveTag(tag));
    dispatch(setMobileSidebarOpen(false));
  };

  const handleSelectViewMode = (mode: 'vibes' | 'rooms') => {
    if (mode === 'rooms') dispatch(closeRoomPage());
    dispatch(setViewMode(mode));
    dispatch(setMobileSidebarOpen(false));
  };

  const currentAdminTags = menuTagsData
    ? menuTagsData.map((t) => t.name)
    : isRoomsMode
      ? roomsAdminMenuTags
      : adminMenuTags;
  const currentMyTags = isRoomsMode ? roomsMyTags : myTags;

  const displayedTags = tagMode === 'admin_config' && isAdmin ? currentAdminTags : currentMyTags;
  const canEditSidebarTags =
    tagMode === 'my_tags' || (tagMode === 'admin_config' && isAdmin);
  const isVibesPage = viewMode === 'vibes' || viewMode === 'vibe';
  const canCreateVibe =
    tagMode === 'my_vibes' || (tagMode === 'admin_config' && isAdmin);

  // Extract all unique hashtags across vibes or rooms depending on mode
  const allDiscoveredTags = Array.from(
    new Set(
      isRoomsMode
        ? createdRooms.flatMap((r) => r.tags || [])
        : vibes.flatMap((v) => v.tags || []),
    ),
  );

  // Tags that are not yet pinned to the current view list
  const unpinnedDiscoveredTags = allDiscoveredTags.filter(
    (t) => !displayedTags.some((pt) => pt.toLowerCase() === t.toLowerCase()),
  );

  const handleAddCustomTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarTagInput.trim()) return;
    const formatted = sidebarTagInput.trim().startsWith('#')
      ? sidebarTagInput.trim().toLowerCase()
      : `#${sidebarTagInput.trim().toLowerCase()}`;

    if (tagMode === 'admin_config' && isAdmin) {
      try {
        await addMenuTag({ name: formatted, scope: menuScope }).unwrap();
        dispatch(setActiveTag(formatted));
      } catch {
        return;
      }
    } else if (tagMode === 'my_tags') {
      if (isRoomsMode) {
        dispatch(addRoomsMyTag(formatted));
      } else {
        dispatch(addMyTag(formatted));
      }
      dispatch(setActiveTag(formatted));
    }

    setSidebarTagInput('');
    dispatch(setMobileSidebarOpen(false));
  };

  const handleRemove = async (tag: string) => {
    if (tagMode === 'admin_config' && isAdmin) {
      const match = menuTagsData?.find((t) => t.name.toLowerCase() === tag.toLowerCase());
      if (match) {
        try {
          await removeMenuTag({ id: match.id, scope: menuScope }).unwrap();
        } catch {
          // keep UI until invalidate succeeds
        }
      }
    } else if (tagMode === 'my_tags') {
      if (isRoomsMode) {
        dispatch(removeRoomsMyTag(tag));
      } else {
        dispatch(removeMyTag(tag));
      }
    }
  };

  const handleAddDiscovered = async (tag: string) => {
    if (tagMode === 'admin_config' && isAdmin) {
      try {
        await addMenuTag({ name: tag, scope: menuScope }).unwrap();
        dispatch(setActiveTag(tag));
      } catch {
        return;
      }
    } else if (tagMode === 'my_tags') {
      if (isRoomsMode) {
        dispatch(addRoomsMyTag(tag));
      } else {
        dispatch(addMyTag(tag));
      }
      dispatch(setActiveTag(tag));
    }
    dispatch(setMobileSidebarOpen(false));
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-45 transition-opacity duration-300"
          onClick={() => dispatch(setMobileSidebarOpen(false))}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 h-screen border-r border-zinc-800/80 bg-zinc-950 p-4 select-none shrink-0 font-mono transition-transform duration-300 ease-in-out flex flex-col
          lg:translate-x-0 lg:sticky lg:top-0 lg:z-40
          ${isAuthenticated ? 'lg:flex' : 'lg:hidden'}
          ${isMobileSidebarOpen ? 'translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.8)]' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand / Operator Header */}
        <div className="mb-6 flex items-center justify-between gap-3 p-2.5 border border-zinc-800 bg-zinc-900/50 rounded">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-zinc-900 border border-cyan-500/50 flex items-center justify-center overflow-hidden shrink-0">
              <span className="material-symbols-outlined text-cyan-400">person</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-cyan-400 truncate">
                {isAuthenticated ? user?.username : t('sidebar.guestOperator')}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>{user?.role ? `ROLE: ${user.role}` : t('sidebar.roleGuest')}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => dispatch(setMobileSidebarOpen(false))}
            className="lg:hidden p-1 text-zinc-500 hover:text-red-400 focus:outline-none transition-colors"
            title={t('sidebar.closeSidebar')}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Main View Switcher */}
        <div className="mb-4 grid grid-cols-2 gap-1 bg-zinc-900/90 p-1 border border-zinc-800 rounded text-xs">
          <button
            onClick={() => handleSelectViewMode('vibes')}
            className={`py-1.5 text-center font-bold rounded transition-colors ${
              viewMode === 'vibes' || viewMode === 'vibe'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t('sidebar.vibes')}
          </button>
          <button
            onClick={() => handleSelectViewMode('rooms')}
            className={`py-1.5 text-center font-bold rounded transition-colors ${
              viewMode === 'rooms'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t('sidebar.rooms')}
          </button>
        </div>

        {/* Dynamic Hashtag Section */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
          {/* Pinned Menu Tags */}
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2 border-b border-zinc-800 pb-1 flex justify-between items-center">
              <span>{t('sidebar.hashtags')}</span>
              <span className="text-cyan-400">{displayedTags.length}</span>
            </div>

            {/* All Tag Option */}
            <button
              onClick={() => handleSelectTag('#ALL')}
              className={`w-full text-left p-2 text-xs font-bold uppercase transition-all rounded border-l-2 mb-1 flex items-center justify-between ${
                activeTag === '#ALL'
                  ? 'bg-zinc-900 border-l-cyan-400 text-cyan-400'
                  : 'text-zinc-400 border-l-transparent hover:bg-zinc-900/40 hover:text-zinc-200'
              }`}
            >
              <span>{isRoomsMode ? t('sidebar.allRooms') : t('sidebar.allVibes')}</span>
              {activeTag === '#ALL' && <span className="text-[10px]">●</span>}
            </button>

            {/* List of Pinned Tags */}
            <div className="space-y-1">
              {displayedTags.map((tag) => {
                const isActive = activeTag.toLowerCase() === tag.toLowerCase();
                const tagCount = isRoomsMode
                  ? createdRooms.filter((r) =>
                      r.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
                    ).length
                  : vibes.filter((v) =>
                      v.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
                    ).length;

                let activeStyle = 'bg-zinc-900 border-l-amber-400 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.15)]';
                if (!isRoomsMode) {
                  if (tagMode === 'all_vibes') {
                    activeStyle = 'bg-zinc-900 border-l-cyan-500 text-red-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]';
                  } else if (tagMode === 'live' || tagMode === 'my_tags') {
                    activeStyle = 'bg-zinc-900 border-l-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]';
                  } else if (tagMode === 'my_vibes') {
                    activeStyle = 'bg-zinc-900 border-l-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]';
                  }
                } else {
                  if (tagMode === 'all_vibes' || tagMode === 'live') {
                    activeStyle = 'bg-zinc-900 border-l-amber-500 text-red-400 shadow-[0_0_8px_rgba(255,176,0,0.2)]';
                  } else if (tagMode === 'my_tags') {
                    activeStyle = 'bg-zinc-900 border-l-amber-500 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.2)]';
                  } else if (tagMode === 'my_vibes') {
                    activeStyle = 'bg-zinc-900 border-l-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]';
                  }
                }

                return (
                  <div key={tag} className="flex items-center group">
                    <button
                      onClick={() => handleSelectTag(tag)}
                      className={`flex-1 text-left p-2 text-xs font-bold uppercase transition-all rounded-l border-l-2 flex items-center justify-between ${
                        isActive
                          ? activeStyle
                          : 'text-zinc-400 border-l-transparent hover:bg-zinc-900/40 hover:text-zinc-200'
                      }`}
                    >
                      <span className="truncate">{tag}</span>
                      <span className="text-[10px] text-zinc-600 font-normal">[{tagCount}]</span>
                    </button>

                    <button
                      onClick={() => handleRemove(tag)}
                      title={t('sidebar.removeTag')}
                      className={`p-2 text-zinc-600 hover:text-red-400 bg-zinc-900/20 hover:bg-zinc-900 rounded-r text-xs transition-colors ${
                        canEditSidebarTags ? '' : 'invisible pointer-events-none'
                      }`}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pin Custom Tag Form — only on My Tags / Admin */}
          {canEditSidebarTags && (
            <form onSubmit={handleAddCustomTag} className="pt-1">
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
                <input
                  type="text"
                  placeholder={
                    tagMode === 'admin_config' && isAdmin
                      ? t('sidebar.publicTagPlaceholder')
                      : t('sidebar.personalTagPlaceholder')
                  }
                  value={sidebarTagInput}
                  onChange={(e) => setSidebarTagInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-zinc-200 p-2 w-full placeholder-zinc-600"
                />
                <button
                  type="submit"
                  className="px-2.5 py-2 bg-zinc-800 text-cyan-400 hover:bg-cyan-950 font-bold text-xs border-l border-zinc-800 transition-colors"
                >
                  +
                </button>
              </div>
            </form>
          )}

          {/* Discovered / Unpinned Tags — pin into My Tags or Admin menu */}
          {canEditSidebarTags && unpinnedDiscoveredTags.length > 0 && (
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2">
                {t('sidebar.discovered')}
              </div>
              <div className="flex flex-wrap gap-1.5 px-1">
                {unpinnedDiscoveredTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddDiscovered(tag)}
                    title={t('sidebar.clickToAdd')}
                    className="text-[10px] bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:border-cyan-500/50 hover:text-cyan-400 px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <span>{tag}</span>
                    <span className="text-[9px] text-cyan-500 font-bold">+</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Button — on vibes page always "add vibe"; rooms keep private shortcut */}
        <div className="mt-auto pt-4 border-t border-zinc-800">
          {!isAuthenticated ? (
            <button
              onClick={() => {
                dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
                dispatch(setMobileSidebarOpen(false));
              }}
              className="w-full bg-amber-500/20 border border-amber-500/60 text-amber-400 py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-500/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              <span>{t('sidebar.signIn')}</span>
            </button>
          ) : isVibesPage || canCreateVibe ? (
            <button
              onClick={() => {
                dispatch(setCreateModalOpen(true));
                dispatch(setMobileSidebarOpen(false));
              }}
              className={`w-full py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center space-x-1.5 ${
                tagMode === 'admin_config'
                  ? 'bg-purple-400 text-black hover:bg-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>{tagMode === 'admin_config' ? t('sidebar.mainFeedItem') : t('sidebar.transmitVibe')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(setTagMode('my_vibes'));
                dispatch(setMobileSidebarOpen(false));
              }}
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded hover:border-emerald-500/50 hover:text-emerald-300 transition-all flex items-center justify-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-sm">library_books</span>
              <span>{t('sidebar.private')}</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
