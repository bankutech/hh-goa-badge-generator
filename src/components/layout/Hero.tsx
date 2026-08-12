import React, { useState, useEffect } from 'react';
import { MapPin, ArrowDown, Palmtree, Waves, Code2 } from 'lucide-react';
import { playTactileClick } from '../../utils/audio';

const MARQUEE_ITEMS = [
  '🌴 MORJIM BEACH GOA',
  '✦ NOV 12–16, 2026',
  '🔥 400+ BUILDERS',
  '💻 SHIP OR GO HOME',
  '🌊 HACK BY THE SEA',
  '⚡ $100K BOUNTIES',
  '🦀 RUST & SOLANA',
  '🤖 AI AGENTS',
  '🎯 DEMO DAY FINALE',
];

export const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-retro-cream border-b-4 border-retro-green">
      {/* Paper grain texture overlay */}
      <div className="absolute inset-0 paper-grain pointer-events-none" />

      {/* Background dots pattern */}
      <div className="absolute inset-0 riso-dots pointer-events-none" />

      {/* Large decorative circle - top right */}
      <div
        className={`absolute -top-24 -right-24 w-64 h-64 rounded-full border-4 border-dashed border-retro-green opacity-20 transition-all duration-700 ${loaded ? 'scale-100 opacity-20' : 'scale-50 opacity-0'}`}
        style={{ transitionDelay: '0.3s' }}
      />
      {/* Small circle - bottom left */}
      <div
        className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full border-4 border-retro-orange opacity-15 transition-all duration-700 ${loaded ? 'scale-100' : 'scale-50'}`}
        style={{ transitionDelay: '0.5s' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-16 sm:pb-10 text-center">

        {/* Live badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-retro-green shadow-brutal-sm mb-6 ${loaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-retro-orange opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-retro-orange" />
          </span>
          <MapPin className="w-3.5 h-3.5 text-retro-orange" />
          <span className="text-[11px] font-mono font-bold text-retro-green uppercase tracking-wide">
            Morjim Beach, Goa &bull; Nov 12–16 2026
          </span>
          <span className="text-[10px] font-black px-2 py-0.5 bg-retro-orange text-white border-l-2 border-retro-green uppercase">
            Live
          </span>
        </div>

        {/* Main heading */}
        <h1 className={`font-display font-black text-5xl sm:text-6xl md:text-8xl text-retro-green leading-[0.95] tracking-tight max-w-3xl mx-auto mb-6 ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}>
          Build hard.{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Stay</span>
            {/* Yellow underline highlight */}
            <span className="absolute bottom-1 left-0 right-0 h-4 bg-retro-yellow -z-0 -rotate-1" />
          </span>{' '}
          humble.
          <br />
          <span className="text-retro-orange">Claim your Goa '26 Pass.</span>
        </h1>

        {/* Subtitle */}
        <p className={`text-sm sm:text-base font-mono font-bold text-retro-green opacity-80 max-w-lg mx-auto leading-relaxed mb-8 ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}>
          Upload your photo, enter your stack, and generate your official HH Goa 2026 Builder Pass or Profile Frame in seconds.
        </p>

        {/* Feature pills */}
        <div className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}>
          {[
            { icon: <Code2 className="w-3.5 h-3.5" />, label: '100% Client-Side' },
            { icon: <Waves className="w-3.5 h-3.5" />, label: 'HEIC Supported' },
            { icon: <Palmtree className="w-3.5 h-3.5" />, label: '4K Ultra PNG' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-retro-green shadow-brutal-sm text-[11px] font-mono font-bold text-retro-green uppercase hover:bg-retro-yellow transition-colors cursor-default"
            >
              <span className="text-retro-orange">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`${loaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <a
            href="#generator"
            onClick={playTactileClick}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-retro-green text-retro-cream font-mono font-black text-sm uppercase tracking-wider border-2 border-retro-green shadow-brutal-orange press-effect"
          >
            <span>Open Badge Studio</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Animated marquee ticker */}
      <div className="border-t-4 border-b-4 border-retro-green bg-retro-green overflow-hidden py-3 mt-2">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-retro-cream font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap px-8"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
