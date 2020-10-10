# Exercise Tracker REST API (https://exercise-tracker-td.herokuapp.com/)

![N|Solid](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fa%2Fa9%2FHeroku_logo.png&f=1&nofb=1)

#### A microservice project, part of Free Code Camp's curriculum

-   I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and \_id.
-   I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
-   I can add an exercise to any user by posting form data userId(\_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
-   I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(\_id). Return will be the user object with added array log and count (total exercise count).
-   I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

# Installation

This app requires [Node.js](https://nodejs.org/) v12.18.x + to run.
You need a MongoDB uri to run this project [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
After you get the URI, you need to create a file .env in the main folder and add the URI to the variable _DB_URI_.

Install the dependencies

```sh
$ cd exercise-tracker
$ npm install -d
$ npm start
```

#### Dependecies

-   [Node.js](https://nodejs.org/)
-   [mongoose](https://mongoosejs.com/)
-   [Axios](https://github.com/axios/axios)
-   [Bootstrap v5](https://v5.getbootstrap.com/)
-   [notyf](https://www.carlosroso.com/notyf/)
