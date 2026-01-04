const Firebase = require("firebase-admin");

const service = require("../drive-c858b-firebase-adminsdk-fbsvc-489a0b87b6.json");

const firebase = Firebase.initializeApp({
  credential: Firebase.credential.cert(service),
  storageBucket: "drive-c858b.firebasestorage.app",
});

module.exports = Firebase;
