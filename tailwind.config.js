/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        retro: {
          cream: '#fafae6', // Authentic risograph paper cream
          green: '#0a6432', // Authentic risograph forest green
          orange: '#ff6600', // Authentic risograph orange
          yellow: '#fee000', // Authentic riso sunflower yellow
          gray: '#d1d5db',
        },
        goa: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          sunset: '#ff4d4d',
          amber: '#ff9800',
          violet: '#8b5cf6',
          purple: '#6d28d9',
          neonCyan: '#00f2fe',
          neonPink: '#f40076',
          cyberGreen: '#0f5132',
          darkBg: '#fefaf0',
          cardBg: '#ffffff',
          cardBorder: 'rgba(15, 81, 50, 0.2)',
        }
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sunset-glow': 'linear-gradient(135deg, #7928CA 0%, #FF0080 50%, #FF8A00 100%)',
        'cyber-neon': 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 40%, #7F00FF 100%)',
        'matrix-emerald': 'linear-gradient(135deg, #0ba360 0%, #3cba92 50%, #30dd8a 100%)',
        'gold-luxe': 'linear-gradient(135deg, #FFE000 0%, #799F0C 50%, #FFE000 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.4), 0 0 10px -2px rgba(168, 85, 247, 0.2)',
        'neon-orange': '0 0 25px -5px rgba(249, 115, 22, 0.4), 0 0 10px -2px rgba(249, 115, 22, 0.2)',
        'neon-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4), 0 0 10px -2px rgba(0, 242, 254, 0.2)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'badge-elevated': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px 2px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
