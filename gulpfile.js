"use strict";

/* -- Init -- */
const gulp = require("gulp");
const environments = require("gulp-environments"); // Create separate environments
const del = require("del"); //Delete files and folders
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");

const rigger = require("gulp-rigger");

const browserSync = require("browser-sync").create();

const cleanCSS = require("gulp-clean-css"); //minify CSS and mqpack
const autoprefixer = require("gulp-autoprefixer");
const postcss = require("gulp-postcss");
const mqpacker = require("css-mqpacker");
const sortCSSmq = require("sort-css-media-queries"); // Добавляет возможность сортировки desctop first
const sass = require("gulp-sass");
sass.compiler = require("node-sass"); // Node Sass will be used by default, but it's strongly recommended that you set it explicitly for forwards-compatibility in case the default ever changes.
const sassGlob = require("gulp-sass-glob");

const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const minify = require("rollup-plugin-babel-minify");
const nodeResolve = require("rollup-plugin-node-resolve"); //позволяет загружать сторонние модули из node_modules.
const commonJs = require("rollup-plugin-commonjs"); //обеспечивает поддержку подключения CommonJS-модулей.

const imagemin = require("gulp-imagemin");
const svgSprite = require("gulp-svg-sprite");

/* -- Config -- */
const viewToServe = "index.html"; // Для browserSync

const dev = environments.development;
const prod = environments.production;

const path = {
  build: {
    html: "./build/",
    css: "./build/css/",
    js: "./build/js/",
    img: "./build/img/",
    fonts: "./build/fonts/"
  },

  src: {
    views: "./src/views/*.html",
    scss: "./src/scss/*.scss",
    js: {
      main: "./src/js/main.js",
      libs: "./src/js/libs.js"
    },
    img: "./src/img/**/*",
    svg: {
      icons: "./src/img/icons/svg/*",
      sprite: "./src/img/icons/"
    },
    fonts: "./src/fonts/**/*"
  },

  watch: {
    views: "./src/views/**/*",
    scss: "./src/scss/**/*",
    js: {
      main: "./src/js/**/*",
      libs: "./src/js/**/libs.js"
    },
    img: "./src/img/**/*",
    fonts: "./src/fonts/**/*"
  },

  serve: "./build"
};

/* -- Tasks -- */
gulp.task("html", () => {
  return gulp
    .src(path.src.views)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task("css", () => {
  return gulp
    .src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      prod(
        postcss([
          mqpacker({
            sort: sortCSSmq.desktopFirst
          })
        ])
      )
    )
    .pipe(
      prod(
        autoprefixer({
          cascade: false
        })
      )
    )
    .pipe(prod(cleanCSS({})))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task("libs-js", () => {
  return gulp
    .src(path.src.js.libs)
    .pipe(
      rollup(
        {
          plugins: [
            nodeResolve({
              mainFields: ["jsnext", "browser"]
            }),
            commonJs(),
            prod(
              minify({
                comments: false
              })
            )
          ]
        },
        "iife"
      )
    )
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task("custom-js", () => {
  return gulp
    .src(path.src.js.main)
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [
            babel(),
            prod(
              minify({
                comments: false
              })
            )
          ]
        },
        "iife"
      )
    )
    .pipe(sourcemaps.write("./maps/"))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task("sprite", function() {
  return gulp
    .src(path.src.svg.icons) // svg files for sprite
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg" //sprite file name
          }
        }
      })
    )
    .pipe(gulp.dest(path.src.svg.sprite));
});

gulp.task("img", () => {
  return gulp
    .src(path.src.img, "!" + path.src.img.svg) // Исключаем папку с svg
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: true
            },
            {
              cleanupIDs: false
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
});

gulp.task("fonts", () => {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.stream());
});

/* -- Config -- */
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: path.serve
    }
  });

  gulp.watch(path.watch.views).on("change", browserSync.reload);
  gulp.watch(path.watch.scss, gulp.series("css"));
  gulp.watch(path.watch.js.libs, gulp.series("libs-js"));
  gulp.watch(path.watch.js.main, gulp.series("custom-js"));
  gulp.watch(path.watch.img, gulp.series("img"));
  gulp.watch(path.watch.fonts, gulp.series("fonts"));
});

gulp.task("set-prod", prod.task);

gulp.task("clean", function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del([build]);
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("css", "libs-js", "custom-js", "img"),
    "serve"
  )
);

// 1.Разработка
gulp.task("default", gulp.series("build", "serve"));

// 2. Сборка для production
gulp.task("prod", gulp.series("set-prod", "build"));
