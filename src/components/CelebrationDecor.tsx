import React from 'react';
import { ThemeConfig } from '../types';

interface CelebrationDecorProps {
  theme: ThemeConfig;
  animated?: boolean;
}

export const CelebrationDecor = React.memo<CelebrationDecorProps>(({
  theme,
  animated = true,
}) => {
  const primaryColor = theme.confettiColors[0];
  const secondaryColor = theme.confettiColors[1];
  const goldColor = '#fef08a';
  const silverColor = '#ffffff';

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
      aria-hidden="true"
    >
      <defs>
        {/* Ribbon Gradients */}
        <linearGradient id="ribbon-twist-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldColor} stopOpacity="0.95" />
          <stop offset="35%" stopColor={primaryColor} stopOpacity="0.85" />
          <stop offset="65%" stopColor={secondaryColor} stopOpacity="0.75" />
          <stop offset="100%" stopColor="#713f12" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="ribbon-twist-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.95" />
          <stop offset="40%" stopColor={goldColor} stopOpacity="0.85" />
          <stop offset="70%" stopColor={primaryColor} stopOpacity="0.75" />
          <stop offset="100%" stopColor="#451a03" stopOpacity="0.6" />
        </linearGradient>

        {/* Bokeh Glow */}
        <radialGradient id="bokeh-glow-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={goldColor} stopOpacity="0.35" />
          <stop offset="60%" stopColor={primaryColor} stopOpacity="0.12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bokeh-glow-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={silverColor} stopOpacity="0.4" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* 4-point star macro */}
        <g id="sparkle-star">
          <circle cx="0" cy="0" r="3" fill="#ffffff" opacity="0.9" />
          <path
            d="M 0,-10 Q 0,0 10,0 Q 0,0 0,10 Q 0,0 -10,0 Q 0,0 0,-10 Z"
            fill={goldColor}
          />
        </g>
      </defs>

      {/* Bokeh Spheres (Soft cinematic depth) */}
      <g opacity={0.65} style={{ mixBlendMode: 'screen' }}>
        <circle cx="180" cy="240" r="42" fill="url(#bokeh-glow-1)" />
        <circle cx="820" cy="260" r="54" fill="url(#bokeh-glow-2)" />
        <circle cx="120" cy="740" r="38" fill="url(#bokeh-glow-2)" />
        <circle cx="860" cy="780" r="48" fill="url(#bokeh-glow-1)" />
        <circle cx="480" cy="180" r="32" fill="url(#bokeh-glow-1)" opacity="0.4" />
        <circle cx="520" cy="840" r="36" fill="url(#bokeh-glow-2)" opacity="0.4" />
      </g>

      {/* Elegant Twisting Satin Ribbons (Framing corners gracefully) */}
      <g
        className={animated ? 'animate-float-1' : ''}
        style={{ transformOrigin: 'top left', willChange: 'transform' }}
      >
        {/* Left flowing ribbon soft shadow stroke */}
        <path
          d="M -16,126 
             C 94,146 144,266 84,386 
             C 34,486 124,586 94,706 
             C 74,786 24,866 -26,906"
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Left flowing ribbon strand 1 */}
        <path
          d="M -20,120 
             C 90,140 140,260 80,380 
             C 30,480 120,580 90,700 
             C 70,780 20,860 -30,900"
          fill="none"
          stroke="url(#ribbon-twist-left)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Left inner curling accent ribbon */}
        <path
          d="M 10,180 
             C 80,210 110,310 60,400 
             C 20,480 70,550 50,640"
          fill="none"
          stroke={goldColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      <g
        className={animated ? 'animate-float-2' : ''}
        style={{ transformOrigin: 'top right', willChange: 'transform' }}
      >
        {/* Right flowing ribbon soft shadow stroke */}
        <path
          d="M 1024,116 
             C 914,166 864,286 914,416 
             C 964,526 874,646 924,776 
             C 954,846 994,896 1034,926"
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Right flowing ribbon strand */}
        <path
          d="M 1020,110 
             C 910,160 860,280 910,410 
             C 960,520 870,640 920,770 
             C 950,840 990,890 1030,920"
          fill="none"
          stroke="url(#ribbon-twist-right)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Right inner curling accent ribbon */}
        <path
          d="M 990,170 
             C 920,220 890,320 930,420 
             C 970,510 930,610 950,680"
          fill="none"
          stroke={theme.ribbonColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Subtle Confetti & Shimmer Sequins (Carefully placed for balanced elegance) */}
      <g>
        {/* Foil squares / diamonds */}
        <rect
          x="210"
          y="180"
          width="9"
          height="12"
          rx="1"
          transform="rotate(28, 210, 180)"
          fill={theme.confettiColors[0]}
          opacity="0.85"
        />
        <rect
          x="770"
          y="190"
          width="11"
          height="8"
          rx="1"
          transform="rotate(-34, 770, 190)"
          fill={theme.confettiColors[1]}
          opacity="0.85"
        />
        <rect
          x="190"
          y="680"
          width="10"
          height="10"
          rx="1"
          transform="rotate(45, 190, 680)"
          fill={theme.confettiColors[2] || goldColor}
          opacity="0.8"
        />
        <rect
          x="810"
          y="670"
          width="8"
          height="13"
          rx="1"
          transform="rotate(-18, 810, 670)"
          fill={goldColor}
          opacity="0.85"
        />
        <rect
          x="320"
          y="140"
          width="7"
          height="7"
          rx="1"
          transform="rotate(15, 320, 140)"
          fill={silverColor}
          opacity="0.7"
        />
        <rect
          x="670"
          y="150"
          width="8"
          height="8"
          rx="1"
          transform="rotate(-22, 670, 150)"
          fill={theme.confettiColors[3] || primaryColor}
          opacity="0.75"
        />

        {/* Small circular metallic dots */}
        <circle cx="280" cy="220" r="3.5" fill={goldColor} opacity="0.8" />
        <circle cx="720" cy="230" r="4" fill={silverColor} opacity="0.85" />
        <circle cx="240" cy="620" r="3" fill={primaryColor} opacity="0.75" />
        <circle cx="760" cy="610" r="3.5" fill={goldColor} opacity="0.8" />
        <circle cx="360" cy="780" r="2.5" fill={silverColor} opacity="0.65" />
        <circle cx="640" cy="790" r="3" fill={theme.confettiColors[1]} opacity="0.7" />

        {/* Star Sparkles (Twinkling glints) */}
        <use href="#sparkle-star" x="250" y="270" transform="scale(0.85)" opacity="0.9" />
        <use href="#sparkle-star" x="750" y="290" transform="scale(0.9)" opacity="0.9" />
        <use href="#sparkle-star" x="220" y="550" transform="scale(0.7)" opacity="0.75" />
        <use href="#sparkle-star" x="780" y="540" transform="scale(0.75)" opacity="0.75" />
        <use href="#sparkle-star" x="500" y="160" transform="scale(0.8)" opacity="0.85" />
      </g>
    </svg>
  );
});
