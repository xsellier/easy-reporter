#!/bin/bash -e

npm install --prefer-offline --no-audit --no-shrinkwrap
rm -rf public/
./node_modules/.bin/vue-cli-service build
touch public/favicon.ico
