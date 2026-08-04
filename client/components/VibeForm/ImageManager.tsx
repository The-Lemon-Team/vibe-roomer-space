import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddImageModal } from './AddImageModal';
import { useUploadMediaMutation } from '../../store/api/mediaApi';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';
import type { GalleryLayout } from '../../store/useAtmosphericStore';

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  galleryLayout?: GalleryLayout;
  onGalleryLayoutChange?: (layout: GalleryLayout) => void;
  /** When set, main poster slot is a YouTube video — image ★ MAIN is cleared */
  posterYoutubeUrl?: string | null;
  /** Called when user stars an image while YouTube holds the poster slot */
  onClearYoutubePoster?: () => void;
}

type PendingCard = {
  id: string;
  previewUrl: string;
};

const GALLERY_LAYOUTS: GalleryLayout[] = ['gallery', 'main_focus', 'main_only'];

/**
 * Ant Design Upload–style picture-card gallery.
 * Index 0 is the main cover (vibe primary image + roomConfig.bgImageUrl / theme).
 */
export const ImageManager: React.FC<ImageManagerProps> = ({
  images,
  onChange,
  galleryLayout = 'gallery',
  onGalleryLayoutChange,
  posterYoutubeUrl = null,
  onClearYoutubePoster,
}) => {
  const youtubeHoldsPoster = Boolean(posterYoutubeUrl?.trim());
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingCard[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadMedia] = useUploadMediaMutation();

  const appendUrls = (urls: string[]) => {
    const next = [...images];
    for (const raw of urls) {
      const trimmed = raw.trim();
      if (trimmed && !next.includes(trimmed)) next.push(trimmed);
    }
    if (next.length !== images.length) onChange(next);
  };

  const appendUrl = (url: string) => appendUrls([url]);

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleSetMainImage = (index: number) => {
    if (youtubeHoldsPoster) {
      onClearYoutubePoster?.();
      if (index === 0) return;
    } else if (index === 0) {
      return;
    }
    const target = images[index];
    onChange([target, ...images.filter((_, i) => i !== index)]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    const copy = [...images];
    [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
    onChange(copy);
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;

    setUploadError(null);
    const uploadedUrls: string[] = [];

    for (const file of list) {
      const id = `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const previewUrl = URL.createObjectURL(file);
      setPending((prev) => [...prev, { id, previewUrl }]);

      try {
        const result = await uploadMedia(file).unwrap();
        uploadedUrls.push(result.url);
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'data' in err
            ? String((err as { data?: { message?: string } }).data?.message || t('images.uploadFailed'))
            : err instanceof Error
              ? err.message
              : t('images.uploadFailed');
        setUploadError(message);
      } finally {
        setPending((prev) => {
          const next = prev.filter((p) => p.id !== id);
          URL.revokeObjectURL(previewUrl);
          return next;
        });
      }
    }

    if (uploadedUrls.length > 0) appendUrls(uploadedUrls);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      void uploadFiles(e.target.files);
    }
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      void uploadFiles(e.dataTransfer.files);
    }
  };

  const onCardDragStart = (index: number) => (e: React.DragEvent) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const onCardDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIndex ?? Number(e.dataTransfer.getData('text/plain'));
    setDragIndex(null);
    if (Number.isNaN(from) || from === targetIndex) return;
    const copy = [...images];
    const [item] = copy.splice(from, 1);
    copy.splice(targetIndex, 0, item);
    onChange(copy);
  };

  const layoutLabelKey: Record<GalleryLayout, string> = {
    gallery: 'images.layoutGallery',
    main_focus: 'images.layoutMainFocus',
    main_only: 'images.layoutMainOnly',
  };

  return (
    <div className="space-y-2 font-mono">
      <div className="flex justify-between items-center gap-2">
        <label className="block text-zinc-400 font-bold uppercase text-xs">
          {t('images.controller')} ({images.length})
        </label>
        <span
          className={`text-[10px] shrink-0 ${
            youtubeHoldsPoster ? 'text-amber-600' : 'text-zinc-500'
          }`}
        >
          {youtubeHoldsPoster ? t('images.firstMainYoutube') : t('images.firstMain')}
        </span>
      </div>

      {onGalleryLayoutChange && (
        <div className="p-2.5 bg-zinc-950/80 border border-zinc-800 rounded space-y-1.5">
          <div className="text-[10px] font-bold text-zinc-500 uppercase">
            {t('images.layoutLabel')}
          </div>
          <div className="flex flex-wrap gap-1">
            {GALLERY_LAYOUTS.map((layout) => (
              <button
                key={layout}
                type="button"
                onClick={() => onGalleryLayoutChange(layout)}
                className={`flex-1 min-w-[5.5rem] text-[10px] px-2 py-1.5 rounded font-bold uppercase border transition-colors ${
                  galleryLayout === layout
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {t(layoutLabelKey[layout])}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-zinc-600 leading-snug">{t('images.layoutHint')}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFileInputChange}
      />

      <AddImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => appendUrl(url)}
      />

      <div
        className={`flex flex-wrap gap-2 p-1 rounded transition-colors ${
          dragOver ? 'bg-cyan-950/30 ring-1 ring-cyan-500/40' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          if (e.dataTransfer.types.includes('Files')) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        {images.map((url, idx) => {
          const isMain = !youtubeHoldsPoster && idx === 0;

          return (
            <div
              key={`${url}-${idx}`}
              draggable
              onDragStart={onCardDragStart(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onCardDrop(idx)}
              onDragEnd={() => setDragIndex(null)}
              className={`group relative w-[104px] h-[104px] rounded border overflow-hidden bg-zinc-950 shrink-0 cursor-grab active:cursor-grabbing transition-all ${
                isMain
                  ? 'border-amber-500/80 shadow-[0_0_10px_rgba(255,176,0,0.15)]'
                  : 'border-zinc-700 hover:border-zinc-500'
              } ${dragIndex === idx ? 'opacity-50' : ''}`}
            >
              <img
                src={resolveMediaUrl(url)}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0.2';
                }}
              />

              {isMain && (
                <span className="absolute top-1 left-1 z-[1] bg-amber-500 text-black font-bold text-[8px] px-1 py-0.5 rounded shadow">
                  {t('images.main')}
                </span>
              )}

              {/* Hover actions — Ant Design Upload picture-card style */}
              <div className="absolute inset-0 z-[2] flex items-center justify-center gap-1 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isMain && (
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(idx)}
                    className="p-1 rounded text-amber-300 hover:text-amber-200 hover:bg-white/10"
                    title={t("images.setMain")}
                    aria-label={t("images.setMain")}
                  >
                    <span className="material-symbols-outlined text-[18px]">star</span>
                  </button>
                )}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'left')}
                  className="p-1 rounded text-zinc-200 hover:bg-white/10 disabled:opacity-25"
                  title={t("images.moveLeft")}
                  aria-label={t("images.moveLeft")}
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => handleMove(idx, 'right')}
                  className="p-1 rounded text-zinc-200 hover:bg-white/10 disabled:opacity-25"
                  title={t("images.moveRight")}
                  aria-label={t("images.moveRight")}
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1 rounded text-red-300 hover:text-red-200 hover:bg-white/10"
                  title={t("images.remove")}
                  aria-label={t("images.remove")}
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          );
        })}

        {pending.map((card) => (
          <div
            key={card.id}
            className="relative w-[104px] h-[104px] rounded border border-dashed border-cyan-600/50 overflow-hidden bg-zinc-950 shrink-0"
          >
            <img
              src={card.previewUrl}
              alt={t("images.uploading")}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50">
              <span className="material-symbols-outlined text-cyan-400 text-xl animate-spin">
                progress_activity
              </span>
              <span className="text-[8px] text-cyan-400 uppercase font-bold">{t('images.uploading')}</span>
            </div>
          </div>
        ))}

        {/* Ant Design–style + placeholder */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-[104px] h-[104px] rounded border border-dashed border-zinc-600 hover:border-cyan-500 bg-zinc-900/40 hover:bg-cyan-950/20 text-zinc-500 hover:text-cyan-400 shrink-0 flex flex-col items-center justify-center gap-1 transition-colors"
          title={t("images.add")}
          aria-label={t("images.add")}
        >
          <span className="material-symbols-outlined text-2xl leading-none">add</span>
          <span className="text-[9px] uppercase font-bold tracking-wide">{t('images.upload')}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-[10px] px-2 py-1 rounded border border-zinc-800 text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors uppercase font-bold"
        >
          {t('images.quickUpload')}
        </button>
      </div>

      {uploadError && (
        <div className="text-red-400 text-[10px] bg-red-950/20 border border-red-900 p-2 rounded">
          {uploadError}
        </div>
      )}

      <p className="text-[10px] text-zinc-600">
        {youtubeHoldsPoster ? t('images.helpYoutubePoster') : t('images.help')}
      </p>
    </div>
  );
};
