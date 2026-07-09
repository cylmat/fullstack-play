##############
# DOCKER PHP #
# @see https://hub.docker.com/_/php
#
# Use this Dockerfile as a base template,
# (Un)comment extensions for own application.
#
# docker build -f ".docker/linux/linux.Dockerfile" --pull -t fs-linux:latest ".docker"
##############


FROM ubuntu:latest AS core


ENV UID=1001
ENV GID=1001
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y curl git vim wget zip

RUN apt update && apt-get install -y procps
RUN apt install -y man-db manpages git-man

### UTILS ###

# install tools for common linux tutorial: jq, etc..
RUN apt install -y \
    jq

### USER ###

RUN echo 'root:root' | chgpasswd
RUN addgroup user -gid ${GID}
RUN adduser user --uid ${UID} --gid ${GID} --gecos GECOS --disabled-password
USER user:user

# git config --global user.name "Your Name"
# git config --global user.email "you@example.com"
RUN git config --global credential.helper store

WORKDIR /var/www/application
