#!/bin/bash -e

# Load environment variables
. ./.env

echo "=========================="
echo "Prepping the database"

# Prepare the database
mkdir -p .data/
chmod -R a+w .data/

echo "=========================="
echo "Let's start!"

# Start the server
/usr/bin/node lib/index.js
