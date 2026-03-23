SHELL := /bin/bash

.PHONY: $(MAKECMDGOALS)

list:
	@echo -e " \
Available commands: \n\
- make react-up: Start React development server \n\
- make react-build: Build React assets \n\
- make react-run: Run React development server \n\
- make react-stop: Stop React development server \n\
- make sym-up: Start Symfony/webpack development server \n\
- make sym-build: Build Symfony assets \n\
- make sym-run: Run Symfony/webpack development server \n\
- make sym-down: Stop Symfony/webpack development server \n\
"

react-run:
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node npm run dev

react-stop:
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node pkill webpack || true

sym-up:
	docker compose --profile symfony up --build -d
	@echo "Symfony/webpack app is available at http://localhost:8001"
	@echo "To make Symfony assets displayed, use -make sym-build-"

sym-build:
	docker exec -it symfony_php pkill webpack || true
	docker exec -it -u 1000 symfony_php npm run build

sym-run:
	docker exec -it symfony_php pkill webpack || true
	docker exec -it -u 1000 symfony_php npm run serve

sym-down:
	docker compose down
