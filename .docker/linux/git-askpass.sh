#!/bin/sh
# git-askpass.sh

# exec printf "%s" "$GIT_TOKEN"

case "$1" in
  Username*) echo "$GIT_USERNAME" ;;
  Password*) echo "$GIT_PASSWORD" ;;
esac
