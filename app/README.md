[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Calorie Counter App (3)

Application built to manipulate and calculate data related with food, its calories and other food details. The ultimate goal of this application is to deep dive into react + react-query.

## Built with

- React
- React Query
- Typescript
- React router dom
- Tailwind CSS

## How to start?

Follow the next steps to run the project in you local machine

### Install dependencies

```bash
    yarn
```

### Create a `.env` file to setup the needed environment variables

```bash
    cp .env.example .env
```

There are two main variables so far:

```bash
REACT_APP_API_URL
REACT_APP_DEFAULT_USER_EMAIL
```

The `REACT_APP_API_URL` is already pointing to the default server path. However the `REACT_APP_DEFAULT_USER_EMAIL` needs some tweaking on your side to make it work. Just FYI, this variable is used to store your favorites foods later on. Alright, let's get into this boring configuration process:

- ⚠️ First make sure you have the server running ⚠️
- Choose whatever email you want, eg: yourname@anything.com
- Make a POST request to the server using the chosen email. I will be using curl for the sake of simplicity, but you can use whatever client you want. (Postman, Thunder Client, Insomnia, etc)

```bash
    curl -X POST -H "Content-Type: application/json" \
        -d '{"name": "Your Name", "email": "yourname@anything.com" }' \
        http://127.0.0.1:5001/api/users
```

- Fill the `REACT_APP_DEFAULT_USER_EMAIL` with the email you have chosen. eg: `REACT_APP_DEFAULT_USER_EMAIL=yourname@anything.com`

### Run run run... 🏃‍♂️

```bash
    yarn start
```
