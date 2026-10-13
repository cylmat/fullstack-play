#!/bin/bash

# Usage: ./scripts/linux.sh <command> [args]

LIST_COMMANDS="\
ls build-image bash"

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo 'Listing available "Run Script" Linux commands:'
    echo ""
    for cmd in $LIST_COMMANDS; do
        echo "$cmd"
    done
    exit 0
fi

if [ "$1" == "build-image" ]; then
    docker build -f ".docker/linux/linux.Dockerfile" --pull -t fs-linux:latest .docker
    exit 0
fi

if [ "$1" == "bash" ]; then
    docker run --rm -it -u 1000:1000 --env-file .docker/linux/.env.local -v .:/var/www/application fs-linux:latest bash
    exit 0
fi

### ERROR ###

echo "Error: Run Linux '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1
