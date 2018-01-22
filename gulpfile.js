'use strict';

// dependencies
var gulp = require('gulp');
var git = require('gulp-git');
var connect = require('gulp-connect-php');
var starterKit = require('starter-kit-nodejs');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var exec = require('child_process').exec;
var mysqlDump = require('mysqldump');

var configuration = starterKit.getConfiguration();

// Get Wordpress by repositorie Git
gulp.task('get-wordpress', function() {
    return git.clone('https://github.com/WordPress/WordPress', {args: './wordpress'}, function(err) {
      // handle err
    });
});

// Get Install dependencies in theme
gulp.task('composer', function() {
    exec('composer update', {cwd: starterKit.getPathTheme()},function (err, stdout, stderr) {
      // response Console
      console.log(stdout);
      console.log(stderr);
    });
    exec('composer dumpautoload -o', {cwd: starterKit.getPathTheme()},function (err, stdout, stderr) {
      // response Console
      console.log(stdout);
      console.log(stderr);
    });
});


// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('watch', function(){
    gulp.watch('./theme/assets/scripts/**/*.*', ['scripts']);
    gulp.watch('./theme/assets/styles/**/*.*', ['styles']);
    gulp.watch('./theme/templates/**/*.*', ['update-theme']);
    gulp.watch('./theme/app/**/*.*', ['update-theme']);
    gulp.watch('./theme/midleware/**/*.*', ['update-theme']);
    gulp.watch('./theme/languages/**/*.*', ['translate']);
});

// Create Php Server for dev server.
gulp.task('server-http', function(){
    connect.server({
        base: './wordpress',
        host: configuration.host,
        port: configuration.port,
        livereload: true
    },
    function(){
      browserSync({
          proxy: configuration.host + ":" + configuration.port
      });
    });
});

// Refresh the browser.
gulp.task('browser-reload', function() {
    browserSync.reload();
});

// Contain all files Js in one file.
gulp.task('scripts', function() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        /**
         *  Here, you can add Javascript library
         */
        // './bower_components/jquery/dist/boostrap.min.js',
        './theme/assets/scripts/src/**/*.*',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest( starterKit.getPathTheme() ));
});

// Compile files less
gulp.task('styles', function() {
    var lessStream = gulp.src('./theme/assets/styles/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest( starterKit.getPathTheme() ));
});

// Get Wordpress by repositorie Git
gulp.task('update-theme', [
    'clone:theme',
    'browser-reload'
]);

// Refresh the browser.
gulp.task('clone:database', function() {
    mysqlDump({
        host: configuration.database.host,
        user: configuration.database.username,
        password: configuration.database.password,
        database: configuration.database.name,
        dest: configuration.database.exportPath  // destination file
    },function(err){
        // create data.sql file;
    })
});

// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('clone:theme', function(){
  	return gulp.src([
        './theme/app',
        './theme/templates',
        './theme/midleware/**'
    ])
  	.pipe(gulp.dest( starterKit.getPathTheme() ));
});

gulp.task('server', ['scripts', 'styles', 'clone:theme', 'watch', 'server-http']);

gulp.task('assets', ['scripts', 'styles', 'clone:theme']);
