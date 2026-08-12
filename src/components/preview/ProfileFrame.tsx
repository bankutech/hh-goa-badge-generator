import { forwardRef } from 'react';
import { BuilderData } from '../../types';
import { GoaPalmLogo } from '../icons/BadgeIcons';

interface ProfileFrameProps {
  data: BuilderData;
  className?: string;
}

export const ProfileFrame = forwardRef<HTMLDivElement, ProfileFrameProps>(({
  data,
  className = '',
}, ref) => {
  return (
    <div
      ref={ref}
      id="profile-frame-capture-target"
      className={`relative w-[360px] sm:w-[380px] h-[360px] sm:h-[380px] flex items-center justify-center select-none ${className}`}
    >
      {/* Outer Dashed Pink Border + Dark Green Inner Circle */}
      <div className="relative w-[300px] h-[300px] rounded-full border-[3px] border-dashed border-retro-orange bg-retro-cream p-1.5 flex items-center justify-center">
        
        {/* Main Dark Green Avatar Area */}
        <div className="w-full h-full rounded-full bg-retro-green overflow-hidden relative shadow-inner">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt={data.name || 'Builder'}
              className="w-full h-full object-cover select-none pointer-events-none grayscale sepia-[0.2] contrast-125 mix-blend-screen opacity-80"
              style={{
                transform: `scale(${data.photoOffset.zoom}) translate(${data.photoOffset.x}px, ${data.photoOffset.y}px) rotate(${data.photoOffset.rotation}deg)`,
                transformOrigin: 'center center',
              }}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
              <div className="w-20 h-20 border-4 border-current rounded-full flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-current rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Top Right Yellow Palm Badge */}
        <div className="absolute top-2 -right-4 w-12 h-12 rounded-full bg-retro-yellow border-2 border-retro-green flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] z-20">
          <GoaPalmLogo className="w-6 h-6 text-retro-green" />
        </div>

        {/* Bottom Left Slanted Builder ID Card */}
        <div className="absolute -bottom-6 -left-12 w-48 h-28 bg-white border-2 border-retro-green shadow-[4px_4px_0px_0px_rgba(15,81,50,1)] z-30 -rotate-6 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-2 bg-retro-green rounded-sm" />
            <div className="w-24 h-1 bg-gray-300 rounded-sm" />
            <div className="w-16 h-1 bg-gray-300 rounded-sm" />
          </div>
          <div className="text-retro-orange font-display font-black text-[11px] tracking-wider uppercase">
            {data.name ? data.name : "BUILDER ID"}
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileFrame.displayName = 'ProfileFrame';
