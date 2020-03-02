#!/bin/bash
#mongoimport --host mongodb --db myapp --collection commnets --drop --jsonArray --file ./json/comments.json
#mongoimport --host mongodb --db myapp --collection template --drop --jsonArray --file ./json/template.json
mongoimport --host mongodb --db myapp --collection users --drop --jsonArray --file ./json/users.json


