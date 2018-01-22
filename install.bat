@echo off
echo The application install compoments.
call npm install
call bower install
call composer install
call gulp get-wordpress
call gulp clone:theme
call gulp composer
echo The application is installed. The go to start.
