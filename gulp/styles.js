var gulp    = require('gulp'),
		connect = require('gulp-connect'),
		stylus  = require('gulp-stylus'),
		nib   	= require('nib')


// Compile stylus to css
gulp.task('css', function () {
	gulp.src('./app/stylus/styles.styl')
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(gulp.dest('./app/public/assets/css/'))
		.pipe(connect.reload())
})


// Reload on html changes.
gulp.task('html', function () {
	gulp.src('./app/layouts/**/*.html')
		.pipe(gulp.dest('./app/public/assets/html/'))
		.pipe(connect.reload())
})


// Watch for changes.
gulp.task('styles', ['css'], function () {
	/* Stylus changes */
	gulp.watch('./app/stylus/**/*.styl', ['css'])

	/* Html changes */
	gulp.watch('./app/layouts/**/*.html', ['html'])
})
