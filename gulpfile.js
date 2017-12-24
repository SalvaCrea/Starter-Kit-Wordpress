'use strict';

// dependencies
var gulp = require('gulp');
var request = require('request');
var git = require('gulp-git');

gulp.task('install', ['cloneWordpress']);

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

gulp.task('install', ['cloneWordpress']);
