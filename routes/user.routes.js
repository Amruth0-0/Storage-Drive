const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');


router.get('/register', (req,res)=>{
    res.render('register');
})

router.post('/register',
    body('username').trim().isLength({min: 3}),
    body('email').trim().isEmail().isLength({min: 13}),
    body('password').trim().isLength({min: 6}), 
    async (req,res)=>{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json(
                {errors: err.array(),
                 message: "Invalid Data"
                });
            }
        
            const {username, email, password} = req.body;
            
            const hashpass = await bcrypt.hash(password, 10)
            const user = await userModel.create({
                username,
                email,
                password: hashpass
            })
            res.json(user);

        }  
)
module.exports = router;