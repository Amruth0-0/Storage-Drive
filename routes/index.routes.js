const express = require("express");
const upload = require("../config/multer.config");
const fileModel = require("../models/files.models");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.render("home");
});

router.post("/upload", authMiddleware,  upload.single("file"), async (req, res) => {
  const newFile = await fileModel.create({

    path: req.file.path,
    originalName: req.file.originalname,
    user: req.user.userId

  });
  res.json(newFile);
});

module.exports = router;
