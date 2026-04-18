/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lofty: {
          blue: '#1E88E5',
          cyan: '#00BCD4',
          dark: '#0D1B2A',
          surface: '#132337',
          border: '#1E3A5F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}