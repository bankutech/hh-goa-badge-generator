import React, { useState } from 'react';
import {
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  Loader2,
  CloudUpload,
  CheckCircle2,
} from 'lucide-react';
import { BuilderData } from '../../types';
import { downloadBadgeImage, copyBadgeToClipboard } from '../../utils/exportImage';
import { openXShareIntent } from '../../utils/shareToX';
import { triggerGoaConfetti } from '../ui/ConfettiBlast';
import { playSuccessChime, playTactileClick } from '../../utils/audio';

interface ActionButtonsProps {
  data: BuilderData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onReset: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  onOpenCloudinaryModal?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  data,
  cardRef,
  onReset,
  onShowToast,
  onOpenCloudinaryModal,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);

  const handleGenerate = async () => {
    playTactileClick();
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsGenerating(false);
    setJustGenerated(true);
    playSuccessChime();
    triggerGoaConfetti();
    onShowToast('success', '🎉 Your HH Goa 2026 Builder Card is ready!');
    setTimeout(() => setJustGenerated(false), 3000);
  };

  const handleDownload = async () => {
    playTactileClick();
    if (!cardRef.current) {
      onShowToast('error', 'Card preview not found. Please try again.');
      return;
    }
    try {
      setIsDownloading(true);
      const safeName = (data.name || 'builder').toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = `hh-goa-2026-${safeName}-${data.mode}.png`;
      await downloadBadgeImage(cardRef.current, filename, 3);
      playSuccessChime();
      onShowToast('success', `💾 Downloaded: ${filename}`);
      triggerGoaConfetti();
    } catch (err) {
      console.error('Download error:', err);
      onShowToast('error', 'Failed to export. Check image permissions.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyClipboard = async () => {
    playTactileClick();
    if (!cardRef.current) return;
    try {
      setIsCopying(true);
      const ok = await copyBadgeToClipboard(cardRef.current, 2);
      if (ok) {
        playSuccessChime();
        onShowToast('success', '📋 Copied to clipboard!');
      } else {
        onShowToast('info', 'Clipboard copy not supported. Use Download instead.');
      }
    } catch {
      onShowToast('error', 'Could not copy to clipboard.');
    } finally {
      setIsCopying(false);
    }
  };

  const handleShareToX = () => {
    playTactileClick();
    openXShareIntent({ builderData: data });
    onShowToast('info', '🚀 Opening X share composer...');
  };

  return (
    <div className="space-y-4 pt-2">

      {/* ── Primary CTA ── */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`
          group relative w-full py-4 px-6 font-mono font-black text-sm uppercase tracking-widest
          border-4 border-retro-green flex items-center justify-center gap-3
          transition-all duration-150 overflow-hidden
          ${isGenerating
            ? 'bg-retro-green text-retro-cream cursor-wait'
            : justGenerated
              ? 'bg-retro-yellow text-retro-green shadow-brutal cursor-pointer'
              : 'bg-retro-orange text-white shadow-brutal cursor-pointer press-effect'
          }
          disabled:opacity-80
        `}
      >
        {/* Shine sweep animation */}
        {!isGenerating && !justGenerated && (
          <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        )}

        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating your pass...</span>
          </>
        ) : justGenerated ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>Pass Ready! Download below ↓</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Generate {data.mode === 'card' ? 'Builder Card' : 'Profile Frame'}</span>
          </>
        )}
      </button>

      {/* ── Download + Share row ── */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="group py-3 px-4 bg-white border-2 border-retro-green text-retro-green font-mono font-bold text-xs uppercase tracking-wide shadow-brutal-sm press-effect flex items-center justify-center gap-2 disabled:opacity-50 transition-all hover:bg-retro-yellow"
        >
          {isDownloading
            ? <Loader2 className="w-4 h-4 animate-spin text-retro-orange" />
            : <Download className="w-4 h-4 text-retro-orange group-hover:translate-y-0.5 transition-transform" />}
          <span>Download HD</span>
        </button>

        <button
          type="button"
          onClick={handleShareToX}
          className="group py-3 px-4 bg-black border-2 border-retro-green text-white font-mono font-bold text-xs uppercase tracking-wide shadow-brutal-sm press-effect flex items-center justify-center gap-2 hover:bg-neutral-900 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Share on X</span>
        </button>
      </div>

      {/* ── Tertiary row ── */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyClipboard}
          disabled={isCopying}
          className="flex-1 py-2 px-3 bg-white border-2 border-retro-green text-retro-green font-mono font-bold text-[11px] uppercase shadow-brutal-sm press-effect flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
        >
          {isCopying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
          <span>Copy Image</span>
        </button>

        {onOpenCloudinaryModal && (
          <button
            type="button"
            onClick={onOpenCloudinaryModal}
            className="flex-1 py-2 px-3 bg-white border-2 border-retro-green text-retro-green font-mono font-bold text-[11px] uppercase shadow-brutal-sm press-effect flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
          >
            <CloudUpload className="w-3.5 h-3.5 text-retro-orange" />
            <span>Upload OG</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => { playTactileClick(); onReset(); }}
          className="py-2 px-3 bg-white border-2 border-retro-green text-retro-green font-mono font-bold text-[11px] uppercase shadow-brutal-sm press-effect flex items-center justify-center gap-1.5 hover:bg-red-50 transition-colors"
          title="Reset to blank"
        >
          <RotateCcw className="w-3.5 h-3.5 text-red-500" />
          <span>Reset</span>
        </button>
      </div>

      {/* Hashtag reminder */}
      <p className="text-center text-[9px] font-mono font-bold text-retro-green opacity-40 uppercase tracking-widest">
        Remember to use #FrameInGoa &amp; #HHGoa2026 when you post!
      </p>
    </div>
  );
};
