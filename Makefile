ENV ?= "dev"

all:
	 		npm install
			call bower install
	 		composer install
	 		gulp get-wordpress
	 		gulp clone-theme
	 		gulp composer

server:
			gulp server
