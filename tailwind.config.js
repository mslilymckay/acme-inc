/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acme: {
          yellow: '#fde047',
          pink: '#f43f5e',
          cyan: '#06b6d4',
          lime: '#84cc16',
          purple: '#a855f7',
          amber: '#f59e0b',
          dark: '#1e293b',
          paper: '#fffbeb',
          cream: '#fefce8'
        }
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #000000',
        'comic-sm': '2px 2px 0px 0px #000000',
        'comic-lg': '6px 6px 0px 0px #000000',
        'comic-hover': '2px 2px 0px 0px #000000',
      }
    },
  },
  plugins: [],
}
