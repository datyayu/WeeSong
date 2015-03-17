var gulp = require('gulp'),
	fs   = require('fs')

// Export task from the gulp folder.
fs.readdirSync(__dirname + '/gulp/').forEach(function (task) {
	require('./gulp/' + task)
})


gulp.task('dev', ['server', 'styles', 'scripts'])
gulp.task('quick', ['js', 'css', 'html'])
gulp.task('default', ['styles', 'scripts'])