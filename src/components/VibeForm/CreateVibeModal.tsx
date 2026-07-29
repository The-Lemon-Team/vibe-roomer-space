import React, { useState, useEffect } from 'react';
import { useAtmosphericStore, VibeWidget } from '../../store/useAtmosphericStore';
import { HashtagAutocomplete } from './HashtagAutocomplete';
import { ImageManager } from './ImageManager';
import { WidgetToolController } from './WidgetToolController';
import { AudioStreamController } from './AudioStreamController';

export const CreateVibeModal: React.FC = () => {
  const { isCreateModalOpen, setCreateModalOpen, addVibe, activeTag, pinTag } = useAtmosphericStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [widgets, setWidgets] = useState<VibeWidget[]>([]);
  const [musicUrl, setMusicUrl] = useState('');

  // Initialize tags when modal opens
  useEffect(() => {
    if (isCreateModalOpen) {
      const defaultTag = activeTag !== '#ALL' ? activeTag : '#deepwork';
      setSelectedTags([defaultTag, '#lofi']);
    }
  }, [isCreateModalOpen, activeTag]);

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const finalTags = selectedTags.length > 0 ? selectedTags : ['#general', '#vibe'];

    // Automatically pin the primary tag to menu
    const firstTag = finalTags[0];
    pinTag(firstTag);

    // Extract first YouTube widget video URL for videoUrl property backwards compatibility
    const ytWidget = widgets.find((w) => w.type === 'youtube');

    addVibe({
      title: title.trim(),
      content: content.trim(),
      tags: finalTags,
      keywords: finalTags.map((t) => t.replace(/^#/, '')),
      images: images,
      widgets: widgets,
      musicUrl: musicUrl.trim() || null,
      videoUrl: ytWidget ? ytWidget.url : null,
      authorName: 'cyber_junkie',
      authorId: 'user-op-01',
      roomConfig: {
        themeColor: '#FFB000',
        bgImageUrl: images[0] || undefined
      }
    });

    // Reset state & close modal
    setTitle('');
    setContent('');
    setSelectedTags(['#deepwork', '#lofi']);
    setImages([]);
    setWidgets([]);
    setMusicUrl('');
    setCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-mono select-none overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-2xl w-full my-auto overflow-hidden shadow-2xl relative space-y-0 text-xs">
        {/* Modal Top Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 sticky top-0 z-20">
          <div className="flex items-center space-x-2 font-bold text-cyan-400">
            <span className="material-symbols-outlined text-base">terminal</span>
            <span className="tracking-wide">[ CREATE_NEW_VIBE_LOG ]</span>
          </div>
          <button 
            type="button"
            onClick={() => setCreateModalOpen(false)}
            className="text-zinc-500 hover:text-zinc-200 text-sm font-bold px-2 py-0.5 rounded hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Title Input */}
          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">[VIBE_TITLE]:</label>
            <input
              type="text"
              required
              placeholder="e.g. Cyber-Coffee & Heavy Code"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none text-xs"
            />
          </div>

          {/* Hashtag Helper Component */}
          <HashtagAutocomplete
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />

          {/* Content Body */}
          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">[CONTENT_BODY]:</label>
            <textarea
              required
              rows={3}
              placeholder="Enter contextual log, current activity notes, or status..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none resize-none font-sans text-xs"
            />
          </div>

          <hr className="border-zinc-800/80 my-2" />

          {/* Interactive Multi-Image Manager */}
          <ImageManager
            images={images}
            onChange={setImages}
          />

          <hr className="border-zinc-800/80 my-2" />

          {/* Extensible Widget Tool Controller (YouTube + Links) */}
          <WidgetToolController
            widgets={widgets}
            onChange={setWidgets}
          />

          <hr className="border-zinc-800/80 my-2" />

          {/* Audio Stream Controller */}
          <AudioStreamController
            musicUrl={musicUrl}
            onChange={setMusicUrl}
          />

          {/* Modal Footer Controls */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-zinc-800 sticky bottom-0 bg-zinc-950/95 py-2">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded font-bold uppercase transition-colors"
            >
              [ CANCEL ]
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-400 text-black hover:bg-cyan-300 rounded font-bold uppercase shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
            >
              [ TRANSMIT VIBE ]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
