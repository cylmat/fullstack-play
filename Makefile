SHELL := /bin/bash

.PHONY: up down react-stop sym-build sym-run

up:
	docker compose up --build -d
	@echo "
		Symfony/webpack app is available at http://localhost:8001
		To make Symfony assets displayed, use make build-sym
		To run Node server, use make start-node
		Then node server will be available at http://localhost:5171
	"

react-run:
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node npm run dev

react-stop:
	docker exec -it react_node pkill node || true
	docker exec -it -u 1000 react_node pkill webpack || true

sym-build:
	docker exec -it symfony_php pkill webpack || true
	docker exec -it -u 1000 symfony_php npm run build

sym-run:
	docker exec -it symfony_php pkill webpack || true
	docker exec -it -u 1000 symfony_php npm run serve

down: 
	docker compose down
