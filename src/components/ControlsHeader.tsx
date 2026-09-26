import React from 'react';
import { AspectRatio, ThemeId, THEMES, THEME_KEYS } from '../types';
import { Sparkles, Download, Maximize2, Minimize2, SlidersHorizontal } from 'lucide-react';

interface ControlsHeaderProps {
  currentTheme: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
  onTriggerCelebrate: () => void;
  onOpenExport: () => void;
  onToggleCustomize: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const ControlsHeader = React.memo<ControlsHeaderProps>(({
  currentTheme,
  onSelectTheme,
  aspectRatio,
  onChangeAspectRatio,
  onTriggerCelebrate,
  onOpenExport,
  onToggleCustomize,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4">
          <span className="text-base sm:text-lg font-cinzel font-bold tracking-wider text-amber-300 whitespace-nowrap">
            Luxe Birthday
          </span>

          {/* Quick Theme Swatches */}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-neutral-800">
            {THEME_KEYS.map((themeKey) => {
              const item = THEMES[themeKey];
              const isSelected = currentTheme === themeKey;
              return (
                <button
                  key={themeKey}
                  onClick={() => onSelectTheme(themeKey)}
                  className={`w-5 h-5 rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected ? 'scale-125 ring-2 ring-amber-400' : 'opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: item.balloonColors.primary.base,
                    boxShadow: isSelected ? '0 0 10px rgba(250, 204, 21, 0.5)' : 'none',
                  }}
                  title={item.name}
                  aria-label={`Select ${item.name}`}
                />
              );
            })}
          </div>
        </div>

        {/* Zone 2: Aspect Ratio Segmented Control */}
        <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
          <button
            onClick={() => onChangeAspectRatio('1:1')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              aspectRatio === '1:1'
                ? 'bg-neutral-800 text-amber-300 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="1:1 Square (Instagram & Feed)"
          >
            1:1 Square
          </button>
          <button
            onClick={() => onChangeAspectRatio('9:16')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              aspectRatio === '9:16'
                ? 'bg-neutral-800 text-amber-300 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="9:16 Story (WhatsApp & Instagram Status)"
          >
            9:16 Status
          </button>
          <button
            onClick={() => onChangeAspectRatio('16:9')}
            className={`hidden md:block px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              aspectRatio === '16:9'
                ? 'bg-neutral-800 text-amber-300 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="16:9 Screen (TV & Presentation)"
          >
            16:9 Screen
          </button>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Celebrate Confetti Trigger */}
          <button
            onClick={onTriggerCelebrate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer active:scale-95"
            title="Shower festive confetti"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Celebrate</span>
          </button>

          {/* Customize Drawer Toggle */}
          <button
            onClick={onToggleCustomize}
            className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Customize styling, typography & message"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 rounded-lg transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Display Mode'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Export / Share Primary CTA */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-yellow-400 rounded-lg shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-amber-500/20 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Share & Save</span>
          </button>
        </div>
      </div>
    </header>
  );
});
