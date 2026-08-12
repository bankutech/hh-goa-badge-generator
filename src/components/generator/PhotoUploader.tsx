import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  Sliders,
  RotateCcw,
  ZoomIn,
  Move,
  Loader2,
  CheckCircle2,
  Sparkles,
  ImageIcon,
} from 'lucide-react';
import { PhotoOffset, SampleAvatar } from '../../types';
import { processAndCompressImage, formatFileSize } from '../../utils/imageProcessor';
import { SAMPLE_AVATARS } from '../../data/sampleAvatars';

interface PhotoUploaderProps {
  photoUrl: string | null;
  photoOffset: PhotoOffset;
  onPhotoChange: (url: string | null) => void;
  onOffsetChange: (offset: PhotoOffset) => void;
  onApplySampleAvatar?: (sample: SampleAvatar) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photoUrl,
  photoOffset,
  onPhotoChange,
  onOffsetChange,
  onApplySampleAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [compressionStats, setCompressionStats] = useState<{ original: string; compressed: string } | null>(null);
  const [showSliders, setShowSliders] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    try {
      setIsProcessing(true);
      setProcessingProgress(10);
      const result = await processAndCompressImage(file, (p) => setProcessingProgress(p));
      onPhotoChange(result.dataUrl);
      onOffsetChange({ x: 0, y: 0, zoom: 1, rotation: 0 });
      setCompressionStats({
        original: formatFileSize(result.originalSize),
        compressed: formatFileSize(result.compressedSize),
      });
      setShowSliders(true);
    } catch (err) {
      console.error(err);
      alert('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const resetAlignment = () => onOffsetChange({ x: 0, y: 0, zoom: 1, rotation: 0 });



  return (
    <div className="space-y-5">

      {/* Section label */}
      <div className="flex items-center gap-2">
        <span className="text-retro-orange font-black text-sm">01.</span>
        <span className="text-xs font-mono font-black text-retro-green uppercase tracking-wide">Your Photo</span>
        {compressionStats && (
          <span className="ml-auto flex items-center gap-1 text-[9px] font-mono font-bold text-retro-green opacity-60 uppercase">
            <CheckCircle2 className="w-3 h-3 text-retro-orange" />
            {compressionStats.original} → {compressionStats.compressed}
          </span>
        )}
      </div>

      {/* Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative group cursor-pointer border-2 border-dashed p-6 transition-all duration-200
          flex flex-col items-center justify-center text-center overflow-hidden
          ${isDragging
            ? 'border-retro-orange bg-retro-orange/5 scale-[1.01]'
            : photoUrl
              ? 'border-retro-green bg-retro-yellow/10 hover:bg-retro-yellow/20'
              : 'border-retro-green bg-gray-50 hover:border-retro-orange hover:bg-orange-50/30'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp,image/heic,image/heif"
          onChange={handleInputChange}
          className="hidden"
        />

        {isProcessing ? (
          <div className="py-4 flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-retro-orange animate-spin" />
            <div className="w-48 h-2 bg-retro-cream border-2 border-retro-green overflow-hidden">
              <div
                className="bg-retro-orange h-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <p className="text-xs font-mono font-bold text-retro-green uppercase">
              Processing… {processingProgress}%
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className={`
              w-14 h-14 flex items-center justify-center border-2 border-retro-green
              bg-white shadow-brutal-sm group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px]
              transition-all duration-150
              ${photoUrl ? 'text-retro-orange' : 'text-retro-green'}
            `}>
              {photoUrl
                ? <ImageIcon className="w-7 h-7" />
                : <UploadCloud className="w-7 h-7" />}
            </div>

            <div>
              <p className="text-sm font-black text-retro-green uppercase tracking-wide">
                {photoUrl ? 'Click to change photo' : 'Drop or click to upload'}
              </p>
              <p className="text-[10px] font-mono font-bold text-retro-green opacity-60 mt-1 uppercase">
                JPG · PNG · WEBP · HEIC (auto-converted)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sample avatars */}
      <div className="p-3 bg-white border-2 border-retro-green shadow-brutal-sm">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3 h-3 text-retro-orange" />
          <span className="text-[10px] font-mono font-black text-retro-green uppercase tracking-wide">
            Or try a demo profile:
          </span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {SAMPLE_AVATARS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                onPhotoChange(sample.url);
                onOffsetChange({ x: 0, y: 0, zoom: 1, rotation: 0 });
                if (onApplySampleAvatar) onApplySampleAvatar(sample);
                setShowSliders(true);
              }}
              className="flex-shrink-0 group flex flex-col items-center gap-1"
              title={`Use ${sample.name}'s demo`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-retro-green shadow-brutal-sm group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-150">
                <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[8px] font-mono font-black text-retro-green uppercase max-w-[44px] truncate">
                {sample.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fine-Tune Sliders (shown only when photo exists) */}
      {photoUrl && (
        <div className="border-2 border-retro-green bg-white shadow-brutal-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSliders((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-mono font-black text-retro-green uppercase hover:bg-retro-yellow/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-retro-orange" />
              Fine-Tune Photo Position
            </span>
            <span className="text-retro-orange">{showSliders ? '▲' : '▼'}</span>
          </button>

          {showSliders && (
            <div className="px-4 pb-4 pt-1 border-t-2 border-dashed border-retro-green/40 space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetAlignment}
                  className="text-[9px] font-mono font-bold text-retro-orange hover:text-retro-green uppercase flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Zoom', icon: <ZoomIn className="w-3 h-3" />, key: 'zoom', min: 0.5, max: 2.5, step: 0.05, val: photoOffset.zoom, fmt: (v: number) => `${v.toFixed(2)}x` },
                  { label: 'Rotate', icon: null, key: 'rotation', min: -45, max: 45, step: 1, val: photoOffset.rotation, fmt: (v: number) => `${v}°` },
                  { label: 'Pan X', icon: <Move className="w-3 h-3" />, key: 'x', min: -100, max: 100, step: 2, val: photoOffset.x, fmt: (v: number) => `${v}px` },
                  { label: 'Pan Y', icon: null, key: 'y', min: -100, max: 100, step: 2, val: photoOffset.y, fmt: (v: number) => `${v}px` },
                ].map(({ label, icon, key, min, max, step, val, fmt }) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono font-black text-retro-green uppercase">
                      <span className="flex items-center gap-1">{icon}<span>{label}</span></span>
                      <span className="text-retro-orange">{fmt(val as number)}</span>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={val}
                      onChange={(e) =>
                        onOffsetChange({ ...photoOffset, [key]: key === 'rotation' || key === 'x' || key === 'y' ? parseInt(e.target.value) : parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
