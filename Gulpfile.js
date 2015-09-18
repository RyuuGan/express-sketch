'use strict';

var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify')
  , stylus = require('gulp-stylus')
  , rename = require('gulp-rename')
  , autoprefixer = require('gulp-autoprefixer');

gulp.task('build', ['build-assets']);

gulp.task('build-assets', ['build-js', 'build-css']);

gulp.task('build-js', [
  'build-js-main'
]);

['main'].forEach(function (name) {
  gulp.task('build-js-' + name, _buildJs(name));
});

function _buildJs(name) {
  return function () {
    return gulp.src('client/' + name + '/index.js')
      .pipe(browserify())
      .pipe(uglify({
        mangle: true,
        compress: true
      }))
      .pipe(rename(name + '.js'))
      .pipe(gulp.dest('build'));
  };
}

// Stylesheets

gulp.task('build-css', [
  'build-css-main'
]);

['main'].forEach(function (name) {
  gulp.task('build-css-' + name, _buildCss(name));
});

function _buildCss(name) {
  return function () {
    return gulp.src('stylesheets/' + name + '.styl')
      .pipe(stylus({
        compress: true,
        'include css': true
      }))
      .pipe(autoprefixer())
      .pipe(gulp.dest('build'));
  };
}
