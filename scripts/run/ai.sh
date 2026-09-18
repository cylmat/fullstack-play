#!/bin/bash


if [[
    "$1" == "ls" ||
    "$1" == "" ||
    "$1" == "help"
]]; then
    echo ""
    echo 'Listing available "Run Script" AI commands:'
    echo "up"
    echo "build-image"
    echo "bash"
    echo "bash-root"
    echo "install"
    echo "start"
    echo "stop"
    echo "down"
    exit 0
fi


if [ "$1" == "up" ]; then
	docker compose -f "compose_ai.yml" --profile ai up --build -d
    exit 0
fi

if [ "$1" == "build-image" ]; then
	docker build -f ".docker/node/node.Dockerfile" -t fs-ai-node:latest --pull .docker
    exit 0
fi

if [ "$1" == "bash" ]; then
	docker exec -it fs-ai-node bash
    exit 0
fi

if [ "$1" == "bash-root" ]; then
	docker exec -it -u root fs-ai-node bash
    exit 0
fi

if [ "$1" == "install" ]; then
	docker exec -it -u 1000 fs-ai-node npm install
    exit 0
fi

if [ "$1" == "start" ]; then
	docker exec -it fs-ai-node pkill node || true
	echo "Node JS client is available at http://localhost:5111"
    echo "Node JS server is available at http://localhost:5112"
	docker exec -it -u 1000 fs-ai-node npm run dev
    exit 0
fi

if [ "$1" == "stop" ]; then
	docker exec -it fs-ai-node pkill node || true
	docker exec -it fs-ai-node pkill npm || true
    exit 0
fi

if [ "$1" == "down" ]; then
	docker compose -f "compose_ai.yml" down
    docker compose -f "compose_ai.yml" rm
    exit 0
fi



echo "Error: Run AI '$1' not found!"
exit 1

# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done