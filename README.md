# Nest GraphQL project

## Stack
- Node: v16.14.0
- Framework: NestJS
- Database: Postgres
- ORM: MikroORM

## How to run it locally
1. Installing packages
```
  yarn install
```

2. Create .env file at root level, copy content from .env.example and replace propirate value.

Note: If your machine doesn't have postgres installed, you can run `docker-compose up -d` to run it in docker. Then use default credentials:
- Host: localhost
- User: root
- Password: abcd1234

3. Migration
```
// build: Because we need mikro-orm.config.js in build folder to migration
yarn build

// Run migration
yarn migration:run
```

4. Start the server
```
yarn start:dev
```

5. Open `http://localhost:3000/graphql` to access graphql playground.

