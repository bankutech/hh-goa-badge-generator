import React from 'react';

/**
 * Official Hacker House Goa Cyber Palm Logo
 */
export const GoaPalmLogo: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-8 h-8", 
  size 
}) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="palmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Cyber Sunset Half Disc */}
      <circle cx="32" cy="38" r="16" fill="url(#sunGrad)" opacity="0.35" />
      <path d="M16 38 H48" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
      <path d="M19 42 H45" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
      <path d="M24 46 H40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 2" opacity="0.4" />

      {/* Cyber Palm Trunk */}
      <path
        d="M32 54 C31 46 33 34 32 25"
        stroke="url(#palmGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Palm Fronds */}
      {/* Top Left */}
      <path
        d="M32 25 C24 20 16 22 10 27"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Mid Left */}
      <path
        d="M32 26 C22 28 14 34 11 41"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* High Left */}
      <path
        d="M32 25 C28 14 22 10 16 12"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Top Right */}
      <path
        d="M32 25 C40 20 48 22 54 27"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Mid Right */}
      <path
        d="M32 26 C42 28 50 34 53 41"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* High Right */}
      <path
        d="M32 25 C36 14 42 10 48 12"
        stroke="url(#palmGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Central Node / Spark */}
      <circle cx="32" cy="25" r="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="25" r="4" stroke="#00F2FE" strokeWidth="1" opacity="0.8" />
    </svg>
  );
};

/**
 * Gold IC Smart Card Chip contact simulation
 */
export const NfcChipGraphic: React.FC<{ className?: string }> = ({ className = "w-10 h-8" }) => {
  return (
    <div className={`relative rounded-md overflow-hidden p-[1px] bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 shadow-inner ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-[4px] p-1 flex flex-col justify-between">
        {/* Chip contact traces */}
        <div className="flex justify-between h-[30%]">
          <div className="w-[45%] border-r border-b border-amber-900/40" />
          <div className="w-[45%] border-l border-b border-amber-900/40" />
        </div>
        <div className="h-[25%] border-y border-amber-900/40 rounded-sm bg-amber-500/50 mx-1" />
        <div className="flex justify-between h-[30%]">
          <div className="w-[45%] border-r border-t border-amber-900/40" />
          <div className="w-[45%] border-l border-t border-amber-900/40" />
        </div>
      </div>
    </div>
  );
};

/**
 * Laser Barcode graphic
 */
export const BarcodeSvg: React.FC<{ code?: string; className?: string }> = ({ 
  code = "HH-GOA-2026", 
  className = "w-28 h-6" 
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 120 24" className="w-full h-full text-white/70" fill="currentColor">
        <rect x="2" y="0" width="3" height="24" />
        <rect x="7" y="0" width="1.5" height="24" />
        <rect x="11" y="0" width="4" height="24" />
        <rect x="17" y="0" width="2" height="24" />
        <rect x="21" y="0" width="1" height="24" />
        <rect x="24" y="0" width="5" height="24" />
        <rect x="31" y="0" width="2" height="24" />
        <rect x="35" y="0" width="1.5" height="24" />
        <rect x="38" y="0" width="4" height="24" />
        <rect x="44" y="0" width="2" height="24" />
        <rect x="48" y="0" width="6" height="24" />
        <rect x="56" y="0" width="2" height="24" />
        <rect x="60" y="0" width="1.5" height="24" />
        <rect x="63" y="0" width="3" height="24" />
        <rect x="68" y="0" width="2" height="24" />
        <rect x="72" y="0" width="4" height="24" />
        <rect x="78" y="0" width="1.5" height="24" />
        <rect x="81" y="0" width="5" height="24" />
        <rect x="88" y="0" width="2" height="24" />
        <rect x="92" y="0" width="3" height="24" />
        <rect x="97" y="0" width="1.5" height="24" />
        <rect x="101" y="0" width="4" height="24" />
        <rect x="107" y="0" width="2" height="24" />
        <rect x="111" y="0" width="5" height="24" />
        <rect x="117" y="0" width="2" height="24" />
      </svg>
      {code && (
        <span className="text-[7px] font-mono tracking-widest text-white/50 uppercase mt-0.5">
          {code}
        </span>
      )}
    </div>
  );
};

export const LaserBarcode = BarcodeSvg;

/**
 * Official Hologram Seal Stamp
 */
export const HologramSeal: React.FC<{ tier?: string; className?: string }> = ({ 
  tier = "VERIFIED", 
  className = "w-14 h-14" 
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer rotating dashed ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-spin-slow" />
      {/* Inner solid ring */}
      <div className="w-[85%] h-[85%] rounded-full border border-white/40 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xs p-1 text-center">
        <span className="text-[6px] font-mono font-bold tracking-wider text-orange-400 uppercase">HH GOA</span>
        <span className="text-[8px] font-display font-extrabold tracking-tighter text-white uppercase">{tier}</span>
        <span className="text-[6px] font-mono tracking-widest text-purple-300">2026</span>
      </div>
    </div>
  );
};
