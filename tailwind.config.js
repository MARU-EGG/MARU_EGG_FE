/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#002968',
        'primary-selected-bg': 'rgba(0,41,104,0.06)',
        'text-black': '#000000',
        'text-white': '#FFFFFF',
        'border-gray': '#EBEBEB',
      },
      screens: {
        mobile: '360px',
        desktop: '769px',
      },
    },
  },
  plugins: [],
};
