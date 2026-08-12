import React, { useState, useEffect } from 'react';
import { Calendar, Twitter, Volume2, VolumeX } from 'lucide-react';
import { GoaPalmLogo } from '../icons/BadgeIcons';
import { toggleAudioMute, getAudioMuted, playTactileClick } from '../../utils/audio';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(getAudioMuted());
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-12T09:00:00+05:30').getTime();
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggleMute = () => {
    const next = toggleAudioMute();
    setIsMuted(next);
    if (!next) playTactileClick();
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b-2 border-retro-green bg-retro-cream transition-shadow duration-200 ${scrolled ? 'shadow-brutal-sm' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <a
          href="#"
          onClick={() => playTactileClick()}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="p-1.5 rounded-full bg-retro-yellow border-2 border-retro-green shadow-brutal-sm group-hover:rotate-12 transition-transform duration-200">
            <GoaPalmLogo className="w-5 h-5 text-retro-green" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-black text-lg text-retro-green tracking-tight uppercase">HH GOA</span>
              <span className="text-[10px] font-black bg-retro-orange text-white px-1.5 py-0.5 border border-retro-green uppercase">2026</span>
            </div>
            <p className="text-[8px] font-mono font-bold text-retro-green opacity-60 uppercase tracking-widest">
              Hacker House · ID Generator
            </p>
          </div>
        </a>

        {/* Countdown — center */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-retro-green shadow-brutal-sm">
          <Calendar className="w-3.5 h-3.5 text-retro-orange flex-shrink-0" />
          <span className="text-[10px] font-mono font-black text-retro-orange uppercase mr-1">Countdown:</span>
          <div className="flex items-center gap-1 font-mono font-black text-xs text-retro-green">
            <span className="bg-retro-cream px-1.5 py-0.5 border-2 border-retro-green">{pad(timeLeft.days)}d</span>
            <span className="opacity-50">:</span>
            <span className="bg-retro-cream px-1.5 py-0.5 border-2 border-retro-green">{pad(timeLeft.hours)}h</span>
            <span className="opacity-50">:</span>
            <span className="bg-retro-cream px-1.5 py-0.5 border-2 border-retro-green">{pad(timeLeft.minutes)}m</span>
            <span className="opacity-50">:</span>
            <span className="bg-retro-orange text-white px-1.5 py-0.5 border-2 border-retro-green animate-pulse">{pad(timeLeft.seconds)}s</span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleToggleMute}
            className="p-2 bg-white border-2 border-retro-green text-retro-green shadow-brutal-sm hover:bg-retro-yellow transition-colors press-effect"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted
              ? <VolumeX className="w-3.5 h-3.5" />
              : <Volume2 className="w-3.5 h-3.5 text-retro-orange" />}
          </button>

          <a
            href="https://twitter.com/intent/tweet?text=Building%20at%20HH%20Goa%202026%20%F0%9F%8C%B4%20%23FrameInGoa%20%23HHGoa2026"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white border-2 border-retro-green text-retro-green shadow-brutal-sm hover:bg-retro-yellow transition-colors press-effect"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>

          <a
            href="#generator"
            onClick={() => playTactileClick()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-retro-green text-retro-cream font-mono font-black text-[11px] uppercase tracking-wider border-2 border-retro-green shadow-brutal-orange press-effect"
          >
            Make My Pass ↗
          </a>
        </div>
      </div>
    </header>
  );
};
