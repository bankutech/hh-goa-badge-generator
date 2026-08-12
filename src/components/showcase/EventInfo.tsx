import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Coffee, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const EventInfo: React.FC = () => {
  const tracks = [
    {
      icon: Cpu,
      title: 'Autonomous AI Agents',
      desc: 'Multi-agent frameworks, local LLM inference on edge devices, autonomous workflows.',
      color: 'bg-retro-yellow',
    },
    {
      icon: Globe,
      title: 'Solana & Web3 Protocols',
      desc: 'High-speed DeFi, token extensions, state compression, DePIN & crypto rails.',
      color: 'bg-white',
    },
    {
      icon: Terminal,
      title: 'High-Performance Systems',
      desc: 'Rust, WebAssembly, low-latency distributed databases, zero-knowledge proofs.',
      color: 'bg-retro-orange',
    },
    {
      icon: Coffee,
      title: 'Open Source & Wildcard MVPs',
      desc: 'Developer tools, creative UI engineering, consumer hardware hacks & side projects.',
      color: 'bg-retro-yellow',
    },
  ];

  const faqs = [
    {
      q: 'What is Hacker House Goa 2026?',
      a: 'HH Goa 2026 is an invite-only gathering of 400+ top engineers, researchers, founders, and creators co-working, hacking, and shipping together right on the tropical coast of Goa, India.',
    },
    {
      q: 'Do I need an account to generate a Builder Card?',
      a: 'No! The Builder Card & Profile Frame Generator is 100% free, client-side, and requires zero signup. Your photos and data stay securely in your own browser.',
    },
    {
      q: 'How do I share my generated card to X (Twitter)?',
      a: 'Click the "Share on X" button to immediately open a pre-filled tweet with your role, title, stack, and the official #FrameInGoa hashtag!',
    },
    {
      q: 'Are HEIC photos from iPhones supported?',
      a: 'Yes! Our built-in image processor automatically detects Apple HEIC/HEIF files and converts them directly in your browser without any quality loss.',
    },
  ];

  return (
    <section id="event-info" className="py-16 sm:py-20 border-t-4 border-retro-green bg-retro-cream relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Event Stats / Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          <div className="p-5 bg-white border-4 border-retro-green shadow-[4px_4px_0px_0px_rgba(10,100,50,1)] text-center">
            <p className="font-display font-black text-2xl sm:text-3xl text-retro-orange uppercase">Nov 12-16</p>
            <p className="text-xs font-bold text-retro-green mt-2 uppercase">2026 • 5 Days Hack</p>
          </div>
          <div className="p-5 bg-white border-4 border-retro-green shadow-[4px_4px_0px_0px_rgba(10,100,50,1)] text-center">
            <p className="font-display font-black text-2xl sm:text-3xl text-retro-green uppercase">400+</p>
            <p className="text-xs font-bold text-retro-green mt-2 uppercase">Global Builders</p>
          </div>
          <div className="p-5 bg-white border-4 border-retro-green shadow-[4px_4px_0px_0px_rgba(10,100,50,1)] text-center">
            <p className="font-display font-black text-2xl sm:text-3xl text-retro-orange uppercase">$100,000+</p>
            <p className="text-xs font-bold text-retro-green mt-2 uppercase">Bounties & Grants</p>
          </div>
          <div className="p-5 bg-white border-4 border-retro-green shadow-[4px_4px_0px_0px_rgba(10,100,50,1)] text-center">
            <p className="font-display font-black text-2xl sm:text-3xl text-retro-green uppercase">Morjim Beach</p>
            <p className="text-xs font-bold text-retro-green mt-2 uppercase">Goa, India</p>
          </div>
        </div>

        {/* Hackathon Tracks */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(10,100,50,1)] text-xs font-extrabold text-retro-orange uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              <span>HACKATHON TRACKS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-retro-green uppercase tracking-wide">
              What are you building at HH Goa?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, idx) => {
              const Icon = track.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white border-4 border-retro-green shadow-[6px_6px_0px_0px_rgba(10,100,50,1)] flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 border-2 border-retro-green ${track.color} p-2 text-retro-green font-bold mb-5 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(10,100,50,1)]`}>
                      <Icon className="w-6 h-6 stroke-[2.5px]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-retro-green uppercase leading-tight mb-2">
                      {track.title}
                    </h3>
                    <p className="text-xs font-bold text-retro-green opacity-80 leading-relaxed uppercase">
                      {track.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-retro-green shadow-[2px_2px_0px_0px_rgba(10,100,50,1)] text-xs font-extrabold text-retro-orange uppercase mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-retro-green uppercase tracking-wide">
              Got Questions?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border-4 border-retro-green shadow-[4px_4px_0px_0px_rgba(10,100,50,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,100,50,1)] transition-transform"
              >
                <h3 className="text-sm font-extrabold text-retro-green uppercase mb-2 flex items-start gap-3">
                  <span className="text-retro-orange font-black mt-0.5">0{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs font-bold text-retro-green opacity-80 leading-relaxed pl-8 uppercase">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
