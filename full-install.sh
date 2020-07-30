#!/bin/bash -e

echo "=========================="
echo "Prepping the database"

# Prepare the database
mkdir -p .data/
chmod -R a+w .data/

echo "=========================="
echo "Prepping node modules"

rm -rf node_modules_fake/
rm -rf node_modules/

# Wait for the rm to work
sleep 1
mv ./node_modules/ ./node_modules_fake/

mkdir -p "${PWD}/custom_modules"

cp package.json "${PWD}/custom_modules"
cp package-lock.json "${PWD}/custom_modules"
cp shrinkwrap.yaml "${PWD}/custom_modules"

echo "=========================="
echo "Installing node modules"

# Use the /tmp disk, to save disk space
\npm install --cache /tmp/my_app --prefer-offline --no-audit --no-shrinkwrap --prefix "${PWD}/custom_modules/"
ln -sf "${PWD}/custom_modules/node_modules" "${PWD}/node_modules"

echo "=========================="
echo "Building the website"

rm -rf public/
./node_modules/.bin/vue-cli-service build
# ./node_modules/\@vue/cli-service/bin/vue-cli-service.js build

echo "=========================="
echo "Let's start!"

# Prevent one 404 HTTP error
touch public/favicon.ico

# Start the server
node lib/index.js
