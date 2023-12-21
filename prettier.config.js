module.exports = {
    arrowParens: 'always',
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'css',
    printWidth: 100,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: false,
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
    plugins: ['prettier-plugin-tailwindcss'],
}
