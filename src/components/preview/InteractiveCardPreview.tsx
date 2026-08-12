import React, { useState, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import { BuilderData } from '../../types';
import { BadgeCard } from './BadgeCard';
import { ProfileFrame } from './ProfileFrame';
import { BadgeLanyard } from './BadgeLanyard';
import { playTactileClick } from '../../utils/audio';

interface InteractiveCardPreviewProps {
  data: BuilderData;
  onFlipToggle?: () => void;
  isFlipped?: boolean;
}

export const InteractiveCardPreview = forwardRef<HTMLDivElement, InteractiveCardPreviewProps>(({
  data,
  onFlipToggle,
  isFlipped = false,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12; // Max 12 deg tilt
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const handleFlip = () => {
    playTactileClick();
    if (onFlipToggle) onFlipToggle();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      {/* Optional Physical Lanyard Strap (Visual only, non-capturing) */}
      {data.mode === 'card' && data.showLanyard && (
        <div className="mb-[-12px] z-30 transition-transform duration-300" style={{ transform: `rotate(${rotateY * 0.4}deg)` }}>
          <BadgeLanyard color={data.lanyardColor || 'orange'} />
        </div>
      )}

      {/* 3D Perspective Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1200px] cursor-grab active:cursor-grabbing p-2 flex items-center justify-center transition-transform"
      >
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          className="relative group"
        >
          {/* Main Card Render Target (Passed ref for html-to-image export) */}
          {data.mode === 'card' ? (
            <BadgeCard
              ref={ref}
              data={data}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          ) : (
            <ProfileFrame
              ref={ref}
              data={data}
            />
          )}

          {/* Dynamic 3D Glare Sheen Reflection on Hover */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 mix-blend-overlay"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`,
            }}
          />
        </motion.div>
      </div>

      {/* Interactive Helper Legend */}
      <div className="mt-3 flex items-center gap-3 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>3D Motion Tilt</span>
        </span>
        {data.mode === 'card' && (
          <>
            <span>•</span>
            <button
              onClick={handleFlip}
              type="button"
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isFlipped ? 'View Front Side' : 'Flip to View Back'}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
});

InteractiveCardPreview.displayName = 'InteractiveCardPreview';
