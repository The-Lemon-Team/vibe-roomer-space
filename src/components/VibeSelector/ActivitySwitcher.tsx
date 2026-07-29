import React from 'react';
import { 
  useAtmosphericStore, 
  ATMOSPHERIC_CONTEXT_MAP, 
  ActivityContextType 
} from '../../store/useAtmosphericStore';

export const ActivitySwitcher: React.FC = () => {
  const { currentContext, setContext } = useAtmosphericStore();

  return (
    <div className="w-full bg-zinc-950 border-b border-zinc-800 p-3 overflow-x-auto no-scrollbar">
      <div className="flex items-center space-x-3 min-w-max">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-2">
          [MODE_SELECT]:
        </span>
        {(Object.keys(ATMOSPHERIC_CONTEXT_MAP) as ActivityContextType[]).map((key) => {
          const item = ATMOSPHERIC_CONTEXT_MAP[key];
          const isActive = currentContext === key;

          return (
            <button
              key={key}
              onClick={() => setContext(key)}
              style={{
                borderColor: isActive ? item.neonColor : undefined,
                boxShadow: isActive ? `0 0 12px ${item.neonColor}33` : 'none',
                color: isActive ? item.neonColor : '#a1a1aa'
              }}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-200 rounded border ${
                isActive 
                  ? 'bg-zinc-900/90' 
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              {isActive && <span className="mr-1.5">●</span>}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
