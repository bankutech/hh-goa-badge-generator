import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CloudUpload, Loader2, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { captureElementToBlob } from '../../utils/exportImage';
import { uploadToCloudinary, openXShareIntent } from '../../utils/shareToX';
import { BuilderData } from '../../types';

interface CloudinaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BuilderData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const CloudinaryModal: React.FC<CloudinaryModalProps> = ({
  isOpen,
  onClose,
  data,
  cardRef,
  onShowToast,
}) => {
  const [cloudName, setCloudName] = useState('demo');
  const [uploadPreset, setUploadPreset] = useState('docs_upload_example_preset');
  const [isUploading, setIsUploading] = useState(false);
  const [hostedUrl, setHostedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!cardRef.current) return;

    try {
      setIsUploading(true);
      const blob = await captureElementToBlob(cardRef.current, { pixelRatio: 2.5 });
      const url = await uploadToCloudinary(blob, cloudName, uploadPreset);
      setHostedUrl(url);
      onShowToast('success', '☁️ Uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      onShowToast('error', err.message || 'Upload failed. Check cloud name & upload preset.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleShareWithUrl = () => {
    if (!hostedUrl) return;
    openXShareIntent({
      builderData: data,
      imageUrl: hostedUrl,
      websiteUrl: hostedUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/20 p-6 shadow-2xl space-y-4 text-white"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <CloudUpload className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-base">Cloudinary OpenGraph Share</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Upload your generated badge to Cloudinary to generate a public URL. When you share this link on X, the card image will unfurl in the tweet preview!
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Cloudinary Cloud Name
            </label>
            <input
              type="text"
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              placeholder="e.g. your-cloud-name"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Unsigned Upload Preset
            </label>
            <input
              type="text"
              value={uploadPreset}
              onChange={(e) => setUploadPreset(e.target.value)}
              placeholder="e.g. ml_default"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {hostedUrl ? (
          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="text-[11px] font-mono text-emerald-300 truncate">{hostedUrl}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(hostedUrl);
                  onShowToast('success', 'URL copied to clipboard!');
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>

              <button
                onClick={handleShareWithUrl}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Share with Card</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-display font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading Image to Cloudinary...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Upload to Cloudinary</span>
              </>
            )}
          </button>
        )}
      </motion.div>
    </div>
  );
};
