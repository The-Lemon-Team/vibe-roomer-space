import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTag,
  setTagMode,
  addMyTag,
  removeMyTag,
  addRoomsMyTag,
  removeRoomsMyTag,
} from '../../store/uiSlice';
import {
  useGetMenuTagsQuery,
  useAddMenuTagMutation,
  useRemoveMenuTagMutation,
  type MenuTagScope,
} from '../../store/api/vibesApi';
import type { TagMode } from '../../store/useAtmosphericStore';
import { isLiveFeedGroup } from '../../store/useAtmosphericStore';

const MODE_HELPER_KEY: Record<TagMode, string> = {
  live: 'activity.helper.live',
  all_vibes: 'activity.helper.all',
  my_tags: 'activity.helper.myTags',
  my_vibes: 'activity.helper.myVibes',
  admin_config: 'activity.helper.admin',
};

export const ActivitySwitcher: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // ── UI selectors ────────────────────────────────────────────────────────
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const viewMode = useAppSelector((s) => s.ui.viewMode);
  const adminMenuTags = useAppSelector((s) => s.ui.adminMenuTags);
  const myTags = useAppSelector((s) => s.ui.myTags);
  const roomsAdminMenuTags = useAppSelector((s) => s.ui.roomsAdminMenuTags);
  const roomsMyTags = useAppSelector((s) => s.ui.roomsMyTags);
  const tagMode = useAppSelector((s) => s.ui.tagMode);

  // ── Auth selectors ──────────────────────────────────────────────────────
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);

  const isRoomsMode = viewMode === 'rooms';
  const menuScope: MenuTagScope = isRoomsMode ? 'ROOMS' : 'VIBES';
  // Server menu tags are the source of truth for Live / Admin (same list for everyone).
  const { data: menuTagsData } = useGetMenuTagsQuery(menuScope);
  const [addMenuTag] = useAddMenuTagMutation();
  const [removeMenuTag] = useRemoveMenuTagMutation();

  const [newTagInput, setNewTagInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    // On login: do not force My Tags when the user is already on Live (`#/` / `#/vibes`).
    // Logout always returns to the public Live feed.
    if (!isAuthenticated && prevAuthRef.current) {
      dispatch(setTagMode('all_vibes'));
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  // Prefer RTK Query payload so Live matches Admin immediately after save
  // (uiSlice hydration in App can lag one tick behind the cache update).
  const currentAdminTags = menuTagsData
    ? menuTagsData.map((t) => t.name)
    : isRoomsMode
      ? roomsAdminMenuTags
      : adminMenuTags;
  const currentMyTags = isRoomsMode ? roomsMyTags : myTags;

  // Main [Все вайбы]: admin-configured public menu tags.
  // My vibes / My tags / Private: personal tag shortcuts.
  let tagsToRender: string[] = [];
  if (!isAuthenticated || tagMode === 'all_vibes') {
    tagsToRender = currentAdminTags;
  } else if (tagMode === 'live' || tagMode === 'my_tags' || tagMode === 'my_vibes') {
    tagsToRender = currentMyTags;
  } else if (tagMode === 'admin_config' && isAdmin) {
    tagsToRender = currentAdminTags;
  }

  /** Tag shortcuts are edited on My Tags; Admin edits public menu tags. */
  const canEditTags =
    isAuthenticated &&
    (tagMode === 'my_tags' || (tagMode === 'admin_config' && isAdmin));

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.trim().startsWith('#')
      ? newTagInput.trim().toLowerCase()
      : `#${newTagInput.trim().toLowerCase()}`;

    if (tagMode === 'admin_config' && isAdmin) {
      try {
        await addMenuTag({ name: formatted, scope: menuScope }).unwrap();
        dispatch(setActiveTag(formatted));
      } catch {
        // mutation error surfaced by RTK; keep input for retry
        return;
      }
    } else if (isRoomsMode) {
      dispatch(addRoomsMyTag(formatted));
      dispatch(setActiveTag(formatted));
    } else {
      dispatch(addMyTag(formatted));
      dispatch(setActiveTag(formatted));
    }

    setNewTagInput('');
    setIsAdding(false);
  };

  const handleRemoveTag = async (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    if (tagMode === 'admin_config' && isAdmin) {
      const match = menuTagsData?.find((t) => t.name.toLowerCase() === tag.toLowerCase());
      if (match) {
        try {
          await removeMenuTag({ id: match.id, scope: menuScope }).unwrap();
        } catch {
          // ignore – cache stays until successful invalidate
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

  const liveGroupActive = isLiveFeedGroup(tagMode);

  const tabClass = (mode: TagMode, activeClass: string, treatFeedAsLive = false) => {
    const active =
      tagMode === mode || (treatFeedAsLive && mode === 'all_vibes' && liveGroupActive);
    return `px-2 py-0.5 font-bold rounded transition-colors ${
      active ? activeClass : 'text-zinc-400 hover:text-zinc-200'
    }`;
  };

  return (
    <div className="w-full filter-header font-mono text-xs select-none backdrop-blur-md border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 py-2 flex flex-col gap-1.5">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {/* Left Section: Menu Title & Mode Switchers */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-zinc-500 uppercase tracking-widest text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-cyan-400">tag</span>
              <span>{t('activity.menuTags')}</span>
            </span>

            {/* Mode Switcher Tabs for Logged-In Users (feed scope lives above the vibes feed) */}
            {isAuthenticated && (
              <div className="flex items-center bg-zinc-900/90 p-0.5 border border-zinc-800 rounded text-[10px]">
                <button
                  onClick={() => dispatch(setTagMode('all_vibes'))}
                  className={tabClass(
                    'all_vibes',
                    isRoomsMode
                      ? 'bg-amber-950 text-red-400 border border-red-700/50 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                      : 'bg-cyan-950 text-red-400 border border-cyan-700/50 shadow-[0_0_8px_rgba(239,68,68,0.25)]',
                    !isRoomsMode,
                  )}
                  title={t(MODE_HELPER_KEY.all_vibes)}
                >
                  {t('activity.live')}
                </button>

                <button
                  onClick={() => dispatch(setTagMode('my_tags'))}
                  className={tabClass(
                    'my_tags',
                    isRoomsMode
                      ? 'bg-amber-950 text-amber-400 border border-amber-700/50 shadow-[0_0_8px_rgba(255,176,0,0.25)]'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-700/50 shadow-[0_0_8px_rgba(0,240,255,0.25)]',
                  )}
                  title={t(MODE_HELPER_KEY.my_tags)}
                >
                  {t('activity.myTags')}
                </button>

                {isAdmin && (
                  <button
                    onClick={() => dispatch(setTagMode('admin_config'))}
                    className={tabClass(
                      'admin_config',
                      'bg-purple-950 text-purple-400 border border-purple-700/50',
                    )}
                    title={t(MODE_HELPER_KEY.admin_config)}
                  >
                    {t('activity.admin')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Section: Hashtags Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {/* #ALL Filter Button */}
            <button
              onClick={() => dispatch(setActiveTag('#ALL'))}
              className={`px-3 py-1 font-bold uppercase transition-all duration-200 rounded border flex items-center space-x-1 shrink-0 ${
                activeTag === '#ALL'
                  ? isRoomsMode
                    ? 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]'
                    : 'bg-cyan-950/80 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {activeTag === '#ALL' && (
                <span className={isRoomsMode ? 'text-amber-400 text-[10px]' : 'text-cyan-400 text-[10px]'}>
                  ●
                </span>
              )}
              <span>{t('common.all')}</span>
            </button>

            {/* Dynamic Hashtag Buttons */}
            {tagsToRender.map((tag) => {
              const isActive = activeTag.toLowerCase() === tag.toLowerCase();

              let activeStyle =
                'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]';
              let activeDotStyle = 'text-amber-400';

              if (!isRoomsMode) {
                if (tagMode === 'all_vibes') {
                  activeStyle =
                    'bg-cyan-950/80 border-red-500/80 text-cyan-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                  activeDotStyle = 'text-red-500';
                } else if (tagMode === 'live' || tagMode === 'my_tags') {
                  activeStyle =
                    'bg-cyan-950/80 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.25)]';
                  activeDotStyle = 'text-cyan-400';
                } else if (tagMode === 'my_vibes') {
                  activeStyle =
                    'bg-emerald-950/80 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]';
                  activeDotStyle = 'text-emerald-400';
                }
              } else {
                if (tagMode === 'all_vibes' || tagMode === 'live') {
                  activeStyle =
                    'bg-amber-950/80 border-red-500/80 text-amber-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                  activeDotStyle = 'text-red-500';
                } else if (tagMode === 'my_tags') {
                  activeStyle =
                    'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]';
                  activeDotStyle = 'text-amber-400';
                } else if (tagMode === 'my_vibes') {
                  activeStyle =
                    'bg-amber-950/80 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]';
                  activeDotStyle = 'text-emerald-400';
                }
              }

              return (
                <div key={tag} className="relative group flex items-center shrink-0">
                  <button
                    onClick={() => dispatch(setActiveTag(tag))}
                    className={`px-3 py-1 font-bold uppercase transition-all duration-200 rounded border flex items-center space-x-1.5 ${
                      isActive
                        ? activeStyle
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    {isActive && <span className={`${activeDotStyle} text-[10px]`}>●</span>}
                    <span>{tag}</span>
                  </button>

                  {/* Unpin Action Icon — only while managing tags */}
                  {canEditTags && (
                    <button
                      onClick={(e) => handleRemoveTag(e, tag)}
                      title={t('activity.removeTag')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-zinc-600 hover:text-red-400 p-0.5"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add Tag Button — My Tags stores personal shortcuts; Admin curates public menu */}
            {canEditTags && (
              <>
                {isAdding ? (
                  <form
                    onSubmit={handleAddTag}
                    className="flex items-center space-x-1 bg-zinc-900 border border-cyan-500/60 rounded px-2 py-0.5 shrink-0"
                  >
                    <span className="text-cyan-400 font-bold">#</span>
                    <input
                      type="text"
                      autoFocus
                      placeholder={t('activity.newTagPlaceholder')}
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-zinc-100 w-20 text-xs"
                    />
                    <button type="submit" className="text-cyan-400 font-bold hover:text-cyan-300">
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="text-zinc-500 hover:text-zinc-300 ml-1 text-xs"
                    >
                      ✕
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="px-2 py-1 bg-zinc-900/60 border border-zinc-800 text-cyan-400 hover:border-cyan-500/50 rounded font-bold transition-colors shrink-0"
                    title={
                      tagMode === 'admin_config'
                        ? t('activity.addPublic')
                        : t('activity.addPersonal')
                    }
                  >
                    {t('activity.addTag')}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mode helper */}
        {isAuthenticated && (
          <p className="text-[10px] text-zinc-500 tracking-wide leading-snug max-w-3xl">
            {t(MODE_HELPER_KEY[tagMode])}
          </p>
        )}
      </div>
    </div>
  );
};
