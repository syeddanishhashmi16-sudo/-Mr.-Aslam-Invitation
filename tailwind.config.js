/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['DM Sans', 'sans-serif']
      },
      boxShadow: {
        gold: '0 18px 60px rgba(142, 105, 28, .18), inset 0 0 0 1px rgba(255,255,255,.7)',
        luxe: '0 30px 100px rgba(70, 38, 15, .12)'
      }
    }
  },
  plugins: []
}
