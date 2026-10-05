#!/bin/bash

# Usage: ./scripts/php.sh <command> [args]

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo ""
    echo 'Listing available "Run Script" PHP commands:'
    echo "build"
    echo "bash-alone"
    echo "rm-alone"
    exit 0
fi

if [ "$1" == "build" ]; then
    docker build -f ".docker/php/php.Dockerfile" --pull -t fs-php:latest ".docker"
    exit 0
fi

if [ "$1" == "bash-alone" ]; then
    docker run -u 1000:1000 -it -p 8888:80 --name phpalone \
        -v phpalone:/var/www/application -v ./doc/create_php:/var/www/create_php fs-php:latest bash
    exit 0
fi

if [ "$1" == "rm-alone" ]; then
    docker rm --force --volumes phpalone
    exit 0
fi

echo "Error: Run php '$1' not found!"
exit 1
