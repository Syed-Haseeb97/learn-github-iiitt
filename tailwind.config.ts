import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F3EE',
        surface: '#FFFFFF',
        ink: '#16181D',
        muted: '#5F626A',
        line: '#C8C2B5',
        safe: '#1D6B52',
        'safe-soft': '#E3EFE8',
        warn: '#86560D',
        'warn-soft': '#F6ECD9',
        risk: '#B53A26',
        'risk-soft': '#F8E9E4',
        raised: '#F0ECE1',
        solid: '#16181D',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Geist Mono"', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
