# React

## Install

```shell
docker exec -u 1000 nodeground npm create vite@latest vite-react -- --template react-ts

docker exec -u 1000 nodeground npm install

docker run --rm -u 1000 -it --name nodeground -v .:/app -w /app -p 5173:5173 node:latest bash

# update
docker exec -u 1000 nodeground npm update
```

## Architecture

Classical structure

* └── /src
* ├── /assets – Contains static assets such as images, svgs, company logo, etc.
* ├── /components – reusable components like navigation bar, buttons, forms
* ├── /services – JavaSript modules
* ├── /store – redux store
* ├── /utils – utilities, helpers, constants.
* ├── /views/pages – the majority of the app pages would be here
* ├── index.js
* └── App.js

## Docs

- https://react.dev