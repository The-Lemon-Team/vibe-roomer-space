import React from 'react';
import { useAtmosphericStore } from './store/useAtmosphericStore';
import { HeaderNavbar } from './components/Navbar/HeaderNavbar';
import { ActivitySwitcher } from './components/VibeSelector/ActivitySwitcher';
import { OperatorSidebar } from './components/Sidebar/OperatorSidebar';
import { VibeCard } from './components/VibeList/VibeCard';
import { AtmosphericRoomView } from './components/VibeRoom/AtmosphericRoomView';
import { CreateVibeModal } from './components/VibeForm/CreateVibeModal';
import { BottomNavbar } from './components/Navbar/BottomNavbar';

export const App: React.FC = () => {
  const { 
    currentContext, 
    viewMode, 
    vibes, 
    selectedVibeRoom, 
    currentUserId, 
    deleteVibe 
  } = useAtmosphericStore();

  // Context filtering logic for the main feed
  const filteredVibes = currentContext === 'CUSTOM' 
    ? vibes 
    : vibes.filter((v) => v.activity === currentContext);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Scanline CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />

      <div className="flex flex-1 overflow-hidden">
        {/* Tactical Desktop Operator Sidebar */}
        <OperatorSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Header Bar */}
          <HeaderNavbar />

          {/* Activity Context Mode Switcher Toolbar */}
          <ActivitySwitcher />

          {/* Dynamic View: Main Feed OR Immersive Room View */}
          {viewMode === 'feed' ? (
            <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-3xl w-full mx-auto pb-20 lg:pb-8">
              {/* Feed Header */}
              <div className="flex justify-between items-center mb-4 font-mono text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <div>
                  [CONTEXT_FILTER: <span className="text-cyan-400 font-bold">{currentContext}</span>]
                </div>
                <div>{filteredVibes.length} VIBE LOGS</div>
              </div>

              {/* Feed List */}
              {filteredVibes.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded bg-zinc-900/40 p-8 font-mono text-xs text-zinc-500">
                  NO VIBE LOGS FOUND FOR CONTEXT [{currentContext}].
                  <br />
                  CLICK [NEW VIBE] TO TRANSMIT A NEW ATMOSPHERIC POST.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVibes.map((vibe) => (
                    <VibeCard
                      key={vibe.id}
                      id={vibe.id}
                      title={vibe.title}
                      content={vibe.content}
                      keywords={vibe.keywords}
                      activity={vibe.activity}
                      images={vibe.images}
                      videoUrl={vibe.videoUrl}
                      musicUrl={vibe.musicUrl}
                      authorName={vibe.authorName}
                      authorId={vibe.authorId}
                      currentUserId={currentUserId}
                      createdAt={vibe.createdAt}
                      vibeItem={vibe}
                      onDelete={(id) => deleteVibe(id)}
                      onEdit={(id) => alert(`[EDIT_VIBE]: Action logged for ID ${id}`)}
                    />
                  ))}
                </div>
              )}
            </main>
          ) : (
            <AtmosphericRoomView
              vibeTitle={selectedVibeRoom?.title || 'DEEP WORK'}
              roomConfig={selectedVibeRoom?.roomConfig}
              vibeItem={selectedVibeRoom || undefined}
            />
          )}
        </div>
      </div>

      {/* New Vibe Modal Dialog */}
      <CreateVibeModal />

      {/* Mobile Navigation Toolbar */}
      <BottomNavbar />
    </div>
  );
};

export default App;
