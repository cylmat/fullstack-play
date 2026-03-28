SHELL := /bin/bash

.PHONY: $(MAKECMDGOALS)

help list:
	@echo -e " \
Available commands: \n\
- docker-build: Build php Docker images \n\
- react-up:    Start React development server \n\
- react-build: Build React assets \n\
- react-start: Run React development server \n\
- react-stop:  Stop React development server \n\
- sym-up:      Start Symfony/webpack development server \n\
- sym-build:   Build Symfony assets \n\
- sym-start:   Run Symfony/webpack development server \n\
- sym-stop:    Run Symfony/webpack development server \n\
- sym-down:    Stop Symfony/webpack development server"

docker-build:
	docker compose build -f ".docker/symfony/php.Dockerfile" --pull -t fs-php:latest ".docker"

react-up:
	docker compose --profile react up --build -d
	@echo "React app is available at http://localhost:5171"

react-bash:
	docker exec -it react_node bash

react-start:
	@echo 'Should run "npm install"'
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node npm run dev

react-stop:
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node pkill webpack || true

react-down:
	docker compose --profile react down

sym-up:
	docker compose --profile symfony up --build -d
	@echo 'To make Symfony assets displayed, use "make sym-build"'

sym-bash:
	docker exec -it symfony_php bash

sym-build:
	docker exec -it symfony_php pkill webpack || true
	docker exec -it -u 1000 symfony_php npm run build

sym-start:
	@echo 'Should run "composer install"'
	docker exec -it -u 1000 symfony_php symfony serve --listen-ip=0.0.0.0 --port=81 -d
	@echo "Symfony/webpack app is available at http://localhost:8001"
	docker exec -it symfony_php pkill webpack || true
	docker exec -u 1000 symfony_php npm run watch

sym-stop:
	docker exec -it -u 1000 symfony_php symfony server:stop
	docker exec -it symfony_php pkill webpack || true

sym-down:
	docker compose --profile symfony down
