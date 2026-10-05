#!/bin/bash

# Usage: ./scripts/node.sh <command> [args]

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo ""
    echo 'Listing available "Run Script" NODE commands:'
    echo "build"
    echo "bash-alone"
    echo "rm-alone"
    exit 0
fi

if [ "$1" == "build" ]; then
    docker build -f ".docker/node/node.Dockerfile" --pull -t fs-node:latest ".docker"
    exit 0
fi

if [ "$1" == "bash-alone" ]; then
    docker run -u 1000:1000 -it -p 3333:3000 -p 5555:5173 --name nodealone \
        -v nodealone:/var/www/application -v ./doc/create_js:/var/www/create_js fs-node:latest bash
    exit 0
fi

if [ "$1" == "rm-alone" ]; then
    docker rm --force --volumes nodealone
    exit 0
fi

echo "Error: Run node '$1' not found!"
exit 1

# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done