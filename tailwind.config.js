/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FomoGeo Dark Cosmic Theme — extracted from hero image
        fg: {
          navy:    '#071828',
          dark:    '#0B1E30',
          card:    '#0D2840',
          border:  '#1A3A55',
          teal:    '#00D4C8',
          cyan:    '#00E5FF',
          gold:    '#FFB300',
          amber:   '#FF8F00',
          orange:  '#FF6B00',
          green:   '#00C853',
          lime:    '#69F0AE',
          text:    '#E8F4FD',
          muted:   '#7EB8D8',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,212,200,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,212,200,0.7), 0 0 80px rgba(0,212,200,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'cosmic': 'radial-gradient(ellipse at top, #0D2840 0%, #071828 60%, #050F1A 100%)',
        'card-glow': 'linear-gradient(135deg, rgba(0,212,200,0.05) 0%, rgba(0,0,0,0) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFB300 0%, #FF8F00 50%, #FF6B00 100%)',
        'teal-gradient': 'linear-gradient(135deg, #00D4C8 0%, #00E5FF 100%)',
        'dark-card': 'linear-gradient(135deg, #0D2840 0%, #091E30 100%)',
      },
      dropShadow: {
        'gold': '0 0 20px rgba(255,179,0,0.5)',
        'teal': '0 0 20px rgba(0,212,200,0.5)',
      },
    },
  },
  plugins: [],
}
