import React, { useRef, useState, useEffect } from 'react';

interface CyberAudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  accentColor?: string; // Hex color e.g. #00F0FF or #FFB000
  className?: string;
}

export const CyberAudioPlayer: React.FC<CyberAudioPlayerProps> = ({
  src,
  title = 'ATMOSPHERIC_AUDIO_STREAM',
  autoPlay = false,
  accentColor = '#00F0FF',
  className = '',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setHasError(true);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [src, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0 && isMuted) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec) || timeInSec === 0) return '00:00';
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`bg-zinc-950/90 border border-zinc-800 rounded-lg p-3.5 font-mono shadow-lg relative overflow-hidden backdrop-blur-md ${className}`}
      style={{
        boxShadow: isPlaying ? `0 0 15px ${accentColor}22` : undefined
      }}
    >
      {/* Top Bar: Title & Visualizer waves */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 min-w-0">
          <span 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: isPlaying ? accentColor : '#52525b' }}
          />
          <span className="text-xs font-bold truncate text-zinc-200 uppercase tracking-wide">
            🎵 {title}
          </span>
        </div>

        {/* Animated Cyber Equalizer Bars */}
        <div className="flex items-end space-x-1 h-3 shrink-0">
          {[0.6, 1, 0.4, 0.8, 0.3].map((h, i) => (
            <span
              key={i}
              className={`w-0.5 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-40'
              }`}
              style={{
                height: isPlaying ? `${Math.max(3, h * 12)}px` : '3px',
                backgroundColor: accentColor,
                animationDelay: `${i * 150}ms`
              }}
            />
          ))}
        </div>
      </div>

      {/* Media Audio Object */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Main Controls Row */}
      <div className="flex items-center space-x-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={hasError}
          style={{
            borderColor: isPlaying ? accentColor : '#3f3f46',
            color: isPlaying ? '#000' : accentColor,
            backgroundColor: isPlaying ? accentColor : 'transparent'
          }}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-105 shrink-0 shadow-md"
        >
          <span className="material-symbols-outlined text-xl">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Scrubber & Time */}
        <div className="flex-1 flex flex-col justify-center space-y-1 min-w-0">
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={hasError || duration === 0}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 z-10"
            />
            {/* Custom Neon Progress Track Overlay */}
            <div 
              className="absolute left-0 top-0 h-1.5 rounded-lg pointer-events-none transition-all"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: accentColor,
                boxShadow: isPlaying ? `0 0 8px ${accentColor}` : 'none'
              }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-zinc-500">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : 'LIVE_STREAM'}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="hidden sm:flex items-center space-x-1.5 pl-2 border-l border-zinc-800">
          <button 
            onClick={toggleMute}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
            </span>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 h-1 bg-zinc-800 appearance-none cursor-pointer accent-zinc-400 rounded"
          />
        </div>
      </div>

      {hasError && (
        <div className="text-[10px] text-red-400 mt-1">
          [ERR_AUDIO_STREAM_UNAVAILABLE]
        </div>
      )}
    </div>
  );
};
