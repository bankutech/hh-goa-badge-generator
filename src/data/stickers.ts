export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  badgeText: string;
  bgGradient: string;
  textColor: string;
  borderColor: string;
  rotation: number; // default tilt in degrees
}

export const BADGE_STICKERS: StickerItem[] = [
  {
    id: 'rust',
    name: 'Fearless Rust',
    emoji: '🦀',
    badgeText: 'RUST MAXI',
    bgGradient: 'from-orange-600 to-amber-700',
    textColor: 'text-amber-100',
    borderColor: 'border-orange-400/80',
    rotation: -4,
  },
  {
    id: 'solana',
    name: 'Solana Speed',
    emoji: '⚡',
    badgeText: '400MS FINALITY',
    bgGradient: 'from-purple-600 via-pink-600 to-cyan-400',
    textColor: 'text-white',
    borderColor: 'border-cyan-300/80',
    rotation: 5,
  },
  {
    id: 'goa26',
    name: 'Goa 2026',
    emoji: '🌴',
    badgeText: 'MORJIM HACKER',
    bgGradient: 'from-emerald-600 to-teal-800',
    textColor: 'text-emerald-100',
    borderColor: 'border-emerald-300/80',
    rotation: -3,
  },
  {
    id: 'shipit',
    name: 'Ship It',
    emoji: '🚀',
    badgeText: 'SHIPPED AT 4 AM',
    bgGradient: 'from-rose-600 to-red-700',
    textColor: 'text-white',
    borderColor: 'border-rose-300/80',
    rotation: 6,
  },
  {
    id: 'coffee',
    name: 'Filter Kaapi',
    emoji: '☕',
    badgeText: '100% KAAPI FUEL',
    bgGradient: 'from-amber-800 to-yellow-900',
    textColor: 'text-amber-200',
    borderColor: 'border-amber-400/80',
    rotation: -5,
  },
  {
    id: 'agentic',
    name: 'Agentic Swarm',
    emoji: '🧠',
    badgeText: 'AUTONOMOUS AGENT',
    bgGradient: 'from-indigo-700 via-purple-700 to-pink-600',
    textColor: 'text-cyan-200',
    borderColor: 'border-purple-300/80',
    rotation: 4,
  },
  {
    id: 'zk',
    name: 'Zero Knowledge',
    emoji: '🔐',
    badgeText: 'ZK VERIFIED',
    bgGradient: 'from-slate-800 to-slate-950',
    textColor: 'text-cyan-300',
    borderColor: 'border-cyan-400/80',
    rotation: -6,
  },
  {
    id: 'vibecoder',
    name: 'Vibe Coder',
    emoji: '🌊',
    badgeText: 'VIBE CODING 🌴',
    bgGradient: 'from-cyan-500 to-blue-600',
    textColor: 'text-white',
    borderColor: 'border-cyan-200/80',
    rotation: 3,
  },
];
