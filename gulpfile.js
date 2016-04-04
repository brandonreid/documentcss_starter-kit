var gulp = require('gulp');
var shell = require('gulp-shell');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var wrap = require("gulp-wrap");
var connect = require('gulp-connect');

// Runs the "documentjs" build command
gulp.task('styleguide', shell.task([
  './node_modules/.bin/documentjs'
]));

// This is used when editing template styles.
// It has to completely rebuild the style guide, note that this takes about 5s.
gulp.task('force-styleguide', shell.task([
    './node_modules/.bin/documentjs -f'
  ])
);

// Task that reloads the browser after force-styleguide
gulp.task('reload-styleguide', ['force-styleguide'], function (event) {
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

// Copies the compiled styles to the style guide folder
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

// Copies the fonts folder
gulp.task('copy-fonts', function() {
  return gulp.src(['./fonts/**/*'], {
    base: 'src'
  }).pipe(gulp.dest('./styleguide/fonts'));
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
    // timeout gives documentjs a chance to finish compiling first
    setTimeout(function() {
      return gulp
        .src(event.path)
        .pipe(connect.reload());
      }, 400);
  });
  gulp.watch(['./less/**/*.less'], ['styleguide', 'less', 'copy-styles']);
  gulp.watch(['./less/demos/**/*.html'], ['copy-demos']);
  // watches style guide theme files and runs a whole rebuild after saves
  gulp.watch(['./style-guide-theme/**/*'], ['reload-styleguide', 'less', 'copy-styles', 'copy-demos', 'copy-fonts']);
});

gulp.task('dev', ['force-styleguide', 'less', 'copy-styles', 'copy-demos', 'copy-fonts', 'server', 'watch']);