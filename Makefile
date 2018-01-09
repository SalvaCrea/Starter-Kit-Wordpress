ENV ?= "dev"

install:
	 		npm install
			bower install
	 		composer install
	 		gulp get-wordpress
	 		gulp clone-theme
	 		gulp composer

server:
			gulp server

required:
			npm install -g bower
