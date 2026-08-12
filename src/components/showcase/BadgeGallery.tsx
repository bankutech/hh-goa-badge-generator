import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { SAMPLE_AVATARS } from '../../data/sampleAvatars';
import { THEMES } from '../../data/themes';
import { SampleAvatar } from '../../types';
import { GoaPalmLogo } from '../icons/BadgeIcons';
import { playTactileClick } from '../../utils/audio';

interface BadgeGalleryProps {
  onRemixBadge: (sample: SampleAvatar) => void;
}

export const BadgeGallery: React.FC<BadgeGalleryProps> = ({ onRemixBadge }) => {
  return (
    <section id="gallery" className="py-14 sm:py-18 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-orange-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY INSPIRATION</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Featured Goa '26 Builder Passes
            </h2>
            <p className="text-sm text-slate-400 font-sans mt-1">
              Click "Remix Pass" on any design to instantly load their archetype into your studio workbench.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              🌊 400+ Global Builders Confirmed
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_AVATARS.map((sample) => {
            const theme = THEMES.find((t) => t.id === sample.themeId) || THEMES[0];
            return (
              <div
                key={sample.id}
                className="group relative rounded-3xl p-5 border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 transition-all duration-300 backdrop-blur-md overflow-hidden flex flex-col justify-between"
                style={{
                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Glow Backdrop */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl pointer-events-none"
                  style={{ background: theme.primaryGradient }}
                />

                {/* Top Row: Avatar & Role */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl p-[2px] shadow-lg group-hover:scale-105 transition-transform"
                      style={{ background: theme.primaryGradient }}
                    >
                      <img
                        src={sample.url}
                        alt={sample.name}
                        className="w-full h-full rounded-[14px] object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-base text-white group-hover:text-orange-300 transition-colors">
                        {sample.name}
                      </h3>
                      <p className="text-xs font-mono font-bold text-purple-300">
                        {sample.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">
                        {sample.roleTier}
                      </span>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-xl bg-white/5 border border-white/10">
                    <GoaPalmLogo className="w-5 h-5" />
                  </div>
                </div>

                {/* Mid: Tagline & Stack */}
                <div className="my-4 space-y-2">
                  <p className="text-xs font-mono italic text-slate-300 line-clamp-2">
                    "{sample.tagline}"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {sample.stack.split(/[,+]/).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Remix Button */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Theme: {theme.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      onRemixBadge(sample);
                      const genElem = document.getElementById('generator');
                      if (genElem) genElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-mono font-bold text-slate-200 transition-all cursor-pointer group-hover:border-orange-500"
                  >
                    <span>Remix Pass</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
