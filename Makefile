ENV ?= "dev"

install:
	 		npm install
			bower install
	 		composer install
	 		gulp get-wordpress
	 		gulp clone:theme
	 		gulp composer
			gulp theme:install

server:
			gulp server

required:
			npm install -g bower
