# Why?

To learn more 🤞

## How to start?

Follow the next steps to run the project in you local machine

### Install dependencies

```bash
    yarn
```

### Create the .env file

```bash
    cp .env.example .env
```

### Starting mongoDB

This project uses mongoDB to store data. To ease the setup process the project is ready to use `docker`.
You can either start your own instance of docker, or let the project run a script that will start
a mongodb container automatically.

While the script that start the container is ran you might get into problem related with permissions. To solve it, just type the next command inside the server folder:

```bash
chmod +rwx ./bin/db/db.sh
```

The command that the script will run is the following, in case you wanna try it by yourself:

```bash
docker run -d \
    -p 27017:27017 \
    --name calorie-counter-take-3 \
    -v $HOME/mongo-data:/data/db \
    mongo:latest
```

### Run run run... 🏃‍♂️

```bash
    yarn start
```
