#!/bin/bash

docker run -d \
    -p 27017:27017 \
    --name calorie-counter-take-2 \
    -v $HOME/mongo-data:/data/db \
    mongo:latest