import React, { useState } from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

export const CreateVibeModal: React.FC = () => {
  const { isCreateModalOpen, setCreateModalOpen, addVibe, activeTag, pinTag } = useAtmosphericStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtagsStr, setHashtagsStr] = useState(
    activeTag !== '#ALL' ? activeTag : '#deepwork, #lofi'
  );
  const [musicUrl, setMusicUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Parse hashtags cleanly
    const parsedTags = hashtagsStr
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t.toLowerCase() : `#${t.toLowerCase()}`));

    const finalTags = parsedTags.length > 0 ? parsedTags : ['#general', '#vibe'];
    
    // Automatically pin the first tag to menu if not already
    const firstTag = finalTags[0];
    pinTag(firstTag);

    const images = imageUrl.trim() ? [imageUrl.trim()] : [];

    addVibe({
      title,
      content,
      tags: finalTags,
      keywords: finalTags.map((t) => t.replace(/^#/, '')),
      images,
      musicUrl: musicUrl.trim() || null,
      videoUrl: videoUrl.trim() || null,
      authorName: 'cyber_junkie',
      authorId: 'user-op-01',
      roomConfig: {
        themeColor: '#FFB000',
        bgImageUrl: images[0] || undefined
      }
    });

    // Reset and close
    setTitle('');
    setContent('');
    setHashtagsStr('#deepwork, #lofi');
    setMusicUrl('');
    setVideoUrl('');
    setImageUrl('');
    setCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl space-y-0 relative">
        {/* Modal Top Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400">
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>[ CREATE_NEW_VIBE_LOG ]</span>
          </div>
          <button 
            onClick={() => setCreateModalOpen(false)}
            className="text-zinc-500 hover:text-zinc-200 text-sm font-bold px-2 py-0.5 rounded hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">[VIBE_TITLE]:</label>
            <input
              type="text"
              required
              placeholder="e.g. Cyber-Coffee & Heavy Code"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-amber-400 font-bold uppercase flex items-center gap-1">
                <span>[HASHTAGS]:</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-normal">
                ★ 1st Tag = Primary Route Tag
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="#deepwork, #lofi, #coding"
              value={hashtagsStr}
              onChange={(e) => setHashtagsStr(e.target.value)}
              className="w-full bg-zinc-900 border border-amber-500/50 focus:border-amber-400 rounded p-2 text-amber-300 placeholder-zinc-600 outline-none font-bold"
            />
            <p className="text-[10px] text-zinc-500 mt-1">
              Separate with spaces or commas. The first tag will be used for main route grouping.
            </p>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">[CONTENT_BODY]:</label>
            <textarea
              required
              rows={3}
              placeholder="Enter contextual log, current activity notes, or status..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none resize-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-bold uppercase">[AUDIO_STREAM_URL]:</label>
              <input
                type="url"
                placeholder="https://.../audio.mp3"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-bold uppercase">[IMAGE_URL]:</label>
              <input
                type="url"
                placeholder="https://.../photo.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
              />
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded font-bold uppercase"
            >
              [ CANCEL ]
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 text-black hover:bg-cyan-300 rounded font-bold uppercase shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            >
              [ TRANSMIT VIBE ]
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
