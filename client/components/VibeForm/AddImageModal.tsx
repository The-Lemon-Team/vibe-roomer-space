import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseModal } from '../Common/BaseModal';
import type { CreatedRoom } from '../../store/useAtmosphericStore';
import { useGetVibesQuery, useGetTopHashtagsQuery } from '../../store/api/vibesApi';
import { useGetRoomsQuery } from '../../store/api/roomsApi';
import {
  useListMediaQuery,
  useUploadMediaMutation,
  useLazySearchUnsplashQuery,
  type UnsplashPhoto,
} from '../../store/api/mediaApi';
import { resolveMediaUrl } from '../../utils/resolveMediaUrl';

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface SiteImage {
  url: string;
  source: string;
  title: string;
  type: 'vibe' | 'room' | 'upload';
  filename?: string;
  updatedAt?: string;
  size?: number;
}

type SourceTab = 'upload' | 'url' | 'unsplash' | 'site';

const EMPTY_VIBES: never[] = [];
const EMPTY_ROOMS: never[] = [];
const EMPTY_HASHTAGS: never[] = [];
const EMPTY_MEDIA: never[] = [];

export const AddImageModal: React.FC<AddImageModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { t } = useTranslation();
  // Manual upload is the default — user crops externally, then adds here
  const [activeTab, setActiveTab] = useState<SourceTab>('upload');

  const [imageUrl, setImageUrl] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [unsplashQuery, setUnsplashQuery] = useState('');
  const [unsplashPhotos, setUnsplashPhotos] = useState<UnsplashPhoto[]>([]);
  const [unsplashError, setUnsplashError] = useState<string | null>(null);

  const [siteQuery, setSiteQuery] = useState('');
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);

  const { data: vibes = EMPTY_VIBES } = useGetVibesQuery(undefined, { skip: !isOpen });
  const { data: createdRooms = EMPTY_ROOMS } = useGetRoomsQuery(undefined, { skip: !isOpen });
  const { data: topHashtagsData = EMPTY_HASHTAGS } = useGetTopHashtagsQuery(10, { skip: !isOpen });
  const { data: mediaLibrary = EMPTY_MEDIA, isFetching: isMediaFetching } = useListMediaQuery(
    undefined,
    { skip: !isOpen },
  );
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [searchUnsplash, { isFetching: isUnsplashLoading }] = useLazySearchUnsplashQuery();

  const topHashtags = topHashtagsData.map((h) => (h.name.startsWith('#') ? h.name : `#${h.name}`));

  useEffect(() => {
    if (!isOpen) return;

    const tempImages: SiteImage[] = [];

    vibes.forEach((v) => {
      if (v.images) {
        v.images.forEach((img) => {
          if (img && !tempImages.some((t) => t.url === img)) {
            tempImages.push({
              url: img,
              source: `${t('addImage.sourceVibe')} ${v.title}`,
              title: v.title,
              type: 'vibe',
            });
          }
        });
      }
      if (v.roomConfig?.bgImageUrl) {
        const img = v.roomConfig.bgImageUrl;
        if (img && !tempImages.some((t) => t.url === img)) {
          tempImages.push({
            url: img,
            source: `Vibe BG: ${v.title}`,
            title: v.title,
            type: 'vibe',
          });
        }
      }
    });

    createdRooms.forEach((r: CreatedRoom) => {
      if (r.poster && !tempImages.some((t) => t.url === r.poster)) {
        tempImages.push({
          url: r.poster,
          source: `${t('addImage.sourceRoomPoster')} ${r.title}`,
          title: r.title,
          type: 'room',
        });
      }
      if (r.images) {
        r.images.forEach((img: string) => {
          if (img && !tempImages.some((t) => t.url === img)) {
            tempImages.push({
              url: img,
              source: `Room Image: ${r.title}`,
              title: r.title,
              type: 'room',
            });
          }
        });
      }
      if (r.roomConfig?.bgImageUrl) {
        const img = r.roomConfig.bgImageUrl;
        if (img && !tempImages.some((t) => t.url === img)) {
          tempImages.push({
            url: img,
            source: `${t('addImage.sourceRoomBg')} ${r.title}`,
            title: r.title,
            type: 'room',
          });
        }
      }
    });

    mediaLibrary.forEach((file) => {
      if (!tempImages.some((t) => t.url === file.url)) {
        tempImages.push({
          url: file.url,
          source: `${t('addImage.sourceUpload')} ${file.filename}`,
          title: file.originalName || file.filename,
          type: 'upload',
          filename: file.filename,
          updatedAt: file.updatedAt,
          size: file.size,
        });
      }
    });

    setSiteImages(tempImages);
  }, [isOpen, vibes, createdRooms, mediaLibrary]);

  useEffect(() => {
    if (!isOpen) {
      setUploadFile(null);
      setUploadError(null);
      setImageUrl('');
      if (uploadPreview) {
        URL.revokeObjectURL(uploadPreview);
        setUploadPreview(null);
      }
    }
  }, [isOpen]);

  const selectFile = (file: File | null) => {
    if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    setUploadFile(file);
    setUploadError(null);
    setUploadPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!imageUrl.trim()) return;
    onSelect(imageUrl.trim());
    setImageUrl('');
    onClose();
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploadFile) return;

    setUploadError(null);
    try {
      const response = await uploadMedia(uploadFile).unwrap();
      onSelect(response.url);
      selectFile(null);
      onClose();
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'data' in err
          ? String((err as { data?: { message?: string } }).data?.message || t('images.uploadFailed'))
          : err instanceof Error
            ? err.message
            : t('images.uploadFailed');
      setUploadError(message);
    }
  };

  const runUnsplashSearch = async (query: string) => {
    if (!query.trim()) return;
    setUnsplashError(null);
    try {
      const data = await searchUnsplash(query.trim()).unwrap();
      setUnsplashPhotos(data?.results ?? []);
    } catch {
      setUnsplashError(t('addImage.error'));
      setUnsplashPhotos([]);
    }
  };

  const handleUnsplashSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    await runUnsplashSearch(unsplashQuery);
  };

  const handleUnsplashTagClick = (tag: string) => {
    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
    setUnsplashQuery(cleanTag);
    void runUnsplashSearch(cleanTag);
  };

  const filteredSiteImages = siteImages.filter((img) => {
    if (!siteQuery.trim()) return true;
    const q = siteQuery.toLowerCase();
    return (
      img.title.toLowerCase().includes(q) ||
      img.source.toLowerCase().includes(q) ||
      img.url.toLowerCase().includes(q)
    );
  });

  const tabClass = (tab: SourceTab) =>
    `px-3 py-2 border-b-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
      activeTab === tab
        ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
        : 'border-transparent text-zinc-400 hover:text-zinc-200'
    }`;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('addImage.title')}
      headerIcon="image"
      maxWidth="max-w-2xl"
      borderColor="border-cyan-500/50"
      shadowClass="shadow-[0_0_40px_rgba(6,182,212,0.25)]"
    >
      <div className="p-6 space-y-5 font-mono text-xs">
        <div className="flex border-b border-zinc-800 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={tabClass('upload')}
            aria-label={t('widgetsUi.uploadTab')}
          >
            <span className="material-symbols-outlined text-sm" aria-hidden>
              upload
            </span>
            <span>{t('addImage.upload')}</span>
            <span className="ml-1 text-[8px] px-1 py-0.5 bg-cyan-900/40 text-cyan-500 border border-cyan-800/50 rounded uppercase">
              {t('addImage.primary')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={tabClass('url')}
            aria-label="URL tab"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden>
              link
            </span>
            <span>{t('addImage.url')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('unsplash')}
            className={tabClass('unsplash')}
            aria-label="Unsplash tab"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden>
              travel_explore
            </span>
            <span>{t('addImage.unsplash')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('site')}
            className={tabClass('site')}
            aria-label="Library tab"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden>
              database
            </span>
            <span>{t('addImage.library')}</span>
          </button>
        </div>

        {/* ── Upload (default) — cropped local files via Media API ── */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <p className="text-[10px] text-zinc-500">
              {t('addImage.uploadHelp')}
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <label
                className={`flex flex-col items-center justify-center gap-2 min-h-[140px] rounded border border-dashed cursor-pointer transition-colors ${
                  uploadPreview
                    ? 'border-cyan-600/50 bg-zinc-950'
                    : 'border-zinc-700 hover:border-cyan-500 bg-zinc-900/40 hover:bg-cyan-950/20'
                }`}
              >
                {uploadPreview ? (
                  <div className="relative w-full max-w-[280px] max-h-[200px] my-3 flex items-center justify-center overflow-hidden rounded border border-zinc-800 bg-zinc-950">
                    <img
                      src={uploadPreview}
                      alt={t('widgetsUi.uploadPreview')}
                      className="max-w-full max-h-[200px] w-auto h-auto object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-3xl text-zinc-500">add_photo_alternate</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400">
                      {t('addImage.chooseFile')}
                    </span>
                    <span className="text-[9px] text-zinc-600">{t('addImage.formats')}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => selectFile(e.target.files?.[0] || null)}
                />
              </label>

              {uploadFile && (
                <div className="flex items-center justify-between gap-2 text-[10px] text-zinc-400">
                  <span className="truncate">{uploadFile.name}</span>
                  <button
                    type="button"
                    onClick={() => selectFile(null)}
                    className="text-zinc-500 hover:text-red-400 shrink-0"
                  >
                    {t('addImage.clear')}
                  </button>
                </div>
              )}

              {uploadError && (
                <div className="text-red-400 text-[10px] bg-red-950/20 border border-red-900 p-2 rounded">
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading || !uploadFile}
                className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded uppercase transition-all disabled:opacity-40"
              >
                {isUploading ? t('addImage.uploading') : t('addImage.uploadAdd')}
              </button>
            </form>
          </div>
        )}

        {/* ── URL paste ── */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <label className="block text-zinc-400 font-bold uppercase text-[10px]">
              {t('addImage.urlLabel')}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder={t('addImage.urlPlaceholder')}
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={!imageUrl.trim()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded uppercase shrink-0 transition-all disabled:opacity-40"
              >
                {t('addImage.addUrl')}
              </button>
            </div>
          </form>
        )}

        {/* ── Unsplash ── */}
        {activeTab === 'unsplash' && (
          <div className="space-y-4">
            <form onSubmit={handleUnsplashSearch} className="flex gap-2">
              <input
                type="text"
                placeholder={t('addImage.searchPlaceholder')}
                value={unsplashQuery}
                onChange={(e) => setUnsplashQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={isUnsplashLoading || !unsplashQuery.trim()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded uppercase shrink-0 transition-all disabled:opacity-40"
              >
                {isUnsplashLoading ? t('background.searching') : t('background.search')}
              </button>
            </form>

            {topHashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[10px] text-zinc-500 uppercase mr-1">{t('addImage.trending')}</span>
                {topHashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleUnsplashTagClick(tag)}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {unsplashError && (
              <div className="text-red-400 text-[10px] bg-red-950/20 border border-red-900 p-2 rounded">
                {unsplashError}
              </div>
            )}

            {isUnsplashLoading ? (
              <div className="h-40 flex items-center justify-center text-zinc-500 animate-pulse">
                {t('addImage.retrieving')}
              </div>
            ) : unsplashPhotos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {unsplashPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      onSelect(photo.urls.regular);
                      onClose();
                    }}
                    className="group relative aspect-video rounded border border-zinc-800 overflow-hidden bg-zinc-950 hover:border-cyan-500 transition-colors"
                  >
                    <img
                      src={photo.urls.thumb}
                      alt={photo.alt_description || 'Unsplash Result'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1">
                      <span className="text-[8px] text-zinc-300 truncate">{t('addImage.by', { name: photo.user.name })}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-zinc-600 space-y-1.5">
                <span className="material-symbols-outlined text-2xl">travel_explore</span>
                <span className="font-bold uppercase text-[10px]">
                  {t('addImage.empty')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Site Library ── */}
        {activeTab === 'site' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('addImage.librarySearch')}
                value={siteQuery}
                onChange={(e) => setSiteQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
                autoFocus
              />
            </div>

            {isMediaFetching && siteImages.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-zinc-500 animate-pulse">
                {t('addImage.scanning')}
              </div>
            ) : filteredSiteImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredSiteImages.map((img, idx) => (
                  <button
                    key={`${img.url}-${idx}`}
                    type="button"
                    onClick={() => {
                      onSelect(img.url);
                      onClose();
                    }}
                    className="group relative aspect-video rounded border border-zinc-800 overflow-hidden bg-zinc-950 hover:border-cyan-500 transition-colors text-left"
                  >
                    <img
                      src={resolveMediaUrl(img.url)}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-1.5">
                      <span className="text-[8px] text-cyan-400 font-bold uppercase truncate">
                        {img.type}
                      </span>
                      <span className="text-[9px] text-zinc-100 font-bold truncate">{img.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-zinc-600 space-y-1.5">
                <span className="material-symbols-outlined text-2xl">database</span>
                <span className="font-bold uppercase text-[10px]">
                  t('addImage.libraryEmpty')
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors uppercase font-bold text-[11px]"
          >
            {t('addImage.close')}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
