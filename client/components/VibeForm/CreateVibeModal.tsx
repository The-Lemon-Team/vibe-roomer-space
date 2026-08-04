import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  GalleryLayout,
  VibeItem,
  VibeWidget,
  YoutubeWidgetLayout,
} from '../../store/useAtmosphericStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCreateModalOpen, addMyTag, setSelectedVibePage } from '../../store/uiSlice';
import { useCreateVibeMutation, useUpdateVibeMutation } from '../../store/api/vibesApi';
import {
  useCreateAdminFeedItemMutation,
  useUpdateAdminFeedItemMutation,
} from '../../store/api/adminFeedApi';
import { HashtagAutocomplete } from './HashtagAutocomplete';
import { ImageManager } from './ImageManager';
import { WidgetToolController } from './WidgetToolController';
import { AudioStreamController } from './AudioStreamController';
import { BaseModal } from '../Common/BaseModal';

function widgetsFromVibe(vibe: VibeItem): VibeWidget[] {
  if (vibe.widgets && vibe.widgets.length > 0) return vibe.widgets;
  if (vibe.videoUrl) {
    return [{ id: `yt-${vibe.id}`, type: 'youtube', url: vibe.videoUrl }];
  }
  return [];
}

function layoutFromVibe(vibe: VibeItem): YoutubeWidgetLayout {
  return vibe.roomConfig?.youtubeLayout === 'player' ? 'player' : 'full';
}

function galleryLayoutFromVibe(vibe: VibeItem): GalleryLayout {
  const layout = vibe.roomConfig?.galleryLayout;
  if (layout === 'main_focus' || layout === 'main_only') return layout;
  return 'gallery';
}

export const CreateVibeModal: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isCreateModalOpen = useAppSelector((s) => s.ui.isCreateModalOpen);
  const editingVibe = useAppSelector((s) => s.ui.editingVibe);
  const selectedVibePage = useAppSelector((s) => s.ui.selectedVibePage);
  const activeTag = useAppSelector((s) => s.ui.activeTag);
  const tagMode = useAppSelector((s) => s.ui.tagMode);
  const user = useAppSelector((s) => s.auth.user);

  const [createVibeMutation] = useCreateVibeMutation();
  const [updateVibeMutation] = useUpdateVibeMutation();
  const [createAdminFeedItem] = useCreateAdminFeedItemMutation();
  const [updateAdminFeedItem] = useUpdateAdminFeedItemMutation();
  const isAdminFeed = tagMode === 'admin_config';
  const isEditMode = !!editingVibe;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [widgets, setWidgets] = useState<VibeWidget[]>([]);
  const [youtubeLayout, setYoutubeLayout] = useState<YoutubeWidgetLayout>('full');
  const [galleryLayout, setGalleryLayout] = useState<GalleryLayout>('gallery');
  const [posterYoutubeUrl, setPosterYoutubeUrl] = useState<string | null>(null);
  const [musicUrl, setMusicUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill on open (edit) or set defaults (create)
  useEffect(() => {
    if (!isCreateModalOpen) return;

    if (editingVibe) {
      setTitle(editingVibe.title);
      setContent(editingVibe.content);
      setSelectedTags(
        editingVibe.tags?.length
          ? editingVibe.tags
          : (editingVibe.keywords || []).map((k) => (k.startsWith('#') ? k : `#${k}`)),
      );
      setImages(editingVibe.images?.length ? [...editingVibe.images] : []);
      setWidgets(widgetsFromVibe(editingVibe));
      setYoutubeLayout(layoutFromVibe(editingVibe));
      setGalleryLayout(galleryLayoutFromVibe(editingVibe));
      setPosterYoutubeUrl(editingVibe.roomConfig?.posterYoutubeUrl?.trim() || null);
      setMusicUrl(editingVibe.musicUrl || '');
      return;
    }

    const defaultTag = activeTag !== '#ALL' ? activeTag : '#deepwork';
    setTitle('');
    setContent('');
    setSelectedTags([defaultTag, '#lofi']);
    setImages([]);
    setWidgets([]);
    setYoutubeLayout('full');
    setGalleryLayout('gallery');
    setPosterYoutubeUrl(null);
    setMusicUrl('');
  }, [isCreateModalOpen, editingVibe, activeTag]);

  const resetAndClose = () => {
    setTitle('');
    setContent('');
    setSelectedTags(['#deepwork', '#lofi']);
    setImages([]);
    setWidgets([]);
    setYoutubeLayout('full');
    setGalleryLayout('gallery');
    setPosterYoutubeUrl(null);
    setMusicUrl('');
    setIsSubmitting(false);
    dispatch(setCreateModalOpen(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || isSubmitting) return;

    const finalTags = selectedTags.length > 0 ? selectedTags : ['#general', '#vibe'];
    const keywords = finalTags.map((t) => t.replace(/^#/, ''));
    const ytUrls = widgets.filter((w) => w.type === 'youtube').map((w) => w.url);
    const syncedWidgets = widgets.map((w) =>
      w.type === 'youtube' ? { ...w, layout: youtubeLayout } : w,
    );
    const mainImage = images[0] || undefined;

    setIsSubmitting(true);
    try {
      if (isEditMode && editingVibe) {
        let updated: VibeItem;

        if (isAdminFeed) {
          updated = await updateAdminFeedItem({
            id: editingVibe.id,
            title: title.trim(),
            content: content.trim(),
            keywords,
            images,
            videoUrls: ytUrls,
            musicUrls: musicUrl.trim() ? [musicUrl.trim()] : [],
          }).unwrap();
        } else {
          updated = await updateVibeMutation({
            id: editingVibe.id,
            updates: {
              title: title.trim(),
              content: content.trim(),
              tags: finalTags,
              keywords,
              images,
              widgets: syncedWidgets,
              musicUrl: musicUrl.trim() || null,
              videoUrl: ytUrls[0] || null,
              roomConfig: {
                ...(editingVibe.roomConfig || {}),
                themeColor: editingVibe.roomConfig?.themeColor || '#FFB000',
                bgImageUrl: mainImage,
                widgets: syncedWidgets,
                youtubeLayout,
                galleryLayout,
                ...(posterYoutubeUrl
                  ? { posterYoutubeUrl }
                  : { posterYoutubeUrl: undefined }),
              },
            },
          }).unwrap();
        }

        // Keep vibe page in sync when editing from the page itself
        if (selectedVibePage?.id === updated.id) {
          dispatch(setSelectedVibePage(updated));
        }
      } else {
        if (!isAdminFeed) {
          dispatch(addMyTag(finalTags[0]));
        }

        if (isAdminFeed) {
          await createAdminFeedItem({
            title: title.trim(),
            content: content.trim(),
            keywords,
            images,
            videoUrls: ytUrls,
            musicUrls: musicUrl.trim() ? [musicUrl.trim()] : [],
            inMainFeed: true,
          }).unwrap();
        } else {
          await createVibeMutation({
            title: title.trim(),
            content: content.trim(),
            tags: finalTags,
            keywords,
            images,
            widgets: syncedWidgets,
            musicUrl: musicUrl.trim() || null,
            videoUrl: ytUrls[0] || null,
            authorName: user?.username || 'cyber_junkie',
            authorId: user?.id || 'user-op-01',
            roomConfig: {
              themeColor: '#FFB000',
              bgImageUrl: mainImage,
              widgets: syncedWidgets,
              youtubeLayout,
              galleryLayout,
              posterYoutubeUrl: posterYoutubeUrl || undefined,
            },
          }).unwrap();
        }
      }

      resetAndClose();
    } catch {
      setIsSubmitting(false);
    }
  };

  const systemTag = isEditMode
    ? t('createVibe.editTag')
    : isAdminFeed
      ? t('createVibe.mainFeedTag')
      : t('createVibe.createTag');

  const submitLabel = isEditMode
    ? t('createVibe.save')
    : isAdminFeed
      ? t('createVibe.publish')
      : t('createVibe.transmit');

  return (
    <BaseModal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(setCreateModalOpen(false))}
      systemTag={systemTag}
      headerIcon="terminal"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {isAdminFeed && !isEditMode && (
            <div className="text-[10px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/60 rounded px-3 py-2">
              {t('createVibe.adminBanner')}
            </div>
          )}
          {isEditMode && (
            <div className="text-[10px] font-mono text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded px-3 py-2">
              {t('createVibe.editBanner')}
            </div>
          )}

          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">{t('createVibe.title')}</label>
            <input
              type="text"
              required
              placeholder={t('createVibe.titlePlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none text-xs"
            />
          </div>

          <HashtagAutocomplete selectedTags={selectedTags} onChange={setSelectedTags} />

          <div>
            <label className="block text-zinc-400 mb-1 font-bold uppercase">{t('createVibe.content')}</label>
            <textarea
              required
              rows={3}
              placeholder={t('createVibe.contentPlaceholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none resize-none font-sans text-xs"
            />
          </div>

          <hr className="border-zinc-800/80 my-2" />

          <ImageManager
            images={images}
            onChange={setImages}
            galleryLayout={galleryLayout}
            onGalleryLayoutChange={setGalleryLayout}
            posterYoutubeUrl={posterYoutubeUrl}
            onClearYoutubePoster={() => setPosterYoutubeUrl(null)}
          />

          <hr className="border-zinc-800/80 my-2" />

          <WidgetToolController
            widgets={widgets}
            onChange={setWidgets}
            youtubeLayout={youtubeLayout}
            onYoutubeLayoutChange={setYoutubeLayout}
            posterYoutubeUrl={posterYoutubeUrl}
            onPosterYoutubeChange={setPosterYoutubeUrl}
          />

          <hr className="border-zinc-800/80 my-2" />

          <AudioStreamController musicUrl={musicUrl} onChange={setMusicUrl} />
        </div>

        <div className="flex justify-end space-x-2 px-4 py-3 border-t border-zinc-800 bg-zinc-950 shrink-0">
          <button
            type="button"
            onClick={() => dispatch(setCreateModalOpen(false))}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded font-bold uppercase transition-colors"
          >
            {t('createVibe.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2 rounded font-bold uppercase transition-all disabled:opacity-50 ${
              isEditMode
                ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_12px_rgba(255,176,0,0.4)]'
                : isAdminFeed
                  ? 'bg-purple-400 text-black hover:bg-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
            }`}
          >
            {isSubmitting ? t('createVibe.saving') : submitLabel}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
