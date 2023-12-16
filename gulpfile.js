const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const formatHtml = require('gulp-format-html');
const nunjucks = require('gulp-nunjucks');
const imagemin = require('gulp-imagemin');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-dart-sass');
const sync = require('browser-sync').create();
const { rollup } = require('rollup');
const uglifyRollup = require('rollup-plugin-uglify');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const fs = require('fs');
const data = require('gulp-data');
const path = require('path');
const IS_PROD = process.env.NODE_ENV === 'production';

const babelPlugin = babel({
    babelHelpers: 'assetsd',
    exclude: [/node_module/],
    presets: [['@babel/preset-env', { targets: ['defaults'], useBuiltIns: 'usage', corejs: '3.6.5' }]],
});

let cache;

const html = () =>
    src('src/*.html')
        .pipe(data((file) => JSON.parse(fs.readFileSync('./src/assets/data/' + path.basename(file.path) + '.json'))))
        .pipe(nunjucks.compile())
        .pipe(formatHtml())
        .pipe(dest('public'));

const css = () =>
    src('src/assets/style/index.scss')
        .pipe(sass())
        .pipe(postcss([tailwindcss('tailwind.config.js'), autoprefixer]))
        .pipe(concat({ path: 'index.css' }))
        .pipe(uglifycss())
        .pipe(dest('public/assets/css'));

const images = () => src('src/assets/images/**/*').pipe(imagemin()).pipe(dest('public/assets/images'));

const copy = () =>
    src(['src/assets/fonts/**', 'src/assets/videos/**', 'src/assets/js/**'], {
        base: 'src',
    }).pipe(dest('public'));

const minifyLibs = () => src(['src/assets/libs/*.js']).pipe(uglify()).pipe(dest('public/assets/libs/'));

const js = () =>
    rollup({
        input: ['./src/assets/scripts/scripts.js'],
        plugins: [uglifyRollup.uglify(), commonjs(), nodeResolve(), IS_PROD && babelPlugin],
        cache,
    })
        .then((b) => ((cache = b.cache), b))
        .then((b) =>
            b.write({
                file: 'public/assets/js/scripts.js',
                format: 'iife',
                sourcemap: IS_PROD,
            })
        );

const bundleLibs = () =>
    rollup({
        input: './src/assets/scripts/libs.js',
        plugins: [uglifyRollup.uglify(), commonjs(), nodeResolve(), IS_PROD && babelPlugin],
        cache,
    })
        .then((b) => ((cache = b.cache), b))
        .then((b) =>
            b.write({
                file: 'public/assets/js/libs.js',
                format: 'iife',
                sourcemap: IS_PROD,
            })
        );

const watchTask = () => {
    sync.init({ notify: false, server: { baseDir: 'public' } });
    watch(`src/**/*.scss`, css).on('change', sync.reload);
    watch('src/**/*.js', js).on('change', sync.reload);
    watch('src/**/*.html', series(html, css)).on('change', sync.reload);
    // watch('src/assets/images/**/*', images).on('change', sync.reload);
    watch(['src/assets/fonts/**', 'src/assets/videos/**'], copy).on('change', sync.reload);
};

const build = parallel(html, css, images, js, copy, minifyLibs, bundleLibs);

exports.js = js;
exports.css = css;
exports.images = images;
exports.libs = bundleLibs;
exports.build = build;
exports.default = series(build, watchTask);
