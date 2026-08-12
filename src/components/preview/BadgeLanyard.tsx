import React from 'react';
import { LanyardColor } from '../../types';

interface BadgeLanyardProps {
  color?: LanyardColor;
  className?: string;
}

export const BadgeLanyard: React.FC<BadgeLanyardProps> = ({
  color = 'orange',
  className = '',
}) => {
  const getLanyardStyle = () => {
    switch (color) {
      case 'violet':
        return {
          strapBg: 'bg-violet-700',
          textColor: 'text-violet-200',
          pattern: 'repeating-linear-gradient(45deg, #6d28d9, #6d28d9 4px, #5b21b6 4px, #5b21b6 8px)',
        };
      case 'emerald':
        return {
          strapBg: 'bg-emerald-700',
          textColor: 'text-emerald-200',
          pattern: 'repeating-linear-gradient(45deg, #047857, #047857 4px, #065f46 4px, #065f46 8px)',
        };
      case 'black':
        return {
          strapBg: 'bg-slate-900',
          textColor: 'text-slate-400',
          pattern: 'repeating-linear-gradient(45deg, #0f172a, #0f172a 4px, #020617 4px, #020617 8px)',
        };
      case 'yellow':
        return {
          strapBg: 'bg-amber-500',
          textColor: 'text-slate-950 font-bold',
          pattern: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 4px, #d97706 4px, #d97706 8px)',
        };
      case 'cyan':
        return {
          strapBg: 'bg-cyan-600',
          textColor: 'text-cyan-100 font-bold',
          pattern: 'repeating-linear-gradient(45deg, #0891b2, #0891b2 4px, #0e7490 4px, #0e7490 8px)',
        };
      case 'orange':
      default:
        return {
          strapBg: 'bg-orange-600',
          textColor: 'text-orange-100',
          pattern: 'repeating-linear-gradient(45deg, #ea580c, #ea580c 4px, #c2410c 4px, #c2410c 8px)',
        };
    }
  };

  const style = getLanyardStyle();

  return (
    <div className={`flex flex-col items-center select-none pointer-events-none ${className}`}>
      {/* Woven Fabric Strap Top (Dangles into view) */}
      <div
        className="w-16 h-12 rounded-t-sm relative overflow-hidden shadow-xl border-x border-black/30 flex items-center justify-center"
        style={{
          background: style.pattern,
          boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)',
        }}
      >
        {/* Subtle fabric weave overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]" />
        
        {/* Vertical printed text on strap */}
        <span
          className={`text-[9px] font-mono uppercase tracking-[0.25em] font-extrabold rotate-90 whitespace-nowrap drop-shadow-sm ${style.textColor}`}
        >
          HH GOA '26
        </span>
      </div>

      {/* Metal Clamp / Carabiner Hardware */}
      <div className="flex flex-col items-center -mt-0.5 z-20">
        {/* Metal Crimp */}
        <div 
          className="w-12 h-3.5 rounded-sm border border-slate-400/50 shadow-md flex items-center justify-around px-1"
          style={{
            background: 'linear-gradient(180deg, #e2e8f0 0%, #94a3b8 50%, #475569 100%)',
          }}
        >
          <div className="w-1 h-2 rounded-full bg-slate-700/60" />
          <div className="w-1 h-2 rounded-full bg-slate-700/60" />
          <div className="w-1 h-2 rounded-full bg-slate-700/60" />
        </div>

        {/* Steel Oval Ring / Carabiner */}
        <div 
          className="w-5 h-7 rounded-full border-4 border-slate-300 shadow-lg -mt-1 relative flex items-center justify-center"
          style={{
            background: 'transparent',
            borderColor: '#cbd5e1',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 3px 6px rgba(0,0,0,0.6)',
          }}
        >
          {/* Subtle metallic reflection */}
          <div className="absolute inset-0 rounded-full border-t-2 border-white/80" />
        </div>
      </div>
    </div>
  );
};
