import React, { useState } from 'react';
import { 
  Dices, 
  Sparkles, 
  Code2, 
  User, 
  Quote, 
  Hash, 
  RefreshCw, 
  ChevronDown
} from 'lucide-react';
import { BuilderData, RoleTier, LanyardColor } from '../../types';
import { getRandomTitle } from '../../data/builderTitles';
import { TECH_PILLS, TAGLINE_SUGGESTIONS } from '../../data/techStacks';
import { playDiceRoll, playTactileClick } from '../../utils/audio';

interface FormControlsProps {
  data: BuilderData;
  onChange: (fields: Partial<BuilderData>) => void;
}

const ROLE_TIERS: RoleTier[] = [
  'Hacker',
  'VIP Builder',
  'Speaker',
  'Mentor',
  'Core Team',
  'Fellow',
];

const LANYARD_COLORS: { id: LanyardColor; name: string; bg: string }[] = [
  { id: 'orange', name: 'Goa Sunset', bg: 'bg-orange-600' },
  { id: 'violet', name: 'Cyber Violet', bg: 'bg-violet-700' },
  { id: 'emerald', name: 'Forest Mint', bg: 'bg-emerald-600' },
  { id: 'black', name: 'Stealth Black', bg: 'bg-slate-900 border border-white/20' },
  { id: 'yellow', name: 'Hazard Gold', bg: 'bg-amber-500' },
  { id: 'cyan', name: 'Ocean Cyan', bg: 'bg-cyan-600' },
];

export const FormControls: React.FC<FormControlsProps> = ({ data, onChange }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [showStackPills, setShowStackPills] = useState(false);
  const [showTaglines, setShowTaglines] = useState(false);

  const handleRollTitle = () => {
    playDiceRoll();
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      onChange({ title: getRandomTitle(data.title) });
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 60);
  };

  const handleRegenerateBadgeId = () => {
    playTactileClick();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    onChange({ badgeId: `HH-GOA-${randomNum}` });
  };

  const addTechPill = (tech: string) => {
    playTactileClick();
    if (!data.stack) {
      onChange({ stack: tech });
    } else {
      const currentList = data.stack.split(/[,+]/).map(s => s.trim());
      if (!currentList.includes(tech)) {
        onChange({ stack: `${data.stack} + ${tech}` });
      }
    }
  };



  const labelClass = "block text-xs font-mono font-bold text-retro-green uppercase mb-1.5 tracking-wide";
  const numClass = "text-retro-orange font-extrabold mr-1";
  const inputWrapperClass = "relative rounded-none bg-white border-2 border-retro-green focus-within:border-retro-orange focus-within:ring-2 focus-within:ring-retro-orange/30 transition-all shadow-[2px_2px_0px_0px_rgba(15,81,50,1)]";
  const inputClass = "w-full pl-10 pr-4 py-3 bg-transparent text-sm font-bold text-retro-green placeholder-gray-400 focus:outline-none";

  return (
    <div className="space-y-6 font-mono">
      {/* 1. Name Input */}
      <div>
        <label className={labelClass}>
          <span className={numClass}>01.</span> YOUR NAME
        </label>
        <div className={inputWrapperClass}>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-retro-green">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Satoshi Nakamoto"
            maxLength={32}
            className={inputClass}
          />
        </div>
      </div>

      {/* 2. Builder Title */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelClass + " mb-0"}>
            <span className={numClass}>02.</span> BUILDER TITLE
          </label>
          <button
            type="button"
            onClick={handleRollTitle}
            disabled={isRolling}
            className="text-[11px] font-mono font-bold text-retro-orange hover:text-white hover:bg-retro-orange flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-retro-green transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] bg-white uppercase"
          >
            <Dices className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Shuffle</span>
          </button>
        </div>

        <div className={inputWrapperClass}>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-retro-orange">
            <Sparkles className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Autonomous Agent Architect"
            maxLength={35}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleRollTitle}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-retro-green hover:text-retro-orange transition-colors cursor-pointer"
            title="Roll new title"
          >
            <Dices className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Title Badges */}
        <div className="flex flex-wrap gap-2 pt-3">
          {['Autonomous Agent Architect', 'Solana Speedster', 'Frontend Magician', 'Kernel Hacker', 'ZK Cryptomancer', 'Infra Gremlin'].map(
            (presetTitle) => (
              <button
                key={presetTitle}
                type="button"
                onClick={() => {
                  playTactileClick();
                  onChange({ title: presetTitle });
                }}
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-none border-2 border-retro-green transition-all cursor-pointer uppercase shadow-[1px_1px_0px_0px_rgba(15,81,50,1)] ${
                  data.title === presetTitle
                    ? 'bg-retro-orange text-white'
                    : 'bg-white text-retro-green hover:bg-retro-yellow'
                }`}
              >
                {presetTitle}
              </button>
            )
          )}
        </div>
      </div>

      {/* 3. Tech Stack / Role */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={labelClass + " mb-0"}>
            <span className={numClass}>03.</span> TECH ARSENAL / TOOLS
          </label>
          <button
            type="button"
            onClick={() => {
              playTactileClick();
              setShowStackPills(!showStackPills);
            }}
            className="text-[10px] font-mono text-retro-green font-bold hover:text-retro-orange flex items-center gap-1 transition-colors cursor-pointer uppercase"
          >
            <span>{showStackPills ? 'Hide Stack Pills' : 'Quick Stack Pills'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showStackPills ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className={inputWrapperClass}>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-retro-green">
            <Code2 className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={data.stack}
            onChange={(e) => onChange({ stack: e.target.value })}
            placeholder="e.g. Rust + Solana + PyTorch + Next.js"
            maxLength={45}
            className={inputClass}
          />
        </div>

        {/* Suggested Tech Pills */}
        {showStackPills && (
          <div className="p-4 mt-3 rounded-none bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] space-y-3">
            <p className="text-[10px] font-mono font-bold text-retro-green uppercase">Click to append to stack:</p>
            <div className="flex flex-wrap gap-2">
              {TECH_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => addTechPill(pill)}
                  className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-full border-2 border-retro-green bg-white text-retro-green hover:bg-retro-yellow transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,81,50,1)]"
                >
                  +{pill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Role Tier Selector */}
      <div>
        <label className={labelClass}>
          <span className={numClass}>04.</span> ATTENDEE ROLE TIER
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ROLE_TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => {
                playTactileClick();
                onChange({ roleTier: tier });
              }}
              className={`py-2.5 px-2 rounded-none text-[11px] font-mono font-extrabold uppercase tracking-wide transition-all border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] text-center cursor-pointer ${
                data.roleTier === tier
                  ? 'bg-retro-orange text-white translate-y-[1px] translate-x-[1px] shadow-[1px_1px_0px_0px_rgba(15,81,50,1)]'
                  : 'bg-white text-retro-green hover:bg-retro-yellow'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>


      {/* 5. Physical Lanyard Customization */}
      {data.mode === 'card' && (
        <div className="p-4 rounded-none bg-white border-2 border-retro-green shadow-[4px_4px_0px_0px_rgba(15,81,50,1)]">
          <div className="flex items-center justify-between mb-2">
            <span className={labelClass + " mb-0"}>
              <span className={numClass}>05.</span> WOVEN LANYARD STRAP
            </span>
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                onChange({ showLanyard: !data.showLanyard });
              }}
              className="text-[10px] font-mono font-bold text-retro-orange hover:text-retro-green uppercase cursor-pointer underline"
            >
              {data.showLanyard ? 'Hide Lanyard' : 'Show Lanyard'}
            </button>
          </div>

          {data.showLanyard && (
            <div className="flex items-center gap-3 pt-2">
              {LANYARD_COLORS.map((lc) => (
                <button
                  key={lc.id}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onChange({ lanyardColor: lc.id });
                  }}
                  className={`w-8 h-8 rounded-full border-2 border-retro-green ${lc.bg} transition-all cursor-pointer flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] ${
                    data.lanyardColor === lc.id
                      ? 'scale-110 ring-2 ring-retro-orange ring-offset-2'
                      : 'hover:scale-105'
                  }`}
                  title={lc.name}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Custom Tagline & Badge ID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Custom Tagline */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass + " mb-0"}>
              <span className={numClass}>06.</span> TAGLINE / QUOTE
            </label>
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setShowTaglines(!showTaglines);
              }}
              className="text-[9px] font-mono font-bold text-retro-green hover:text-retro-orange uppercase cursor-pointer"
            >
              {showTaglines ? 'Hide' : 'Presets'}
            </button>
          </div>
          <div className={inputWrapperClass}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-retro-green">
              <Quote className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => onChange({ tagline: e.target.value })}
              placeholder="e.g. Vibe by the sea, deploy to mainnet 🌴"
              maxLength={45}
              className="w-full pl-9 pr-3 py-3 bg-transparent text-xs font-bold text-retro-green placeholder-gray-400 focus:outline-none"
            />
          </div>

          {showTaglines && (
            <div className="p-3 mt-2 rounded-none bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] space-y-2">
              {TAGLINE_SUGGESTIONS.slice(0, 4).map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onChange({ tagline: tag });
                    setShowTaglines(false);
                  }}
                  className="w-full text-left text-[9px] font-bold font-mono uppercase p-2 border-2 border-transparent hover:border-retro-green hover:bg-retro-yellow text-retro-green truncate transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Badge Pass ID */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass + " mb-0"}>
              <span className={numClass}>07.</span> BADGE PASS ID
            </label>
            <button
              type="button"
              onClick={handleRegenerateBadgeId}
              className="text-[9px] font-mono font-bold text-retro-orange hover:text-retro-green flex items-center gap-1 uppercase cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>New ID</span>
            </button>
          </div>
          <div className={inputWrapperClass}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-retro-green">
              <Hash className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={data.badgeId}
              onChange={(e) => onChange({ badgeId: e.target.value })}
              maxLength={20}
              className="w-full pl-9 pr-3 py-3 bg-transparent text-xs font-mono font-bold text-retro-green placeholder-gray-400 focus:outline-none uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
