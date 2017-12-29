'use strict';

// dependencies
var gulp = require('gulp');
var git = require('gulp-git');
var connect = require('gulp-connect-php');
var starterKit = require('starter-kit-nodejs');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');

var configuration = starterKit.getConfiguration();

// Get Wordpress by repositorie Git
gulp.task('get-wordpress', function() {
    return git.clone('https://github.com/WordPress/WordPress', {args: './wordpress'}, function(err) {
      // handle err
    });
});
// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('clone-theme', function(){
  	return gulp.src('./theme/**')
  	.pipe(gulp.dest( starterKit.getPathTheme ));
});

// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('watch', function(){
    gulp.watch('./theme/assets/scripts/**/*.*', ['scripts', 'update-theme']);
    gulp.watch('./theme/assets/styles/**/*.*', ['styles', 'update-theme']);
    gulp.watch('./theme/templates/**/*.*', ['update-theme']);
});

// Create Php Server for dev server.
gulp.task('server-http', function(){
    connect.server({
        base: './wordpress',
        host: configuration.host,
        port: configuration.port,
        livereload: true
    });
});

// Refresh the browser.
gulp.task('browser-reload', function() {
    browserSync.reload();
});

// Contain all files Js in one file.
gulp.task('scripts', function() {
    return gulp.src([
        './theme/assets/scripts/lib/jquery-3.2.1.js',
        /**
         *  Here, you can add Javascript library
         */
        './theme/assets/scripts/src/**/*.*',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./theme'));
});

// Compile files less
gulp.task('styles', function() {
    return gulp.src('./theme/assets/styles/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./theme'));
});

// Get Wordpress by repositorie Git
gulp.task('update-theme', [
  'clone-theme',
  'browser-reload'
]);

gulp.task('server', ['scripts', 'styles', 'clone-theme', 'watch', 'server-http']);
