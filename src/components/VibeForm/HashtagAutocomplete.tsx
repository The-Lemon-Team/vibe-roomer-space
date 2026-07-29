import React, { useState, useRef, useEffect } from 'react';
import { useAtmosphericStore } from '../../store/useAtmosphericStore';

interface HashtagAutocompleteProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const DEFAULT_SUGGESTIONS = [
  '#deepwork',
  '#lofi',
  '#nightdrive',
  '#synthwave',
  '#chill',
  '#outside',
  '#highenergy',
  '#coding',
  '#cyberpunk',
  '#rain',
  '#ambient',
  '#fitness',
  '#relax'
];

export const HashtagAutocomplete: React.FC<HashtagAutocompleteProps> = ({
  selectedTags,
  onChange,
}) => {
  const { vibes, pinnedTags } = useAtmosphericStore();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // 1st Tag Popup Modal state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupSearch, setPopupSearch] = useState('');
  const [customFirstTag, setCustomFirstTag] = useState('');
  const [focusedTag, setFocusedTag] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags used across vibes + pinned tags + defaults
  const allUsedTags = Array.from(
    new Set([
      ...DEFAULT_SUGGESTIONS,
      ...pinnedTags,
      ...vibes.flatMap((v) => v.tags || [])
    ])
  ).map((t) => (t.startsWith('#') ? t.toLowerCase() : `#${t.toLowerCase()}`));

  // Filter suggestions matching current input that aren't already selected
  const normalizedInput = inputValue.trim().toLowerCase().replace(/^#/, '');
  const filteredSuggestions = allUsedTags.filter((tag) => {
    const isAlreadySelected = selectedTags.some(
      (st) => st.toLowerCase() === tag.toLowerCase()
    );
    if (isAlreadySelected) return false;
    if (!normalizedInput) return true;
    return tag.toLowerCase().includes(normalizedInput);
  });

  const addTag = (tagToAdd: string) => {
    const cleanTag = tagToAdd.trim();
    if (!cleanTag) return;
    const formattedTag = cleanTag.startsWith('#')
      ? cleanTag.toLowerCase()
      : `#${cleanTag.toLowerCase()}`;

    if (!selectedTags.some((t) => t.toLowerCase() === formattedTag)) {
      onChange([...selectedTags, formattedTag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(selectedTags.filter((t) => t.toLowerCase() !== tagToRemove.toLowerCase()));
  };

  // Set specific tag as 1st Tag (Primary)
  const setAsFirstTag = (targetTag: string) => {
    const clean = targetTag.trim();
    if (!clean) return;
    const formattedTag = clean.startsWith('#')
      ? clean.toLowerCase()
      : `#${clean.toLowerCase()}`;

    const otherTags = selectedTags.filter(
      (t) => t.toLowerCase() !== formattedTag
    );
    onChange([formattedTag, ...otherTags]);
    setIsPopupOpen(false);
    setPopupSearch('');
    setCustomFirstTag('');
    setFocusedTag(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter tags inside 1st Tag Selection Popup
  const normalizedPopupSearch = popupSearch.trim().toLowerCase().replace(/^#/, '');
  const filteredPopupTags = allUsedTags.filter((tag) => {
    if (!normalizedPopupSearch) return true;
    return tag.toLowerCase().includes(normalizedPopupSearch);
  });

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      {/* Label Header with click handler for 1st Tag Popup */}
      <div className="flex justify-between items-center mb-1 select-none">
        <label 
          onClick={() => {
            setFocusedTag(null);
            setIsPopupOpen(true);
          }}
          className="block text-amber-400 font-bold uppercase text-xs flex items-center gap-1.5 cursor-pointer hover:text-amber-300 transition-colors group"
          title="Click label to open 1st Tag selector popup"
        >
          <span className="material-symbols-outlined text-sm text-amber-400 group-hover:scale-110 transition-transform">
            sell
          </span>
          <span className="underline underline-offset-2 decoration-amber-500/40 group-hover:decoration-amber-300">
            [HASHTAG_HELPER]:
          </span>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-normal group-hover:bg-amber-500/25 transition-colors">
            Select 1st Tag ➔
          </span>
        </label>

        <button
          type="button"
          onClick={() => {
            setFocusedTag(null);
            setIsPopupOpen(true);
          }}
          className="text-[10px] text-zinc-400 hover:text-amber-400 font-normal hover:underline cursor-pointer flex items-center gap-1 transition-colors"
          title="Click to change primary 1st tag"
        >
          <span>★ 1st Tag = Primary Route Tag</span>
        </button>
      </div>

      {/* Multiselect Box Container */}
      <div 
        onClick={() => setIsOpen(true)}
        className="w-full min-h-[42px] bg-zinc-900 border border-amber-500/50 focus-within:border-amber-400 rounded p-1.5 flex flex-wrap items-center gap-1.5 cursor-text transition-colors"
      >
        {selectedTags.map((tag, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-bold transition-all ${
              idx === 0
                ? 'bg-amber-950/90 border border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                : 'bg-zinc-800 border border-zinc-700 text-cyan-300 hover:border-amber-500/60'
            }`}
          >
            {/* Tag Label click opens 1st Tag Popup */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFocusedTag(tag);
                setIsPopupOpen(true);
              }}
              className="flex items-center gap-1 hover:underline cursor-pointer"
              title={idx === 0 ? "Current 1st Primary Tag (Click to change)" : "Click tag label to select for 1st Tag"}
            >
              <span>{tag}</span>
              {idx === 0 ? (
                <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded font-normal border border-amber-500/40">
                  ★ 1st
                </span>
              ) : (
                <span className="text-[9px] text-zinc-400 hover:text-amber-300 font-normal opacity-75">
                  (Set 1st)
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="text-zinc-400 hover:text-white ml-0.5 text-[11px]"
              title="Remove tag"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? "Type tag e.g. #deepwork, press Enter..." : "+ Add tag..."}
          className="flex-1 bg-transparent text-xs text-zinc-100 placeholder-zinc-600 outline-none min-w-[140px] px-1"
        />
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-zinc-950 border border-zinc-800 rounded shadow-2xl z-40 p-1 divide-y divide-zinc-900/60">
          <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex justify-between items-center">
            <span>[ SUGGESTED TAGS ({filteredSuggestions.length}) ]</span>
            <span className="text-zinc-600 text-[9px]">Click label above for 1st tag popup</span>
          </div>
          <div className="flex flex-wrap gap-1 p-1">
            {filteredSuggestions.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  addTag(tag);
                  setIsOpen(false);
                }}
                className="text-xs px-2 py-1 rounded bg-zinc-900 hover:bg-amber-950/70 text-zinc-300 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/50 transition-colors text-left font-mono flex items-center gap-1"
              >
                <span>+</span>
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POPUP MODAL: SELECT 1ST (PRIMARY) TAG */}
      {/* ========================================================================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div 
            ref={popupRef}
            className="bg-zinc-950 border border-amber-500/60 rounded-lg max-w-lg w-full p-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] font-mono space-y-4 text-xs relative"
          >
            {/* Modal Title & Close */}
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-sm">
                <span className="material-symbols-outlined text-amber-400">star_rate</span>
                <span>[ SELECT PRIMARY (1ST) HASHTAG ]</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="text-zinc-500 hover:text-white text-sm font-bold px-2 py-0.5 rounded hover:bg-zinc-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Description Banner */}
            <div className="bg-amber-950/40 border border-amber-500/30 rounded p-2.5 text-amber-200/90 text-[11px] leading-relaxed flex items-start gap-2">
              <span className="text-amber-400 text-sm">ⓘ</span>
              <div>
                The 1st tag serves as the <strong className="text-amber-300">Primary Route Tag</strong>. 
                It determines feed filtering, room display logs, and pin navigation priority.
              </div>
            </div>

            {/* Focused Tag Quick Option */}
            {focusedTag && (
              <div className="bg-zinc-900 border border-cyan-500/40 rounded p-2.5 space-y-2">
                <div className="text-[10px] text-cyan-400 uppercase font-bold">
                  [ CLICKED TAG ACTION ]: <span className="text-amber-300 font-bold">{focusedTag}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAsFirstTag(focusedTag)}
                    className="flex-1 py-1.5 bg-amber-500 text-black hover:bg-amber-400 font-bold uppercase rounded text-xs shadow-md transition-colors"
                  >
                    ★ Set {focusedTag} as 1st Tag
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTag(focusedTag)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-rose-950 hover:text-rose-300 border border-zinc-700 text-zinc-300 rounded font-bold uppercase transition-colors"
                  >
                    Remove Tag
                  </button>
                </div>
              </div>
            )}

            {/* Currently Selected Tags Selection List */}
            {selectedTags.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-zinc-400 uppercase font-bold">
                  CURRENTLY ATTACHED TAGS (Select one to make 1st):
                </div>
                <div className="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
                  {selectedTags.map((tag, idx) => (
                    <div
                      key={tag}
                      className={`flex justify-between items-center p-2 rounded border transition-colors ${
                        idx === 0
                          ? 'bg-amber-950/60 border-amber-500/80 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{tag}</span>
                        {idx === 0 && (
                          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                            ★ CURRENT 1ST
                          </span>
                        )}
                      </div>
                      {idx !== 0 ? (
                        <button
                          type="button"
                          onClick={() => setAsFirstTag(tag)}
                          className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 rounded text-[10px] font-bold uppercase transition-all"
                        >
                          ★ Select for 1st Tag
                        </button>
                      ) : (
                        <span className="text-[10px] text-amber-500 font-bold uppercase">Active Primary</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Input for 1st Tag */}
            <div className="space-y-1">
              <label className="block text-[10px] text-zinc-400 uppercase font-bold">
                ENTER NEW CUSTOM TAG FOR 1ST POSITION:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. #synthwave"
                  value={customFirstTag}
                  onChange={(e) => setCustomFirstTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (customFirstTag.trim()) setAsFirstTag(customFirstTag);
                    }
                  }}
                  className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-amber-400 rounded px-2.5 py-1.5 text-zinc-100 placeholder-zinc-600 outline-none text-xs"
                />
                <button
                  type="button"
                  disabled={!customFirstTag.trim()}
                  onClick={() => setAsFirstTag(customFirstTag)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-bold uppercase rounded text-xs transition-colors"
                >
                  Set as 1st
                </button>
              </div>
            </div>

            {/* All Available Suggestions Grid */}
            <div className="space-y-1.5 border-t border-zinc-800/80 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">
                  BROWSE ALL TAGS ({filteredPopupTags.length}):
                </span>
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={popupSearch}
                  onChange={(e) => setPopupSearch(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 focus:border-amber-400/60 rounded px-2 py-0.5 text-[10px] text-zinc-200 placeholder-zinc-600 outline-none w-32"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-zinc-900/60 border border-zinc-800/60 rounded">
                {filteredPopupTags.map((tag) => {
                  const isCurrentFirst = selectedTags[0]?.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setAsFirstTag(tag)}
                      className={`text-xs px-2 py-1 rounded border font-mono flex items-center gap-1 transition-all ${
                        isCurrentFirst
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-zinc-950 hover:bg-amber-950/70 text-zinc-300 hover:text-amber-300 border-zinc-800 hover:border-amber-500/50'
                      }`}
                    >
                      <span>★</span>
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Close */}
            <div className="flex justify-end pt-2 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded font-bold uppercase transition-colors text-xs"
              >
                [ CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

