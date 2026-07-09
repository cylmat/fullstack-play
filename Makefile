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
- git-push:     Push all changes to git \n\
- linux-bash:   Open a bash shell in the Linux container \n\
- js-up:        Start Vanilla JS development server \n\
- js-bash:      Open a bash shell in the Vanilla JS container \n\
- js-start:     Run Vanilla JS development server \n\
- js-test:      Test Vanilla JS application \n\
- js-stop:      Stop Vanilla JS development server \n\
- js-down:      Stop Vanilla JS development server \n\
- react-up:     Start React development server \n\
- react-bash:   Open a bash shell in the React container \n\
- react-start:  Run React development server \n\
- react-test:   Test React application \n\
- react-stop:   Stop React development server \n\
- react-down:   Stop React development server \n\
- sym-up:       Start Symfony/webpack development server \n\
- sym-bash:     Open a bash shell in the Symfony container \n\
- sym-build:    Build Symfony assets \n\
- sym-start:    Run Symfony/webpack development server \n\
- sym-test:     Test Symfony application \n\
- sym-stop:     Stop Symfony/webpack development server \n\
- sym-down:     Stop Symfony/webpack development server \n\
"

# COMMON #

all-stop:
	${MAKE} js-stop
	${MAKE} react-Stop
	${MAKE} vue-stop
	${MAKE} sym-stop

all-down:
	${MAKE} js-down
	${MAKE} react-down
	${MAKE} vue-down
	${MAKE} sym-down

all-tests:
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-react-node; then $(MAKE) react-test; fi'
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-vanilla-node; then $(MAKE) js-test; fi'
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-vue-node; then $(MAKE) vue-test; fi'
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-symfony-php; then $(MAKE) sym-test; fi'

docker-build:
	docker compose build -f ".docker/symfony/php.Dockerfile" --pull -t fs-php:latest ".docker"

# DB #

db-up:
	docker compose -f "compose-db.yml" --profile db up --build -d

db-down:
	docker compose -f "compose-db.yml" --profile db down

# GIT PUSH #
git-push:
	docker run -u 1000:1000 --env-file .docker/linux/.env.dist.local -v .:/var/www/application fs-linux sh -c '\
		cd /var/www/application && git config user.name "$$GIT_USER" && git config user.email "$$GIT_EMAIL" && \
		git add . && git commit -m 'Update by make' && git pull --rebase && git push'

linux-build:
	docker build -f ".docker/linux/linux.Dockerfile" --pull -t fs-linux:latest ".docker"

linux-bash:
	docker run -it -u 1000:1000 -v .:/var/www/application fs-linux:latest bash

# VANILLA JS #

js-up:
	docker compose --profile vanilla up --build -d
	@echo "Vanilla JS app is available at http://localhost:5171"

js-bash:
	docker exec -it fs-vanilla-node bash

js-start:
	@echo 'Should run "npm install"'
	docker exec -it fs-vanilla-node pkill node || true
	docker exec -it -u 1000 fs-vanilla-node npm run dev

js-test:
	docker exec -it fs-vanilla-node npm run test

js-stop:
	docker exec -it fs-vanilla-node pkill node || true
	docker exec -it fs-vanilla-node pkill npm || true

js-down:
	docker compose --profile vanilla down

# REACT #

react-up:
	docker compose --profile react up --build -d
	@echo "React app is available at http://localhost:5172"

react-bash:
	docker exec -it fs-react-node bash

react-start:
	@echo 'Should run "npm install"'
	docker exec -it fs-react-node pkill node || true
	docker exec -it -u 1000 fs-react-node npm run dev

react-test:
	docker exec -it fs-react-node npm run test

react-stop:
	docker exec -it fs-react-node pkill node || true
	docker exec -it fs-react-node pkill npm || true

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

sym-test:
	docker exec -it fs-symfony-php  composer run-script test

sym-stop:
	docker exec -it -u 1000 fs-symfony-php symfony server:stop
	docker exec -it fs-symfony-php pkill webpack || true

sym-down:
	docker compose --profile symfony down
