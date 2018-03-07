'use strict';

// dependencies
var gulp         = require('gulp');
var connect      = require('gulp-connect-php');
var starterKit   = require('starter-kit-nodejs');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS     = require('gulp-clean-css');
var exec         = require('child_process').exec;
var mysqlDump    = require('mysqldump');
var merge        = require('merge-stream');
var toolFiles    = require('tool-files');
var argv         = require('yargs').argv

var configuration = starterKit.getConfiguration();
var currentPath = process.cwd();
/**
 * True is system environement is windows
 * @type {Boolean}
 */
var isWin = process.platform === "win32"
if ( isWin ) {
    currentPath = currentPath.replace("/", "\\");
}
// Get Wordpress by repositorie Git
gulp.task('theme:install', function() {
    starterKit.dowloadWordpress();
    // starterKit.dowloadWpCli();
});

/**
 * Create a virtual folder for Dev Server
 * @return {[type]} [description]
 */
gulp.task('create:virtual:folder', function() {
      if ( isWin ) {
          console.log('mklink /D ' + currentPath + '\\wordpress\\wp-content\\themes\\' + configuration.themeName + " " + currentPath + '\\theme');
          exec('mklink /D ' + currentPath + '\\wordpress\\wp-content\\themes\\' + configuration.themeName + " " + currentPath + '\\theme',function (err, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
          } )
      } else {
          exec('ln -s ' + currentPath + '/wordpress/wp-content/themes/' + configuration.themeName + " " + currentPath + '/theme',function (err, stdout, stderr) {
              console.log(stdout);
              console.log(stderr);
          } )
      }
});
// Get Install dependencies in theme
gulp.task('theme:composer', function() {
    exec('composer update', { cwd: './theme' },function (err, stdout, stderr) {
      // response Console
      console.log(stdout);
      console.log(stderr);
    });
    exec('composer dumpautoload -o', { cwd: './theme' },function (err, stdout, stderr) {
      // response Console
      console.log(stdout);
      console.log(stderr);
    });
});

// Create Php Server for dev server.
gulp.task('server:create', function(){
    connect.server({
        // hostname: configuration.host,
        // port: configuration.port,
        base: './wordpress'
    },
    function(){
        browserSync({
            proxy: configuration.host + ':' + configuration.port
        });
    });
});

gulp.task('server:stop', function() {
    server.closeServer();
});

// Refresh the browser.
gulp.task('browser:reload', function() {
    browserSync.reload();
});

// Get Wordpress by repositorie Git
gulp.task('theme:update', [
    'theme:clone',
    'browser:reload'
]);

// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('theme:clone', function(){
});

// Contain all files Js in one file.
gulp.task('scripts', function() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        /**
         *  Here, you can add Javascript library
         */
        // './bower_components/jquery/dist/boostrap.min.js',
        './theme/Ressources/assets/scripts/src/**/*.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest( './theme' ));
});

// Compile files less
gulp.task('styles', function() {

    var cssStream = gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap-grid.min.css',
      './bower_components/bootstrap/dist/css/bootstrap-reboot.min.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('css-files.css'))

    var lessStream = gulp.src('./theme/Ressources/assets/styles/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('less-files.less'))

    var mergedStream = merge(lessStream, cssStream)
        .pipe(concat('style.css'))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest( './theme' ));

    return mergedStream;
});

// Refresh the browser.op
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
gulp.task('watch', function(){
    gulp.watch('./theme/Ressources/assets/scripts/**/*.*', ['scripts', 'browser:reload']);
    gulp.watch('./theme/Ressources/assets/styles/**/*.*', ['styles', 'browser:reload']);
    gulp.watch('./theme/Ressources/assets/images/**/*.*', ['theme:update']);
    gulp.watch('./theme/templates/**/*.*', ['theme:update']);
    gulp.watch('./theme/src/**/*.*', ['theme:update']);
    gulp.watch('./theme/app/**/*.*', ['theme:update']);
    gulp.watch('./theme/midleware/**/*.*', ['theme:update']);
    gulp.watch('./theme/languages/**/*.*', ['translate']);
});


gulp.task('server:start', ['scripts', 'styles', 'theme:clone', 'watch', 'server:create']);

gulp.task('assets', ['scripts', 'styles', 'theme:clone']);
