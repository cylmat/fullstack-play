# Frontend

Play with differents frameworks like React, Vue, etc...

```shell
docker compose up --build -d
```

## Run

```shell
# run
# http://localhost:5173
# docker run --rm -d -u 1000 --name nodeground -v .:/app -w /app -p 5173:5173 node:latest sleep infinity

# shell
docker exec -it -u 1000 nodeground npm run dev

# test
docker exec -u 1000 nodeground npm run test

# down
docker container stop nodeground && docker container rm nodeground
```


## Install

```shell
docker exec -u 1000 nodeground npm create vite@latest vite-react -- --template react-ts

docker exec -u 1000 nodeground npm install

docker run --rm -u 1000 -it --name nodeground -v .:/app -w /app -p 5173:5173 node:latest bash

# update
docker exec -u 1000 nodeground npm update
```


## Infos

```
# > for react
npm install --save-dev jest @testing-library/jest-dom @types/jest @testing-library/react @testing-library/user-event
npm install --save-dev babel-jest @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env
npm install --save-dev identity-obj-proxy jest-environment-jsdom 
# need babel.config.js and jest.config.js
```


## Docs

- https://developer.mozilla.org/fr/docs/Web/JavaScript
- https://jestjs.io
- https://react.dev
- https://nextjs.org
- https://svelte.dev
- https://typescriptlang.org
- https://vitejs.fr
- https://vuejs.org

