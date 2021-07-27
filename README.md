# Stackoverflow API

This application allows you to register, login and get film data and also comment on film data.

# STEPS TO RUN APP

### Step 1: Start up the containers

RUN `docker-compose up -d on the root directory of the project`

### RUN test in docker container

`docker exec -t -i app npm run test`

### Run Migration

`docker exec -t -i app knex migrate:latest`

### App Features

- Create a user account
- Login a user
- Logout a user
- Reset a user password
- Fetch a list of all question
- Answer a specific question
- Subscribe to a question

## Cache

Request for films are cached using redis to reduce the api calls to the swapi api and also increase the speed of the application,

# Token Management

JWT was used for token along with redis for implementing refresh tokens

## View Application logs on Kibana

Logging was implemented with winton and elastic search
[Kibana board](http://localhost:5601/app/kibana#/discover)

#### POSTMAN API Documentation.

[Postman Api documentation](https://documenter.getpostman.com/view/6226738/TzY7dDbr)
# kora_ass
