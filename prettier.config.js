module.exports = {
    arrowParens: 'always',
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'css',
    printWidth: 500,
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
    plugins: ['prettier-plugin-tailwindcss','@ianvs/prettier-plugin-sort-imports'],
    tailwindConfig: './tailwind.config.js',
};
