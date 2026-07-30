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

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative font-mono" ref={dropdownRef}>
      {/* Label Header */}
      <div className="flex justify-between items-center mb-1 select-none">
        <label 
          className="block text-amber-400 font-bold uppercase text-xs flex items-center gap-1.5 text-amber-300 transition-colors group"
        >
          <span className="material-symbols-outlined text-sm text-amber-400">
            sell
          </span>
          <span className="underline underline-offset-2 decoration-amber-500/40">
            [HASHTAG_HELPER]:
          </span>
        </label>
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
            <span>{tag}</span>

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
    </div>
  );
};

