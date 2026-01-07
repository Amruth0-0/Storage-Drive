const express = require("express");
const upload = require("../config/multer.config");
const fileModel = require("../models/files.models");
const authMiddleware = require("../middleware/auth");
const firebase = require("../config/firebase.config");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const userFiles = await fileModel.find({
    user: req.user.userId
  })
  console.log(userFiles);
  
  res.render("home", { files: userFiles });
});

router.post("/upload", authMiddleware,  upload.single("file"), async (req, res) => {
  const newFile = await fileModel.create({

    path: req.file.path,
    originalName: req.file.originalname,
    user: req.user.userId

  });
  res.json(newFile);
});

router.get('/download/:path', authMiddleware, async (req, res)=>{
    const LoggedinId = req.user.userId
    const path = req.params.path

    const file = await fileModel.findOne({
      user : LoggedinId,
      path: path
    })
    
    console.log(file);

    if(!file){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
      action : 'read',
      expires: Date.now() + 60 * 1000
}) 

   console.log(signedUrl[0])
   res.redirect(signedUrl[0])
})

router.get('/', authMiddleware, async (req, res)=>{
   try{
    const userFiles = await fileModel.find({
      user: req.user.userId
    })
     console.log(userFiles);
     throw('error')
   }catch(err){
      console.error(err);
      res.status(500).json({
         message: "Internal Server Error"
      });
   }
})

module.exports = router;
