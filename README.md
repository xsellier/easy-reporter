# Easy reporter

## Setup

- Install NodeJS v12 with NPM
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
