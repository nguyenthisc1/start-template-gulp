/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],

    theme: {
        fontFamily: {
            primary: ["'SVN-Mabry Pro', 'Arial', 'sans-serif'"],
        },
        extend: {
          screens: {
              tall: {
                  raw: '(min-width: 450px) and (min-height: 650px) and (max-width: 767px)',
              },
              long: {
                  raw: '(min-width: 320px) and (max-height: 450px) and (max-width: 767px)',
              },
              xs: '400px',
              '2xl': '1700px',
              '3xl': '2000px',
              mxs: { max: '400px' },
              msm: { max: '639px' },
              mmd: { max: '767px' },
              mlg: { max: '1023px' },
              mxl: { max: '1279px' },
              m2xl: { max: '1535px' },
          },
          space: {
              36: '8.75rem',
              32: '7.5rem',
          },
          padding: {
              36: '8.75rem',
              32: '7.5rem',
          },
          margin: {
              36: '8.75rem',
              32: '7.5rem',
          },
          gap: {
              36: '8.75rem',
              32: '7.5rem',
          },
          colors: {
              primary: 'var(--color-primary)',
              secondary: 'var(--color-secondary)',
              dark: 'var(--color-dark)',
          },
      },
      container: {
          center: true,
      },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss'), require('autoprefixer')],
};
