# Prepare the database
mkdir -p .data/
chmod -R a+w .data/

# Prepare the view
npm install --only=dev --no-shrinkwrap
rm -rf public/
./node_modules/.bin/vue-cli-service build

# Start the server
node lib/index