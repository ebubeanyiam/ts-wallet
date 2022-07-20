# ts-wallet
# Wallet Rest Api

Wallet Rest Api. Using Node.js, Express and MongoDB.

## Requirements

- [Node v7.6+](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo:

```bash
git clone https://github.com/ebubeanyiam/ts-wallet.git
cd ts-wallet
```

Install yarn:

```bash
npm install -g yarn
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## API Reference

## API Endpoint

## API Postman Collection for Testing

## Testing Locally...

### First you need to Create a Wallet

```bash
curl -X POST \
  http://localhost:3000/v1/wallet \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'token: 030c9874-23c0-367b-7e2b-aea506e851c4' \
  -d 'alias=default&phone_number=+2349076907017&user_id=Jhon20Doe'
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix
```

## Test

```bash
# run all tests with Mocha
yarn test
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn do
```

## License

This project is licensed under the [MIT License](https://github.com/mmucito/ewallet-rest-api/blob/master/LICENSE)

