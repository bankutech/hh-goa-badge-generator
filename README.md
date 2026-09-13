# hh goa badge generator

## Overview
> **The official, ultra-fast, zero-friction Builder Card & Profile Frame Generator for Hacker House Goa 2026.**  
> Create, customize, download in 4K resolution, and share directly on X (Twitter).

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

##  Features

- ** Zero Authentication & Friction**: No login, no signup, no database required. 100% private and client-side.
- ** Smart Photo Processing**:
  - Drag-and-drop or file select.
  - Native **Apple HEIC/HEIF conversion** in-browser.
  - Automatic compression via web workers (fast sub-second processing).
  - Fine-grained face positioning: **Zoom (0.5x - 2.5x)**, **Pan X/Y**, and **Rotation (-45° to +45°)**.
- ** 2 Distinct Modes**:
  1. **Builder Card**: Official 4:5 conference badge pass with dynamic holographic sheen, attendee tier badges, QR verification code, NFC chip graphic, laser barcode, and flip-to-view back details.
  2. **Profile Frame**: Circular 1:1 avatar badge with animated neon glow ring, circular SVG typography, and verified builder banner.
- ** 60+ Curated Builder Titles**: Instant shuffle dice randomizer (e.g. *Autonomous Agent Architect, Solana Speedster, ZK Cryptomancer, Full-Stack Alchemist, High-Frequency Hacker*).
- ** 6 Tropical & Cyber Themes**:
  - *Goa Sunset* (Warm Orange to Magenta)
  - *Cyber Neon* (Violet to Cyan)
  - *Emerald Matrix* (Green to Mint)
  - *Solana Purple* (Electric Purple to Blue)
  - *Gold Sovereign* (Amber to Yellow Gold)
  - *Midnight Stealth* (Monochrome Dark Slate)
- ** 3D Interactive Parallax Tilt**: Mouse and touch-reactive physics tilt with specular holographic glare.
- ** 1-Click Export & Share**:
  - **4K Ultra-Crisp PNG Download** via `html-to-image` at 3x DPR.
  - **Copy Directly to Clipboard** for instant pasting in Discord/Telegram.
  - **Instant Share to X (Twitter)** with pre-composed hashtags (`#FrameInGoa`, `#HHGoa2026`).
  - **Celebratory Confetti** blast on generation and download.
- ** Community Wall of Fame**: Interactive showcase with 1-click **"Remix This Badge"** capability.
- **️ Cloudinary OpenGraph Support**: Optional direct host upload for rich Twitter card previews.

---

## ️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Cyber-Luxe Design System
- **Animation**: [Framer Motion](https://www.framer.com/motion/) + [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Image Processing**: [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) + [heic2any](https://www.npmjs.com/package/heic2any)
- **Exporting**: [html-to-image](https://www.npmjs.com/package/html-to-image) + [file-saver](https://www.npmjs.com/package/file-saver)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Badges

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- `npm` or `yarn` or `pnpm`

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/hh-goa-2026-badge-generator.git
cd hh-goa-2026-badge-generator

# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Production Build

```bash
# Run TypeScript check and Vite production build
npm run build

# Preview the production build locally
npm run preview
```

---

##  Deploy to Vercel

This repository is pre-configured for zero-config deployment on Vercel:

1. Push your code to GitHub / GitLab / Bitbucket.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. The framework preset will automatically detect **Vite**.
4. Click **Deploy**.

Alternatively, with the Vercel CLI:
```bash
npx vercel
```

---

##  Project Structure

```
├── src/
│   ├── components/
│   │   ├── generator/          # Editor & controls
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── FormControls.tsx
│   │   │   ├── ModeSwitcher.tsx
│   │   │   ├── PhotoUploader.tsx
│   │   │   └── ThemeSelector.tsx
│   │   ├── icons/              # Custom SVG assets (Goa palm, chip, barcode)
│   │   │   └── BadgeIcons.tsx
│   │   ├── layout/             # Navbar, Hero, Footer
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Navbar.tsx
│   │   ├── preview/            # 3D Tilt Card & Profile Frame
│   │   │   ├── BadgeCard.tsx
│   │   │   ├── InteractiveCardPreview.tsx
│   │   │   └── ProfileFrame.tsx
│   │   ├── showcase/           # Community Wall & FAQs
│   │   │   ├── BadgeGallery.tsx
│   │   │   └── EventInfo.tsx
│   │   └── ui/                 # Confetti, Toasts, Cloudinary Modal
│   │       ├── CloudinaryModal.tsx
│   │       ├── ConfettiBlast.tsx
│   │       └── Toast.tsx
│   ├── data/                   # Dataset definitions
│   │   ├── builderTitles.ts    # 60+ archetypes
│   │   ├── sampleAvatars.ts    # Instant demo profiles
│   │   ├── techStacks.ts       # Tags & taglines
│   │   └── themes.ts           # Color schemes
│   ├── utils/                  # Core engines
│   │   ├── exportImage.ts      # html-to-image 4K exporter
│   │   ├── imageProcessor.ts   # HEIC & compression engine
│   │   └── shareToX.ts         # Twitter intent & Cloudinary upload
│   ├── types/                  # TypeScript interfaces
│   ├── App.tsx                 # Main application orchestrator
│   ├── main.tsx                # React entrypoint
│   └── index.css               # Global glassmorphism & typography
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

##  Community & Hashtags

Share your card with:
- `#FrameInGoa`
- `#HHGoa2026`
- `#HackerHouseGoa`

---

##  License

MIT © Hacker House Goa 2026 Community.

## Getting Started
Please refer to the source files for specific installation and usage instructions. Ensure that your local environment meets the standard requirements for the associated technologies.

## Project Structure
This project is organized into standard directories. Key configuration files and primary source code are located in the root directory.
