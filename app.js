const express = require('express');
const userRouter = require('./routes/user.routes');
const connectDB = require('./config/db');
const {body, ValidationResult} = require('express-validator')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/user', userRouter);


app.listen(5000, ()=>{
    console.log("Server Running on Port 5000");
});