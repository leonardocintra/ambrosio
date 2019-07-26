restart-docker:
	@sudo docker-compose stop
	@sudo docker-compose rm -f
	@sudo docker-compose up -d
	
start-dev:
	@git remote add prod https://git.heroku.com/ambrosio-prod.git
	@git remote add stage https://git.heroku.com/ambrosio-stage.git
	@sudo docker-compose up -d
	