module.exports = {
    arrowParens: 'always',
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'css',
    printWidth: 120,
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    bracketSameLine: true,
    trailingComma: 'all',
    htmlWhitespaceSensitivity: 'ignore',
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
