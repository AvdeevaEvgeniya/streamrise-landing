const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    postcss = require('gulp-postcss'),
    webp = require('gulp-webp'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    tinypng = require('gulp-tinypng'),
    htmlbeautify = require('gulp-html-beautify'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

gulp.task('server', function() {
    browserSync.init({
        server: "dist/"
    });
    gulp.watch("src/**/*.sass", {usePolling: true}, gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch("src/**/*.pug", {usePolling: true}, gulp.series('pug')).on('change', browserSync.reload);
    gulp.watch("src/**/*.js", {usePolling: true}, gulp.series('js-concat')).on('change', browserSync.reload);
    gulp.watch("src/**/*.js", {usePolling: true}, gulp.series('js-concat2')).on('change', browserSync.reload);
    // gulp.watch("src/img/**/*", gulp.series('image'));
});

gulp.task('sass', function() {
    return gulp.src("src/styles/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS({
            format: 'beautify' // formats output in a really nice way
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML() {
    return gulp.src([ 'src/pages/**/*.pug', '!src/pages/layout/**/*.pug', '!src/pages/**/_*.pug'])
        .pipe(pug({
            pretty: true
        }))
        // .pipe(pug())
        .pipe(htmlbeautify())
        .pipe(flatten())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('img-webp', function () {
    gulp.src('src/img/**/*')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('js-concat', function() {
    return gulp.src([ '!src/js/swiper/**/*', 'src/js/**/*.js', '!src/js/**/_*.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify({compress: true}))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('js-concat2', function() {
    return gulp.src('src/js/**/_*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify({compress: true}))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".js";
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*{ttf,woff,woff2,svg,eot}')
        .pipe(gulp.dest('dist/fonts/'))
});

// gulp.task('image', function () {
//     gulp.src('src/img/**/*.+(png|jpg|gif|jpeg)')
//         .pipe(tinypng('SsZtfQ9sshn2tYpMn5nbx3TP7Nnx0DDy'))
//         .pipe(gulp.dest('dist/img'));
// });

gulp.task('default', gulp.series('sass', 'pug', 'js-concat', 'js-concat2', 'server'));

//gulp default
