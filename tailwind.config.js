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
        'background-default': '#F2F2F3',
      },
      screens: {
        mobile: '360px',
        desktop: '769px',
      },
      fontFamily: {
        pretendard: 'Pretendard',
      },
      fontSize: {
        body1: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        body2: ['16px', { lineHeight: '24px', fontWeight: '500' }],
        body3: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        title: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        mobile_title: ['16px', { lineHeight: '24px', fontWeight: '600' }],
      },
      maxHeight: {
        'screen-minus-header': 'calc(100vh - 1.75rem)',
      },
    },
  },
  plugins: [],
};
