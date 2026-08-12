import React from 'react';
import { CreditCard, UserCheck } from 'lucide-react';
import { GeneratorMode } from '../../types';

interface ModeSwitcherProps {
  mode: GeneratorMode;
  onModeChange: (mode: GeneratorMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onModeChange }) => {
  return (
    <div className="w-full bg-white p-1.5 rounded-none border-2 border-retro-green flex items-center shadow-[4px_4px_0px_0px_rgba(15,81,50,1)]">
      <button
        type="button"
        onClick={() => onModeChange('card')}
        className={`relative flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-extrabold transition-all border-2 border-transparent uppercase font-mono ${
          mode === 'card' 
            ? 'bg-retro-orange text-white border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] translate-x-[1px] translate-y-[1px]' 
            : 'text-retro-green hover:bg-retro-yellow hover:border-retro-green hover:shadow-[2px_2px_0px_0px_rgba(15,81,50,1)]'
        }`}
      >
        <CreditCard className="w-4 h-4" />
        <span>Builder Card</span>
        <span className={`text-[10px] font-mono px-1.5 py-0.2 ml-1 ${mode === 'card' ? 'bg-white text-retro-orange' : 'bg-retro-green text-white'}`}>
          BADGE
        </span>
      </button>

      <button
        type="button"
        onClick={() => onModeChange('frame')}
        className={`relative flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-extrabold transition-all border-2 border-transparent uppercase font-mono ${
          mode === 'frame' 
            ? 'bg-retro-orange text-white border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] translate-x-[1px] translate-y-[1px]' 
            : 'text-retro-green hover:bg-retro-yellow hover:border-retro-green hover:shadow-[2px_2px_0px_0px_rgba(15,81,50,1)]'
        }`}
      >
        <UserCheck className="w-4 h-4" />
        <span>Profile Frame</span>
        <span className={`text-[10px] font-mono px-1.5 py-0.2 ml-1 ${mode === 'frame' ? 'bg-white text-retro-orange' : 'bg-retro-green text-white'}`}>
          PFP
        </span>
      </button>
    </div>
  );
};
