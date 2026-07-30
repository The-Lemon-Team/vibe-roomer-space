import React, { useEffect, useState } from 'react';
import { useAtmosphericStore, VibeItem } from './store/useAtmosphericStore';
import { useAuthStore } from './store/useAuthStore';
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

export const App: React.FC = () => {
  const {
    activeTag,
    viewMode,
    setViewMode,
    vibes,
    selectedVibeRoom,
    activeCreatedRoom,
    deleteVibe,
    setCreateModalOpen,
    fetchVibes,
    fetchTopHashtags,
    syncRouteFromUrl,
    tagMode,
  } = useAtmosphericStore();

  const { isAuthenticated, user, checkAuth, setAuthModalOpen } = useAuthStore();
  const [vibeToDelete, setVibeToDelete] = useState<VibeItem | null>(null);

  // Initialize auth check & initial feed on mount
  useEffect(() => {
    checkAuth();
    fetchTopHashtags();
    syncRouteFromUrl();

    const handleHashChange = () => {
      syncRouteFromUrl();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [checkAuth, fetchTopHashtags, syncRouteFromUrl]);

  // Dynamic hashtag feed filtering
  const filteredVibes =
    activeTag === '#ALL'
      ? vibes
      : vibes.filter(
        (v) =>
          v.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
          v.keywords?.some((k) => `#${k.toLowerCase()}` === activeTag.toLowerCase()),
      );

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-hidden">
      {/* Scanline CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Operator Sidebar (Drawer on mobile, responsive on desktop) */}
        <OperatorSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Fixed Sticky Navigation & Hashtag Menu Header */}
          <header className="sticky top-0 z-40 shrink-0 backdrop-blur-md border-b border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)] top-header">
            <HeaderNavbar />
            <ActivitySwitcher />
          </header>

          {/* Dynamic View: Main Vibes List OR Dedicated Vibe Page OR Rooms List OR Room View */}
          {viewMode === 'vibe' ? (
            <VibePage />
          ) : viewMode === 'vibes' ? (
            <main className="flex-1 w-full h-full overflow-y-auto bg-zinc-950 bg-[radial-gradient(#1a779d50_1px,transparent_1px)] bg-[size:16px_16px] pb-8">
              {/* Feed Header & Status */}
              <div
                className="toolbar w-full border-b border-zinc-800/80 backdrop-blur-sm"
                style={{ backgroundColor: 'rgb(13 13 18 / 95%)' }}
              >
                <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center font-mono text-xs text-zinc-400 px-4 md:px-6 py-3">
                  <div>
                    [VIBES_HASHTAG_ROUTE:{' '}
                    <span
                      className={`font-bold px-2 py-0.5 rounded border ${
                        tagMode === 'live'
                          ? 'bg-gradient-to-r from-cyan-950/80 to-red-950/80 border-cyan-500/50 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                          : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                      }`}
                    >
                      {activeTag}
                    </span>
                    ]
                  </div>
                  <div>{filteredVibes.length} VIBE LOGS</div>
                </div>
              </div>

              <div className="content-section w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-2 md:pt-3 lg:pt-4">

                {/* Feed List */}
                {filteredVibes.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-zinc-800 rounded bg-zinc-900/40 p-8 font-mono text-xs text-zinc-500 space-y-3">
                    <div>NO VIBE LOGS FOUND FOR HASHTAG [{activeTag}].</div>
                    <div>CLICK BELOW TO TRANSMIT A NEW ATMOSPHERIC POST FOR THIS TAG.</div>
                    <button
                      onClick={() => {
                        if (isAuthenticated) {
                          setCreateModalOpen(true);
                        } else {
                          setAuthModalOpen(true, 'login');
                        }
                      }}
                      className="px-4 py-2 bg-amber-500/20 border border-amber-500/60 text-amber-400 font-bold rounded hover:bg-amber-500/30 transition-colors uppercase"
                    >
                      + TRANSMIT VIBE FOR {activeTag}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {filteredVibes.map((vibe) => (
                      <VibeCard
                        key={vibe.id}
                        id={vibe.id}
                        title={vibe.title}
                        content={vibe.content}
                        tags={vibe.tags}
                        keywords={vibe.keywords}
                        images={vibe.images}
                        videoUrl={vibe.videoUrl}
                        musicUrl={vibe.musicUrl}
                        authorName={vibe.authorName}
                        authorId={vibe.authorId}
                        currentUserId={user?.id || ''}
                        createdAt={vibe.createdAt}
                        vibeItem={vibe}
                        onDelete={() => setVibeToDelete(vibe)}
                        onEdit={(id) => alert(`[EDIT_VIBE]: Action logged for ID ${id}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </main>
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

      {/* Authentication Modal Dialog */}
      <AuthModal />

      {/* New Vibe Modal Dialog */}
      <CreateVibeModal />

      {/* Create Room Modal Dialog */}
      <CreateRoomModal />

      {/* Confirmation Modal for Deleting Top Level Vibe */}
      <DeleteVibeModal
        vibe={vibeToDelete}
        onConfirm={() => {
          if (vibeToDelete) {
            deleteVibe(vibeToDelete.id);
            setVibeToDelete(null);
          }
        }}
        onCancel={() => setVibeToDelete(null)}
      />
    </div>
  );
};

export default App;
