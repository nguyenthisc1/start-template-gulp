/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],

    theme: {
        fontFamily: {
            primary: ["'SVN-Mabry Pro', 'Arial', 'sans-serif'"],
            secondary: ["'SVN-Grand Slang', 'Arial', 'sans-serif'"],
        },
        extend: {
            screens: {
                tall: {
                    raw: '(min-width: 450px) and (min-height: 650px) and (max-width: 767px)',
                },
                long: {
                    raw: '(min-width: 320px) and (max-height: 450px) and (max-width: 767px)',
                },
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
                grey: 'var(--color-grey)',
                'grey-1': 'var(--color-grey-1)',
                'grey-2': 'var(--color-grey-2)',
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [require('tailwind-scrollbar'), require('tailwindcss'), require('autoprefixer')],
};
