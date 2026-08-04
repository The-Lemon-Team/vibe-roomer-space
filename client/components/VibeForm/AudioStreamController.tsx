import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CyberAudioPlayer } from '../Player/CyberAudioPlayer';

interface AudioStreamControllerProps {
  musicUrl: string;
  onChange: (url: string) => void;
}

const AUDIO_PRESETS = [
  { label: 'Cyber Lofi #1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { label: 'Synthwave Run #2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { label: 'Rain Meditation #3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { label: 'Balcony Beat #4', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { label: 'High Energy #5', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

export const AudioStreamController: React.FC<AudioStreamControllerProps> = ({
  musicUrl,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const handleSelectPreset = (url: string) => {
    onChange(url);
    setIsPreviewActive(true);
  };

  return (
    <div className="space-y-2 font-mono">
      <div className="flex justify-between items-center">
        <label className="block text-zinc-400 font-bold uppercase text-xs">
          {t('audio.controller')}
        </label>
        {musicUrl && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setIsPreviewActive(false);
            }}
            className="text-[10px] text-zinc-500 hover:text-red-400 underline"
          >
            {t('audio.clear')}
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          placeholder={t('audio.placeholder')}
          value={musicUrl}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
        />
        {musicUrl && (
          <button
            type="button"
            onClick={() => setIsPreviewActive(!isPreviewActive)}
            className={`px-3 py-2 border rounded text-xs font-bold uppercase shrink-0 transition-colors ${
              isPreviewActive
                ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            {isPreviewActive ? t('audio.hidePreview') : t('audio.testAudio')}
          </button>
        )}
      </div>

      {/* Preset Pickers */}
      <div className="flex flex-wrap gap-1 items-center pt-0.5">
        <span className="text-[10px] text-zinc-500 uppercase mr-1">{t('audio.presets')}</span>
        {AUDIO_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectPreset(preset.url)}
            className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
              musicUrl === preset.url
                ? 'bg-amber-950 border-amber-500 text-amber-300 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/50'
            }`}
          >
            ♪ {preset.label}
          </button>
        ))}
      </div>

      {/* Inline Test Player Preview */}
      {musicUrl && isPreviewActive && (
        <div className="p-2 bg-zinc-950 border border-cyan-800/80 rounded animate-fadeIn">
          <div className="text-[10px] text-cyan-400 font-bold mb-1 uppercase">
            {t('audio.formPreview')}
          </div>
          <CyberAudioPlayer
            src={musicUrl}
            title={t('audio.formPreviewTitle')}
            accentColor="#00F0FF"
          />
        </div>
      )}
    </div>
  );
};
