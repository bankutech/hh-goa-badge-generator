import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Wifi, 
  Layers
} from 'lucide-react';
import { BuilderData } from '../../types';
import { GoaPalmLogo, NfcChipGraphic, LaserBarcode } from '../icons/BadgeIcons';


interface BadgeCardProps {
  data: BuilderData;
  isFlipped?: boolean;
  onFlip?: () => void;
  className?: string;
}

export const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(({
  data,
  isFlipped = false,
  onFlip,
  className = '',
}, ref) => {

  const stackList = (data.stack || 'Full-Stack')
    .split(/[+,•|/]/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div
      ref={ref}
      id="builder-card-capture-target"
      className={`relative w-[340px] sm:w-[360px] h-[480px] sm:h-[500px] bg-white border-4 border-retro-green shadow-[12px_12px_0px_0px_rgba(15,81,50,1)] select-none cursor-pointer transition-all duration-300 font-mono ${className}`}
      onClick={onFlip}
    >
      {!isFlipped ? (
        /* ================= FRONT SIDE ================= */
        <div className="relative w-full h-full flex flex-col justify-between z-10 p-5">
          
          {/* TOP SECTION: Lanyard punch hole & Header Branding */}
          <div>
            {/* Lanyard Attachment Slot Punch */}
            <div className="w-full flex justify-center -mt-2 mb-3">
              <div 
                className="w-16 h-3 rounded-full border-4 border-retro-green bg-retro-cream"
              />
            </div>

            {/* Header Bar */}
            <div className="flex items-center justify-between border-b-4 border-retro-green pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-none bg-retro-yellow border-2 border-retro-green">
                  <GoaPalmLogo className="w-6 h-6 text-retro-green" size={24} />
                </div>
                <div>
                  <h1 className="font-display font-black text-sm tracking-tight uppercase text-retro-green leading-none">
                    Hacker House Goa <span className="text-retro-orange">'26</span>
                  </h1>
                  <p className="text-[9px] font-bold tracking-wider text-retro-green uppercase mt-0.5">
                    MORJIM BEACH • BUILDER PASS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: Avatar & Builder Profile Info */}
          <div className="my-auto space-y-4">
            <div className="flex items-start gap-4">
              
              {/* Profile Avatar with Physical Border */}
              <div className="relative w-24 h-24 flex-shrink-0 border-4 border-retro-green bg-retro-cream shadow-[4px_4px_0px_0px_rgba(244,0,118,1)]">
                <div className="w-full h-full overflow-hidden bg-retro-cream">
                  {data.photoUrl ? (
                    <img
                      src={data.photoUrl}
                      alt={data.name || 'Builder Avatar'}
                      className="w-full h-full object-cover select-none pointer-events-none grayscale sepia-[0.2] contrast-125 mix-blend-multiply opacity-90"
                      style={{
                        transform: `scale(${data.photoOffset.zoom}) translate(${data.photoOffset.x}px, ${data.photoOffset.y}px) rotate(${data.photoOffset.rotation}deg)`,
                        transformOrigin: 'center center',
                      }}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-retro-green p-1">
                      <GoaPalmLogo className="w-8 h-8 opacity-40 mb-1" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">No Photo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Archetype Details */}
              <div className="flex-1 min-w-0 pt-1">
                {/* Role Tier Badge */}
                <div className="inline-block px-2 py-0.5 border-2 border-retro-green bg-retro-orange text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] truncate max-w-full">
                  {data.roleTier}
                </div>

                {/* Builder Name */}
                <h2 className="font-display font-black text-3xl text-retro-green tracking-tight leading-none break-words line-clamp-2 uppercase">
                  {data.name || 'Anonymous'}
                </h2>

                {/* Builder Title Archetype */}
                <p className="font-bold text-xs text-retro-orange mt-1.5 break-words line-clamp-2 uppercase tracking-wide">
                  {data.title || 'Hacker House Resident'}
                </p>
              </div>
            </div>

            {/* Custom Tagline Quote */}
            {data.tagline && (
              <div className="p-3 border-2 border-retro-green bg-retro-cream text-retro-green font-bold italic line-clamp-2 text-[11px] shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] uppercase">
                "{data.tagline}"
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 text-retro-green opacity-80">
                <Layers className="w-3 h-3 text-retro-orange" />
                <span>DEPLOYMENT ARSENAL</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {stackList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white border-2 border-retro-green text-retro-green text-[10px] font-extrabold tracking-tight uppercase shadow-[1px_1px_0px_0px_rgba(15,81,50,1)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Hardware Chip, QR Code & Barcode */}
          <div className="border-t-4 border-retro-green pt-3 space-y-3">
            <div className="flex items-center justify-between">
              
              {/* NFC Chip & Verification */}
              {data.showChip && (
                <div className="flex items-center gap-2">
                  <div className="bg-retro-cream p-1 border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)]">
                    <NfcChipGraphic className="w-10 h-7 fill-retro-green" />
                  </div>
                  <div className="text-[8px] font-extrabold text-retro-green leading-tight uppercase tracking-wider">
                    <p className="text-retro-orange">NFC PASS</p>
                    <p>TAP TO CONNECT</p>
                  </div>
                </div>
              )}

              {/* QR Code — always visible, properly sized to be scannable */}
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 border-4 border-retro-green bg-white shadow-[3px_3px_0px_0px_rgba(10,100,50,1)]">
                  <QRCodeSVG
                    value={`https://hhgoa2026.com/verify/${data.badgeId || 'HH-GOA-2026'}`}
                    size={72}
                    level="M"
                    fgColor="#0a6432"
                    bgColor="#ffffff"
                    marginSize={1}
                  />
                </div>
                <p className="text-[7px] font-mono font-extrabold text-retro-green uppercase tracking-wider opacity-70">Scan to verify</p>
              </div>
            </div>

            {/* Laser Barcode & Serial Number */}
            <div className="w-full flex items-center justify-between text-[8px] font-bold text-retro-green pt-1">
              <LaserBarcode className="w-36 h-4 opacity-100 fill-retro-green" />
              <span className="tracking-widest font-extrabold uppercase">
                {data.badgeId || 'HH-GOA-2026'}
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* ================= BACK SIDE ================= */
        <div className="relative w-full h-full p-5 flex flex-col justify-between z-10 bg-retro-cream">
          <div>
            {/* Top Lanyard Slot */}
            <div className="w-full flex justify-center -mt-2 mb-3">
              <div 
                className="w-16 h-3 rounded-full border-4 border-retro-green bg-white"
              />
            </div>

            <div className="text-center border-b-4 border-retro-green pb-3 mb-4">
              <h3 className="font-display font-black text-xl text-retro-green uppercase tracking-wider">
                HACKER HOUSE GOA <span className="text-retro-orange">'26</span>
              </h3>
              <p className="text-[10px] font-bold text-retro-green uppercase tracking-widest mt-1">
                RESIDENT BUILDER PASS DETAILS
              </p>
            </div>

            {/* Event Highlights & Rules */}
            <div className="space-y-4 text-[10px] font-bold text-retro-green uppercase">
              <div className="p-3 bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] space-y-1">
                <div className="flex items-center gap-1.5 text-retro-orange font-black text-xs mb-1">
                  <Wifi className="w-4 h-4" />
                  <span>BEACH RESORT WI-FI</span>
                </div>
                <p>SSID: <span className="font-black">HH-GOA-5GHZ-FAST</span></p>
                <p>KEY: <span className="font-black text-retro-orange">shiphardstayhumble2026</span></p>
              </div>

              <div className="p-3 bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] space-y-1">
                <div className="flex items-center gap-1.5 text-retro-orange font-black text-xs mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>HACKATHON BASECAMP</span>
                </div>
                <p>Morjim Beach Resort & Hack Villa</p>
                <p>Goa 403512, India</p>
              </div>

              <div className="p-3 bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(15,81,50,1)] space-y-1">
                <div className="flex items-center gap-1.5 text-retro-orange font-black text-xs mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>DEMO DAY FINALE</span>
                </div>
                <p>Nov 16, 2026 • 4:00 PM IST</p>
                <p>$100K+ Prizes & VC Investor Pitches</p>
              </div>
            </div>
          </div>

          {/* Builder Code Manifesto */}
          <div className="border-t-4 border-retro-green pt-3 text-center">
            <p className="text-[9px] font-black text-retro-orange uppercase tracking-widest mb-1.5">
              BUILDER MANIFESTO
            </p>
            <p className="text-[10px] font-bold italic leading-snug text-retro-green uppercase">
              "Ship rough prototypes over polished slides. Vibe by the sea, deploy to mainnet."
            </p>
            <div className="mt-4 text-[8px] font-extrabold flex items-center justify-center gap-1 text-retro-green opacity-70">
              <Sparkles className="w-2.5 h-2.5" />
              <span>TAP ANYWHERE TO FLIP FRONT</span>
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
});

BadgeCard.displayName = 'BadgeCard';
