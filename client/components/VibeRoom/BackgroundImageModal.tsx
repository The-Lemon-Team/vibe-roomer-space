import React, { useState, useEffect } from 'react';
import { BaseModal } from '../Common/BaseModal';
import { useGetTopHashtagsQuery } from '../../store/api/vibesApi';
import { fetchApi } from '../../services/api';

interface BackgroundImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl?: string;
}

const PRESET_THEMES = [
  {
    label: 'Cyber Code',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Terminal Screen',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Neon Highway',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Rainy Alley',
    category: 'Aesthetic',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Balcony View',
    category: 'Aesthetic',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Cozy Library',
    category: 'Chill',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Retro Arcade',
    category: 'Gaming',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Deep Space',
    category: 'Futuristic',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Cozy Coffee Shop',
    category: 'Chill',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    label: 'Neon Skyline',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
  },
];

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

export const BackgroundImageModal: React.FC<BackgroundImageModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentUrl = '',
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'unsplash'>('themes');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const { data: topHashtagsData = [] } = useGetTopHashtagsQuery(10);
  const topHashtags = topHashtagsData.map((h) => (h.name.startsWith('#') ? h.name : `#${h.name}`));
  
  // Unsplash states
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ['ALL', ...Array.from(new Set(PRESET_THEMES.map((t) => t.category)))];

  const filteredThemes = selectedCategory === 'ALL'
    ? PRESET_THEMES
    : PRESET_THEMES.filter((t) => t.category === selectedCategory);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchApi<{ results: UnsplashPhoto[] }>(
        `/media/unsplash/search?query=${encodeURIComponent(query)}`
      );
      if (data && data.results) {
        setPhotos(data.results);
      } else {
        setPhotos([]);
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to Unsplash search. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    performSearch(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
    setSearchQuery(cleanTag);
    performSearch(cleanTag);
  };

  // Perform search on switch to Unsplash tab if query exists
  useEffect(() => {
    if (activeTab === 'unsplash' && searchQuery && photos.length === 0) {
      performSearch(searchQuery);
    }
  }, [activeTab]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="[ SELECT BACKGROUND THEME ]"
      headerIcon="image"
      maxWidth="max-w-2xl"
      borderColor="border-cyan-500/50"
      shadowClass="shadow-[0_0_40px_rgba(6,182,212,0.25)]"
    >
      <div className="p-6 space-y-5 font-mono text-xs">
        {/* Current Preview if exists */}
        {currentUrl && (
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded flex items-center gap-3">
            <img
              src={currentUrl}
              alt="Current Theme"
              className="w-16 h-10 object-cover rounded border border-zinc-700"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-zinc-500 uppercase">CURRENTLY CONFIGURED BACKGROUND:</div>
              <div className="text-cyan-400 font-bold truncate text-[11px]">{currentUrl}</div>
            </div>
            <button
              type="button"
              onClick={() => onSelect('')}
              className="px-2 py-1 bg-zinc-800 hover:bg-red-950 hover:text-red-300 border border-zinc-700 text-zinc-400 rounded transition-colors text-[10px] font-bold uppercase"
            >
              Clear
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab('themes')}
            className={`px-4 py-2 border-b-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'themes'
                ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">palette</span>
            <span>Default Themes</span>
          </button>
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
            <span>Unsplash Search</span>
          </button>
        </div>

        {/* Tab Contents: Default Themes */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded border text-[10px] uppercase font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Preset Themes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredThemes.map((theme) => (
                <button
                  key={theme.url}
                  type="button"
                  onClick={() => {
                    onSelect(theme.url);
                    onClose();
                  }}
                  className={`group relative aspect-video rounded border overflow-hidden text-left bg-zinc-950 transition-all ${
                    currentUrl === theme.url
                      ? 'border-cyan-500 ring-1 ring-cyan-500/30'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={theme.url}
                    alt={theme.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{theme.category}</span>
                    <span className="font-bold text-zinc-100 truncate text-[11px]">{theme.label}</span>
                  </div>
                  {currentUrl === theme.url && (
                    <div className="absolute top-1 right-1 bg-cyan-500 text-black rounded-full p-0.5 shadow flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs font-bold">check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Contents: Unsplash Search */}
        {activeTab === 'unsplash' && (
          <div className="space-y-4">
            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search aesthetic (e.g. lofi, cyberpunk, ambient, dark stream...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-cyan-500 rounded p-2 text-zinc-100 placeholder-zinc-600 outline-none"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded uppercase shrink-0 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)] disabled:opacity-40"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {/* Top Tags Quick Search */}
            {topHashtags && topHashtags.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">sell</span>
                  <span>Search by Top Tag:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topHashtags.map((tag) => {
                    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
                    const isActive = searchQuery.toLowerCase() === cleanTag.toLowerCase();
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className={`px-2.5 py-1 rounded border text-[10px] uppercase font-bold transition-all ${
                          isActive
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.2)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-300 p-2.5 rounded text-[11px]">
                {error}
              </div>
            )}

            {/* Photos Grid */}
            {loading ? (
              <div className="h-44 flex items-center justify-center text-zinc-500 font-bold uppercase">
                <span className="animate-pulse">Loading Unsplash results...</span>
              </div>
            ) : photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {photos.map((photo) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => {
                      onSelect(photo.urls.regular);
                      onClose();
                    }}
                    className={`group relative aspect-video rounded border overflow-hidden text-left bg-zinc-950 transition-all ${
                      currentUrl === photo.urls.regular
                        ? 'border-cyan-500 ring-1 ring-cyan-500/30'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <img
                      src={photo.urls.thumb}
                      alt={photo.alt_description || 'Unsplash image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] text-zinc-400 truncate">By {photo.user.name}</span>
                    </div>
                    {currentUrl === photo.urls.regular && (
                      <div className="absolute top-1 right-1 bg-cyan-500 text-black rounded-full p-0.5 shadow flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs font-bold">check</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() && !loading ? (
              <div className="h-44 flex items-center justify-center text-zinc-600 font-bold uppercase">
                No matching results. Try another keyword.
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-zinc-600 space-y-1.5">
                <span className="material-symbols-outlined text-3xl">cloud_queue</span>
                <span className="font-bold uppercase text-[10px]">Type a keyword above to explore Unsplash</span>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
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
