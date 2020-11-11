[![License: MIT](https://img.shields.io/github/license/vintasoftware/django-react-boilerplate.svg)](LICENSE)

# django Boilerplate

A starting point for python-django websites and apis.

## About

### what does django-boilerplate include

- Custom user model
    - A custom user model with email and password.
    - email is used as the username field.
- Postgresql for db
    - Postgresql is configured and ready to be used.
    - custom commands for postresql.
- Docker

## Running the project

### with docker

- Open a command line window and go to the project's directory.
- setup docker container:\
    `docker build . && docker-compose build`
- Run the project:\
    `docker-compose up`

### without docker

- make sure postresql is installed in the system.
- clone repo and go to the project's directory.
- install the dependencies:\
    `pip install -r requirements.txt`
- Run the migrations:\
    `python manage.py wait_for_db && python manage.py migrate`
- Run the project:\
    `python manage.py runserver`

## Helpful Commands

- Make Migrations:\
    `docker-compose run --rm app sh -c "python manage.py makemigrations"`
- Create superuser:\
    `docker-compose run --rm app sh -c "python manage.py createsuperuser"`
- Run tests:\
    `docker-compose run --rm app sh -c "python manage.py test"`

### Note

- Remove djangorestframework from [requirements.txt](requirements.txt) if app is not an api.
- Maintainer name can be changed in [Dockerfile](Dockerfile).

Copyright (c) 2020 Ajith Ramachandran

[MIT License](LICENSE)