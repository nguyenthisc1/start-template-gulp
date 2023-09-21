const {src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const formatHtml = require('gulp-format-html');
const nunjucks = require('gulp-nunjucks');
const imagemin = require('gulp-imagemin');
const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-dart-sass');
const sync = require('browser-sync').create();
const {rollup} = require('rollup');
const {babel} = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const IS_RPOD = process.env.NODE_ENV === 'production';

const babelPlugin = babel({
    babelHelpers: 'assetsd',
    exclude: [/node_module/],
    presets: [['@babel/preset-env', {targets: ['defaults'], useBuiltIns: 'usage', corejs: '3.6.5'}]],
});

let cache;

const html = () => src('src/*.html').pipe(nunjucks.compile()).pipe(formatHtml()).pipe(dest('public'));
const css = () =>
    src('src/assets/style/index.scss')
        .pipe(sass())
        .pipe(postcss([tailwindcss('tailwind.config.js'), require('autoprefixer')]))
        .pipe(concat({path: 'index.css'}))
        .pipe(uglifycss())
        .pipe(dest('public/assets/css'));

const img = () => src('src/assets/images/**/*').pipe(imagemin()).pipe(dest('public/assets/images'));
const copy = () =>
    src(['src/assets/fonts/**', 'src/assets/videos/**'], {
        base: 'src',
    }).pipe(dest('public'));

const minLibs = () => src(['src/assets/js/*.js']).pipe(uglify()).pipe(dest('public/assets/js/'));

const js = () =>
    rollup({
        input: './src/assets/js/index.js',
        plugins: [commonjs(), nodeResolve(), IS_RPOD && babelPlugin],
        cache,
    })
        .then((b) => ((cache = b.cache), b))
        .then((b) =>
            b.write({
                file: 'public/assets/js/index.js',
                format: 'iife',
                sourcemap: IS_RPOD,
            })
        );

const watchTask = () => {
    sync.init({notify: false, server: {baseDir: 'public'}});
    watch(`src/**/*.scss`, css).on('change', sync.reload);
    watch('src/**/*.js', js).on('change', sync.reload);
    watch('src/**/*.html', series(html, css)).on('change', sync.reload);
    // watch('src/assets/images/**/*', img).on('change', sync.reload);
    watch(['src/assets/fonts/**', 'src/assets/videos/**'], copy).on('change', sync.reload);
};

const build = parallel(html, css, minLibs, img, js, copy);

exports.js = js;
exports.css = css;
exports.build = build;
exports.default = series(build, watchTask);
