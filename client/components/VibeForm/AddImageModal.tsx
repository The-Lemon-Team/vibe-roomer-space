import React, { useState, useEffect } from 'react';
import { BaseModal } from '../Common/BaseModal';
import type { CreatedRoom } from '../../store/useAtmosphericStore';
import { useGetVibesQuery } from '../../store/api/vibesApi';
import { useGetRoomsQuery } from '../../store/api/roomsApi';
import { useGetTopHashtagsQuery } from '../../store/api/vibesApi';
import { fetchApi } from '../../services/api';

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
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

export const AddImageModal: React.FC<AddImageModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  // Unsplash is the default tab (priority)
  const [activeTab, setActiveTab] = useState<'unsplash' | 'url' | 'site'>('unsplash');

  // URL Tab
  const [imageUrl, setImageUrl] = useState('');

  // File upload (secondary/fallback)
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Unsplash Tab
  const [unsplashQuery, setUnsplashQuery] = useState('');
  const [unsplashPhotos, setUnsplashPhotos] = useState<UnsplashPhoto[]>([]);
  const [isUnsplashLoading, setIsUnsplashLoading] = useState(false);
  const [unsplashError, setUnsplashError] = useState<string | null>(null);

  // Site Data Tab
  const [siteQuery, setSiteQuery] = useState('');
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [isSiteLoading, setIsSiteLoading] = useState(false);
  const [siteError, setSiteError] = useState<string | null>(null);

  const { data: vibes = [] } = useGetVibesQuery(undefined);
  const { data: createdRooms = [] } = useGetRoomsQuery(undefined);
  const { data: topHashtagsData = [] } = useGetTopHashtagsQuery(10);
  const topHashtags = topHashtagsData.map((h) => (h.name.startsWith('#') ? h.name : `#${h.name}`));

  // Load site images (from store + api)
  const loadSiteData = async () => {
    setIsSiteLoading(true);
    setSiteError(null);
    try {
      const tempImages: SiteImage[] = [];

      // 1. Extract from store vibes
      vibes.forEach((v) => {
        if (v.images) {
          v.images.forEach((img) => {
            if (img && !tempImages.some((t) => t.url === img)) {
              tempImages.push({
                url: img,
                source: `Vibe: ${v.title}`,
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

      // 2. Extract from store rooms
      createdRooms.forEach((r: CreatedRoom) => {
        if (r.poster && !tempImages.some((t) => t.url === r.poster)) {
          tempImages.push({
            url: r.poster,
            source: `Room Poster: ${r.title}`,
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
              source: `Room BG: ${r.title}`,
              title: r.title,
              type: 'room',
            });
          }
        }
      });

      // 3. Fetch from /media endpoint (uploaded files — returns full Supabase CDN URLs)
      try {
        const uploadedList = await fetchApi<{ filename: string; url: string; size: number; updatedAt: string }[]>(
          '/media'
        );
        if (Array.isArray(uploadedList)) {
          uploadedList.forEach((file) => {
            if (!tempImages.some((t) => t.url === file.url)) {
              tempImages.push({
                url: file.url,          // already a full CDN URL
                source: `Upload: ${file.filename}`,
                title: file.filename,
                type: 'upload',
                filename: file.filename,
                updatedAt: file.updatedAt,
                size: file.size,
              });
            }
          });
        }
      } catch (err) {
        console.warn('Failed to load uploads list:', err);
      }

      setSiteImages(tempImages);
    } catch (err: any) {
      setSiteError('Failed to load site image library.');
    } finally {
      setIsSiteLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSiteData();
    }
  }, [isOpen, vibes, createdRooms]);

  // Reset upload section when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowUpload(false);
      setUploadFile(null);
      setUploadError(null);
      setImageUrl('');
    }
  }, [isOpen]);

  // Handle URL Add
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    onSelect(imageUrl.trim());
    setImageUrl('');
    onClose();
  };

  // Handle File Upload (fallback)
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', uploadFile);

    try {
      // Server now returns a full Supabase CDN URL in `url`
      const response = await fetchApi<{ url: string }>('/media/upload', {
        method: 'POST',
        body: formData,
        headers: {},
      });

      onSelect(response.url);
      setUploadFile(null);
      setShowUpload(false);
      onClose();
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Unsplash Search
  const handleUnsplashSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!unsplashQuery.trim()) return;

    setIsUnsplashLoading(true);
    setUnsplashError(null);

    try {
      const data = await fetchApi<{ results: UnsplashPhoto[] }>(
        `/media/unsplash/search?query=${encodeURIComponent(unsplashQuery)}`
      );
      if (data && data.results) {
        setUnsplashPhotos(data.results);
      } else {
        setUnsplashPhotos([]);
      }
    } catch (err: any) {
      setUnsplashError('Failed to retrieve Unsplash results.');
    } finally {
      setIsUnsplashLoading(false);
    }
  };

  const handleUnsplashTagClick = (tag: string) => {
    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
    setUnsplashQuery(cleanTag);
    setIsUnsplashLoading(true);
    setUnsplashError(null);
    fetchApi<{ results: UnsplashPhoto[] }>(
      `/media/unsplash/search?query=${encodeURIComponent(cleanTag)}`
    )
      .then((data) => {
        if (data && data.results) {
          setUnsplashPhotos(data.results);
        } else {
          setUnsplashPhotos([]);
        }
      })
      .catch(() => setUnsplashError('Failed to retrieve Unsplash results.'))
      .finally(() => setIsUnsplashLoading(false));
  };

  // Filter site images based on search
  const filteredSiteImages = siteImages.filter((img) => {
    if (!siteQuery.trim()) return true;
    const q = siteQuery.toLowerCase();
    return (
      img.title.toLowerCase().includes(q) ||
      img.source.toLowerCase().includes(q) ||
      img.url.toLowerCase().includes(q)
    );
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="[ ADD IMAGE SOURCE ]"
      headerIcon="image"
      maxWidth="max-w-2xl"
      borderColor="border-cyan-500/50"
      shadowClass="shadow-[0_0_40px_rgba(6,182,212,0.25)]"
    >
      <div className="p-6 space-y-5 font-mono text-xs">
        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800">
          {/* Tab 1: Unsplash (default/priority) */}
          <button
            type="button"
            onClick={() => setActiveTab('unsplash')}
            className={`px-4 py-2 border-b-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'unsplash'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">travel_explore</span>
            <span>Unsplash</span>
            <span className="ml-1 text-[8px] px-1 py-0.5 bg-cyan-900/40 text-cyan-500 border border-cyan-800/50 rounded uppercase">
              Recommended
            </span>
          </button>

          {/* Tab 2: URL paste */}
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 border-b-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">link</span>
            <span>URL</span>
          </button>

          {/* Tab 3: Site library */}
          <button
            type="button"
            onClick={() => { setActiveTab('site'); }}
            className={`px-4 py-2 border-b-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'site'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">database</span>
            <span>Library</span>
          </button>
        </div>

        {/* ── Tab 1: Unsplash Search (default) ── */}
        {activeTab === 'unsplash' && (
          <div className="space-y-4">
            <form onSubmit={handleUnsplashSearch} className="flex gap-2">
              <input
                type="text"
                id="unsplash-search-input"
                placeholder="Search aesthetic wallpaper..."
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
                {isUnsplashLoading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {topHashtags && topHashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center">
                <span className="text-[10px] text-zinc-500 uppercase mr-1">Trending:</span>
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
                RETRIEVING FROM UNSPLASH...
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
                      <span className="text-[8px] text-zinc-300 truncate">By {photo.user.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-zinc-600 space-y-1.5">
                <span className="material-symbols-outlined text-2xl">travel_explore</span>
                <span className="font-bold uppercase text-[10px]">Search Unsplash for free high-quality images</span>
                <span className="text-[10px] text-zinc-700">lofi · cyberpunk · nature · aesthetic · night</span>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 2: URL paste + file upload (fallback) ── */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            {/* URL paste — primary */}
            <form onSubmit={handleUrlSubmit} className="space-y-2">
              <label className="block text-zinc-400 font-bold uppercase text-[10px]">
                Paste Direct Image URL
              </label>
              <div className="flex gap-2">
                <input
                  id="url-paste-input"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
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
                  Add URL
                </button>
              </div>
            </form>

            {/* Divider + upload toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowUpload((v) => !v)}
                className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors group"
              >
                <span
                  className={`material-symbols-outlined text-sm transition-transform ${showUpload ? 'rotate-90' : ''}`}
                >
                  chevron_right
                </span>
                <span className="uppercase font-bold">Upload local file</span>
                <span className="text-zinc-700 normal-case font-normal">— fallback option</span>
              </button>

              {showUpload && (
                <div className="mt-3 space-y-2 pl-4 border-l border-zinc-800">
                  {/* Hint */}
                  <p className="text-[10px] text-zinc-600 italic">
                    ⚠ Prefer URLs or Unsplash when possible — local uploads are stored on the server
                    and may not persist across deployments.
                  </p>

                  <form onSubmit={handleUploadSubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id="file-upload-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setUploadFile(e.target.files?.[0] || null);
                          setUploadError(null);
                        }}
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded p-1.5 text-zinc-400 outline-none file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-zinc-800 file:text-zinc-400 file:cursor-pointer hover:file:bg-zinc-700"
                      />
                      <button
                        type="submit"
                        disabled={isUploading || !uploadFile}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-bold rounded uppercase shrink-0 transition-all disabled:opacity-40 flex items-center justify-center gap-1 text-[10px] border border-zinc-600"
                      >
                        {isUploading ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                    {uploadError && (
                      <div className="text-red-400 text-[10px] bg-red-950/20 border border-red-900 p-2 rounded">
                        {uploadError}
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab 3: Site Library ── */}
        {activeTab === 'site' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                id="site-library-search-input"
                type="text"
                placeholder="Search images from vibes, rooms, uploads..."
                value={siteQuery}
                onChange={(e) => setSiteQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
                autoFocus
              />
            </div>

            {siteError && (
              <div className="text-red-400 text-[10px] bg-red-950/20 border border-red-900 p-2 rounded">
                {siteError}
              </div>
            )}

            {isSiteLoading ? (
              <div className="h-40 flex items-center justify-center text-zinc-500 animate-pulse">
                SCANNING SITE LIBRARY...
              </div>
            ) : filteredSiteImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredSiteImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onSelect(img.url);
                      onClose();
                    }}
                    className="group relative aspect-video rounded border border-zinc-800 overflow-hidden bg-zinc-950 hover:border-cyan-500 transition-colors text-left"
                  >
                    <img
                      src={img.url}
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
                      <span className="text-[9px] text-zinc-100 font-bold truncate">
                        {img.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-zinc-600 space-y-1.5">
                <span className="material-symbols-outlined text-2xl">database</span>
                <span className="font-bold uppercase text-[10px]">
                  {siteImages.length === 0 ? 'No saved images yet' : 'No images match your search'}
                </span>
                <span className="text-[10px] text-zinc-700">Images from vibes, rooms &amp; uploads appear here</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors uppercase font-bold text-[11px]"
          >
            [ Close ]
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
