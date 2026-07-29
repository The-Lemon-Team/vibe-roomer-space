import React, { useEffect, useState } from 'react';
import { useAtmosphericStore, VibeItem, RoomConfig } from '../../store/useAtmosphericStore';
import { CyberAudioPlayer } from '../Player/CyberAudioPlayer';

interface AtmosphericRoomViewProps {
  vibeTitle?: string;
  roomConfig?: RoomConfig | null;
  vibeItem?: VibeItem;
  children?: React.ReactNode;
}

export const AtmosphericRoomView: React.FC<AtmosphericRoomViewProps> = ({
  vibeTitle,
  roomConfig,
  vibeItem,
  children,
}) => {
  const { activeTag, setViewMode, vibes } = useAtmosphericStore();

  // Find all vibes matching the current active hashtag or use all vibes
  const matchingVibes = activeTag === '#ALL'
    ? vibes
    : vibes.filter((v) => v.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()));

  // Active playing vibe room item
  const currentRoomVibe = vibeItem || matchingVibes[0] || vibes[0];
  const roomTitle = vibeTitle || (activeTag !== '#ALL' ? `ROOM :: ${activeTag}` : `ROOM :: ${currentRoomVibe.title}`);
  const activeColor = roomConfig?.themeColor || currentRoomVibe.roomConfig?.themeColor || '#00F0FF';

  // Clock state
  const [timeStr, setTimeStr] = useState<string>('');
  const [ampm, setAmpm] = useState<string>('AM');

  // Control sliders state
  const [noiseLevel, setNoiseLevel] = useState<number>(64);
  const [hapticLevel, setHapticLevel] = useState<number>(22);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentAmpm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedHours = hours.toString().padStart(2, '0');
      setTimeStr(`${formattedHours}:${minutes}`);
      setAmpm(currentAmpm);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-1 w-full h-full overflow-y-auto pb-20 lg:pb-8 bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Image Shader & Grid Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: currentRoomVibe.roomConfig?.bgImageUrl 
            ? `url('${currentRoomVibe.roomConfig.bgImageUrl}')` 
            : undefined,
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${activeColor}15 0%, transparent 70%), linear-gradient(to right, #2a292e 1px, transparent 1px), linear-gradient(to bottom, #2a292e 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Atmospheric Header */}
      <header 
        className="sticky top-0 z-50 px-4 md:px-6 py-3 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md flex justify-between items-center transition-colors font-mono"
        style={{ borderBottomColor: `${activeColor}66` }}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('vibes')}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-900 border border-zinc-800 rounded flex items-center space-x-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden sm:inline">[VIBES]</span>
          </button>
          
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }} 
          />
          <h1 className="text-sm tracking-wider uppercase font-bold text-zinc-200 truncate max-w-[200px] sm:max-w-md">
            {roomTitle}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-zinc-400 hidden md:block">
            [ROUTE: <span className="font-bold text-amber-400">{activeTag}</span>]
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            ● ROOM_ACTIVE
          </span>
        </div>
      </header>

      {/* Main Content Bento Area */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full relative z-10 space-y-6">
        {/* Hero Atmospheric Banner */}
        <section className="relative w-full h-64 md:h-80 border border-zinc-800 rounded-lg overflow-hidden group bg-zinc-950 shadow-2xl">
          {currentRoomVibe.roomConfig?.bgImageUrl ? (
            <img 
              src={currentRoomVibe.roomConfig.bgImageUrl} 
              alt={currentRoomVibe.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900/60" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs mb-2 tracking-[0.2em] font-bold" style={{ color: activeColor }}>
                [ HASHTAG ROOM PROTOCOL :: {activeTag} ]
              </p>
              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]">
                {currentRoomVibe.title}
              </h2>
              {currentRoomVibe.content && (
                <p className="text-zinc-300 text-sm max-w-xl mt-2 font-sans border-l-2 pl-3 line-clamp-2" style={{ borderColor: activeColor }}>
                  {currentRoomVibe.content}
                </p>
              )}
            </div>

            <div className="font-mono text-[10px] text-zinc-400 space-y-1 bg-zinc-950/80 p-2.5 rounded border border-zinc-800 shrink-0">
              <div>ACTIVE_TAG: <span className="text-amber-400 font-bold">{activeTag}</span></div>
              <div>VIBES IN ROOM: <span className="text-cyan-400">{matchingVibes.length} LOGS</span></div>
              <div>LATENCY: <span className="text-emerald-400">12ms</span></div>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout: Audio Player + Queue + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Cyber Media Player & Room Queue */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Cyber Audio Player */}
            {currentRoomVibe.musicUrl && (
              <CyberAudioPlayer 
                src={currentRoomVibe.musicUrl}
                title={`${currentRoomVibe.title} (Live Stream)`}
                accentColor={activeColor}
                autoPlay={false}
              />
            )}

            {/* Room Media Queue for active hashtag */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-amber-400">playlist_play</span>
                  <span>ROOM_MEDIA_PLAYLIST [{activeTag}]</span>
                </span>
                <span>{matchingVibes.length} VIBES AVAILABLE</span>
              </div>

              {matchingVibes.map((vibe, idx) => (
                <div 
                  key={vibe.id}
                  className={`flex items-center space-x-4 p-3 rounded border transition-all ${
                    vibe.id === currentRoomVibe.id
                      ? 'bg-zinc-950 border-cyan-500/80 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-xs text-cyan-400 font-bold w-4">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0 font-sans">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-200 font-semibold truncate">{vibe.title}</span>
                      <span className="text-zinc-500 text-[10px]">@{vibe.authorName}</span>
                    </div>
                    <div className="flex gap-1.5 mt-1 font-mono text-[10px] text-zinc-500">
                      {vibe.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Environmental Control Panel */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-4 font-mono">
              <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-300 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-cyan-400">tune</span>
                  <span>ATMOSPHERE_CONTROLS</span>
                </span>
                <span className="text-zinc-500 text-[10px]">[AUDIO_DAMPENING]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Noise Control */}
                <div className="space-y-1 bg-zinc-950 p-3 rounded border border-zinc-800/80">
                  <div className="flex justify-between text-zinc-400">
                    <span>AMBIENT DAMPENING</span>
                    <span style={{ color: activeColor }}>{noiseLevel}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={noiseLevel} 
                    onChange={(e) => setNoiseLevel(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Haptic Control */}
                <div className="space-y-1 bg-zinc-950 p-3 rounded border border-zinc-800/80">
                  <div className="flex justify-between text-zinc-400">
                    <span>NEURAL HAPTIC INTENSITY</span>
                    <span style={{ color: activeColor }}>{hapticLevel}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={hapticLevel} 
                    onChange={(e) => setHapticLevel(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {children}
          </div>

          {/* Right Column: Clock & Log */}
          <div className="lg:col-span-4 space-y-6 font-mono">
            {/* System Clock Widget */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>SYSTEM_CLOCK</span>
                </span>
                <span className="text-zinc-500 text-[10px]">UTC+03:00</span>
              </div>

              <div className="text-center py-2">
                <div className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight">
                  {timeStr || '04:22'} <span className="text-xl font-bold text-cyan-400">{ampm}</span>
                </div>
                <div className="text-xs text-zinc-500 tracking-widest mt-1">
                  TACTICAL // SYNC
                </div>
              </div>
            </div>

            {/* Room Feed Sync Updates */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-200 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-emerald-400">rss_feed</span>
                  <span>HASHTAG_ROOM_LOGS</span>
                </span>
                <span className="text-emerald-400 text-[10px]">LIVE</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="border-l-2 border-cyan-500 pl-2 py-0.5 space-y-0.5">
                  <div className="text-zinc-200 font-semibold">Hashtag Room [{activeTag}] active</div>
                  <div className="text-[10px] text-zinc-500">JUST NOW • SYSTEM</div>
                </div>
                <div className="border-l-2 border-amber-500 pl-2 py-0.5 space-y-0.5">
                  <div className="text-zinc-300">Playlist synced for hashtag {activeTag}</div>
                  <div className="text-[10px] text-zinc-500">5 MIN AGO • AUTOMATION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
