var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('js', function () {
  gulp.src(['app/scripts/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('app/public/assets/scripts'));
});

gulp.task('js-dev', function () {
  gulp.src(['app/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/public/assets/scripts'));
});

gulp.task('scripts', ['js'], function () {
    gulp.watch('app/scripts/**/*.js', ['js'])
});