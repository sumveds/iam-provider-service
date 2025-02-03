<p align="center">
  <a href="https://keycloak.org" target="blank"><img src="https://www.keycloak.org/resources/images/logo.svg" width="240" alt="Keycloak Logo" /></a>
</p>
  <p align="center"><a href="https://keycloak.org" target="_blank">Keycloak</a> Open Source Identity and Access Management.</p>

## Description

Identity and Access Management using [Keycloak](https://www.keycloak.org/).

## To start the keycloak docker container
```bash
docker-compose -f keycloak-docker-compose.yml --env-file .env up -d
```

## View logs (historical or real-time)

```bash
# historical
docker-compose -f keycloak-docker-compose.yml logs keycloak

# real-time
docker-compose -f keycloak-docker-compose.yml logs -f keycloak
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Sumved Shami](https://x.com/sumveds)
