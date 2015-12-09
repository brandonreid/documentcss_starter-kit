var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');

// Runs "documentjs -w"
gulp.task('styleguide', shell.task([
  './node_modules/.bin/documentjs -w'
]));

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
    .pipe(gulp.dest('./styleguide/se-styles'));
});

// Copies the demos to the style guide
gulp.task('copy-demos', function () {
  gulp.src('./less/demos/**/*.html')
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
  gulp.watch([
    './less/**/*',
  ], function (event) {
    setTimeout(function() {
      // timeout gives documentjs a chance to run first
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  gulp.watch(['./less/**/*.less', '!./less/style-guide-theme'], ['less', 'copy-styles']);
  gulp.watch(['./less/demos/**/*.html'], ['copy-demos']);
});

gulp.task('dev', ['styleguide', 'less', 'copy-styles', 'copy-demos', 'server', 'watch']);