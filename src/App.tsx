/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ThemeId, THEMES, AspectRatio, FontChoice } from './types';
import { CelebrationCanvas } from './components/CelebrationCanvas';
import { ControlsHeader } from './components/ControlsHeader';
import { ExportModal } from './components/ExportModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { playCelebrationChime } from './utils/audioChime';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Share2,
  SlidersHorizontal,
  Info,
  User,
  X,
  Heart,
} from 'lucide-react';

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('gold');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [fontChoice, setFontChoice] = useState<FontChoice>('cinzel');
  const [animated, setAnimated] = useState<boolean>(true);
  const [customName, setCustomName] = useState<string>('');
  const [customWish, setCustomWish] = useState<string>('');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const activeTheme = THEMES[currentThemeId];

  const focusNameInput = useCallback(() => {
    nameInputRef.current?.focus();
    nameInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  // Confetti trigger
  const triggerCelebration = useCallback(() => {
    if (soundEnabled) {
      playCelebrationChime();
    }

    const colors = activeTheme.confettiColors;

    // Realistic burst 1: Left and Right cannons
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.8 },
      colors,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.8 },
      colors,
      disableForReducedMotion: true,
    });

    // Realistic burst 2: Center sparkle star shower
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: [...colors, '#ffffff'],
        shapes: ['circle', 'square'],
        scalar: 1.1,
      });
    }, 200);
  }, [activeTheme, soundEnabled]);

  // Fullscreen toggler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      mainContainerRef.current?.requestFullscreen?.().catch((err) => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.error('Exit fullscreen failed:', err);
      });
      setIsFullscreen(false);
    }
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        triggerCelebration();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        setIsExportOpen(false);
        setIsCustomizeOpen(false);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const themeKeys = Object.keys(THEMES) as ThemeId[];
        const idx = parseInt(e.key, 10) - 1;
        if (themeKeys[idx]) {
          setCurrentThemeId(themeKeys[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerCelebration, toggleFullscreen]);

  return (
    <div
      ref={mainContainerRef}
      className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden"
    >
      {/* Top Header */}
      {!isFullscreen && (
        <ControlsHeader
          currentTheme={currentThemeId}
          onSelectTheme={setCurrentThemeId}
          aspectRatio={aspectRatio}
          onChangeAspectRatio={setAspectRatio}
          onTriggerCelebrate={triggerCelebration}
          onOpenExport={() => setIsExportOpen(true)}
          onToggleCustomize={() => setIsCustomizeOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}

      {/* Main Showcase Stage */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative">
        {/* Fullscreen Quick Controls Bar (Appears when in fullscreen mode) */}
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-neutral-950/70 backdrop-blur-md p-2 rounded-xl border border-neutral-800">
            <button
              onClick={triggerCelebration}
              className="p-2 text-amber-300 hover:text-amber-200 rounded-lg hover:bg-neutral-800 transition-colors"
              title="Celebrate"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title={soundEnabled ? 'Mute sound' : 'Enable chime'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Exit Fullscreen"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Ambient Backlight Diffusion behind poster */}
        <div
          className="absolute -z-10 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-700"
          style={{
            backgroundColor: activeTheme.balloonColors.primary.base,
          }}
        />

        {/* Quick Name Personalizer Bar (Directly visible & accessible) */}
        {!isFullscreen && (
          <div className="w-full max-w-xl mx-auto mb-3 sm:mb-4 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2.5 shadow-xl backdrop-blur-md flex flex-col gap-2 transition-all">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 border border-amber-400/30">
                <User className="w-4 h-4 text-amber-400" />
              </div>
              <div className="relative flex-1">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Birthday Name / नाम डालें (e.g. Rahul, Priya, Alex)..."
                  maxLength={28}
                  className="w-full bg-neutral-950/80 border border-neutral-700/60 focus:border-amber-400 rounded-xl px-3.5 py-1.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-400 pr-8"
                />
                {customName && (
                  <button
                    onClick={() => setCustomName('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5 cursor-pointer"
                    title="Clear Name"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick One-Click Name Suggestions */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] px-1 text-neutral-400 pb-0.5">
              <span className="text-neutral-500 shrink-0 font-medium">Suggestions:</span>
              {['Rahul', 'Priya', 'Aarav', 'Ananya', 'Mom', 'Dad', 'Bhaiya', 'Bestie'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCustomName(preset)}
                  className={`px-2 py-0.5 rounded-md border text-[11px] transition-colors whitespace-nowrap cursor-pointer ${
                    customName.toLowerCase() === preset.toLowerCase()
                      ? 'border-amber-400 bg-amber-950/60 text-amber-300 font-semibold'
                      : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* The Celebration Poster Canvas */}
        <div className="w-full max-w-5xl flex items-center justify-center">
          <CelebrationCanvas
            innerRef={canvasRef}
            theme={activeTheme}
            aspectRatio={aspectRatio}
            fontChoice={fontChoice}
            animated={animated}
            customName={customName}
            customWish={customWish}
            onCanvasClick={triggerCelebration}
            onEditName={focusNameInput}
          />
        </div>
      </main>

      {/* Floating Bottom Quick Palette & Controls (Hidden in Fullscreen) */}
      {!isFullscreen && (
        <footer className="w-full border-t border-neutral-900 bg-neutral-950/90 backdrop-blur-md py-3 px-4 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            {/* Theme Switcher Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mr-1 shrink-0">
                Themes:
              </span>
              {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                const item = THEMES[themeKey];
                const isActive = currentThemeId === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setCurrentThemeId(themeKey)}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'border-amber-400/80 bg-neutral-900 text-amber-300 font-semibold shadow-xs'
                        : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions & Status */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
                title={soundEnabled ? 'Chime sound is enabled' : 'Chime is muted'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span className="text-[11px]">{soundEnabled ? 'Chime on' : 'Muted'}</span>
              </button>

              <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">
                ·
              </span>

              <span className="text-[11px] text-neutral-500 hidden md:inline">
                Click design or press <kbd className="px-1 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-300">Space</kbd> for confetti
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* Export & Share Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        theme={activeTheme}
        aspectRatio={aspectRatio}
        fontChoice={fontChoice}
        customName={customName}
        customWish={customWish}
      />

      {/* Customize Drawer */}
      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        currentTheme={currentThemeId}
        onSelectTheme={setCurrentThemeId}
        fontChoice={fontChoice}
        onSelectFont={setFontChoice}
        aspectRatio={aspectRatio}
        onChangeAspectRatio={setAspectRatio}
        animated={animated}
        onToggleAnimated={() => setAnimated((prev) => !prev)}
        customName={customName}
        onChangeCustomName={setCustomName}
        customWish={customWish}
        onChangeCustomWish={setCustomWish}
        onTriggerCelebrate={triggerCelebration}
      />
    </div>
  );
}
