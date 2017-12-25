'use strict';

// dependencies
var gulp = require('gulp');
var request = require('request');
var git = require('gulp-git');
var toolFiles = require('tool-files');
var composer = require('gulp-composer');
var exec = require('child_process').exec;

var configuration = toolFiles.getFileJson('./configuration.json');
var folderPath = './wordpress/wp-content/themes';
var themePath = folderPath + '/' +configuration.themeName;


gulp.task('install', ['cloneWordpress']);

// Get Wordpress by repositorie Git
gulp.task('cloneWordpress', function() {
  git.clone('https://github.com/WordPress/WordPress', {args: './wordpress'}, function(err) {
    console.log('Clone Error');
    console.log(err);
  });
});
// Clone Folder theme in the directiry ./wordpress/wp-content/themes
gulp.task('cloneTheme', function(){
	gulp.src('./theme/**')
		.pipe(gulp.dest(themePath));
});

// execute composer and install dependencies in wordpress theme
gulp.task('composerInstall', function(){
  var a = exec('composer install -d='+themePath, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

// gulp.task('install', ['cloneWordpress', 'cloneTheme', 'composerInstall']);

gulp.task('install', ['cloneWordpress'], function(){
  gulp.start('cloneTheme', function(){
    console.log('test');
  });
});
