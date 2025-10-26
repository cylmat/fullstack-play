SHELL := /bin/bash  

.PHONY: up start-node start-sym stop test jest down

up:
	docker compose up --build -d

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
