# starter-kit-wordpress
Starter Kit Wordpress with Gulp, Babel, Twig, Less, Composer, Bower, Browser-Sync, Autload Psr-4. This starter kit use [Timber](https://github.com/timber/timber) a library for integrating Twig in wordpress.

The starter Kit Generate a wordpress theme with a moderne environement.

## Auto Refresh

If the developement server is running each file changement refresh the browser by the library NodeJs Gulp Browser-Sync.

## No css but Less

The generator theme use less for compilating in css. The main file less in this directory :

    /theme/assets/styles/less/main.less


## Javascript Optimized

All files javascript is compilated in a once file javascript. The main file is here but you can create other javascript file.

    starter-kit-wordpress/theme/assets/scripts/src/main.js

**Babel**  is utilised for compilating files. You can write in ESCMA 7 compatible for all browsers.

## How to install

### How to install and how to run on Windows

Just double click on the file install.bat. After the installation double click on server.bat for run the developement server.

### How to install and how to run on Linux

Use the commands

```
make install
make server
```

The commands install all library and after run the developement server.

## Comming soon

System of controller mvc like Symfony or Laravel is in developing.
Folder for translate files Po in Mo.
