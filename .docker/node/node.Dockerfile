FROM node:latest

# @doc https://gulpjs.com/docs/en/getting-started/quick-start/
# @doc https://yarnpkg.com/getting-started/install
RUN npm install --global gulp-cli yarn

USER node

WORKDIR /var/www/application
