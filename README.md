## ❯ Why

Coding challenge to address the Connect Co's requirements


## Pre-requisites & Local Setup

This repo assumes you are working in a macOS or Linux environment and shell commands are tailored as such.  If you are using a Windows machine, please adjust your shell commands accordingly.

## List of available APIs


| Route           | Description |
| --------------  | ----------- |
| **/api/health** | Simple healthcheck/ping (GET)|
| **/api/tasks**  | For updating taks (POST) |

API can be accessed via curl command: `curl http://localhost:3000/<endpoint>`

## Project Layout
The project is laid out in the following way:
- `src`: Project root
  - `controllers`: handles communication between the data tier and the endpoint consumer (returns responses)
  - `services`: abstract out logic for controllers to call
  - `routes`: api routes defined 
  - `lib`: shared modules and logic
  - `models`: data models

## Installing and running

### Run from command-line
```sh
yarn install
yarn serve (for local development)
```

## Tooling
- nodemon - auto-restarts modified javascript files in local development (install it globally)
- Linting (gts) - `yarn lint` - linting is also ran automatically is pre-commit hook (lint-staged)
```


