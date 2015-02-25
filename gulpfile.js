var gulp = require('gulp'),
	fs   = require('fs')

// Export task from the gulp folder.
fs.readdirSync(__dirname + '/gulp/').forEach(function (task) {
	require('./gulp/' + task)
})


gulp.task('dev', ['[dev]::server', '[dev]::watch:styles', '[dev]::watch:scripts'])