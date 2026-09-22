import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        navy: {
          50: '#f2f6fb',
          100: '#e3ecf6',
          200: '#c2d5ea',
          300: '#8fb2d6',
          400: '#5488bd',
          500: '#2f68a3',
          600: '#1f5087',
          700: '#1a416e',
          800: '#143255',
          900: '#0f2540',
          950: '#0a1628',
        },
        electric: {
          50: '#eff9ff',
          100: '#def2ff',
          200: '#b6e7ff',
          300: '#75d5ff',
          400: '#2cc0ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ink: {
          DEFAULT: '#0b1622',
          muted: '#55657a',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,22,40,0.04), 0 8px 24px -8px rgba(10,22,40,0.10)',
        'card-hover': '0 2px 4px rgba(10,22,40,0.06), 0 16px 40px -12px rgba(10,22,40,0.18)',
        glow: '0 0 0 1px rgba(14,165,233,0.18), 0 12px 40px -12px rgba(14,165,233,0.35)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
