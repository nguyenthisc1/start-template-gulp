/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],

    theme: {
        fontFamily: {
            primary: ["'SVN-Mabry Pro', 'Arial', 'sans-serif'"],
        },
        extend: {
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
                dark: 'var(--color-dark)',
            },
        },
        container: {
            center: true,
        },
  },
  plugins: [require('tailwind-scrollbar'), require('autoprefixer')],
};
