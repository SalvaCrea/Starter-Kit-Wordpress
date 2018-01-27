![enter image description here](http://salva-crea.fr/wp-content/uploads/2018/01/screenshot.png)

# Starter Kit Wordpress
Starter Kit Wordpress with Gulp, Babel, Twig, Less, Composer, Bower, Browser-Sync, Autload Psr-4. This starter kit use [Timber](https://github.com/timber/timber) a library for integrating Twig in wordpress.

The starter Kit Generate a wordpress theme with a modern environement.

Deploy a website wordpress with just one command :

``make install``

This command make :

- Dowload the last version of wordpress by Github.
- Install Twig.
- Install a dev environement with Gulp and NodeJs.
- Install the Theme in wordpress.  

## Auto Refresh

If the developement server is running each file changement refresh the browser by the library NodeJs Gulp Browser-Sync.

## No css but Less

The generator theme use less for compilating in css. The main file less in this directory :

    /theme/assets/styles/less/main.less


## Javascript Optimized

All files javascript is compilated in a once file javascript. The main file is here but you can create other javascript file.

    /theme/assets/scripts/src/main.js

**Babel**  is utilised for compilating files. You can write in ESCMA 7 compatible for all browsers.

## Develop a Wordpress Theme with Twig

The files templating In this folder :
``/themes/templates/``

The twig templating langage is used.

```
{% extends "base.twig" %}

{% block content %}
	<div class="content-wrapper">
		<article class="post-type-{{post.post_type}}" id="post-{{post.ID}}">
			<section class="article-content">
				<h1 class="article-h1">{{post.title}}</h1>
				<div class="article-body">
					{{post.content}}
				</div>
			</section>
		</article>
	</div><!-- /content-wrapper -->
{% endblock %}
```

## How to install

### Windows : How to install and how to run

Just double click on the file **install.bat**. After the installation double click on **server.bat** for run the developement server.

### Linux : How to install and how to run

Use the commands

```
make install
make server
```

The commands install all library and after run the developement server.

## Comming soon

System of controller mvc like Symfony or Laravel is in developing.
Folder for translate files Po in Mo.
Deploy on Ftp server.

## Required

- Git.
- Nodejs.
- Gulp.
- Bower.
- Composer
