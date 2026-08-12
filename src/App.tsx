import React, { useState, useRef } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import { ModeSwitcher } from './components/generator/ModeSwitcher';
import { PhotoUploader } from './components/generator/PhotoUploader';
import { FormControls } from './components/generator/FormControls';
import { ThemeSelector } from './components/generator/ThemeSelector';
import { ActionButtons } from './components/generator/ActionButtons';
import { InteractiveCardPreview } from './components/preview/InteractiveCardPreview';
import { EventInfo } from './components/showcase/EventInfo';
import { Toast, ToastMessage } from './components/ui/Toast';
import { CloudinaryModal } from './components/ui/CloudinaryModal';
import { BuilderData, GeneratorMode, PhotoOffset, SampleAvatar } from './types';
import { SAMPLE_AVATARS } from './data/sampleAvatars';

import { urlToDataUrl } from './utils/imageProcessor';

const INITIAL_DATA: BuilderData = {
  name: 'Dev Patel',
  stack: 'React + Rust + Solana',
  title: 'AI Wizard',
  roleTier: 'VIP Builder',
  badgeId: 'HH-GOA-8492',
  tagline: 'Shipping code while watching the Goa sunset 🌅',
  photoUrl: SAMPLE_AVATARS[0].url,
  photoOffset: { x: 0, y: 0, zoom: 1, rotation: 0 },
  themeId: 'goa-sunset',
  frameStyleId: 'neon-halo',
  mode: 'card',
  showChip: true,
  showQr: true,
  showLanyard: true,
  lanyardColor: 'orange',
  stickers: ['rust', 'solana', 'goa26'],
};

export const App: React.FC = () => {
  const [data, setData] = useState<BuilderData>(INITIAL_DATA);
  const [isFlipped, setIsFlipped] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCloudinaryOpen, setIsCloudinaryOpen] = useState(false);

  // Target DOM element ref for high-DPI capture
  const cardCaptureRef = useRef<HTMLDivElement>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateData = (fields: Partial<BuilderData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const handleModeChange = (mode: GeneratorMode) => {
    setData((prev) => ({ ...prev, mode }));
  };

  const handlePhotoChange = (url: string | null) => {
    setData((prev) => ({ ...prev, photoUrl: url }));
  };

  const handleOffsetChange = (photoOffset: PhotoOffset) => {
    setData((prev) => ({ ...prev, photoOffset }));
  };

  const handleSelectTheme = (themeId: string) => {
    setData((prev) => ({ ...prev, themeId }));
  };

  const handleApplySampleAvatar = async (sample: SampleAvatar) => {
    // Set immediate state with sample URL
    setData((prev) => ({
      ...prev,
      name: sample.name,
      title: sample.title,
      stack: sample.stack,
      roleTier: sample.roleTier,
      photoUrl: sample.url,
      tagline: sample.tagline,
      themeId: sample.themeId,
      photoOffset: { x: 0, y: 0, zoom: 1, rotation: 0 },
    }));
    showToast('info', `Loaded profile for ${sample.name}`);

    // Pre-cache as data URL for instant 4K export
    try {
      const dataUrl = await urlToDataUrl(sample.url);
      setData((prev) => ({ ...prev, photoUrl: dataUrl }));
    } catch {
      // Ignored, fallback URL is already set
    }
  };

  const handleReset = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setData({
      ...INITIAL_DATA,
      name: '',
      title: 'Hacker',
      stack: '',
      photoUrl: null,
      badgeId: `HH-GOA-${randomId}`,
      tagline: '',
      photoOffset: { x: 0, y: 0, zoom: 1, rotation: 0 },
    });
    setIsFlipped(false);
    showToast('info', 'Reset all fields to blank.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-retro-cream text-retro-green selection:bg-retro-orange/30 selection:text-retro-orange font-mono paper-grain">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Generator Workspace */}
      <main id="generator" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full mt-10">
        
        {/* Section heading */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-retro-green uppercase tracking-tight">
            Build Your Pass
          </h2>
          <p className="text-xs font-mono font-bold text-retro-green opacity-60 uppercase mt-1 tracking-wider">
            Fill in details · Preview live · Download 4K PNG
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="max-w-md mx-auto mb-8 animate-fade-in-up delay-100">
          <ModeSwitcher mode={data.mode} onModeChange={handleModeChange} />
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Live Preview (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col items-center justify-center animate-slide-in-left">
            <div className="w-full p-4 sm:p-6 bg-white border-4 border-retro-green shadow-brutal-lg flex flex-col items-center">
              
              {/* Preview Header */}
              <div className="w-full flex items-center justify-between mb-5 pb-3 border-b-2 border-retro-green">
                <span className="text-[11px] font-mono uppercase tracking-wider text-retro-green font-bold flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-retro-orange opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-retro-orange" />
                  </span>
                  <span>Live Preview</span>
                </span>
                <span className="text-[10px] font-mono font-black bg-retro-orange text-white px-2.5 py-1 border-2 border-retro-green uppercase">
                  {data.mode === 'card' ? '4:5 Badge Pass' : '1:1 Frame PFP'}
                </span>
              </div>

              {/* Click-to-flip hint */}
              <p className="text-[9px] font-mono font-bold text-retro-green opacity-50 uppercase mb-3 tracking-wider">
                {data.mode === 'card' ? '↻ Click card to flip' : 'Your profile frame preview'}
              </p>

              {/* Card Preview */}
              <InteractiveCardPreview
                ref={cardCaptureRef}
                data={data}
                isFlipped={isFlipped}
                onFlipToggle={() => setIsFlipped(!isFlipped)}
              />

              {/* Bottom hint strip */}
              <div className="w-full mt-5 pt-3 border-t-2 border-retro-green flex items-center justify-center gap-2">
                <span className="text-[9px] font-mono font-bold text-retro-green opacity-60 uppercase tracking-wider">
                  ✦ Riso Print Style · HH GOA 2026 · #FrameInGoa ✦
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editor Controls & Customization */}
          <div className="lg:col-span-7 space-y-6 animate-slide-in-right">
            <div className="p-5 sm:p-7 bg-white border-4 border-retro-green shadow-brutal-lg space-y-7">
              
              {/* Section 1: Photo Uploader & Align */}
              <PhotoUploader
                photoUrl={data.photoUrl}
                photoOffset={data.photoOffset}
                onPhotoChange={handlePhotoChange}
                onOffsetChange={handleOffsetChange}
                onApplySampleAvatar={handleApplySampleAvatar}
              />

              <div className="border-t-2 border-dashed border-retro-green/30" />

              {/* Section 2: Form Controls (Name, Title, Stack, Tier, Tagline) */}
              <FormControls
                data={data}
                onChange={handleUpdateData}
              />

              <div className="border-t-2 border-dashed border-retro-green/30" />

              {/* Section 3: Theme Selector */}
              <ThemeSelector
                selectedThemeId={data.themeId}
                onSelectTheme={handleSelectTheme}
              />

              <div className="border-t-2 border-dashed border-retro-green/30" />

              {/* Section 4: Action Buttons (Generate, Download PNG, Share to X, Copy) */}
              <ActionButtons
                data={data}
                cardRef={cardCaptureRef}
                onReset={handleReset}
                onShowToast={showToast}
                onOpenCloudinaryModal={() => setIsCloudinaryOpen(true)}
              />

            </div>
          </div>

        </div>

      </main>

      {/* Community Showcase Wall */}

      {/* Hackathon Event Info & FAQs */}
      <EventInfo />

      {/* Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Optional Cloudinary OpenGraph Modal */}
      <CloudinaryModal
        isOpen={isCloudinaryOpen}
        onClose={() => setIsCloudinaryOpen(false)}
        data={data}
        cardRef={cardCaptureRef}
        onShowToast={showToast}
      />
    </div>
  );
};
