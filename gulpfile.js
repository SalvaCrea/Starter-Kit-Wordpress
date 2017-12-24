'use strict';

// dependencies
var gulp = require('gulp');
var request = require('request');
var git = require('gulp-git');

gulp.task('install', function() {
			
});

// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
gulp.task('cloneWordpress', function() {
  git.clone('https://github.com/WordPress/WordPress', {args: './wordpress'}, function(err) {
    // handle err
  });
});
