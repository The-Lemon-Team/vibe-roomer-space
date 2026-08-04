import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setActiveTag,
  setViewMode,
  setCreateModalOpen,
  closeRoomPage,
  setMobileSidebarOpen,
} from '../../store/uiSlice';
import { setAuthModalOpen } from '../../store/authSlice';
import { logout } from '../../store/authSlice';
import { LanguageSwitcher } from '../Common/LanguageSwitcher';

export const HeaderNavbar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // ── UI selectors ────────────────────────────────────────────────────────
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const viewMode = useAppSelector((s) => s.ui.viewMode);
  const isMobileSidebarOpen = useAppSelector((s) => s.ui.isMobileSidebarOpen);

  // ── Auth selectors ──────────────────────────────────────────────────────
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);
  const tagMode = useAppSelector((s) => s.ui.tagMode);
  const isAuthModalOpen = useAppSelector((s) => s.auth.isAuthModalOpen);
  const authModalMode = useAppSelector((s) => s.auth.authModalMode);
  // Live / All / My Tags are browse-only for vibes; create from Приватные or Admin
  const canCreate =
    isAuthenticated &&
    (tagMode === 'my_vibes' ||
      (tagMode === 'admin_config' && user?.role === 'ADMIN'));

  const [showExit, setShowExit] = React.useState(false);

  const isVibesActive = viewMode === 'vibes' || viewMode === 'vibe';
  const isRoomsActive = viewMode === 'rooms';

  return (
    <div className="top-header w-full border-b border-zinc-800/80 font-mono">
      <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center px-4 md:px-6 py-2 h-14">
        {/* Left Title & Status */}
        <div className="flex items-center space-x-3">
          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => dispatch(setMobileSidebarOpen(!isMobileSidebarOpen))}
            className="lg:hidden p-1 mr-1 text-zinc-400 hover:text-cyan-400 focus:outline-none transition-colors"
            title={t('nav.toggleSidebar')}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMobileSidebarOpen ? 'close' : 'menu'}
            </span>
          </button>
          {/* Primary mode switch — VIBES / ROOMS live here (not as a trailing ENTER CTA) */}
          <div className="font-sans italic font-black text-xl md:text-2xl tracking-tighter flex items-center select-none">
            <button
              onClick={() => {
                dispatch(setActiveTag('#ALL'));
                dispatch(setViewMode('vibes'));
              }}
              className={`px-1 transition-all duration-200 cursor-pointer focus:outline-none ${isVibesActive
                  ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.6)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300 font-bold'
                }`}
              title={t('nav.navigateVibes')}
            >
              {t('nav.vibes')}
            </button>
            <span className="text-zinc-700 font-light mx-0.5 select-none" aria-hidden>
              /
            </span>
            <button
              onClick={() => dispatch(closeRoomPage())}
              className={`px-1 transition-all duration-200 cursor-pointer focus:outline-none ${isRoomsActive
                  ? 'text-amber-500 drop-shadow-[0_0_10px_rgba(255,176,0,0.6)] font-black'
                  : 'text-zinc-500 hover:text-zinc-300 font-bold'
                }`}
              title={t('nav.navigateRooms')}
            >
              {t('nav.rooms')}
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-2 border-l border-zinc-800 pl-3">
            {!isAuthenticated && (
              <span className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                {t('nav.guestMode')}
              </span>
            )}
            <span
              className={`w-1.5 h-1.5 rounded-full ${isAuthenticated
                  ? 'bg-cyan-400 shadow-[0_0_6px_#00ffcc]'
                  : 'bg-emerald-400 shadow-[0_0_4px_#00ff41]'
                }`}
            />
          </div>
        </div>

        {/* Middle Active Hashtag Route Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-xs">
          {isVibesActive ? (
            <>
              <span className="text-cyan-400/80">{t('nav.activeHashtag')}</span>
              <span className="font-bold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/60 uppercase shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                {activeTag}
              </span>
            </>
          ) : (
            <>
              <span className="text-amber-500/80">{t('nav.activeHashtag')}</span>
              <span className="font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/60 uppercase shadow-[0_0_8px_rgba(255,176,0,0.2)]">
                {activeTag}
              </span>
            </>
          )}
        </div>

        {/* Trailing Actions — auth / create only; mode switch is the brand titles */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />

          {/* Auth Action Buttons: Open AuthModal in login or register mode */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => dispatch(setAuthModalOpen({ open: true, mode: 'login' }))}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors flex items-center space-x-1 uppercase font-bold ${isAuthModalOpen && authModalMode === 'login'
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>{t('nav.signIn')}</span>
              </button>

              <button
                onClick={() => dispatch(setAuthModalOpen({ open: true, mode: 'register' }))}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors flex items-center space-x-1 uppercase font-bold ${isAuthModalOpen && authModalMode === 'register'
                    ? 'bg-amber-500/30 border border-amber-400 text-amber-300'
                    : 'bg-amber-500/20 border border-amber-500/60 text-amber-400 hover:bg-amber-500/30'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                <span>{t('nav.register')}</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <div
                onClick={() => setShowExit(!showExit)}
                className="flex items-center space-x-2 bg-zinc-900/60 border border-zinc-800/80 rounded p-1 cursor-pointer hover:bg-zinc-800/40 select-none transition-colors"
              >
                <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 text-zinc-300 font-mono">
                  <span className="text-zinc-500 mr-2">{t('nav.sysAuth')}</span>
                  {t('nav.op')} <strong className="text-cyan-400">{user?.username}</strong> ({user?.role})
                </span>

                <span className={`material-symbols-outlined text-xs text-zinc-500 transition-transform duration-200 ${showExit ? 'rotate-180 text-cyan-400' : ''}`}>
                  keyboard_arrow_down
                </span>
              </div>

              {showExit && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowExit(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 bg-zinc-950 border border-zinc-800/90 rounded p-1.5 shadow-2xl min-w-[120px] flex flex-col space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => {
                        setShowExit(false);
                        dispatch(logout());
                      }}
                      className="w-full px-2.5 py-1.5 text-xs font-mono rounded bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/50 hover:border-red-500 transition-all flex items-center justify-between uppercase"
                      title={t('nav.logoutTitle')}
                    >
                      <span className="flex items-center space-x-1.5">
                        <span className="material-symbols-outlined text-sm">logout</span>
                        <span>{t('nav.exit')}</span>
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {canCreate && (
            <button
              onClick={() => dispatch(setCreateModalOpen(true))}
              className="lg:hidden p-1.5 text-cyan-400 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800"
              title={tagMode === 'admin_config' ? t('nav.createMainFeed') : t('nav.transmitVibe')}
            >
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
