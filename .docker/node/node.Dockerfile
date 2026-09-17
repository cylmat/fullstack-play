FROM node:latest

RUN npm install -g yarn

USER node

WORKDIR /var/www/application
