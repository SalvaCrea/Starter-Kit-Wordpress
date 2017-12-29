'use strict';

// dependencies
var gulp = require('gulp');
var git = require('gulp-git');
var connect = require('gulp-connect-php');
var startKit = require('starter-kit-nodejs');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var clean = require('gulp-clean');

var configuration = startKit.getConfiguration();

// Get Wordpress by repositorie Git
gulp.task('cloneWordpress', function() {
    git.clone('https://github.com/WordPress/WordPress', {args: './wordpress'}, function(err) {
      // handle err
    });
});
// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('cloneTheme', function(){
  	gulp.src('./theme/')
  	.pipe(gulp.dest('./public/'));
});

// Create Php Server for dev server.
gulp.task('server', function(){
    connect.server({
        root: './wordpress',
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

});

gulp.task('install', ['cloneWordpress', ]);
