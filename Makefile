SHELL := /bin/bash

.PHONY: $(MAKECMDGOALS)

help list:
	@echo -e " \
Available commands: \n\
  Common \n\
- docker-build: Build php Docker images \n\
- git-push:     Push all changes to git \n\
- linux-bash:   Open a bash shell in the Linux container \n\
- ports:        List all ports used by containers \n\
  All \n\
- all-test:     Test all applications \n\
- all-stop:     Stop all development servers \n\
- all-down:     Stop all development servers \n\
  Database \n\
- db-up:        Start database servers \n\
- db-down:      Stop database servers \n\
- db-kv-up:     Start key-value database servers \n\
- db-kv-down:   Stop key-value database servers \n\
- db-nosql-up:  Start NoSQL database servers \n\
- db-nosql-down: Stop NoSQL database servers \n\
- db-sql-up:    Start SQL database servers \n\
- db-sql-down:  Stop SQL database servers \n\
  JavaScript \n\
- react-up:     Start React development server \n\
- vanilla-up:   Start Vanilla JS development server \n\
- vue-up:       Start Vue development server \n\
- js-bash:      Open a bash shell in the Vanilla JS container \n\
- js-start:     Run Vanilla JS development server \n\
- js-test:      Test Vanilla JS application \n\
- js-stop:      Stop Vanilla JS development server \n\
- js-down:      Stop Vanilla JS development server \n\
  Symfony \n\
- sym-up:       Start Symfony/webpack development server \n\
- sym-bash:     Open a bash shell in the Symfony container \n\
- sym-build:    Build Symfony assets \n\
- sym-start:    Run Symfony/webpack development server \n\
- sym-test:     Test Symfony application \n\
- sym-stop:     Stop Symfony/webpack development server \n\
- sym-down:     Stop Symfony/webpack development server \n\
"

# COMMON #


docker-build:
	docker build -f ".docker/symfony/php.Dockerfile" --pull -t fs-php:latest --target core ".docker"

docker-build-server:
	docker build -f ".docker/symfony/php.Dockerfile" --pull -t fs-php-server:latest ".docker"

# Usage $ make git-push MSG="my message"
MSG ?= Update by make
git-push:
	docker run --rm -u 1000:1000 --env-file .docker/linux/.env.local \
		-v .:/var/www/application -v ./.docker/data/linux:/data fs-linux sh -c '\
		git config user.name "$$GIT_USER" && git config user.email "$$GIT_EMAIL" && \
		git add . || true && git commit -m "$(MSG)" && git pull --rebase && git push'

linux-build:
	docker build -f ".docker/linux/linux.Dockerfile" --pull -t fs-linux:latest .docker

linux-bash:
	docker run --rm -it -u 1000:1000 --env-file .docker/linux/.env.local -v .:/var/www/application fs-linux:latest bash

ports:
	@echo "Ports used by  -fullstack- containers:"
	@docker ps --format "table {{.Names}}\t{{.Ports}}" | grep "fs-"


# ALL #

all-tests:
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-node; then $(MAKE) react-test; fi'
	@sh -c 'if docker ps --format "{{.Names}}" | grep -q fs-php; then $(MAKE) sym-test; fi'

all-stop:
	${MAKE} db-stop
	${MAKE} js-stop
	${MAKE} sym-stop

all-down:
	${MAKE} db-down
	${MAKE} js-down
	${MAKE} sym-down


# DB #

db-up:
	docker compose -f "compose-db.yml" --profile db up --build -d

db-down:
	docker compose -f "compose-db.yml" --profile db down

db-kv-up:
	docker compose -f "compose-db.yml" --profile db-kv up --build -d

db-kv-down:
	docker compose -f "compose-db.yml" --profile db-kv down

db-nosql-up:
	docker compose -f "compose-db.yml" --profile db-nosql up --build -d

db-nosql-down:
	docker compose -f "compose-db.yml" --profile db-nosql down

db-sql-up:
	docker compose -f "compose-db.yml" --profile db-sql up --build -d

db-sql-down:
	docker compose -f "compose-db.yml" --profile db-sql down



# JS #

react-up:
	HOST_VOLUME=./apps/vite-react docker compose --profile node up --build -d

# JS and SCSS
vanilla-up:
	HOST_VOLUME=./apps/vite-vanilla docker compose --profile node up --build -d

vue-up:
	HOST_VOLUME=./apps/vite-vue docker compose --profile node up --build -d

js-bash:
	docker exec -it fs-node bash

js-start:
	@echo 'Should run "npm install"'
	docker exec -it fs-node pkill node || true
	docker exec -it -u 1000 fs-node npm run dev
	@echo "Node JS app is available at http://localhost:5101"

js-test:
	docker exec -it fs-node npm run test

js-stop:
	docker exec -it fs-node pkill node || true
	docker exec -it fs-node pkill npm || true

js-down:
	docker compose --profile node down


# SYMFONY #

sym-up:
	docker compose --profile symfony up --build -d
	@echo 'To make Symfony assets displayed, use "make sym-build"'

sym-bash:
	docker exec -it fs-php bash

sym-bash-root:
	docker exec -it -u root fs-php bash

sym-build:
	docker exec -it fs-php pkill webpack || true
	docker exec -it -u 1000 fs-php npm run build

sym-start:
	@echo 'Should run "composer install"'
	docker exec -it -u 1000 fs-php symfony serve --listen-ip=0.0.0.0 --port=81 -d
	${MAKE}	sym-migrate
	${MAKE}	sym-fixtures
	@echo "Symfony/webpack app is available at http://localhost:8101"
	docker exec -it fs-php pkill webpack || true
	docker exec -u 1000 fs-php npm run watch

sym-migrate:
	docker exec -it -u 1000 fs-php bin/console doctrine:database:drop -f --if-exists || true
	docker exec -it -u 1000 fs-php bin/console doctrine:database:create || true
	docker exec -it -u 1000 fs-php bin/console doctrine:migrations:migrate -n || true

sym-fixtures:
	docker exec -it -u 1000 fs-php bin/console doctrine:fixtures:load -n || true

sym-test:
	docker exec -it fs-php  composer run-script test

sym-stop:
	docker exec -it -u 1000 fs-php symfony server:stop
	docker exec -it fs-php pkill webpack || true

sym-down:
	docker compose --profile symfony down
