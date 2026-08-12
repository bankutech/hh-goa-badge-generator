import React from 'react';
import { Check } from 'lucide-react';
import { THEMES } from '../../data/themes';

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedThemeId,
  onSelectTheme,
}) => {
  return (
    <div className="space-y-3 font-mono">
      <label className="block text-xs font-mono font-bold text-retro-green uppercase tracking-wide">
        <span className="text-retro-orange font-extrabold mr-1">07.</span> COLOR & GRADIENT THEME
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {THEMES.map((theme) => {
          const isSelected = theme.id === selectedThemeId;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onSelectTheme(theme.id)}
              className={`group relative p-3 rounded-none border-2 border-retro-green text-left transition-all flex flex-col justify-between cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] ${
                isSelected
                  ? 'bg-retro-yellow ring-2 ring-retro-orange ring-offset-2'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                {/* Gradient Color Swatch Orb */}
                <div
                  className={`w-6 h-6 rounded-full border-2 border-retro-green flex items-center justify-center`}
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {isSelected && <Check className="w-3 h-3 text-retro-green stroke-[3px]" />}
                </div>

                {isSelected && (
                  <span className="text-[10px] font-mono font-bold text-retro-green uppercase">
                    Active
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-extrabold text-retro-green uppercase truncate">
                  {theme.name}
                </p>
                <p className="text-[10px] text-retro-green opacity-80 line-clamp-1 mt-0.5 font-bold uppercase">
                  {theme.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
