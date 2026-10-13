#!/bin/bash

# Usage: ./scripts/php.sh <command> [args]

LIST_COMMANDS="\
ls build-image bash-alone rm-alone \
php-up \
bash bash-root down"

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
    if [ -z "$2" ]; then
        APP_DIR="./apps/php"
    elif [ "$2" == "symfony" ]; then
        APP_DIR="./apps/$2"
    else
        echo "Error: Run php 'up $2' not found! Availables are ['', symfony]"
        exit 1
    fi
    HOST_VOLUME=$APP_DIR docker compose -f "compose.yml" --profile php up --build -d
    exit 0
fi

if [ "$1" == "start" ]; then
    if [ -z "$2" ]; then
        docker exec fs-php php -S 0.0.0.0:80 -t /var/www/application
    elif [ "$2" == "symfony" ]; then
        docker exec -it -u 1000 fs-php symfony serve --listen-ip=0.0.0.0 --port=80 -d
    else
        echo "Error: Run php 'start $2' not found! Availables are ['', symfony]"
        exit 1
    fi
    exit 0
fi

if [ "$1" == "stop" ]; then
    docker exec fs-php pkill -f php
    echo "PHP server stopped."
    exit 0
fi

##############
### DOCKER ###
##############

if [ "$1" == "bash" ]; then
    docker exec -it -u 1000 fs-php bash
    exit 0
fi

if [ "$1" == "bash-root" ]; then
    docker exec -it -u root fs-php bash
    exit 0
fi

if [ "$1" == "down" ]; then
    docker compose -f "compose.yml" --profile php down
    exit 0
fi

### ERROR ###

echo "Error: Run php '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1
