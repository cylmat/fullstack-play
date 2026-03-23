SHELL := /bin/bash

.PHONY: up start-node sym-build start-sym stop test jest down

up:
	docker compose up --build -d
	@echo "Symfony/webpack app is available at http://localhost:8001"
	@echo "To make Symfony assets displayed, use make sym-build"
	@echo "To run Node server, use make start-node"
	@echo "Then node server will be available at http://localhost:5173"

sym-build:
	docker exec -it symplay pkill webpack || true
	docker exec -it -u 1000 symplay npm run build

start-node:
	docker exec -it nodeground pkill node || true
	docker exec -it -u 1000 nodeground npm run dev

start-sym:
	docker exec -it symplay pkill webpack || true
	docker exec -it -u 1000 symplay npm run serve

stop:
	docker exec -it nodeground pkill node || true
	docker exec -it symplay pkill webpack || true

down: 
	docker compose down
