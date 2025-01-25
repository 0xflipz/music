import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#000000',
        'gradient-end': '#434343',
        'green': {
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
        },
        'yellow': {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
        },
        'red': {
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
        },
        'blue': {
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
        },
        'purple': {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
        },
        'cyan': {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
        }
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom, var(--background-start), var(--background-end))',
        'glow-gradient': 'radial-gradient(circle at center, var(--glow-color) 0%, transparent 70%)',
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.5)' },
        },
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
  safelist: [
    'from-blue-500',
    'to-blue-300',
    'from-purple-500',
    'to-purple-300',
    'from-cyan-500',
    'to-cyan-300',
    'text-blue-400',
    'text-purple-400',
    'text-cyan-400',
    'bg-blue-500',
    'bg-purple-500',
    'bg-cyan-500',
  ],
} satisfies Config;
