const express = require("express");
const upload = require("../config/multer.config");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.send(req.file);
});

module.exports = router;
