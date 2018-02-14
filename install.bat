@echo off
echo The application install compoments.
call npm install
call bower install
call composer install
call gulp theme:install
call gulp clone:theme
call gulp theme:composer
call gulp create:virtual:folder
echo The application is installed. The go to start.
