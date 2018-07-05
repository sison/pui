/*
 * @Author: sison.luo
 * @Date:   2016-06-13 11:45:46
 * @Last Modified by: sison
 * @Last Modified time: 2018-07-05 17:47:37
 */

'use strict';
var gulp = require('gulp');
var browsersync = require('browser-sync');
var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
// var jslint = require('gulp-jslint');
// var notify = require('gulp-notify');
// var minicss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
// var clean = require('gulp-clean')

// var clean = require('gulp-clean')
// var pathConfig = {
//     'ENV': 'dev',
//     'temp': path.resolve(__dirname, 'temp')
// }

gulp.task('bs', function() {
    browsersync({
        files: '**/**',
        server: {
            baseDir: './'
        }
    })
});

// gulp.task('imagemin', function() {
//     return gulp.src('assets/admin/images/*.{png,jpg,gif,ico}')
//         .pipe(imagemin({
//             optimizationLevel: 5,
//             progressive: true,
//             multipass: true
//         }))
//         .pipe(gulp.dest('assets/admin/images/min'))
// });

// gulp.task('es6', function() {
//     return gulp.src('assets/admin/jslayout.js')
//         .pipe($.plumber())
//         .pipe($.babel({
//             presets: ['es2015']
//         }))
//         .pipe(rename({ suffix: '.es5' }))
//         .pipe(gulp.dist('/'))
// });

// gulp.task('jslint', function() {
//     return gulp.src('assets/admin/js/components/*.js')
//         .pipe(jslint())
//         .pipe(jslint.reporter('default'))
//         .pipe(notify({ message: 'lint is ok' }))
// });

gulp.task('uglify_pc', function() {
    return gulp.src('assets/admin/js/components/*.js')
        .pipe(concat('pui.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            compress: true,
            // mangle: true // 默认true，修改变量名
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}, //排除混淆关键字
            // preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('assets/admin/js'))
        .pipe(gulp.dest('./'))
});

gulp.task('uglify_m', function() {
    return gulp.src('assets/admin/js/components_m/*.js')
        .pipe(concat('pui_m.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
			compress: true
        }))
        .pipe(gulp.dest('assets/admin/js'))
        .pipe(gulp.dest('./'))
});

// gulp.task('html', function() {
//     var version = (new Date()).getTime();
//     var opts = {
//         removeComments: false, //清除HTML注释
//         collapseWhitespace: true, //压缩HTML
//         collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
//         removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
//         removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
//         removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
//         minifyJS: false, //压缩页面里的JS
//         minifyCSS: false //压缩页面里的CSS
//     };
//     return gulp.src('html/*html')
//         .pipe($.plumber())
//         .pipe($.useref({ searchPath: ['app', '.'] }))
//         .pipe($.if('*.js', $.uglify()))
//         .pipe($.if('*.css', $.cssnano()))
//         .pipe($.if('*.html', $.htmlmin(opts)))
//         .pipe($.replace('.js"></script>', '.js?v=' + version + '"></script>'))
//         .pipe($.replace('.css">', '.css?v=' + version + '">'))
//         .pipe(gulp.dest('html/min'));
// })


gulp.task('default', ['uglify']);
