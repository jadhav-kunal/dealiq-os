/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lofty: {
          blue:       '#3C5CDE',
          'blue-dark':'#2D47B8',
          'blue-light':'#EBEFFC',
          'blue-mid': '#C7D2F8',
          border:     '#E5E7EB',
          surface:    '#F9FAFB',
          'surface-hover': '#F3F4F6',
          text:       '#0F1117',
          muted:      '#4B5563',
          subtle:     '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'modal': '0 20px 60px -12px rgba(0,0,0,0.12), 0 8px 24px -8px rgba(0,0,0,0.08)',
        'panel': '0 8px 30px -6px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}