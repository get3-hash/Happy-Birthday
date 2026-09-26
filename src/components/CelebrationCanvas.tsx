import React, { useRef, useState, useEffect } from 'react';
import { ThemeConfig, AspectRatio, FontChoice } from '../types';
import { BalloonsGroup } from './BalloonsGroup';
import { CelebrationDecor } from './CelebrationDecor';

interface CelebrationCanvasProps {
  theme: ThemeConfig;
  aspectRatio: AspectRatio;
  fontChoice: FontChoice;
  animated: boolean;
  customName?: string;
  customWish?: string;
  onCanvasClick?: () => void;
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export const CelebrationCanvas: React.FC<CelebrationCanvasProps> = ({
  theme,
  aspectRatio,
  fontChoice,
  animated,
  customName,
  customWish,
  onCanvasClick,
  innerRef,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax subtle light shift
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Font family selector class
  const getFontFamilyClass = () => {
    switch (fontChoice) {
      case 'cinzel':
        return 'font-cinzel';
      case 'montserrat':
        return 'font-montserrat';
      case 'playfair':
        return 'font-playfair';
      case 'cormorant':
        return 'font-cormorant';
      default:
        return 'font-cinzel';
    }
  };

  // Aspect ratio class configuration
  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[620px] max-h-[85vh]';
      case '9:16':
        return 'aspect-[9/16] max-h-[85vh] max-w-[480px]';
      case '16:9':
        return 'aspect-[16/9] max-w-[960px] max-h-[75vh]';
      case '4:5':
        return 'aspect-[4/5] max-h-[85vh] max-w-[540px]';
      default:
        return 'aspect-square max-w-[620px] max-h-[85vh]';
    }
  };

  const fontClass = getFontFamilyClass();

  return (
    <div
      ref={innerRef}
      className={`relative w-full mx-auto select-none rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer ${getAspectRatioClasses()}`}
      style={{
        border: `1px solid ${theme.cardBorder}`,
        background: theme.bgGradient,
        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 80px -20px ${theme.subtextColor}33`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onCanvasClick}
      title="Click to shower celebratory confetti"
    >
      {/* Dynamic Ambient Spotlight following cursor subtly */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 480px at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${theme.subtextColor}1a, transparent 70%)`,
        }}
      />

      {/* Central Radiance Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: theme.radialCenterGlow }}
      />

      {/* Overhead Key Softbox Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: theme.ambientSpotlight }}
      />

      {/* Realistic Balloons Group (Left & Right Flanks) */}
      <BalloonsGroup theme={theme} animated={animated} />

      {/* Ribbons, Subtle Confetti & Bokeh Stars */}
      <CelebrationDecor theme={theme} animated={animated} />

      {/* Center Stage: Monumental Typography "HAPPY BIRTHDAY" */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6 sm:px-12 pointer-events-none">
        {/* Subtle decorative top emblem */}
        <div className="flex items-center gap-3 mb-2 sm:mb-4 opacity-80">
          <div
            className="h-[1px] w-8 sm:w-16"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.subtextColor})`,
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ backgroundColor: theme.subtextColor }}
          />
          <span
            className="text-[9px] sm:text-[11px] uppercase tracking-[0.3em] font-medium"
            style={{ color: theme.subtextColor }}
          >
            Celebration
          </span>
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ backgroundColor: theme.subtextColor }}
          />
          <div
            className="h-[1px] w-8 sm:w-16"
            style={{
              background: `linear-gradient(90deg, ${theme.subtextColor}, transparent)`,
            }}
          />
        </div>

        {/* Word 1: "HAPPY" */}
        <h1
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-none mb-1 sm:mb-2 transition-transform duration-300 ${fontClass} ${theme.textClass}`}
          style={{
            transform: `translate3d(${(mousePos.x - 0.5) * 12}px, ${(mousePos.y - 0.5) * 8}px, 0)`,
          }}
        >
          HAPPY
        </h1>

        {/* Word 2: "BIRTHDAY" */}
        <h1
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-none transition-transform duration-300 ${fontClass} ${theme.textClass}`}
          style={{
            transform: `translate3d(${(mousePos.x - 0.5) * 16}px, ${(mousePos.y - 0.5) * 12}px, 0)`,
          }}
        >
          BIRTHDAY
        </h1>

        {/* Decorative Hairline Divider */}
        <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-3 sm:my-5">
          <div
            className="h-[1px] flex-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.subtextColor})`,
            }}
          />
          <div
            className="w-2 h-2 rotate-45 border"
            style={{
              borderColor: theme.subtextColor,
              backgroundColor: `${theme.subtextColor}33`,
            }}
          />
          <div
            className="h-[1px] flex-1"
            style={{
              background: `linear-gradient(90deg, ${theme.subtextColor}, transparent)`,
            }}
          />
        </div>

        {/* Optional Recipient Name */}
        {customName && customName.trim() && (
          <p
            className="text-base sm:text-xl md:text-2xl font-semibold uppercase tracking-[0.25em] mb-1 sm:mb-2"
            style={{
              color: theme.subtextColor,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {customName.trim()}
          </p>
        )}

        {/* Optional Warm Wish Message */}
        {customWish && customWish.trim() && (
          <p
            className="text-xs sm:text-sm md:text-base font-cormorant italic max-w-md px-4 leading-relaxed"
            style={{
              color: theme.id === 'ivory' ? '#44403c' : 'rgba(255, 255, 255, 0.82)',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            {customWish.trim()}
          </p>
        )}
      </div>

      {/* Shimmer Sweep Animation Over Center */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent shimmer-light" />
      </div>

      {/* Subtle Corner Vignette */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
        style={{
          boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.65)',
        }}
      />
    </div>
  );
};
