export type ThemeId = 'gold' | 'rose' | 'sapphire' | 'emerald' | 'ivory';

export type AspectRatio = '1:1' | '9:16' | '16:9' | '4:5';

export type FontChoice = 'cinzel' | 'playfair' | 'montserrat' | 'cormorant';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  bgGradient: string;
  radialCenterGlow: string;
  ambientSpotlight: string;
  textClass: string;
  subtextColor: string;
  badgeBorder: string;
  balloonColors: {
    primary: {
      base: string;
      highlight: string;
      shadow: string;
      specular: string;
    };
    secondary: {
      base: string;
      highlight: string;
      shadow: string;
      specular: string;
    };
    accent: {
      base: string;
      highlight: string;
      shadow: string;
      specular: string;
    };
  };
  confettiColors: string[];
  ribbonColor: string;
  ribbonGradient: string;
  cardBorder: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  gold: {
    id: 'gold',
    name: 'Royal Champagne & Gold',
    tagline: 'Deep obsidian with radiant 24K gold foil and pearl luster',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #1c1917 0%, #0c0a09 60%, #000000 100%)',
    radialCenterGlow: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.18) 0%, rgba(202, 138, 4, 0.05) 50%, transparent 75%)',
    ambientSpotlight: 'radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.25) 0%, transparent 60%)',
    textClass: 'gold-foil-text-3d',
    subtextColor: '#fef08a',
    badgeBorder: 'rgba(234, 179, 8, 0.3)',
    balloonColors: {
      primary: {
        base: '#eab308',
        highlight: '#fef9c3',
        shadow: '#713f12',
        specular: '#ffffff',
      },
      secondary: {
        base: '#ca8a04',
        highlight: '#fef08a',
        shadow: '#451a03',
        specular: '#ffffff',
      },
      accent: {
        base: '#f5f5f4',
        highlight: '#ffffff',
        shadow: '#78716c',
        specular: '#ffffff',
      },
    },
    confettiColors: ['#fbbf24', '#f59e0b', '#fef08a', '#ffffff', '#d97706'],
    ribbonColor: '#eab308',
    ribbonGradient: 'linear-gradient(135deg, #fef08a, #ca8a04, #fef9c3, #a16207)',
    cardBorder: 'rgba(234, 179, 8, 0.25)',
  },
  rose: {
    id: 'rose',
    name: 'Rose Gold & Silk Blush',
    tagline: 'Refined deep mauve and velvety espresso with mirror rose gold',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #201116 0%, #11070a 60%, #050204 100%)',
    radialCenterGlow: 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.16) 0%, rgba(225, 29, 72, 0.04) 50%, transparent 75%)',
    ambientSpotlight: 'radial-gradient(ellipse at 50% 0%, rgba(254, 205, 211, 0.22) 0%, transparent 60%)',
    textClass: 'rose-gold-text-3d',
    subtextColor: '#fecdd3',
    badgeBorder: 'rgba(251, 113, 133, 0.3)',
    balloonColors: {
      primary: {
        base: '#fb7185',
        highlight: '#ffe4e6',
        shadow: '#881337',
        specular: '#ffffff',
      },
      secondary: {
        base: '#f43f5e',
        highlight: '#fecdd3',
        shadow: '#4c0519',
        specular: '#ffffff',
      },
      accent: {
        base: '#f5d0fe',
        highlight: '#ffffff',
        shadow: '#86198f',
        specular: '#ffffff',
      },
    },
    confettiColors: ['#fda4af', '#fb7185', '#f43f5e', '#ffffff', '#fecdd3'],
    ribbonColor: '#fb7185',
    ribbonGradient: 'linear-gradient(135deg, #ffe4e6, #f43f5e, #fecdd3, #9f1239)',
    cardBorder: 'rgba(251, 113, 133, 0.25)',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Midnight Azure & Platinum',
    tagline: 'Regal midnight navy with chrome silver and starburst highlights',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #091e3a 0%, #050e1d 60%, #01040a 100%)',
    radialCenterGlow: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 75%)',
    ambientSpotlight: 'radial-gradient(ellipse at 50% 0%, rgba(224, 242, 254, 0.25) 0%, transparent 60%)',
    textClass: 'platinum-silver-text-3d',
    subtextColor: '#bae6fd',
    badgeBorder: 'rgba(148, 163, 184, 0.35)',
    balloonColors: {
      primary: {
        base: '#38bdf8',
        highlight: '#e0f2fe',
        shadow: '#0369a1',
        specular: '#ffffff',
      },
      secondary: {
        base: '#94a3b8',
        highlight: '#f8fafc',
        shadow: '#334155',
        specular: '#ffffff',
      },
      accent: {
        base: '#60a5fa',
        highlight: '#ffffff',
        shadow: '#1e3a8a',
        specular: '#ffffff',
      },
    },
    confettiColors: ['#38bdf8', '#e0f2fe', '#ffffff', '#94a3b8', '#60a5fa'],
    ribbonColor: '#cbd5e1',
    ribbonGradient: 'linear-gradient(135deg, #f8fafc, #94a3b8, #e2e8f0, #475569)',
    cardBorder: 'rgba(148, 163, 184, 0.25)',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Velvet & Warm Brass',
    tagline: 'Opulent deep forest emerald with warm brushed brass illumination',
    bgGradient: 'radial-gradient(ellipse at 50% 30%, #062b1e 0%, #02140d 60%, #010604 100%)',
    radialCenterGlow: 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 75%)',
    ambientSpotlight: 'radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.22) 0%, transparent 60%)',
    textClass: 'brass-emerald-text-3d',
    subtextColor: '#a7f3d0',
    badgeBorder: 'rgba(250, 204, 21, 0.3)',
    balloonColors: {
      primary: {
        base: '#10b981',
        highlight: '#d1fae5',
        shadow: '#064e3b',
        specular: '#ffffff',
      },
      secondary: {
        base: '#eab308',
        highlight: '#fef08a',
        shadow: '#713f12',
        specular: '#ffffff',
      },
      accent: {
        base: '#059669',
        highlight: '#a7f3d0',
        shadow: '#022c22',
        specular: '#ffffff',
      },
    },
    confettiColors: ['#34d399', '#facc15', '#ffffff', '#6ee7b7', '#ca8a04'],
    ribbonColor: '#eab308',
    ribbonGradient: 'linear-gradient(135deg, #fef08a, #ca8a04, #fef9c3, #713f12)',
    cardBorder: 'rgba(52, 211, 153, 0.25)',
  },
  ivory: {
    id: 'ivory',
    name: 'Alabaster Silk & Pure Gold',
    tagline: 'Clean editorial ivory marble canvas with gilded bullion typography',
    bgGradient: 'radial-gradient(ellipse at 50% 25%, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)',
    radialCenterGlow: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.15) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)',
    ambientSpotlight: 'radial-gradient(ellipse at 50% 0%, rgba(254, 243, 199, 0.6) 0%, transparent 70%)',
    textClass: 'gold-foil-text-3d',
    subtextColor: '#78716c',
    badgeBorder: 'rgba(202, 138, 4, 0.35)',
    balloonColors: {
      primary: {
        base: '#ca8a04',
        highlight: '#fef08a',
        shadow: '#713f12',
        specular: '#ffffff',
      },
      secondary: {
        base: '#e5e5e5',
        highlight: '#ffffff',
        shadow: '#a3a3a3',
        specular: '#ffffff',
      },
      accent: {
        base: '#d97706',
        highlight: '#fef3c7',
        shadow: '#78350f',
        specular: '#ffffff',
      },
    },
    confettiColors: ['#ca8a04', '#eab308', '#a8a29e', '#fef08a', '#d97706'],
    ribbonColor: '#ca8a04',
    ribbonGradient: 'linear-gradient(135deg, #fef08a, #ca8a04, #eab308, #854d0e)',
    cardBorder: 'rgba(202, 138, 4, 0.25)',
  },
};

export const THEME_KEYS = Object.keys(THEMES) as ThemeId[];

