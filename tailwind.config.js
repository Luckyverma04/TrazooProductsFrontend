// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        soft: '#242424',
        muted: '#6B6B6B',
        line: '#E8E8E8',
        warm: '#FAFAF8',
        brand: '#F36F21',
        peach: '#FFF1E8',
        'brand-deep': '#d95c12',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}