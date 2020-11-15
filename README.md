## Quickstart

Required softwares
```
node 14+
mongodb 3.6+
```

Clone and get started
```
git clone https://github.com/77ganesh/booking-api.git
cd booking-api
npm i
```

## Initialize database
Make sure mongodb is up and running on local


This app will use "test" db

If mongodb is on docker network, or not on localhost:27017 or you want to use
different db, modify the details at `./config/default.json`
```
node dev/initDb.js
```

## Starting server
```
npm start
```

## Starting server with debug messages
```
npm run start-debug
```

## Postman collection + environment
Import collection & environment from `./dev/postman`

## Running test
```
npm run test
```

##

## Coverage report
```
npm run test-coverage
npm run open-coverage-report
```

## JSDoc
```
npm run jsdoc
npm run open-jsdoc
```

## Code Structure
Goto [devdocs](dev/devdocs.md)