#!/bin/bash

# GIT HELPER SCRIPT #

# Usage: ./scripts/git.sh push <commit message>

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo ""
    echo 'Listing available "Run Script" git commands:'
    echo "push"
fi


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
    echo "$CMD"
fi


# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done