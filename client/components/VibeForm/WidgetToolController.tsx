import React, { useState } from 'react';
import { VibeWidget } from '../../store/useAtmosphericStore';

interface WidgetToolControllerProps {
  widgets: VibeWidget[];
  onChange: (widgets: VibeWidget[]) => void;
}

export const WidgetToolController: React.FC<WidgetToolControllerProps> = ({
  widgets,
  onChange,
}) => {
  const [activeTool, setActiveTool] = useState<'youtube' | 'link' | null>(null);
  const [widgetUrl, setWidgetUrl] = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleAddWidget = () => {
    if (!widgetUrl.trim() || !activeTool) return;
    const url = widgetUrl.trim();

    let title = widgetTitle.trim();
    if (!title && activeTool === 'youtube') {
      const ytId = extractYouTubeId(url);
      title = ytId ? `YouTube Video [${ytId}]` : 'YouTube Media Widget';
    } else if (!title) {
      title = 'External Link Widget';
    }

    const newWidget: VibeWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: activeTool,
      url,
      title,
    };

    onChange([...widgets, newWidget]);
    setWidgetUrl('');
    setWidgetTitle('');
    setActiveTool(null);
  };

  const handleRemoveWidget = (id: string) => {
    onChange(widgets.filter((w) => w.id !== id));
  };

  return (
    <div className="space-y-2 font-mono">
      <div className="flex justify-between items-center">
        <label className="block text-zinc-400 font-bold uppercase text-xs">
          [WIDGET_INTEGRATIONS_TOOL] ({widgets.length})
        </label>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'youtube' ? null : 'youtube')}
            className={`text-xs px-2 py-1 rounded font-bold uppercase border transition-colors ${
              activeTool === 'youtube'
                ? 'bg-red-950/80 border-red-500 text-red-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-red-400'
            }`}
          >
            + ADD YOUTUBE
          </button>
          <button
            type="button"
            onClick={() => setActiveTool(activeTool === 'link' ? null : 'link')}
            className={`text-xs px-2 py-1 rounded font-bold uppercase border transition-colors ${
              activeTool === 'link'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400'
            }`}
          >
            + ADD LINK WIDGET
          </button>
        </div>
      </div>

      {/* Active Tool Composer Panel */}
      {activeTool && (
        <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>
              [ATTACH_{activeTool.toUpperCase()}_WIDGET]
            </span>
            <button
              type="button"
              onClick={() => setActiveTool(null)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            <input
              type="url"
              required
              placeholder={
                activeTool === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : 'https://example.com/widget'
              }
              value={widgetUrl}
              onChange={(e) => setWidgetUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded p-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
            />
            <input
              type="text"
              placeholder="Widget Title / Label (Optional)"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded p-1.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTool(null)}
              className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddWidget}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-xs uppercase"
            >
              Attach Widget
            </button>
          </div>
        </div>
      )}

      {/* List of Attached Widgets */}
      {widgets.length > 0 && (
        <div className="space-y-1.5">
          {widgets.map((widget) => {
            const ytId = widget.type === 'youtube' ? extractYouTubeId(widget.url) : null;

            return (
              <div
                key={widget.id}
                className="p-2 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2 truncate">
                  {widget.type === 'youtube' ? (
                    <span className="material-symbols-outlined text-red-500 text-base">play_circle</span>
                  ) : (
                    <span className="material-symbols-outlined text-cyan-400 text-base">link</span>
                  )}
                  <div className="truncate">
                    <div className="font-bold text-zinc-200 truncate">{widget.title || widget.url}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{widget.url}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 ml-2">
                  {ytId && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-900">
                      ID: {ytId}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="text-zinc-500 hover:text-red-400 px-1 py-0.5 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
