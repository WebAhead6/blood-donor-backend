## The App

This repo serves as a backend for [Blood-Donor-front-end](https://github.com/startach/blood-donor-frontend)

#### what does it include? 

- A node.js server rendered via handlebars for the organization's coordinator, where he can update parts of the React Front-end App.
- A connection point between Firebase to the front-end app.

## Installation 

1. Clone the repo by running the following command
```
git clone git@github.com:startach/blood-donor-backend.git
```
2. Install the required dependencies by running the following command
 ```
 npm install
 ```
3. setup env variables
    - Create new .env file in the root directory
    - add the following variables to it(you can get them from the firebase project settings page)
        ```
         FIREBASE_API_KEY = 
         FIREBASE_AUTH_DOMAIN = 
         FIREBASE_DATABASE_URL= 
         FIREBASE_PROJECT_ID =
         FIREBASE_STORAGE_BUCKET =
         FIREBASE_MESSAGING_SENDER_ID =
         FIREBASE_APP_ID =
         GOOGLE_GEOCODER_API=
         MADA_POST_URL_ROUTE=
         CORS_ORIGIN= 
        ```
 4. (optional) run the following command to generate the exe files (this will only work after adding the .env file ot the project)
 ```
 npm run buildExe
or
 npm run build 
 ```
 
 5. run the app/server using one of the following command
```
npm start
or
npm run dev (runs with nodemon)
```
6. Open http://localhost:4000/ 


## Documintation 
- api routes
    - [GET /api/locations
](https://github.com/startach/blood-donor-backend/issues/1)
    - [GET /api/homeMenu
](https://github.com/startach/blood-donor-backend/issues/13)
    - [GET /api/goals
](https://github.com/startach/blood-donor-backend/issues/14)
    - [GET /api/alerts
](https://github.com/startach/blood-donor-backend/issues/12)
