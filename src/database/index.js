// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");
var admin = require("firebase-admin");
var serviceAccount = require("../../private/backendAdmin.json");

// Loading the entire SDK is not efficient for production web apps.
// Use this option for development purposes only.
// var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

require('dotenv').config();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};


firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

const db = firebase.firestore();

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webahead6-blood-donor-backend.firebaseio.com",
});

module.exports = {db,firebase,admin};





