#!/bin/bash -e

echo "=========================="
echo "Prepping the database"

# Prepare the database
mkdir -p .data/
chmod -R a+w .data/

echo "=========================="
echo "Installing node modules"

# Use the /tmp disk, to save disk space
npm install --cache /tmp/my_app --prefer-offline --no-audit --no-shrinkwrap

echo "=========================="
echo "Let's start!"

# Prevent one 404 HTTP error
touch public/favicon.ico

# Start the server
node lib/index.js
