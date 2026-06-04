SHELL := /bin/bash

.PHONY: $(MAKECMDGOALS)

help list:
	@echo -e " \
Available commands: \n\
- all-stop:     Stop all development servers \n\
- all-down:     Stop all development servers \n\
- all-test:     Test all applications \n\
- docker-build: Build php Docker images \n\
- db-up:        Start database servers \n\
- db-down:      Stop database servers \n\
- react-up:     Start React development server \n\
- react-bash:   Open a bash shell in the React container \n\
- react-start:  Run React development server \n\
- react-stop:   Stop React development server \n\
- react-test:   Test React application \n\
- react-down:   Stop React development server \n\
- sym-up:       Start Symfony/webpack development server \n\
- sym-bash:     Open a bash shell in the Symfony container \n\
- sym-build:    Build Symfony assets \n\
- sym-start:    Run Symfony/webpack development server \n\
- sym-stop:     Stop Symfony/webpack development server \n\
- sym-test:     Test Symfony application \n\
- sym-down:     Stop Symfony/webpack development server \n\
"

# COMMON #

all-stop:
	${MAKE} react-stop
	${MAKE} sym-stop

all-down:
	${MAKE} react-down
	${MAKE} sym-down

all-test:
	${MAKE} react-test
	${MAKE} sym-test

docker-build:
	docker compose build -f ".docker/symfony/php.Dockerfile" --pull -t fs-php:latest ".docker"

# DB #

db-up:
	docker compose -f "compose-db.yml" --profile db up --build -d

db-down:
	docker compose -f "compose-db.yml" --profile db down

# REACT #

react-up:
	docker compose --profile react up --build -d
	@echo "React app is available at http://localhost:5171"

react-bash:
	docker exec -it fs-react-node bash

react-start:
	@echo 'Should run "npm install"'
	docker exec -it fs-react-node pkill node || true
	docker exec -it -u 1000 fs-react-node npm run dev

react-stop:
	docker exec -it fs-react-node pkill node || true
	docker exec -it fs-react-node pkill npm || true

react-test:
	docker exec -it fs-react-node npm run test

react-down:
	docker compose --profile react down

# SYMFONY #

sym-up:
	docker compose --profile symfony up --build -d
	@echo 'To make Symfony assets displayed, use "make sym-build"'

sym-bash:
	docker exec -it fs-symfony-php bash

sym-bash-root:
	docker exec -it -u root fs-symfony-php bash

sym-build:
	docker exec -it fs-symfony-php pkill webpack || true
	docker exec -it -u 1000 fs-symfony-php npm run build

sym-start:
	@echo 'Should run "composer install"'
	docker exec -it -u 1000 fs-symfony-php symfony serve --listen-ip=0.0.0.0 --port=81 -d
	${MAKE}	sym-migrate
	${MAKE}	sym-fixtures
	@echo "Symfony/webpack app is available at http://localhost:8001"
	docker exec -it fs-symfony-php pkill webpack || true
	docker exec -u 1000 fs-symfony-php npm run watch

sym-migrate:
	docker exec -it -u 1000 fs-symfony-php bin/console doctrine:database:drop -f --if-exists
	docker exec -it -u 1000 fs-symfony-php bin/console doctrine:database:create
	docker exec -it -u 1000 fs-symfony-php bin/console doctrine:migrations:migrate -n

sym-fixtures:
	docker exec -it -u 1000 fs-symfony-php bin/console doctrine:fixtures:load -n

sym-stop:
	docker exec -it -u 1000 fs-symfony-php symfony server:stop
	docker exec -it fs-symfony-php pkill webpack || true

sym-test:
	docker exec -it fs-symfony-php  composer run-script test

sym-down:
	docker compose --profile symfony down
