# ToDo Backend
This service is a simple todo app.
It allows create and request todos.

## prerequisites
The service requires all javascript packages defined in the package.json.
Therefore you have to run `npm install` inside this project to install all dependencies.

## run the service
To run the service you have to execute the command `npm start` inside the folder of this service.
After that the service runs using nodemon and is available under `localhost:3000`

## available routes
The following endpoints are defined inside the service.

* `GET /todos`
* `GET /todos/:id`
* `POST /todos`
* `PUT /todos/:id`
* `DELETE /todos/:id`
