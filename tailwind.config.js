/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ✅ CORREÇÃO: Adicionada a paleta de cores 'primary'
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'brand-green': {
          DEFAULT: '#90f29c',
          light: '#a3f5b0',
          dark: '#7ddb8a',
        },
        'dark-primary': '#0D1117',
        'dark-secondary': '#161B22',
        'brand-border': '#30363d',
      }
    },
  },
  plugins: [],
}
