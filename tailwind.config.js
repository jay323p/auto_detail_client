/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '390px',
      deskSm: '435px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1350px',
      tall: {
        raw: '(min-height: 750px) and (max-width: 420px)',
      },
    },
    extend: {
      colors: {
        darkBlue: '#2e4f6a',
        darkerBlue: '#191a5a',
        paleYellow: '#ccb686',
        jetBlack: '#28282B',
        matteBlack: '#19191b',
        lightGray: '#525561',
        darkGray: '#272a37',
        darkerGray: '#17171d',
        grayBlue: '#f0f0ff',
        highLightBlue: '#d0d1fc',
        brilliantBlue: '#696cf6',
        darkGrayBlue: '#dbdbf3',
        brightRed: '#E81C2E',
        facebook: '#4267B2',
        google: '#DB4437',
        twitter: '#1DA1F2',
        loaderGreen: '#39db98',
        rateYellow: '#fd9512',
        brightYellow: '#f4cb11',
      },
      gridTemplateColumns: {
        twoCols: 'repeat(2, 1fr)',
        calendar: 'repeat(7, 1fr)',
      },
      gridTemplateRows: {
        sixRows: 'repeat(6, 200px)',
      },
    },
  },
  plugins: [],
};
