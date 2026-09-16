#!/bin/bash

# GIT HELPER SCRIPT #

# Usage: ./scripts/git.sh push <commit message>

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo ""
    echo 'Listing available "Run Script" GIT commands:'
    echo "push"
    exit 0
fi

echo $2

if [ "$1" == "push" ]; then
    MSG=${2:-"Update by make"}
    CMD="
        git config user.name \"\$GIT_USER\" &&
        git config user.email \"\$GIT_EMAIL\" &&
        git add . || true &&
        git commit -m \"$MSG\" &&
        git pull --rebase &&
        git push
    "
    docker run --rm -u 1000:1000 --env-file .docker/linux/.env.local \
        -v .:/var/www/application -v .docker/data/linux:/data fs-linux \
        sh -c "$CMD"
    exit 0
fi

echo "Error: Run GIT '$1' not found!"
exit 1

# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done