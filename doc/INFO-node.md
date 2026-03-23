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



## Docs

- https://developer.mozilla.org/fr/docs/Web/JavaScript
- https://jestjs.io
- https://nextjs.org
- https://svelte.dev
- https://typescriptlang.org
- https://vitejs.fr
- https://vuejs.org

