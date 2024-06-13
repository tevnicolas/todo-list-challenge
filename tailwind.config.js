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
      keyframes: {
        ellipsis: {
          '0%, 20%': { content: '"."' },
          '40%': { content: '".."' },
          '60%': { content: '"..."' },
          '80%, 100%': { content: '""' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5em)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        ellipsis: 'ellipsis 1s steps(4, end) infinite',
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeIn1: 'fadeIn 0.5s ease-out 1s forwards',
        fadeIn2: 'fadeIn 0.5s ease-out 2s forwards',
        fadeOut: 'fadeOut 0.4s forwards',
      },
    },
    plugins: [],
  },
};
