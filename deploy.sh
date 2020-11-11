#!/bin/bash

# Get the name of the app
read -p "Enter app name : " app

# login with heroku
heroku container:login

# build the image using Dockerfile.production
docker build -f Dockerfile.production -t registry.heroku.com/$app/web .

# push to heroku
docker push registry.heroku.com/$app/web:latest

# release the app
heroku container:release web -a $app
