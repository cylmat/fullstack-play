#!/bin/bash

# GIT HELPER SCRIPT #

# Usage: ./scripts/git.sh push <commit message>

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo ""
    echo 'Listing available "Run Script" AI commands:'
    echo "up"
    echo "down"
    exit 0
fi


if [ "$1" == "up" ]; then
	docker compose -f "compose_ai.yml" --profile ai up --build -d
    exit 0
fi

if [ "$1" == "down" ]; then
	docker compose -f "compose_ai.yml" --profile ai up --build -d
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