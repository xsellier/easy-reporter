# Prepare the database
mkdir -p .data/
chmod -R a+w .data/

# Prepare the view
rm -rf public/
vue-cli-service build

# Start the server
node lib/index