#!/bin/bash

# Usage: ./scripts/php.sh <command> [args]

LIST_COMMANDS="build-image bash-alone rm-alone up bash bash-root stop down"

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo 'Listing available "Run Script" PHP commands:'
    echo ""
    for cmd in $LIST_COMMANDS; do
        echo "$cmd"
    done
    exit 0
fi

if [ "$1" == "build-image" ]; then
    docker build -f ".docker/php/php.Dockerfile" --pull --target core -t fs-php:latest ".docker"
    exit 0
fi

#############
### ALONE ###
#############

if [ "$1" == "bash-alone" ]; then
    docker run -u 1000:1000 -it -p 8888:80 --name phpalone \
        -v phpalone:/var/www/application -v ./doc/create_php:/var/www/create_php fs-php:latest bash
    exit 0
fi

if [ "$1" == "rm-alone" ]; then
    docker rm --force --volumes phpalone
    exit 0
fi

##########
### UP ###
##########

if [ "$1" == "up" ]; then
    docker compose -f "compose.yml" --profile php up --build -d
    exit 0
fi

if [ "$1" == "bash" ]; then
    docker exec -it -u 1000 fs-php bash
    exit 0
fi

if [ "$1" == "bash-root" ]; then
    docker exec -it -u root fs-php bash
    exit 0
fi

if [ "$1" == "stop" ]; then
    docker exec -it fs-php symfony server:stop
    docker exec -it fs-php pkill webpack || true
    exit 0
fi

if [ "$1" == "down" ]; then
    docker compose -f "compose.yml" --profile php down
    exit 0
fi

### ERROR ###

echo "Error: Run php '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1
