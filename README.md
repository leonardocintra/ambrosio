# Ambrosio

Santo Ambrosio - BACKEND CNC

Novo backend para https://apicncbrasil.cn.org.br/dashboard

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

Rename `.env-sample` to .env

### development
```bash

$ sudo docker compose up -d
$ npx prisma migrate dev
$ npm run seed
$ npm run start:dev
```

O usuario principal é criado apos rodar o seed
- user: admin@admin.com.br
- pass: admin
```bash
curl --location 'http://localhost:3005/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@admin.com",
    "password": "admin"
    
}'
```

### production mode
```bash
$ npm run start:prod
$ npx prisma migrate deploy
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Leonardo Cintra](https://leonardocintra.com.br)

## License

Nest is [MIT licensed](LICENSE).
