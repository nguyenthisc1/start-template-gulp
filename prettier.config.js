module.exports = {
    arrowParens: 'always',
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'css',
    printWidth: 500,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    overrides: [
        {
            files: ['**/*.css', '**/*.scss', '**/*.html'],
            options: {
                singleQuote: true,
            },
        },
    ],
    plugins: [require('prettier-plugin-tailwindcss')],
};
