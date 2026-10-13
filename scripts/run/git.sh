#!/bin/bash

# Usage: ./scripts/git.sh push <commit message>

LIST_COMMANDS="commit push"

if [ "$1" == "ls" ] || [ "$1" == "" ] || [ "$1" == "help" ]; then
    echo 'Listing available "Run Script" GIT commands:'
    echo ""
    for cmd in $LIST_COMMANDS; do
        echo "$cmd"
    done
    exit 0
fi

if [ "$1" == "commit" ]; then
    MSG="Update by make"
    if [ $# -ge 2 ]; then
        MSG="${@:2}"
    fi

    CMD="
        git config user.name \"\$GIT_USER\" &&
        git config user.email \"\$GIT_EMAIL\" &&
        git add . || true &&
        git commit -m \"$MSG\"
    "
    docker run --rm -u 1000:1000 --env-file .docker/linux/.env.local \
        -v .:/var/www/application -v .docker/data/linux:/data fs-linux \
        sh -c "$CMD"
    exit 0
fi

if [ "$1" == "push" ]; then

    bash ${0} commit "${@:2}"

    CMD="
        git pull --rebase &&
        git push
    "
    docker run --rm -u 1000:1000 --env-file .docker/linux/.env.local \
        -v .:/var/www/application -v .docker/data/linux:/data fs-linux \
        sh -c "$CMD"
    exit 0
fi

echo "Error: Run GIT '$1' not found! Availables are [$LIST_COMMANDS]"
exit 1

# getopts "m:" opt
# while getopts "m:" opt; do
#     case $opt in
#         m) MSG="$OPTARG" ;;
#     esac
# done