# Node

Boilerplate for various own projects.

## Install

```bash
npm i
```

## Start

```bash
docker pull redis:alpine
docker run --name redis-cache -p 6379:6379 -d redis
npm run start
```

REST endpoint: http://localhost:3000/
GraphQL endpoint: http://localhost:3000/graphql

## GraphQL

Examples:

```graphql
{
  allUsers {
    id
    name
  }
}

{
  user(id: 1) {
    id
    name
  }
}
```

## Test

```bash
npm run test
# Load test:
npm run load
```

## Deploy

```bash
# Setup logs database
docker pull couchdb
docker run --name logs-db -p 5984:5984 -d couchdb
# ...
# Start Redis:
docker pull redis:alpine
docker run --name redis-cache -p 6379:6379 -d redis
# Build and run the app:
docker build -t server .
docker run -p 3000:3000 --name server --link redis-cache:redis 1a14eb8532e1
```

@TODO:

* mongodb container
* dockerfarm
