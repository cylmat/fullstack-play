#!/bin/bash

# Usage: ./scripts/run/ai.sh <command> [args]

LIST_COMMANDS="\
ls \
up install bash bash-root down \
start start-client start-server stop \
init \
test test-client test-server \
"

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo 'Listing available "Run Script" AI commands:'
    echo ""
    for cmd in $LIST_COMMANDS; do
        echo "$cmd"
    done
    exit 0
fi

##############
### DOCKER ###
##############

if [ "$1" == "up" ]; then
    docker compose -f "compose_ai.yml" --profile ai up --build -d
    exit 0
fi

if [ "$1" == "install" ]; then
    docker exec -it -u 1000 fs-ai-node npm install
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

if [ "$1" == "down" ]; then
    bash $0 stop

    docker compose -f "compose_ai.yml" --profile ai down &&
    docker compose -f "compose_ai.yml" --profile ai rm
    exit 0
fi

#############
### START ###
#############

if [ "$1" == "start" ]; then
    bash $0 up
    bash $0 stop

    echo "Node JS client is available at http://localhost:5111"
    echo "Node JS server is available at http://localhost:5112"
    docker exec -it -u 1000 fs-ai-node npm run dev
    exit 0
fi

if [ "$1" == "start-client" ]; then
    bash $0 up
    bash $0 stop

    echo "Node JS client is available at http://localhost:5111"
    docker exec -it -u 1000 fs-ai-node npm run dev:client
    exit 0
fi

if [ "$1" == "start-server" ]; then
    bash $0 up
    bash $0 stop

    echo "Node JS server is available at http://localhost:5112"
    docker exec -it -u 1000 fs-ai-node npm run dev:server
    exit 0
fi

if [ "$1" == "stop" ]; then
    docker exec -it fs-ai-node pkill node || true
    docker exec -it fs-ai-node pkill npm || true
    exit 0
fi

############
### MISC ###
############

if [ "$1" == "init" ]; then
    docker compose -f "compose_ai.yml" --profile ai-db down
    docker compose -f "compose_ai.yml" --profile ai-db up -d
    exit 0
fi

############
### TEST ###
############

if [ "$1" == "test" ]; then
    echo "run all tests : functional, integration, unit"
    docker exec -it -u 1000 fs-ai-node npm run test:client && \
    docker exec -it -u 1000 fs-ai-node npm run test:server
    exit 0
fi

if [ "$1" == "test-client" ]; then
    echo "run all tests : functional, integration, unit"
    docker exec -it -u 1000 fs-ai-node npm run test:client
    exit 0
fi

if [ "$1" == "test-server" ]; then
    echo "run all tests : functional, integration, unit"
    docker exec -it -u 1000 fs-ai-node npm run test:server
    exit 0
fi

### ERROR ###

echo "Error: Run AI '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1
