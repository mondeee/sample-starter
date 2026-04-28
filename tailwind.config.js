/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#0f0f0f',
        },
        surface: {
          DEFAULT: '#f5f5f5',
          dark: '#1a1a1a',
        },
        primary: {
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
        text: {
          DEFAULT: '#111111',
          muted: '#6b7280',
          dark: '#f5f5f5',
          'muted-dark': '#9ca3af',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#2a2a2a',
        },
        success: {
          DEFAULT: '#16a34a',
          dark: '#22c55e',
        },
        danger: {
          DEFAULT: '#dc2626',
          dark: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
