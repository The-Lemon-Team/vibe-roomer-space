import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTag,
  setViewMode,
  setCreateModalOpen,
  closeRoomPage,
  setMobileSidebarOpen,
  addAdminMenuTag,
  removeAdminMenuTag,
  addMyTag,
  removeMyTag,
  addRoomsAdminMenuTag,
  removeRoomsAdminMenuTag,
  addRoomsMyTag,
  removeRoomsMyTag,
} from '../../store/uiSlice';
import { setAuthModalOpen } from '../../store/authSlice';
import { useGetVibesQuery } from '../../store/api/vibesApi';
import { useGetRoomsQuery } from '../../store/api/roomsApi';

export const OperatorSidebar: React.FC = () => {
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

  // ── RTK Query data (for discovered-tag counts) ───────────────────────────
  const { data: vibes = [] } = useGetVibesQuery(undefined);
  const { data: createdRooms = [] } = useGetRoomsQuery(undefined);

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

  const isAdmin = isAuthenticated && user?.role === 'ADMIN';
  const isRoomsMode = viewMode === 'rooms';

  const currentAdminTags = isRoomsMode ? roomsAdminMenuTags : adminMenuTags;
  const currentMyTags = isRoomsMode ? roomsMyTags : myTags;

  const displayedTags = tagMode === 'admin_config' && isAdmin ? currentAdminTags : currentMyTags;

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

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sidebarTagInput.trim()) return;
    const formatted = sidebarTagInput.trim().startsWith('#')
      ? sidebarTagInput.trim().toLowerCase()
      : `#${sidebarTagInput.trim().toLowerCase()}`;

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
    setSidebarTagInput('');
    dispatch(setMobileSidebarOpen(false));
  };

  const handleRemove = (tag: string) => {
    if (isRoomsMode) {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(removeRoomsAdminMenuTag(tag));
      } else {
        dispatch(removeRoomsMyTag(tag));
      }
    } else {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(removeAdminMenuTag(tag));
      } else {
        dispatch(removeMyTag(tag));
      }
    }
  };

  const handleAddDiscovered = (tag: string) => {
    if (isRoomsMode) {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(addRoomsAdminMenuTag(tag));
      } else {
        dispatch(addRoomsMyTag(tag));
      }
    } else {
      if (tagMode === 'admin_config' && isAdmin) {
        dispatch(addAdminMenuTag(tag));
      } else {
        dispatch(addMyTag(tag));
      }
    }
    dispatch(setActiveTag(tag));
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
                {isAuthenticated ? user?.username : 'GUEST_OPERATOR'}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span>ROLE: {user?.role || 'GUEST'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => dispatch(setMobileSidebarOpen(false))}
            className="lg:hidden p-1 text-zinc-500 hover:text-red-400 focus:outline-none transition-colors"
            title="Close Sidebar"
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
            [VIBES]
          </button>
          <button
            onClick={() => handleSelectViewMode('rooms')}
            className={`py-1.5 text-center font-bold rounded transition-colors ${
              viewMode === 'rooms'
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            [ROOMS]
          </button>
        </div>

        {/* Dynamic Hashtag Section */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
          {/* Pinned Menu Tags */}
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2 border-b border-zinc-800 pb-1 flex justify-between items-center">
              <span>{isRoomsMode ? 'ROOM HASHTAGS' : 'VIBE HASHTAGS'}</span>
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
              <span>#ALL ({isRoomsMode ? 'ALL ROOMS' : 'ALL VIBES'})</span>
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
                  if (tagMode === 'live') {
                    activeStyle = 'bg-zinc-900 border-l-cyan-500 text-red-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]';
                  } else if (tagMode === 'my_tags') {
                    activeStyle = 'bg-zinc-900 border-l-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]';
                  }
                } else {
                  if (tagMode === 'live') {
                    activeStyle = 'bg-zinc-900 border-l-amber-500 text-red-400 shadow-[0_0_8px_rgba(255,176,0,0.2)]';
                  } else if (tagMode === 'my_tags') {
                    activeStyle = 'bg-zinc-900 border-l-amber-500 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.2)]';
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
                      title="Remove tag"
                      className="p-2 text-zinc-600 hover:text-red-400 bg-zinc-900/20 hover:bg-zinc-900 rounded-r text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pin Custom Tag Form */}
          <form onSubmit={handleAddCustomTag} className="pt-1">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
              <input
                type="text"
                placeholder={tagMode === 'admin_config' && isAdmin ? '+ Public top tag' : '+ Pin custom #tag'}
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

          {/* Discovered / Unpinned Tags */}
          {unpinnedDiscoveredTags.length > 0 && (
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest px-2 mb-2">
                DISCOVERED HASHTAGS
              </div>
              <div className="flex flex-wrap gap-1.5 px-1">
                {unpinnedDiscoveredTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddDiscovered(tag)}
                    title="Click to add tag to list"
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

        {/* CTA Button */}
        <div className="mt-auto pt-4 border-t border-zinc-800">
          {isAuthenticated ? (
            <button
              onClick={() => {
                dispatch(setCreateModalOpen(true));
                dispatch(setMobileSidebarOpen(false));
              }}
              className="w-full bg-cyan-400 text-black py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded hover:bg-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>TRANSMIT VIBE</span>
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(setAuthModalOpen({ open: true, mode: 'login' }));
                dispatch(setMobileSidebarOpen(false));
              }}
              className="w-full bg-amber-500/20 border border-amber-500/60 text-amber-400 py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-500/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              <span>[SIGN_IN]</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
