var gulp    = require('gulp'),
		connect = require('gulp-connect'),
		stylus  = require('gulp-stylus'),
		nib   	= require('nib')


// Compile stylus to css
gulp.task('[dev]::css', function () {
	gulp.src('./app/stylus/styles.styl')
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(gulp.dest('./app/assets/css/'))
		.pipe(connect.reload())
})


// Reload on html changes.
gulp.task('html', function () {
	gulp.src(['./app/*.html', './app/layouts/**/*.html'])
		.pipe(connect.reload())
})


// Watch for changes.
gulp.task('[dev]::watch:styles', ['[dev]::css'], function () {
	/* Stylus changes */
	gulp.watch('./app/stylus/**/*.styl', ['[dev]::css'])

	/* Html changes */
	gulp.watch([
		'./app/layouts/**/*.html',
		'./app/*.html'
	], ['html'])
})
