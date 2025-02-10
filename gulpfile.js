const { src, dest, watch, series, parallel } = require("gulp");
const formatHtml = require("gulp-format-html");
const nunjucks = require("gulp-nunjucks");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-dart-sass");
const sync = require("browser-sync").create();
const { rollup } = require("rollup");
const { terser } = require("rollup-plugin-terser");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify')
const fs = require("fs");
const data = require("gulp-data");
const path = require("path");
const IS_PROD = process.env.NODE_ENV === "production";

const babelPlugin = babel({
    babelHelpers: "bundled",
    exclude: /node_modules/,
    presets: [["@babel/preset-env", { targets: "defaults", useBuiltIns: "usage", corejs: "3.6.5" }]],
});

let cache;

// Compile HTML
const html = () =>
    src("src/*.html")
        .pipe(data((file) => JSON.parse(fs.readFileSync(`./src/assets/data/${path.basename(file.path)}.json`))))
        .pipe(nunjucks.compile())
        .pipe(formatHtml())
        .pipe(dest("public"));

// Compile CSS
const css = () =>
    src("src/assets/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([tailwindcss("tailwind.config.js"), cssnano()]))
        .pipe(concat("main.css"))
        .pipe(sourcemaps.write("."))
        .pipe(dest("public/assets/styles"));

// Optimize Images
const images = () => src("src/assets/images/**/*").pipe(imagemin()).pipe(dest("public/assets/images"));

// Copy Static Files
const copy = () =>
    src(["src/assets/fonts/**", "src/assets/videos/**"], { base: "src" }).pipe(dest("public"));

// Minify Libraries
const minifyLibs = () =>
  src(['src/assets/scripts/libs/*.js'])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(dest('public/assets/scripts/'))

// Compile JavaScript với Rollup
const js = () =>
  rollup({
      input: 'src/assets/scripts/main.js',
      plugins: [terser(), commonjs(), nodeResolve(), IS_PROD && babelPlugin],
      cache,
  })
      .then((b) => ((cache = b.cache), b))
      .then((b) =>
          b.write({
              file: 'public/assets/js/main.js',
              format: 'iife',
              sourcemap: IS_PROD,
          }),
      )

// Watch Files
const watchTask = () => {
  sync.init({ notify: false, server: { baseDir: 'public' } })
  watch('src/assets/styles/**/*.scss', css).on('change', sync.reload)
  watch('src/assets/scripts/**/*.js', js).on('change', sync.reload)
  watch(['src/*.html', 'src/components/**/*.html', 'src/assets/data/**/*.json'], series(html, css)).on(
      'change',
      sync.reload,
  )
  watch(['src/assets/fonts/**', 'src/assets/videos/**'], copy).on('change', sync.reload)
}

// Build Tasks
const build = parallel(html, css, js, images, minifyLibs, copy)

exports.js = js
exports.css = css
exports.images = images
exports.copy = copy
exports.libs = minifyLibs
exports.build = build
exports.default = series(build, watchTask)
