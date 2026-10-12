#!/bin/bash

# Usage: ./scripts/node.sh <command> [args]

LIST_COMMANDS="build-image bash-alone rm-alone"

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo 'Listing available "Run Script" NODE commands:'
    echo ""
    for cmd in $LIST_COMMANDS; do
        echo "$cmd"
    done
    exit 0
fi

if [ "$1" == "build-image" ]; then
    docker build -f ".docker/node/node.Dockerfile" --pull -t fs-node:latest ".docker"
    exit 0
fi

#############
### ALONE ###
#############

if [ "$1" == "bash-alone" ]; then
    docker run -u 1000:1000 -it -p 3333:3000 -p 5555:5173 --name nodealone \
        -v nodealone:/var/www/application -v ./doc/create_js:/var/www/create_js fs-node:latest bash
    exit 0
fi

if [ "$1" == "rm-alone" ]; then
    docker rm --force --volumes nodealone
    exit 0
fi

### ERROR ###

echo "Error: Run node '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1

# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done