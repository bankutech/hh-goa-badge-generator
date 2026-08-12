import React from 'react';
import { Twitter, Github, Heart } from 'lucide-react';
import { GoaPalmLogo } from '../icons/BadgeIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-4 border-retro-green bg-retro-cream py-12 relative overflow-hidden text-retro-green font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-retro-green">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <div className="p-2 border-2 border-retro-green bg-white shadow-[2px_2px_0px_0px_rgba(10,100,50,1)]">
              <GoaPalmLogo className="w-8 h-8 text-retro-green" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display font-black text-xl text-retro-green uppercase">HH GOA</span>
                <span className="text-xs font-mono font-black text-retro-orange bg-white px-2 py-0.5 border-2 border-retro-green uppercase shadow-[2px_2px_0px_0px_rgba(10,100,50,1)]">
                  2026
                </span>
              </div>
              <p className="text-xs font-bold text-retro-green uppercase mt-1 opacity-90">
                Official Builder Card Generator
              </p>
            </div>
          </div>

          {/* Social Links & Hashtags */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-black text-retro-green uppercase">
              #FrameInGoa
            </span>
            <a
              href="https://twitter.com/intent/tweet?text=Building%20at%20HH%20Goa%202026%20%F0%9F%8C%B4%20%23FrameInGoa%20%23HHGoa2026"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-retro-yellow border-2 border-retro-green text-retro-green transition-colors shadow-[2px_2px_0px_0px_rgba(10,100,50,1)]"
              title="Post on X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-retro-yellow border-2 border-retro-green text-retro-green transition-colors shadow-[2px_2px_0px_0px_rgba(10,100,50,1)]"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-retro-green uppercase text-center sm:text-left opacity-80">
          <div className="flex items-center justify-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-retro-orange fill-current" />
            <span>for the builder community • Morjim Beach</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span>Nov 12-16, 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Free & Open Source</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
