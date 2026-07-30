import React from 'react';
import { useAtmosphericStore, CreatedRoom } from '../../store/useAtmosphericStore';
import { useAuthStore } from '../../store/useAuthStore';

export const RoomListView: React.FC = () => {
  const {
    createdRooms,
    activeTag,
    setActiveTag,
    openRoomPage,
    setCreateRoomModalOpen,
    tagMode,
  } = useAtmosphericStore();

  const { isAuthenticated, setAuthModalOpen } = useAuthStore();

  const [privacyFilter, setPrivacyFilter] = React.useState<'public' | 'private'>('public');

  // Filter rooms by active tag in Rooms mode and privacy
  const filteredRooms = createdRooms.filter((r) => {
    const matchesTag =
      activeTag === '#ALL'
        ? true
        : r.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
          r.title.toLowerCase().includes(activeTag.replace('#', '').toLowerCase());

    const matchesPrivacy = privacyFilter === 'public' ? r.isPublic !== false : r.isPublic === false;

    return matchesTag && matchesPrivacy;
  });

  const headerFilterStyle = tagMode === 'live'
    ? 'bg-gradient-to-r from-amber-950/80 to-red-950/80 border-amber-500/50 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)]'
    : 'bg-amber-950/80 border-amber-500/50 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.2)]';

  return (
    <main className="flex-1 w-full h-full overflow-y-auto bg-zinc-950 bg-[radial-gradient(#1a779d_1px,transparent_1px)] bg-[size:16px_16px] pb-20 lg:pb-8 font-sans">
      <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header & Status Bar */}
        <div className="rooms-header flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg backdrop-blur-md font-mono text-xs">
          <div>
            <div className="text-cyan-400 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-base">sensors</span>
              <span>STREAM ROOMS DIRECTORY</span>
            </div>
            <div className="text-zinc-400 mt-1.5 flex items-center space-x-2">
              <span>[ACTIVE_TAG_FILTER:</span>
              <span className={`font-bold px-2 py-0.5 rounded border ${headerFilterStyle}`}>
                {activeTag}
              </span>
              <span>]</span>
            </div>
            <div className="text-zinc-400 mt-2 flex items-center space-x-2">
              <span>[VISIBILITY:</span>
              <button
                onClick={() => setPrivacyFilter('public')}
                className={`px-1.5 py-0.5 rounded border transition-colors ${
                  privacyFilter === 'public'
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 font-bold shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                PUBLIC ROOMS
              </button>
              <span className="text-zinc-600">/</span>
              <button
                onClick={() => setPrivacyFilter('private')}
                className={`px-1.5 py-0.5 rounded border transition-colors ${
                  privacyFilter === 'private'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold shadow-[0_0_8px_rgba(245,158,11,0.15)]'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                MY ROOMS
              </button>
              <span>]</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800">
              {filteredRooms.length} {privacyFilter === 'public' ? 'PUBLIC' : 'MY'} ROOM{filteredRooms.length !== 1 ? 'S' : ''} ONLINE
            </span>

            <button
              onClick={() => {
                if (isAuthenticated) {
                  setCreateRoomModalOpen(true);
                } else {
                  setAuthModalOpen(true, 'login');
                }
              }}
              className="px-4 py-2 bg-amber-400 text-black font-bold rounded hover:bg-amber-300 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] flex items-center space-x-1.5 uppercase"
            >
              <span className="material-symbols-outlined text-sm">add_box</span>
              <span>+ CREATE ROOM</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/40 p-8 font-mono text-xs text-zinc-500 space-y-4 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-zinc-600">sensors_off</span>
            <div>NO ACTIVE {privacyFilter === 'public' ? 'PUBLIC' : 'MY (PRIVATE)'} STREAM ROOMS FOUND FOR HASHTAG [{activeTag}].</div>
            <p className="text-zinc-400">
              {privacyFilter === 'public'
                ? 'Create a new public stream room to share photos, videos, music, and YouTube links with the network.'
                : 'Create a new private stream room for restricted access or select participants.'}
            </p>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setCreateRoomModalOpen(true);
                } else {
                  setAuthModalOpen(true, 'login');
                }
              }}
              className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-500/60 text-cyan-400 font-bold rounded hover:bg-cyan-500/30 transition-colors uppercase"
            >
              + TRANSMIT NEW ROOM FOR {activeTag}
            </button>
          </div>
        ) : (
          /* Full-width Responsive Room Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => {
              const themeColor = room.roomConfig?.themeColor || '#00F0FF';
              const posterImage = (room.poster || room.roomConfig?.bgImageUrl || '').trim();
              const hasPoster = !!posterImage;

              const attachedImagesCount = room.images?.length || 0;
              const hasMusic = !!room.musicUrl;
              const hasVideo = !!room.videoUrl || !!room.youtubeUrl;
              const streamItemsCount = room.streamItems?.length || 0;

              return (
                <div
                  key={room.id}
                  className="group relative bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                >
                  {/* Poster Image & Badges Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                    {hasPoster ? (
                      <img
                        src={posterImage}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center relative opacity-80"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 50% 40%, ${themeColor}22 0%, transparent 70%),
                            linear-gradient(to right, #1f1f23 1px, transparent 1px),
                            linear-gradient(to bottom, #1f1f23 1px, transparent 1px)
                          `,
                          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
                        }}
                      >
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-800 backdrop-blur-md">
                          [STANDART BLACK CELLS]
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

                    {/* Accent Color Indicator Bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
                    />

                    {/* Room Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2 font-mono text-[10px]">
                      <span className="px-2.5 py-1 rounded bg-zinc-950/80 border border-zinc-700 text-emerald-400 font-bold backdrop-blur-md flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{room.isPublic ? 'PUBLIC STREAM' : 'PRIVATE ROOM'}</span>
                      </span>
                    </div>

                    {/* Media Attachments Indicator Badges */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 font-mono text-[10px]">
                      {attachedImagesCount > 0 && (
                        <span className="px-2 py-0.5 bg-zinc-950/80 border border-zinc-700 text-cyan-300 rounded flex items-center space-x-1 backdrop-blur-md" title={`${attachedImagesCount} Photos Attached`}>
                          <span className="material-symbols-outlined text-xs">image</span>
                          <span>{attachedImagesCount}</span>
                        </span>
                      )}
                      {hasVideo && (
                        <span className="px-2 py-0.5 bg-zinc-950/80 border border-zinc-700 text-red-400 rounded flex items-center space-x-1 backdrop-blur-md" title="Video Content Stream">
                          <span className="material-symbols-outlined text-xs">videocam</span>
                          <span>VIDEO</span>
                        </span>
                      )}
                      {hasMusic && (
                        <span className="px-2 py-0.5 bg-zinc-950/80 border border-zinc-700 text-amber-400 rounded flex items-center space-x-1 backdrop-blur-md" title="Audio Stream Active">
                          <span className="material-symbols-outlined text-xs">graphic_eq</span>
                          <span>AUDIO</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Room Info Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Attached Room Hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[10px]">
                        {(room.tags || ['#stream']).map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTag(tag);
                            }}
                            className={`px-2 py-0.5 rounded border uppercase transition-colors ${activeTag.toLowerCase() === tag.toLowerCase()
                                ? tagMode === 'live'
                                  ? 'bg-gradient-to-r from-amber-950/80 to-red-950/80 border-amber-500/80 text-red-200 shadow-[0_0_8px_rgba(239,68,68,0.25)] font-bold'
                                  : 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_8px_rgba(255,176,0,0.2)] font-bold'
                                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-300'
                              }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-cyan-400 transition-colors line-clamp-1 uppercase font-mono">
                        {room.title}
                      </h3>

                      {room.description && (
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                          {room.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Info & Action */}
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                      <div className="text-[11px] text-zinc-500">
                        BY <span className="text-cyan-400 font-bold">{room.authorName}</span>
                        {streamItemsCount > 0 && (
                          <span className="ml-2 text-zinc-400">• {streamItemsCount} STREAM ITEMS</span>
                        )}
                      </div>

                      <button
                        onClick={() => openRoomPage(room)}
                        className="px-4 py-1.5 bg-zinc-800 hover:bg-amber-500 hover:text-black border border-zinc-700 hover:border-amber-400 text-amber-500 font-bold rounded transition-all flex items-center space-x-1 uppercase text-xs shadow-md"
                      >
                        <span>ENTER ROOM</span>
                        <span className="material-symbols-outlined text-sm">login</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};
