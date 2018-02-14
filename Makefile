ENV ?= "dev"

install:
	 		npm install
			bower install
	 		composer install
			gulp theme:install
			gulp clone:theme
			gulp theme:composer
			gulp create:virtual:folder

server:
			gulp server

required:
			npm install -g bower
