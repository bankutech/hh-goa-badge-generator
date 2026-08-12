export type RoleTier = 
  | 'Hacker'
  | 'VIP Builder'
  | 'Speaker'
  | 'Mentor'
  | 'Fellow'
  | 'Core Team'
  | 'Sponsor';

export type GeneratorMode = 'card' | 'frame';

export type LanyardColor = 'orange' | 'violet' | 'emerald' | 'black' | 'yellow' | 'cyan';

export interface PhotoOffset {
  x: number;
  y: number;
  zoom: number;
  rotation: number;
}

export interface BuilderData {
  name: string;
  stack: string;
  title: string;
  roleTier: RoleTier;
  badgeId: string;
  tagline: string;
  photoUrl: string | null;
  photoOffset: PhotoOffset;
  themeId: string;
  frameStyleId: string;
  mode: GeneratorMode;
  showChip: boolean;
  showQr: boolean;
  showLanyard: boolean;
  lanyardColor: LanyardColor;
  stickers: string[];
  isFlipped?: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  primaryGradient: string;
  cardBg: string;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  borderGlow: string;
  textColor: string;
  hologramHue: string;
  swatchGradient: string;
}

export interface FrameStyleConfig {
  id: string;
  name: string;
  description: string;
  ringGradient: string;
  glowEffect: string;
  badgePosition: 'bottom' | 'top' | 'rim';
  motif: 'palm' | 'circuit' | 'cyber' | 'waves';
}

export interface BuilderTitleItem {
  title: string;
  category: 'AI & Data' | 'Frontend & UI' | 'Backend & Systems' | 'Web3 & Crypto' | 'DevOps & Cloud' | 'Wildcard';
  emoji: string;
}

export interface SampleAvatar {
  id: string;
  name: string;
  title: string;
  stack: string;
  roleTier: RoleTier;
  url: string;
  tagline: string;
  themeId: string;
  stickers?: string[];
}
