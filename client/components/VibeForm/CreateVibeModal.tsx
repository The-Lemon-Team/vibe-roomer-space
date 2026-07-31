import React, { useState, useEffect } from 'react';
import type { VibeWidget } from '../../store/useAtmosphericStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCreateModalOpen, addMyTag } from '../../store/uiSlice';
import { useCreateVibeMutation } from '../../store/api/vibesApi';
import { HashtagAutocomplete } from './HashtagAutocomplete';
import { ImageManager } from './ImageManager';
import { WidgetToolController } from './WidgetToolController';
import { AudioStreamController } from './AudioStreamController';
import { BaseModal } from '../Common/BaseModal';

export const CreateVibeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreateModalOpen = useAppSelector((s) => s.ui.isCreateModalOpen);
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const user = useAppSelector((s) => s.auth.user);

  const [createVibeMutation] = useCreateVibeMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const finalTags = selectedTags.length > 0 ? selectedTags : ['#general', '#vibe'];

    // Automatically pin the primary tag to my tags menu
    dispatch(addMyTag(finalTags[0]));

    // Extract first YouTube widget video URL for backwards compatibility
    const ytWidget = widgets.find((w) => w.type === 'youtube');

    await createVibeMutation({
      title: title.trim(),
      content: content.trim(),
      tags: finalTags,
      keywords: finalTags.map((t) => t.replace(/^#/, '')),
      images,
      widgets,
      musicUrl: musicUrl.trim() || null,
      videoUrl: ytWidget ? ytWidget.url : null,
      authorName: user?.username || 'cyber_junkie',
      authorId: user?.id || 'user-op-01',
      roomConfig: {
        themeColor: '#FFB000',
        bgImageUrl: images[0] || undefined,
      },
    });

    // Reset state & close modal
    setTitle('');
    setContent('');
    setSelectedTags(['#deepwork', '#lofi']);
    setImages([]);
    setWidgets([]);
    setMusicUrl('');
    dispatch(setCreateModalOpen(false));
  };

  return (
    <BaseModal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(setCreateModalOpen(false))}
      systemTag="[ CREATE_NEW_VIBE_LOG ]"
      headerIcon="terminal"
      maxWidth="max-w-2xl"
    >
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
            onClick={() => dispatch(setCreateModalOpen(false))}
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
    </BaseModal>
  );
};
