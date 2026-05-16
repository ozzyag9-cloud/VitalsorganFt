import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { protocol: { cyan: '#38f8ff', violet: '#8b5cf6', night: '#070915' } },
      boxShadow: { glow: '0 0 40px rgba(56, 248, 255, 0.18)' },
    },
  },
  plugins: [],
};
export default config;
