import React, { useEffect, useState } from 'react';
import { useAtmosphericStore, VibeItem } from '../../store/useAtmosphericStore';

interface RoomConfig {
  ambientLoopUrl?: string;
  themeColor?: string;
  bgImageUrl?: string;
}

interface AtmosphericRoomViewProps {
  vibeTitle: string;
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
  const { config, setViewMode } = useAtmosphericStore();
  const activeColor = roomConfig?.themeColor || config.neonColor;

  // Clock state
  const [timeStr, setTimeStr] = useState<string>('');
  const [ampm, setAmpm] = useState<string>('AM');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  
  // Mock sliders state (stubbed backend features with visual feedback)
  const [noiseLevel, setNoiseLevel] = useState<number>(64);
  const [hapticLevel, setHapticLevel] = useState<number>(22);

  useEffect(() => {
    // Logic for initializing background ambient audio loops can be hooked here
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
  }, [roomConfig]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Image Shader / Grid Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: roomConfig?.bgImageUrl ? `url('${roomConfig.bgImageUrl}')` : undefined,
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${activeColor}15 0%, transparent 70%), linear-gradient(to right, #2a292e 1px, transparent 1px), linear-gradient(to bottom, #2a292e 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Atmospheric Industrial Header */}
      <header 
        className="sticky top-0 z-50 px-4 md:px-6 py-3 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md flex justify-between items-center transition-colors"
        style={{ borderBottomColor: `${activeColor}66` }}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('feed')}
            className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 bg-zinc-900 border border-zinc-800 rounded flex items-center space-x-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden sm:inline">[FEED]</span>
          </button>
          
          <div 
            className="w-3 h-3 rounded-full animate-pulse" 
            style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }} 
          />
          <h1 className="font-mono text-sm tracking-wider uppercase font-bold text-zinc-200 truncate max-w-[200px] sm:max-w-md">
            ROOM :: {vibeTitle}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-xs font-mono text-zinc-400 hidden md:block">
            [SYS.STATUS: <span style={{ color: activeColor }}>ATMOSPHERE_ACTIVE</span>]
          </div>
          <button 
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            style={{ borderColor: isPlayingAudio ? activeColor : '#3f3f46', color: isPlayingAudio ? activeColor : '#a1a1aa' }}
            className="px-3 py-1 text-xs font-mono rounded bg-zinc-900 border flex items-center space-x-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              {isPlayingAudio ? 'volume_up' : 'volume_off'}
            </span>
            <span>{isPlayingAudio ? 'AUDIO_ON' : 'MUTED'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Bento Area */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full relative z-10 space-y-6">
        {/* Hero Atmospheric Banner */}
        <section className="relative w-full h-64 md:h-80 border border-zinc-800 rounded-lg overflow-hidden group bg-zinc-950 shadow-2xl">
          {roomConfig?.bgImageUrl ? (
            <img 
              src={roomConfig.bgImageUrl} 
              alt={vibeTitle} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900/60" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs mb-2 tracking-[0.2em] font-bold" style={{ color: activeColor }}>
                [ ACTIVE ATMOSPHERIC PROTOCOL ]
              </p>
              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]">
                {vibeTitle}
              </h2>
              {vibeItem?.content && (
                <p className="text-zinc-300 text-sm max-w-xl mt-2 font-sans border-l-2 pl-3 line-clamp-2" style={{ borderColor: activeColor }}>
                  {vibeItem.content}
                </p>
              )}
            </div>

            <div className="font-mono text-[10px] text-zinc-400 space-y-1 bg-zinc-950/80 p-2.5 rounded border border-zinc-800 shrink-0">
              <div>DAT_STREAM: <span className="text-zinc-200">0X4492</span></div>
              <div>LATENCY: <span className="text-emerald-400">12ms</span></div>
              <div>NODE: <span className="text-amber-400">ALPHA_PRIME</span></div>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout: Media + Sensors + System Clock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Media Players & Custom Audio Streams */}
          <div className="lg:col-span-8 space-y-6">
            {/* Audio Stream Player */}
            {vibeItem?.musicUrl && (
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-amber-400 flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">graphic_eq</span>
                    <span>ATMOSPHERIC_AUDIO_STREAM</span>
                  </span>
                  <span className="text-zinc-500">LIVE FEED</span>
                </div>
                <audio controls src={vibeItem.musicUrl} className="w-full h-10" />
              </div>
            )}

            {/* Media Queue / Listening List Prototype */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center font-mono text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                <span className="font-bold text-zinc-200 flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-red-500">play_circle</span>
                  <span>ROOM_MEDIA_QUEUE</span>
                </span>
                <span>3 ITEMS ACTIVE</span>
              </div>

              {/* Media item 1 */}
              <div className="flex items-center space-x-4 bg-zinc-950/80 border border-zinc-800 p-3 rounded hover:border-zinc-700 transition-colors">
                <button className="text-red-500 hover:text-red-400 transition-colors">
                  <span className="material-symbols-outlined text-2xl">play_circle</span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-200 font-semibold truncate">React Fiber & Atmospheric Soundscapes</span>
                    <span className="text-zinc-500">12:30 / 45:00</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded mt-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-600 rounded w-1/3 shadow-[0_0_8px_#ff0000]" />
                  </div>
                </div>
              </div>

              {/* Media item 2 */}
              <div className="flex items-center space-x-4 bg-zinc-950/80 border border-zinc-800 p-3 rounded hover:border-zinc-700 transition-colors">
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">play_circle</span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-300 truncate">Lofi Cyber-Coffee Beats</span>
                    <span className="text-zinc-500">00:00 / LIVE</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded mt-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-red-600 rounded w-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Control Panel (Commented / Mock Controls for Backend Hardware integration) */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-4">
              {/* Note: Non-persisted hardware sensors stubbed per requirements */}
              <div className="flex justify-between items-center font-mono text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-300 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-cyan-400">tune</span>
                  <span>ENVIRONMENTAL_CONTROLS</span>
                </span>
                <span className="text-zinc-500 text-[10px]">[HARDWARE_STUB]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Noise Control */}
                <div className="space-y-1 bg-zinc-950 p-3 rounded border border-zinc-800/80">
                  <div className="flex justify-between text-zinc-400">
                    <span>AMBIENT NOISE DAMPENING</span>
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
                    <span>HAPTIC FEEDBACK INTENSITY</span>
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

          {/* Right Column: Clock & Feed Sync */}
          <div className="lg:col-span-4 space-y-6">
            {/* System Clock & Calendar Widget */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center font-mono text-xs border-b border-zinc-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>SYSTEM_CLOCK</span>
                </span>
                <span className="text-zinc-500 text-[10px]">UTC+03:00</span>
              </div>

              <div className="text-center py-2">
                <div className="font-mono text-4xl md:text-5xl font-black text-zinc-100 tracking-tight">
                  {timeStr || '04:22'} <span className="text-xl font-bold text-cyan-400">{ampm}</span>
                </div>
                <div className="font-mono text-xs text-zinc-500 tracking-widest mt-1">
                  WEDNESDAY // TACTICAL
                </div>
              </div>

              {/* Grid Calendar representation */}
              <div className="border border-zinc-800/80 bg-zinc-950 p-2.5 rounded font-mono text-[10px]">
                <div className="grid grid-cols-7 gap-1 text-center text-zinc-500 mb-1 font-bold">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-zinc-300">
                  <span className="text-zinc-600">28</span><span className="text-zinc-600">29</span>
                  <span className="bg-cyan-950 border border-cyan-700 text-cyan-400 rounded">30</span>
                  <span>31</span><span>1</span><span>2</span><span>3</span>
                  <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                </div>
              </div>
            </div>

            {/* Room Feed Sync Updates */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center font-mono text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-200 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-emerald-400">rss_feed</span>
                  <span>FEED_SYNC_LOG</span>
                </span>
                <span className="text-emerald-400 text-[10px]">LIVE</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="border-l-2 border-cyan-500 pl-2 py-0.5 space-y-0.5">
                  <div className="text-zinc-200 font-semibold">Atmospheric room loaded</div>
                  <div className="text-[10px] text-zinc-500">2 MIN AGO • SYSTEM</div>
                </div>
                <div className="border-l-2 border-amber-500 pl-2 py-0.5 space-y-0.5">
                  <div className="text-zinc-300">Preset color updated: {activeColor}</div>
                  <div className="text-[10px] text-zinc-500">10 MIN AGO • USER</div>
                </div>
                <div className="border-l-2 border-zinc-700 pl-2 py-0.5 space-y-0.5">
                  <div className="text-zinc-400">Audio stream status check: OK</div>
                  <div className="text-[10px] text-zinc-500">1 HOUR AGO • AUTOMATION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
