var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('[dev]::scripts', function () {
  gulp.src(['app/scripts/**/*.js'])
    // .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/scripts'));
});

gulp.task('[dev]::watch:scripts', ['[dev]::scripts'], function () {
    gulp.watch('app/scripts/**/*.js', ['[dev]::scripts'])
});