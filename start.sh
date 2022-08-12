#!/bin/bash -e

# Load environment variables
. ./.env

echo "=========================="
echo "Prepping the database"

# Prepare the database
mkdir -p "${DATABASE_PATH}"
chmod -R a+w "${DATABASE_PATH}"

echo "=========================="
echo "Let's start!"

# Start the server
/usr/local/bin/node lib/index.js
