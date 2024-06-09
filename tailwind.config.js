/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        focuswhite: 'rgb(245, 248, 250)',
        focusblue: 'rgb(15, 89, 154)',
        focuslightblue: 'rgb(43, 107, 232)',
        focusgrey: 'rgb(139, 139, 139)',
        focuslightgrey: 'rgb(217, 217, 217)',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        kdam: ['Kdam Thmor Pro', 'sans-serif'],
      },
    },
    plugins: [],
  },
};
