# **Gateways Musala Soft problem solution**

## Tech Stack

### Frontend

Angular + Bootstrap + FontAwesome

### Backend

Node.js + Express + Mongoose

### Database

MongoDB

### Other

Docker + Git + Github + Github Actions

## Description

Sample project for Musala Soft.
This sample project is managing gateways - master devices that control multiple peripheral devices.
Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.
When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.
The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:
a unique serial number (string),
human-readable name (string),
IPv4 address (to be validated),
multiple associated peripheral devices.
Each peripheral device has:
a UID (number),
vendor (string),
date created,
status - online/offline.

## Local development server

Make sure you have the latest version of Docker. Clone this repository.
Move into the project root directory and run:
`docker-compose up`

This process will generate and run the necessary Docker containers to locally run the project.

Make sure to wait a minute until the Angular app fully compiles and then you can check each service with the following urls.

1. [Frontend (Angular Application)](http://localhost:4200)
   1. Here you should get the Angular frontend application for managing the Gateways.
2. [Backend (Express Application)](http://localhost:3000)
   1. Here you should get a basic UI with a list of endpoints that the API provides.
3. [Database (MongoDB)](http:localhost:27017)
   1. Here you should get a simple text saying:
   `It looks like you are trying to access MongoDB over HTTP on the native driver port.`

### Injecting test data into the Database

Once the project is running go to the backend UI url [Backend (Express Application)](http://localhost:3000) and click the links to add or delete test data.
You will be able to see this data on the frontend application immediately.

### Unit tests

To run Angular unit test navigate in your terminal into the GatewaysFrontend directory and then run:
`ng test` this will automatically run the unit tests and show a debug chrome browser with the results.

### Automatic build

The automatic build was made using Github Actions, each time the repository gets a push command into the `main` branch it will run the
continuous integration and build the app into two Docker images and then publish those into Docker Hub for later use on any server with Docker compose support.

## TODO: 
Things that I couldn't do due to a lack of time and electricity :(

1. Bug: Fix mobile view add device modal issue.
2. Add e2e tests.
3. Improve unit tests coverage.
4. Complete the CRUD integration, even when is not requested.
5. Improve frontend page design with transitions and animations.
6. Deploy the app in some free service.
