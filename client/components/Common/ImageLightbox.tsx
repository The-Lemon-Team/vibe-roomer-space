import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

export interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  altPrefix?: string;
}

/** Fullscreen gallery viewer — opens at `initialIndex` and supports prev/next + Escape. */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  altPrefix,
}) => {
  const { t } = useTranslation();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const validImages = images.filter(Boolean);
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (!isOpen) return;
    const clamped = Math.max(0, Math.min(initialIndex, validImages.length - 1));
    setIndex(Number.isFinite(clamped) ? clamped : 0);
  }, [isOpen, initialIndex, validImages.length]);

  useEffect(() => {
    if (!isOpen || validImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => (i - 1 + validImages.length) % validImages.length);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => (i + 1) % validImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, validImages.length]);

  if (!isOpen || validImages.length === 0) return null;

  const current = validImages[Math.max(0, Math.min(index, validImages.length - 1))];
  const hasMultiple = validImages.length > 1;
  const label = altPrefix
    ? `${altPrefix} — ${index + 1}`
    : t('common.galleryImage', { n: index + 1 });

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + validImages.length) % validImages.length);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % validImages.length);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('common.galleryLightbox')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCloseRef.current();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-fadeIn font-mono"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('common.closeModal')}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 text-zinc-400 hover:text-cyan-400 transition-colors p-2 rounded hover:bg-zinc-900/80 cursor-pointer"
      >
        <span className="material-symbols-outlined text-2xl leading-none">close</span>
      </button>

      {hasMultiple && (
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 px-2.5 py-1 rounded border border-zinc-700 bg-black/70 text-[11px] text-zinc-400 tracking-wider">
          {index + 1} / {validImages.length}
        </div>
      )}

      {hasMultiple && (
        <button
          type="button"
          onClick={goPrev}
          aria-label={t('common.previousImage')}
          className="absolute left-2 sm:left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-200 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl leading-none">chevron_left</span>
        </button>
      )}

      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] max-w-[min(96vw,1200px)] flex items-center justify-center"
      >
        <img
          src={resolveMediaUrl(current)}
          alt={label}
          className="max-h-[90vh] max-w-full object-contain rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        />
      </div>

      {hasMultiple && (
        <button
          type="button"
          onClick={goNext}
          aria-label={t('common.nextImage')}
          className="absolute right-2 sm:right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-black/70 text-zinc-200 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl leading-none">chevron_right</span>
        </button>
      )}
    </div>,
    document.body,
  );
};
