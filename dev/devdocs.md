## Folder structure
```
config      -> all configs - db, jwt, app port, etc
coverage    -> jest coverage reports
data        -> data access layer
db          -> raw connection driver wrappers
dev         -> stuff for developers
e2e         -> e2e tests
hooks       -> git hooks
jsdoc       -> jsdoc html dir
loaders     -> server bootstrap code
middlewares -> app middlewares
routes      -> app routes (controllers in sub folder)
!services   -> service layer (logic) if present will go here
utils       -> common modules used across app
api.js      -> entrypoint
```

## App architecture

controller -> service -> data

`controller` is responsible for handling http network interface

`service` (this is absent and baked into controller as it adds too much redundancy for this project) is responsible for handling core logic & functionality

`data` is responsible for abstracting db specifcs and queries

## Linter

This project enforces [standard](https://standardjs.com) style


## Other details

Refer [quickstart](../README.md)


Refer [jsdoc](../README.md#jsdoc)
