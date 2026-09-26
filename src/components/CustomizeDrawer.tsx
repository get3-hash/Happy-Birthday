import React from 'react';
import { ThemeId, THEMES, FontChoice, AspectRatio } from '../types';
import { X, Sparkles, Type, Palette, Eye, Play, Pause } from 'lucide-react';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  fontChoice: FontChoice;
  onSelectFont: (font: FontChoice) => void;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ratio: AspectRatio) => void;
  animated: boolean;
  onToggleAnimated: () => void;
  customName: string;
  onChangeCustomName: (name: string) => void;
  customWish: string;
  onChangeCustomWish: (wish: string) => void;
  onTriggerCelebrate: () => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  fontChoice,
  onSelectFont,
  aspectRatio,
  onChangeAspectRatio,
  animated,
  onToggleAnimated,
  customName,
  onChangeCustomName,
  customWish,
  onChangeCustomWish,
  onTriggerCelebrate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-neutral-950 border-l border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto text-neutral-100 shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-cinzel font-bold text-amber-300">
                Design Studio
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Selection */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Color Themes</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                const item = THEMES[themeKey];
                const isSelected = currentTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => onSelectTheme(themeKey)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-400/80 bg-neutral-900 shadow-sm shadow-amber-500/10'
                        : 'border-neutral-800/80 hover:border-neutral-700 bg-neutral-950/60'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center border border-white/20"
                      style={{ backgroundColor: item.balloonColors.primary.base }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.balloonColors.secondary.highlight }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-neutral-200">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">
                        {item.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Style */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>Typography Styling</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectFont('cinzel')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  fontChoice === 'cinzel'
                    ? 'border-amber-400/80 bg-neutral-900 text-amber-300 font-semibold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-cinzel text-sm font-bold block">Cinzel</span>
                <span className="text-[10px] text-neutral-500">Royal Capitals</span>
              </button>
              <button
                onClick={() => onSelectFont('montserrat')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  fontChoice === 'montserrat'
                    ? 'border-amber-400/80 bg-neutral-900 text-amber-300 font-semibold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-montserrat text-sm font-black block">Montserrat</span>
                <span className="text-[10px] text-neutral-500">Bold Luxury Sans</span>
              </button>
              <button
                onClick={() => onSelectFont('playfair')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  fontChoice === 'playfair'
                    ? 'border-amber-400/80 bg-neutral-900 text-amber-300 font-semibold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-playfair text-sm font-bold block">Playfair</span>
                <span className="text-[10px] text-neutral-500">Classic Serif</span>
              </button>
              <button
                onClick={() => onSelectFont('cormorant')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  fontChoice === 'cormorant'
                    ? 'border-amber-400/80 bg-neutral-900 text-amber-300 font-semibold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-cormorant text-sm font-bold block">Cormorant</span>
                <span className="text-[10px] text-neutral-500">Editorial Roman</span>
              </button>
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Format & Aspect Ratio
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              {(['1:1', '9:16', '16:9', '4:5'] as AspectRatio[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => onChangeAspectRatio(ratio)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    aspectRatio === ratio
                      ? 'bg-neutral-800 text-amber-300 font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Animation State Toggle */}
          <div className="flex items-center justify-between p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
            <div>
              <span className="text-xs font-medium text-neutral-200 block">
                Floating Balloon Motion
              </span>
              <span className="text-[11px] text-neutral-500">
                {animated ? 'Gentle ambient motion active' : 'Frozen still for photo export'}
              </span>
            </div>
            <button
              onClick={onToggleAnimated}
              className={`p-2 rounded-lg border transition-colors ${
                animated
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
              title={animated ? 'Pause motion' : 'Play motion'}
            >
              {animated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Optional Personalization */}
          <div className="space-y-3 pt-2 border-t border-neutral-800">
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1">
                Recipient Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Sophia, Alexander, Mom"
                value={customName}
                onChange={(e) => onChangeCustomName(e.target.value)}
                maxLength={32}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1">
                Subtext Wish (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Wishing you boundless joy, health & prosperity"
                value={customWish}
                onChange={(e) => onChangeCustomWish(e.target.value)}
                maxLength={60}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Footer Quick Action */}
        <div className="pt-6">
          <button
            onClick={() => {
              onTriggerCelebrate();
              onClose();
            }}
            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Shower Confetti & View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
