import React, { useEffect, useState } from 'react';
import { useAtmosphericStore, VibeItem } from './store/useAtmosphericStore';
import { useAuthStore } from './store/useAuthStore';
import { HeaderNavbar } from './components/Navbar/HeaderNavbar';
import { ActivitySwitcher } from './components/VibeSelector/ActivitySwitcher';
import { OperatorSidebar } from './components/Sidebar/OperatorSidebar';
import { VibeCard } from './components/VibeList/VibeCard';
import { AtmosphericRoomView } from './components/VibeRoom/AtmosphericRoomView';
import { CreateVibeModal } from './components/VibeForm/CreateVibeModal';
import { DeleteVibeModal } from './components/VibeList/DeleteVibeModal';
import { BottomNavbar } from './components/Navbar/BottomNavbar';
import { AuthModal } from './components/Auth/AuthModal';

export const App: React.FC = () => {
  const {
    activeTag,
    viewMode,
    vibes,
    selectedVibeRoom,
    deleteVibe,
    setCreateModalOpen,
    fetchVibes,
    fetchTopHashtags,
  } = useAtmosphericStore();

  const { isAuthenticated, user, checkAuth, setAuthModalOpen } = useAuthStore();
  const [vibeToDelete, setVibeToDelete] = useState<VibeItem | null>(null);

  // Initialize auth check & initial feed on mount
  useEffect(() => {
    checkAuth();
    fetchTopHashtags();
    fetchVibes();
  }, [checkAuth, fetchTopHashtags, fetchVibes]);

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
        {/* Left Operator Sidebar: Hidden when NOT logged in, Visible when Logged in */}
        {isAuthenticated && <OperatorSidebar />}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Fixed Sticky Navigation & Hashtag Menu Header */}
          <header className="sticky top-0 z-40 shrink-0 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <HeaderNavbar />
            <ActivitySwitcher />
          </header>

          {/* Dynamic View: Main Vibes List OR Immersive Hashtag Room View */}
          {viewMode === 'vibes' ? (
            <main
              className={`flex-1 p-4 md:p-6 overflow-y-auto w-full mx-auto pb-20 lg:pb-8 transition-all ${
                isAuthenticated
                  ? 'max-w-4xl'
                  : 'max-w-2xl border-x border-zinc-800/60 bg-zinc-950/40 shadow-2xl'
              }`}
            >
              {/* Feed Header & Status */}
              <div className="flex justify-between items-center mb-4 font-mono text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <div>
                  [HASHTAG_ROUTE: <span className="text-amber-400 font-bold">{activeTag}</span>]
                </div>
                <div>{filteredVibes.length} VIBE LOGS</div>
              </div>

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
            </main>
          ) : (
            <AtmosphericRoomView
              vibeTitle={selectedVibeRoom?.title || `ROOM :: ${activeTag}`}
              roomConfig={selectedVibeRoom?.roomConfig}
              vibeItem={selectedVibeRoom || undefined}
            />
          )}
        </div>
      </div>

      {/* Authentication Modal Dialog */}
      <AuthModal />

      {/* New Vibe Modal Dialog */}
      <CreateVibeModal />

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

      {/* Mobile Navigation Toolbar */}
      <BottomNavbar />
    </div>
  );
};

export default App;
