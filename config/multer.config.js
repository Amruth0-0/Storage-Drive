const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase.config");
const service = require("../drive-c858b-firebase-adminsdk-fbsvc-489a0b87b6.json");

const storage = firebaseStorage({
  credentials: firebase.credential.cert(service),
  bucketName: "drive-c858b.firebasestorage.app",
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
