import React from 'react';
import { BADGE_STICKERS } from '../../data/stickers';

interface BadgeStickersProps {
  selectedStickerIds: string[];
  className?: string;
}

export const BadgeStickers: React.FC<BadgeStickersProps> = ({
  selectedStickerIds,
  className = '',
}) => {
  if (!selectedStickerIds || selectedStickerIds.length === 0) return null;

  const stickers = selectedStickerIds
    .map((id) => BADGE_STICKERS.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className={`absolute inset-0 pointer-events-none z-30 overflow-hidden ${className}`}>
      {stickers.map((sticker, idx) => {
        if (!sticker) return null;
        
        // Dynamic positioning positions across corners and edges
        const positions = [
          'top-28 right-4',
          'bottom-16 right-5',
          'top-48 right-3',
          'bottom-24 left-4',
          'top-36 left-4',
        ];
        const posClass = positions[idx % positions.length];

        return (
          <div
            key={sticker.id}
            className={`absolute ${posClass} transition-all duration-300 transform hover:scale-105`}
            style={{
              transform: `rotate(${sticker.rotation}deg)`,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6)) drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
            }}
          >
            {/* Realistic Vinyl Die-Cut Sticker with white border */}
            <div
              className={`px-2.5 py-1 rounded-lg bg-gradient-to-r ${sticker.bgGradient} border-2 border-white text-white flex items-center gap-1.5 shadow-inner`}
              style={{
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.4)',
              }}
            >
              <span className="text-xs">{sticker.emoji}</span>
              <span className="text-[9px] font-mono font-black uppercase tracking-wider whitespace-nowrap">
                {sticker.badgeText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
