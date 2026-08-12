import { BuilderTitleItem } from '../types';

export const BUILDER_TITLES: BuilderTitleItem[] = [
  // AI & Data
  { title: 'AI Wizard', category: 'AI & Data', emoji: '🧙‍♂️' },
  { title: 'Prompt Engineer', category: 'AI & Data', emoji: '🔮' },
  { title: 'Data Alchemist', category: 'AI & Data', emoji: '⚗️' },
  { title: 'LLM Tactician', category: 'AI & Data', emoji: '🧠' },
  { title: 'Neural Sculptor', category: 'AI & Data', emoji: '🧬' },
  { title: 'Vector Voyager', category: 'AI & Data', emoji: '🚀' },
  { title: 'GPU Whisperer', category: 'AI & Data', emoji: '⚡' },
  { title: 'Synthetic Mind Maker', category: 'AI & Data', emoji: '🤖' },
  { title: 'Autonomous Agent Pilot', category: 'AI & Data', emoji: '🕹️' },
  { title: 'Context Window Optimizer', category: 'AI & Data', emoji: '📜' },
  { title: 'Embedding Enchanter', category: 'AI & Data', emoji: '✨' },

  // Frontend & UI
  { title: 'Frontend Magician', category: 'Frontend & UI', emoji: '🪄' },
  { title: 'Pixel Crafter', category: 'Frontend & UI', emoji: '🎨' },
  { title: 'CSS Sorcerer', category: 'Frontend & UI', emoji: '🌈' },
  { title: 'Design System Architect', category: 'Frontend & UI', emoji: '📐' },
  { title: 'Vibe Architect', category: 'Frontend & UI', emoji: '🌴' },
  { title: 'Animation Maestro', category: 'Frontend & UI', emoji: '🎞️' },
  { title: 'UX Visionary', category: 'Frontend & UI', emoji: '👁️' },
  { title: 'Component Weaver', category: 'Frontend & UI', emoji: '🧩' },
  { title: 'Canvas Conjurer', category: 'Frontend & UI', emoji: '🖌️' },
  { title: 'Micro-Interaction Guru', category: 'Frontend & UI', emoji: '💡' },

  // Backend & Systems
  { title: 'Backend Ninja', category: 'Backend & Systems', emoji: '🥷' },
  { title: 'Bug Hunter', category: 'Backend & Systems', emoji: '🐛' },
  { title: 'Kernel Overlord', category: 'Backend & Systems', emoji: '👑' },
  { title: 'Full-Stack Maestro', category: 'Backend & Systems', emoji: '🎻' },
  { title: 'Async Artisan', category: 'Backend & Systems', emoji: '⏳' },
  { title: 'Rust Crusader', category: 'Backend & Systems', emoji: '🦀' },
  { title: 'Concurrency Kingpin', category: 'Backend & Systems', emoji: '🔄' },
  { title: 'Byte Bender', category: 'Backend & Systems', emoji: '🦾' },
  { title: 'System Synthesizer', category: 'Backend & Systems', emoji: '⚙️' },
  { title: 'Query Optimizer', category: 'Backend & Systems', emoji: '🔍' },
  { title: 'Memory Safety Guardian', category: 'Backend & Systems', emoji: '🛡️' },

  // Web3 & Crypto
  { title: 'Smart Contract Sorcerer', category: 'Web3 & Crypto', emoji: '📜' },
  { title: 'ZK Cryptomancer', category: 'Web3 & Crypto', emoji: '🔐' },
  { title: 'Solana Speedster', category: 'Web3 & Crypto', emoji: '🏎️' },
  { title: 'Consensus Craftsman', category: 'Web3 & Crypto', emoji: '⛓️' },
  { title: 'DeFi Strategist', category: 'Web3 & Crypto', emoji: '💎' },
  { title: 'Protocol Pioneer', category: 'Web3 & Crypto', emoji: '🚩' },
  { title: 'On-Chain Alchemist', category: 'Web3 & Crypto', emoji: '🧪' },
  { title: 'Gas Fee Negotiator', category: 'Web3 & Crypto', emoji: '⛽' },
  { title: 'Node Operator Extraordinaire', category: 'Web3 & Crypto', emoji: '🌐' },
  { title: 'Zero Knowledge Ninja', category: 'Web3 & Crypto', emoji: '🥷' },

  // DevOps & Cloud
  { title: 'Cloud Explorer', category: 'DevOps & Cloud', emoji: '☁️' },
  { title: 'DevOps Samurai', category: 'DevOps & Cloud', emoji: '⚔️' },
  { title: 'Infra Automator', category: 'DevOps & Cloud', emoji: '🏗️' },
  { title: 'Kubernetes Captain', category: 'DevOps & Cloud', emoji: '☸️' },
  { title: 'Pipeline Blacksmith', category: 'DevOps & Cloud', emoji: '🔨' },
  { title: 'Serverless Nomad', category: 'DevOps & Cloud', emoji: '⛺' },
  { title: 'Uptime Sentinel', category: 'DevOps & Cloud', emoji: '⏱️' },
  { title: 'Chaos Engineer', category: 'DevOps & Cloud', emoji: '🌪️' },

  // Wildcard & Hackathon Spirit
  { title: 'Tech Adventurer', category: 'Wildcard', emoji: '🧭' },
  { title: 'Open Source Hero', category: 'Wildcard', emoji: '🦸' },
  { title: 'Hackathon Warrior', category: 'Wildcard', emoji: '🛡️' },
  { title: 'Midnight Coder', category: 'Wildcard', emoji: '🌙' },
  { title: 'Caffeine-Powered Shipper', category: 'Wildcard', emoji: '☕' },
  { title: 'Git Force-Pusher', category: 'Wildcard', emoji: '💥' },
  { title: 'Goa Sunset Builder', category: 'Wildcard', emoji: '🌅' },
  { title: 'Beachside Hacker', category: 'Wildcard', emoji: '🏖️' },
  { title: 'Demo Day Champion', category: 'Wildcard', emoji: '🏆' },
  { title: '48-Hour Miracle Maker', category: 'Wildcard', emoji: '⚡' },
  { title: 'Full-Throttle Prototyper', category: 'Wildcard', emoji: '🚀' },
  { title: 'Terminal Poet', category: 'Wildcard', emoji: '💻' },
  { title: 'Code Crafter', category: 'Wildcard', emoji: '🛠️' },
  { title: 'Speedrunner of MVPs', category: 'Wildcard', emoji: '🏃' },
  { title: 'Feni-Fueled Debugger', category: 'Wildcard', emoji: '🍹' },
];

export const getRandomTitle = (currentTitle?: string): string => {
  const filtered = currentTitle 
    ? BUILDER_TITLES.filter(t => t.title !== currentTitle) 
    : BUILDER_TITLES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex].title;
};

export const getTitleDetails = (titleText: string): BuilderTitleItem => {
  const match = BUILDER_TITLES.find(t => t.title.toLowerCase() === titleText.toLowerCase());
  return match || { title: titleText, category: 'Wildcard', emoji: '⚡' };
};
