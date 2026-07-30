import React, { useState } from 'react';
import { AddImageModal } from './AddImageModal';

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const PRESET_IMAGES = [
  { label: 'Cyber Code', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Terminal Screen', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Neon Highway', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rainy Alley', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80' },
  { label: 'Balcony View', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
];

export const ImageManager: React.FC<ImageManagerProps> = ({ images, onChange }) => {
  const [newUrl, setNewUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddImage = (urlToAdd?: string) => {
    const targetUrl = (urlToAdd || newUrl).trim();
    if (!targetUrl) return;

    if (!images.includes(targetUrl)) {
      onChange([...images, targetUrl]);
    }
    setNewUrl('');
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleSetMainImage = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([target, ...rest]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-2 font-mono">
      <div className="flex justify-between items-center">
        <label className="block text-zinc-400 font-bold uppercase text-xs">
          [IMAGE_GALLERY_MANAGER] ({images.length})
        </label>
        <span className="text-[10px] text-zinc-500">
          ★ First image = Main Cover
        </span>
      </div>

      {/* Add Image Input */}
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Paste image URL (https://...)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddImage();
            }
          }}
          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-400 border border-zinc-700 rounded text-xs font-bold uppercase shrink-0 transition-colors"
        >
          + Add Image
        </button>
      </div>

      <AddImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => handleAddImage(url)}
      />

      {/* Preset Pickers */}
      <div className="flex flex-wrap gap-1 items-center pt-1">
        <span className="text-[10px] text-zinc-500 uppercase mr-1">Presets:</span>
        {PRESET_IMAGES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAddImage(preset.url)}
            className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
          >
            + {preset.label}
          </button>
        ))}
      </div>

      {/* Interactive Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {images.map((url, idx) => {
            const isMain = idx === 0;

            return (
              <div
                key={idx}
                className={`relative group bg-zinc-950 border rounded overflow-hidden flex flex-col transition-all ${
                  isMain ? 'border-amber-500/80 shadow-[0_0_10px_rgba(255,176,0,0.15)]' : 'border-zinc-800'
                }`}
              >
                {/* Thumbnail Header Overlay */}
                <div className="relative h-28 w-full bg-black/40 overflow-hidden">
                  <img
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Badge */}
                  <div className="absolute top-1 left-1 flex gap-1">
                    {isMain ? (
                      <span className="bg-amber-500 text-black font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                        ★ MAIN COVER
                      </span>
                    ) : (
                      <span className="bg-zinc-900/80 text-zinc-400 text-[9px] px-1.5 py-0.5 rounded border border-zinc-700">
                        IMG_0{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-black/80 hover:bg-red-600 text-white rounded p-1 text-[10px] transition-colors"
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>

                {/* Controls Bar */}
                <div className="p-1.5 bg-zinc-900/90 border-t border-zinc-800 flex justify-between items-center text-[10px]">
                  {!isMain ? (
                    <button
                      type="button"
                      onClick={() => handleSetMainImage(idx)}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      [ SET AS MAIN ]
                    </button>
                  ) : (
                    <span className="text-amber-300 font-bold">PRIMARY COVER</span>
                  )}

                  {/* Reorder Buttons */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'left')}
                      className="px-1.5 py-0.5 bg-zinc-800 disabled:opacity-30 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
                      title="Move Left/Up"
                    >
                      ◄
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'right')}
                      className="px-1.5 py-0.5 bg-zinc-800 disabled:opacity-30 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
                      title="Move Right/Down"
                    >
                      ►
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
