import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTag,
  setTagMode,
  addAdminMenuTag,
  removeAdminMenuTag,
  addMyTag,
  removeMyTag,
  addRoomsAdminMenuTag,
  removeRoomsAdminMenuTag,
  addRoomsMyTag,
  removeRoomsMyTag,
} from '../../store/uiSlice';
import { useGetTopHashtagsQuery } from '../../store/api/vibesApi';

export const ActivitySwitcher: React.FC = () => {
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

  // ── Top hashtags from RTK Query ─────────────────────────────────────────
  const { data: topHashtagsData = [] } = useGetTopHashtagsQuery(10);
  const topHashtags = topHashtagsData.map((h) =>
    h.name.startsWith('#') ? h.name : `#${h.name}`,
  );

  const [newTagInput, setNewTagInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !prevAuthRef.current) {
      dispatch(setTagMode('my_tags'));
    } else if (!isAuthenticated && prevAuthRef.current) {
      dispatch(setTagMode('live'));
    }
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';
  const isRoomsMode = viewMode === 'rooms';

  const currentAdminTags = isRoomsMode ? roomsAdminMenuTags : adminMenuTags;
  const currentMyTags = isRoomsMode ? roomsMyTags : myTags;

  // Determine tags to render based on user authentication, viewMode & selected tagMode
  let tagsToRender: string[] = [];
  if (!isAuthenticated || tagMode === 'live') {
    tagsToRender = Array.from(
      new Set([...currentAdminTags, ...(isRoomsMode ? [] : topHashtags)]),
    );
  } else if (tagMode === 'my_tags') {
    tagsToRender = currentMyTags;
  } else if (tagMode === 'admin_config' && isAdmin) {
    tagsToRender = currentAdminTags;
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.trim().startsWith('#')
      ? newTagInput.trim().toLowerCase()
      : `#${newTagInput.trim().toLowerCase()}`;

    if (isRoomsMode) {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(addRoomsAdminMenuTag(formatted));
      } else {
        dispatch(addRoomsMyTag(formatted));
      }
    } else {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(addAdminMenuTag(formatted));
      } else {
        dispatch(addMyTag(formatted));
      }
    }

    dispatch(setActiveTag(formatted));
    setNewTagInput('');
    setIsAdding(false);
  };

  const handleRemoveTag = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    if (isRoomsMode) {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(removeRoomsAdminMenuTag(tag));
      } else if (tagMode === 'my_tags') {
        dispatch(removeRoomsMyTag(tag));
      }
    } else {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(removeAdminMenuTag(tag));
      } else if (tagMode === 'my_tags') {
        dispatch(removeMyTag(tag));
      }
    }
  };

  return (
    <div className="w-full filter-header font-mono text-xs select-none backdrop-blur-md border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Left Section: Menu Title & Mode Switchers */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-zinc-500 uppercase tracking-widest text-[11px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-cyan-400">tag</span>
            <span>[{isRoomsMode ? 'ROOM_MENU_TAGS' : 'VIBE_MENU_TAGS'}]:</span>
          </span>

          {/* Mode Switcher Tabs for Logged-In Users */}
          {isAuthenticated && (
            <div className="flex items-center bg-zinc-900/90 p-0.5 border border-zinc-800 rounded text-[10px]">
              <button
                onClick={() => dispatch(setTagMode('live'))}
                className={`px-2 py-0.5 font-bold rounded transition-colors ${
                  tagMode === 'live'
                    ? isRoomsMode
                      ? 'bg-amber-950 text-red-400 border border-red-700/50 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                      : 'bg-cyan-950 text-red-400 border border-cyan-700/50 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Public Live Mode"
              >
                LIVE
              </button>

              <button
                onClick={() => dispatch(setTagMode('my_tags'))}
                className={`px-2 py-0.5 font-bold rounded transition-colors ${
                  tagMode === 'my_tags'
                    ? isRoomsMode
                      ? 'bg-amber-950 text-amber-400 border border-amber-700/50 shadow-[0_0_8px_rgba(255,176,0,0.25)]'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-700/50 shadow-[0_0_8px_rgba(0,240,255,0.25)]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="My Tags: Your personal saved list of tags"
              >
                MY TAGS
              </button>

              {isAdmin && (
                <button
                  onClick={() => dispatch(setTagMode('admin_config'))}
                  className={`px-2 py-0.5 font-bold rounded transition-colors ${
                    tagMode === 'admin_config'
                      ? 'bg-purple-950 text-purple-400 border border-purple-700/50'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Admin Config: Manage public top menu tags"
                >
                  ADMIN
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
              <span className={isRoomsMode ? 'text-amber-400 text-[10px]' : 'text-cyan-400 text-[10px]'}>●</span>
            )}
            <span>#ALL</span>
          </button>

          {/* Dynamic Hashtag Buttons */}
          {tagsToRender.map((tag) => {
            const isActive = activeTag.toLowerCase() === tag.toLowerCase();
            const canEditTag =
              isAuthenticated &&
              (tagMode === 'my_tags' || (tagMode === 'admin_config' && isAdmin));

            let activeStyle = 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]';
            let activeDotStyle = 'text-amber-400';

            if (!isRoomsMode) {
              if (tagMode === 'live') {
                activeStyle = 'bg-cyan-950/80 border-red-500/80 text-cyan-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                activeDotStyle = 'text-red-500';
              } else if (tagMode === 'my_tags') {
                activeStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.25)]';
                activeDotStyle = 'text-cyan-400';
              }
            } else {
              if (tagMode === 'live') {
                activeStyle = 'bg-amber-950/80 border-red-500/80 text-amber-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                activeDotStyle = 'text-red-500';
              } else if (tagMode === 'my_tags') {
                activeStyle = 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(255,176,0,0.25)]';
                activeDotStyle = 'text-amber-400';
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

                {/* Unpin Action Icon */}
                {canEditTag && (
                  <button
                    onClick={(e) => handleRemoveTag(e, tag)}
                    title={
                      tagMode === 'admin_config'
                        ? 'Remove tag from public top menu'
                        : 'Remove tag from My Tags'
                    }
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-zinc-600 hover:text-red-400 p-0.5"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Tag Button */}
          {isAuthenticated && (tagMode === 'my_tags' || (tagMode === 'admin_config' && isAdmin)) && (
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
                    placeholder="newtag"
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
                  title="Add new tag"
                >
                  + TAG
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
