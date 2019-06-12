# Easy reporter

## Setup

- Install NodeJS v8 with NPM
- Install PostgreSQL

### Configure postgresql

```sh
su - postgres

# username: dev
# password: passwordDev
createuser --interactive --pwprompt
createdb -O dev easyreporting
```

### Run easy reporter

```sh
npm install
npm run dev

# Open
# http://localhost:1337/
```


### Feed easy-reporter locally

It sends one report at a time

```sh
node test.js
```
