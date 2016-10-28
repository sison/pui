/*
* @Author: sison.luo
* @Date:   2016-06-13 11:45:46
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-10-27 10:44:14
*/

'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var jslint = require('gulp-jslint');
var notify = require('gulp-notify');
var minicss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


gulp.task('bs', function(){
	browsersync({
		files: '**/**',
		server: {
			baseDir: './'
		}
	})
});

gulp.task('jslint', function(){
	return gulp.src('assets/admin/v4.0.3/js/components/*.js')
		.pipe(jslint())
		.pipe(jslint.reporter('default'))
		.pipe(notify({ message: 'lint is ok'}))
});

gulp.task('uglify', function(){
	return gulp.src('assets/admin/v4.0.3/js/components/*.js')
		.pipe(concat('pui.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('assets/admin/v4.0.3/js'));
});

gulp.task('default', ['uglify']);
