var gulp = require('gulp');
var shell = require('gulp-shell');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var wrap = require("gulp-wrap");
var connect = require('gulp-connect');

// Runs "documentjs -w"
gulp.task('styleguide', shell.task([
  './node_modules/.bin/documentjs'
]));
gulp.task('force-styleguide', shell.task([
    './node_modules/.bin/documentjs -f'
  ])
);
gulp.task('recompile-styleguide', ['force-styleguide'], function (event) {
    gulp.src('./styleguide/*')
      .pipe(connect.reload());
});

// Compiles, autoprefixes & minifies the less files
gulp.task('less', function () {
  return gulp
    .src(['./less/styles.less'])
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist'));
});

// Copies the compiled styles to the style guide
gulp.task('copy-styles', ['less'], function() {
  gulp.src('./dist/styles.css')
    .pipe(gulp.dest('./styleguide/patterns'));
});

// Wraps each demo with _demo-container.html
// and copies them to the styleguide
gulp.task('copy-demos', function () {
  gulp.src([
      './less/demos/**/*.html',
      '!./less/demos/_demo-container.html'
    ])
    .pipe(wrap({ src: './less/demos/_demo-container.html' }))
    .pipe(gulp.dest('./styleguide/demos'));
});

// Runs a server at http://localhost:4200/
gulp.task('server', function () {
  connect.server({
    root: './styleguide',
    port: process.env.PORT || '4200',
    livereload: true
  });
});

// Watches files and auto-refreshes when changes are saved
gulp.task('watch', function () {
  gulp.watch(['./less/**/*'], function (event) {
    // timeout gives documentjs a chance to run first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  gulp.watch(['./less/**/*.less'], ['styleguide', 'less', 'copy-styles']);
  gulp.watch(['./less/demos/**/*.html'], ['copy-demos']);
  gulp.watch(['./style-guide-theme/**/*'], ['recompile-styleguide', 'less', 'copy-styles', 'copy-demos']);
});

gulp.task('dev', ['styleguide', 'less', 'copy-styles', 'copy-demos', 'server', 'watch']);