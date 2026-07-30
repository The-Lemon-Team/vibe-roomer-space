import React, { useEffect, useState } from 'react';
import {
  useAtmosphericStore,
  VibeItem,
  RoomConfig,
  CreatedRoom,
} from '../../store/useAtmosphericStore';
import { useAuthStore } from '../../store/useAuthStore';
import { CyberAudioPlayer } from '../Player/CyberAudioPlayer';
import { checkRoomPostingPermission } from '../../utils/roomPermissions';
import { RoomNewsBlock } from './RoomNewsBlock';
import { RoomNotesBlock } from './RoomNotesBlock';
import { BaseModal } from '../Common/BaseModal';

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
  const {
    activeTag,
    setActiveTag,
    vibes,
    fetchRoomData,
    activeCreatedRoom,
    enterVibePage,
    closeRoomPage,
    addStreamItemToRoom,
    updateRoomBackground,
  } = useAtmosphericStore();

  const { isAuthenticated, user, setAuthModalOpen } = useAuthStore();

  useEffect(() => {
    fetchRoomData(activeTag);
  }, [activeTag, fetchRoomData]);

  // Stream item form state
  const [streamInput, setStreamInput] = useState('');
  const [streamType, setStreamType] = useState<'text' | 'image' | 'youtube' | 'music'>('text');
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  const targetRoom: CreatedRoom | null = activeCreatedRoom;
  const isCreatedRoom = !!targetRoom;

  // Room posting permission check (Creator only, extensible for future modes)
  const postingPermission = checkRoomPostingPermission(
    targetRoom,
    user,
    isAuthenticated,
  );

  // Find all matching vibe points
  const matchingVibes =
    activeTag === '#ALL'
      ? vibes
      : vibes.filter(
          (v) =>
            v.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
            v.keywords?.some((k) => `#${k.toLowerCase()}` === activeTag.toLowerCase()),
        );

  const currentRoomVibe = vibeItem || matchingVibes[0] || vibes[0];

  const roomTitle =
    targetRoom?.title ||
    vibeTitle ||
    (activeTag !== '#ALL' ? `TOP TAG ROOM :: ${activeTag}` : `ROOM :: ${currentRoomVibe?.title}`);

  const roomTags = targetRoom?.tags || (currentRoomVibe?.tags || ['#stream']);

  const activeColor =
    targetRoom?.roomConfig?.themeColor ||
    roomConfig?.themeColor ||
    currentRoomVibe?.roomConfig?.themeColor ||
    '#00F0FF';

  const customBgImage = (
    targetRoom?.poster ||
    targetRoom?.roomConfig?.bgImageUrl ||
    roomConfig?.bgImageUrl ||
    ''
  ).trim();
  const hasCustomBg = !!customBgImage;

  // Background edit modal state
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);
  const [bgInputUrl, setBgInputUrl] = useState(customBgImage);

  const roomImages = targetRoom?.images?.length
    ? targetRoom.images
    : Array.from(new Set(matchingVibes.flatMap((v) => v.images || []).filter(Boolean)));

  const videoUrl = targetRoom?.videoUrl || targetRoom?.youtubeUrl || currentRoomVibe?.videoUrl;
  const musicUrl = targetRoom?.musicUrl || currentRoomVibe?.musicUrl;
  const streamItems = targetRoom?.streamItems || [];

  // Clock state
  const [timeStr, setTimeStr] = useState<string>('');
  const [ampm, setAmpm] = useState<string>('AM');
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

  const handlePostStreamContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalOpen(true, 'login');
      return;
    }

    if (!postingPermission.canPost) return;

    if (!targetRoom) return;
    if (!streamInput.trim() && !mediaUrlInput.trim()) return;

    if (streamType === 'image' && mediaUrlInput.trim()) {
      addStreamItemToRoom(targetRoom.id, {
        type: 'image',
        content: streamInput.trim(),
        mediaUrls: [mediaUrlInput.trim()],
      });
    } else if (streamType === 'youtube' && mediaUrlInput.trim()) {
      addStreamItemToRoom(targetRoom.id, {
        type: 'youtube',
        title: streamInput.trim() || 'Shared YouTube Stream Link',
        url: mediaUrlInput.trim(),
      });
    } else if (streamType === 'music' && mediaUrlInput.trim()) {
      addStreamItemToRoom(targetRoom.id, {
        type: 'music',
        title: streamInput.trim() || 'Shared Audio Track Stream',
        url: mediaUrlInput.trim(),
      });
    } else {
      addStreamItemToRoom(targetRoom.id, {
        type: 'text',
        content: streamInput.trim(),
      });
    }

    setStreamInput('');
    setMediaUrlInput('');
  };

  return (
    <div className="relative flex-1 w-full h-full overflow-y-auto pb-20 lg:pb-8 bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Whole Room Background: Custom Wallpaper OR Standard Black Cells Grid */}
      {hasCustomBg ? (
        <div
          className="fixed inset-0 bg-cover bg-center opacity-30 pointer-events-none transition-all duration-700 blur-[2px] z-0"
          style={{ backgroundImage: `url('${customBgImage}')` }}
        />
      ) : (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-zinc-950 opacity-90 transition-all duration-700 overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 30%, ${activeColor}15 0%, transparent 70%),
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          }}
        >
          <div
            className="w-full h-full opacity-60"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1f1f23 1px, transparent 1px),
                linear-gradient(to bottom, #1f1f23 1px, transparent 1px)
              `,
              backgroundSize: '18px 18px',
            }}
          />
        </div>
      )}

      {/* Room Header */}
      <header
        className="sticky top-0 z-50 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md transition-colors font-mono"
        style={{ borderBottomColor: `${activeColor}66` }}
      >
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => closeRoomPage()}
              className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 rounded flex items-center space-x-1 font-bold transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>[ROOMS_DIRECTORY]</span>
            </button>

            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
            />
            <h1 className="text-sm tracking-wider uppercase font-bold text-zinc-200 truncate max-w-[200px] sm:max-w-md">
              {roomTitle}
            </h1>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <span
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${
                targetRoom?.isPublic !== false
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60'
                  : 'bg-purple-950 text-purple-300 border-purple-500/60'
              }`}
            >
              ● {targetRoom?.isPublic !== false ? 'PUBLIC STREAM ROOM' : 'PRIVATE ROOM'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full relative z-10 space-y-6">
        {/* Hero Banner Poster Section */}
        <section className="relative w-full h-72 md:h-96 border border-zinc-800 rounded-xl overflow-hidden group bg-zinc-950 shadow-2xl">
          {hasCustomBg ? (
            <img
              src={customBgImage}
              alt={roomTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
            />
          ) : (
            <div
              className="absolute inset-0 bg-zinc-950 flex items-center justify-center opacity-80"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 40%, ${activeColor}22 0%, transparent 70%),
                  linear-gradient(to right, #1f1f24 1px, transparent 1px),
                  linear-gradient(to bottom, #1f1f24 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 32px 32px, 32px 32px',
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

          {/* Edit Room Background Button */}
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                setAuthModalOpen(true, 'login');
                return;
              }
              setBgInputUrl(customBgImage);
              setIsBgModalOpen(true);
            }}
            className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-cyan-300 hover:text-white rounded font-mono text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-sm">wallpaper</span>
            <span>{hasCustomBg ? '[ EDIT ROOM BACKGROUND ]' : '[ EDIT BACKGROUND (BLACK CELLS) ]'}</span>
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              {/* Attached Hashtags Header */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-zinc-400 font-bold">[ATTACHED_HASHTAGS]:</span>
                {roomTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className="px-2.5 py-0.5 bg-amber-950/80 border border-amber-500/80 text-amber-400 font-bold rounded uppercase text-[11px] hover:bg-amber-900 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_12px_rgba(0,0,0,0.8)] font-mono">
                {roomTitle}
              </h2>

              {targetRoom?.description && (
                <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
                  {targetRoom.description}
                </p>
              )}

              {currentRoomVibe && (
                <div className="flex items-center space-x-2 pt-2 font-mono text-xs">
                  <button
                    onClick={() => enterVibePage(currentRoomVibe)}
                    className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/80 text-cyan-300 hover:bg-cyan-900 rounded font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <span>★ ORIGIN VIBE: {currentRoomVibe.title}</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>

            <div className="font-mono text-[10px] text-zinc-400 space-y-1 bg-zinc-950/90 p-3 rounded-lg border border-zinc-800 shrink-0 backdrop-blur-md">
              <div>
                STREAM_OPERATOR: <span className="text-cyan-400 font-bold">{targetRoom?.authorName || 'operator'}</span>
              </div>
              <div>
                MEDIA_PHOTOS: <span className="text-cyan-400">{roomImages.length} ATTACHED</span>
              </div>
              <div>
                STREAM_ITEMS: <span className="text-emerald-400">{streamItems.length} POSTED</span>
              </div>
              <div>
                NEWS_ITEMS: <span className="text-amber-400">{targetRoom?.news?.length || 0} ATTACHED</span>
              </div>
              <div>
                ROOM_NOTES: <span className="text-cyan-400">{targetRoom?.notes?.length || 0} ATTACHED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Media Players, Stream Content & Timeline */}
          <div className="lg:col-span-8 space-y-6">

            {/* Post Content to Room Stream Card */}
            {isCreatedRoom && (
              postingPermission.canPost ? (
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 font-mono space-y-3 shadow-lg">
                  <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-bold flex items-center space-x-1">
                        <span className="material-symbols-outlined text-sm">cell_tower</span>
                        <span>+ TRANSMIT STREAM CONTENT TO ROOM</span>
                      </span>
                      <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 text-[10px] font-bold rounded">
                        [CREATOR MODE: AUTHORIZED]
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-[10px]">
                      {(['text', 'image', 'youtube', 'music'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setStreamType(t)}
                          className={`px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                            streamType === t
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-600'
                              : 'bg-zinc-950 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handlePostStreamContent} className="space-y-3">
                    <textarea
                      rows={2}
                      placeholder={
                        streamType === 'image'
                          ? 'Image description / caption...'
                          : streamType === 'youtube'
                          ? 'YouTube title or description...'
                          : streamType === 'music'
                          ? 'Audio track description...'
                          : 'Post update transmission to room stream...'
                      }
                      value={streamInput}
                      onChange={(e) => setStreamInput(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 placeholder-zinc-600 outline-none focus:border-cyan-500"
                    />

                    {streamType !== 'text' && (
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded px-2 py-1">
                        <span className="text-zinc-500 text-xs mr-2 font-bold uppercase">{streamType} URL:</span>
                        <input
                          type="url"
                          placeholder={
                            streamType === 'image'
                              ? 'https://images.unsplash.com/photo-...'
                              : streamType === 'youtube'
                              ? 'https://www.youtube.com/watch?v=...'
                              : 'https://example.com/audio.mp3'
                          }
                          value={mediaUrlInput}
                          onChange={(e) => setMediaUrlInput(e.target.value)}
                          className="w-full bg-transparent outline-none text-xs text-cyan-300 placeholder-zinc-600"
                        />
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-cyan-400 text-black font-bold text-xs rounded hover:bg-cyan-300 transition-colors uppercase flex items-center space-x-1"
                      >
                        <span className="material-symbols-outlined text-sm">send</span>
                        <span>POST TO STREAM</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 font-mono space-y-2 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between text-xs border-b border-zinc-800/80 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">lock</span>
                      <span className="text-amber-400 font-bold tracking-wider">[CREATOR TRANSMISSION MODE]</span>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[10px] font-bold rounded uppercase">
                      CREATOR ONLY
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                    {postingPermission.reason}
                  </p>
                  {!isAuthenticated && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setAuthModalOpen(true, 'login')}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-cyan-300 border border-cyan-500/40 rounded text-xs font-bold transition-all flex items-center space-x-1"
                      >
                        <span className="material-symbols-outlined text-xs">login</span>
                        <span>LOG IN TO VERIFY CREATOR IDENTITY</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

            {/* Audio Stream Block */}
            {musicUrl && (
              <div className="space-y-3 font-mono">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">graphic_eq</span>
                  <span>[ROOM_AUDIO_STREAM]</span>
                </div>
                <CyberAudioPlayer
                  src={musicUrl}
                  title={`${roomTitle} (Live Room Stream)`}
                  accentColor={activeColor}
                  autoPlay={false}
                />
              </div>
            )}

            {/* Video Canvas Block */}
            {videoUrl && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 font-mono space-y-3 shadow-lg">
                <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                  <span className="text-amber-400 font-bold flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    <span>[VIDEO_CANVAS_WIDGET]</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">LIVE MEDIA FEED</span>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 bg-black">
                  <iframe
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={roomTitle}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Photo Gallery Block */}
            {roomImages.length > 0 && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 font-mono space-y-3 shadow-lg">
                <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">photo_library</span>
                    <span>[ATTACHED_PHOTO_GALLERY]</span>
                  </span>
                  <span className="text-zinc-500 text-[10px]">{roomImages.length} ATTACHED PHOTOS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {roomImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-lg border border-zinc-800 overflow-hidden bg-black group relative shadow"
                    >
                      <img
                        src={img}
                        alt={`Room photo ${idx}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stream Items Activity Feed */}
            {streamItems.length > 0 && (
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-4 font-mono shadow-lg">
                <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                  <span className="font-bold text-cyan-400 flex items-center space-x-1">
                    <span className="material-symbols-outlined text-sm">stream</span>
                    <span>ROOM STREAM ACTIVITY TIMELINE</span>
                  </span>
                  <span>{streamItems.length} ITEMS</span>
                </div>

                <div className="space-y-3">
                  {streamItems.map((item) => (
                    <div key={item.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span className="text-cyan-400 font-bold">@{item.authorName}</span>
                        <span>{item.createdAt}</span>
                      </div>

                      {item.content && <p className="text-xs text-zinc-200">{item.content}</p>}

                      {item.type === 'image' && item.mediaUrls && item.mediaUrls[0] && (
                        <div className="aspect-video max-h-60 rounded overflow-hidden border border-zinc-800 bg-black mt-2">
                          <img src={item.mediaUrls[0]} alt="Stream attachment" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {item.type === 'youtube' && item.url && (
                        <div className="aspect-video max-h-60 rounded overflow-hidden border border-zinc-800 bg-black mt-2">
                          <iframe src={item.url.replace('watch?v=', 'embed/')} title={item.title || 'YouTube'} className="w-full h-full" allowFullScreen />
                        </div>
                      )}

                      {item.type === 'music' && item.url && (
                        <div className="mt-2">
                          <CyberAudioPlayer src={item.url} title={item.title || 'Audio Stream Track'} accentColor="#FFB000" autoPlay={false} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {children}
          </div>

          {/* Right Column: Clock, Environmental Controls, Attached News & Notes */}
          <div className="lg:col-span-4 space-y-6 font-mono">
            {/* System Clock */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-4 shadow-lg">
              <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>STREAM_CLOCK</span>
                </span>
                <span className="text-zinc-500 text-[10px]">UTC+03:00</span>
              </div>

              <div className="text-center py-2">
                <div className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight">
                  {timeStr || '04:22'} <span className="text-xl font-bold text-cyan-400">{ampm}</span>
                </div>
                <div className="text-xs text-zinc-500 tracking-widest mt-1">
                  ROOM TRANSMISSION ACTIVE
                </div>
              </div>
            </div>

            {/* Atmosphere Sliders */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-4 shadow-lg">
              <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-2">
                <span className="text-zinc-300 font-bold flex items-center space-x-1">
                  <span className="material-symbols-outlined text-sm text-cyan-400">tune</span>
                  <span>ATMOSPHERE_CONTROLS</span>
                </span>
              </div>

              <div className="space-y-3 text-xs">
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

                <div className="space-y-1 bg-zinc-950 p-3 rounded border border-zinc-800/80">
                  <div className="flex justify-between text-zinc-400">
                    <span>HAPTIC INTENSITY</span>
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

                <div className="space-y-1 bg-zinc-950 p-3 rounded border border-zinc-800/80">
                  <div className="flex justify-between items-center text-zinc-400 mb-1">
                    <span>ROOM BACKGROUND ENGINE</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${hasCustomBg ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60' : 'bg-zinc-900 text-zinc-400 border-zinc-700'}`}>
                      {hasCustomBg ? 'CUSTOM IMAGE' : 'BLACK CELLS GRID'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isAuthenticated) {
                        setAuthModalOpen(true, 'login');
                        return;
                      }
                      setBgInputUrl(customBgImage);
                      setIsBgModalOpen(true);
                    }}
                    className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-500/60 text-cyan-400 rounded text-center text-xs font-bold transition-all flex items-center justify-center space-x-1 uppercase"
                  >
                    <span className="material-symbols-outlined text-sm">wallpaper</span>
                    <span>EDIT WHOLE ROOM BACKGROUND</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Attached Room News Block */}
            {targetRoom && <RoomNewsBlock room={targetRoom} />}

            {/* Attached Room Notes (Markdown + View Mode) Block */}
            {targetRoom && <RoomNotesBlock room={targetRoom} />}
          </div>
        </div>
      </main>

      {/* Edit Room Background Modal */}
      <BaseModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        title="[ EDIT WHOLE ROOM BACKGROUND ]"
        headerIcon="wallpaper"
        maxWidth="max-w-lg"
        containerClassName="rounded-xl"
      >
        <div className="p-6 space-y-5 font-mono text-xs">
          <div className="space-y-1">
            <label className="block text-zinc-300 font-bold uppercase">
              CURRENT ROOM BACKGROUND STATUS
            </label>
            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded flex items-center justify-between">
              <span className="text-zinc-400">BACKGROUND MODE:</span>
              <span className={`font-bold px-2.5 py-1 rounded border text-[10px] uppercase ${hasCustomBg ? 'bg-cyan-950 text-cyan-300 border-cyan-500/60' : 'bg-zinc-950 text-emerald-400 border-emerald-500/50'}`}>
                {hasCustomBg ? '● CUSTOM IMAGE ACTIVE' : '● STANDART BLACK CELLS GRID (DEFAULT)'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-zinc-300 font-bold uppercase">
              CUSTOM BACKGROUND IMAGE URL
            </label>
            <input
              type="url"
              value={bgInputUrl}
              onChange={(e) => setBgInputUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-cyan-300 focus:border-cyan-400 focus:outline-none"
            />
            <p className="text-[10px] text-zinc-500">
              Paste background image URL or pick preset below. Clear URL to return to default black cells grid.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="block text-zinc-300 font-bold uppercase text-[11px]">
              BACKGROUND PRESETS & MODES
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBgInputUrl('')}
                className={`p-2.5 rounded border text-left font-bold transition-all ${
                  !bgInputUrl.trim()
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="text-[11px] flex items-center space-x-1 font-bold">
                  <span className="material-symbols-outlined text-xs">grid_4x4</span>
                  <span>STANDART BLACK CELLS</span>
                </div>
                <div className="text-[9px] text-zinc-500 font-normal mt-0.5">Empty default dark grid cells</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setBgInputUrl(
                    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
                  )
                }
                className={`p-2.5 rounded border text-left font-bold transition-all ${
                  bgInputUrl.includes('photo-1526374965328')
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="text-[11px] flex items-center space-x-1 font-bold">
                  <span className="material-symbols-outlined text-xs">code</span>
                  <span>NEON MATRIX</span>
                </div>
                <div className="text-[9px] text-zinc-500 font-normal mt-0.5">Tactical cyber matrix grid</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setBgInputUrl(
                    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
                  )
                }
                className={`p-2.5 rounded border text-left font-bold transition-all ${
                  bgInputUrl.includes('photo-1508739773434')
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="text-[11px] flex items-center space-x-1 font-bold">
                  <span className="material-symbols-outlined text-xs">directions_car</span>
                  <span>SYNTHWAVE RUN</span>
                </div>
                <div className="text-[9px] text-zinc-500 font-normal mt-0.5">Neon highway ambient night</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setBgInputUrl(
                    'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
                  )
                }
                className={`p-2.5 rounded border text-left font-bold transition-all ${
                  bgInputUrl.includes('photo-1514565131')
                    ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="text-[11px] flex items-center space-x-1 font-bold">
                  <span className="material-symbols-outlined text-xs">water_drop</span>
                  <span>RAINY ALLEY</span>
                </div>
                <div className="text-[9px] text-zinc-500 font-normal mt-0.5">Wet street rain reflections</div>
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => {
                if (targetRoom) {
                  updateRoomBackground(targetRoom.id, '');
                }
                setBgInputUrl('');
                setIsBgModalOpen(false);
              }}
              className="px-3 py-1.5 bg-red-950/60 border border-red-800/80 text-red-400 hover:bg-red-900 rounded font-bold transition-colors uppercase text-[11px]"
            >
              CLEAR TO BLACK CELLS
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsBgModalOpen(false)}
                className="px-4 py-1.5 text-zinc-400 hover:text-zinc-200 transition-colors uppercase text-xs"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => {
                  if (targetRoom) {
                    updateRoomBackground(targetRoom.id, bgInputUrl);
                  }
                  setIsBgModalOpen(false);
                }}
                className="px-5 py-1.5 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-all uppercase text-xs shadow-[0_0_12px_rgba(0,240,255,0.3)]"
              >
                APPLY BACKGROUND
              </button>
            </div>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};
