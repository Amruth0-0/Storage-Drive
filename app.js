const express = require('express');
const userRouter = require('./routes/user.routes');
const connectDB = require('./config/db');
const {body, ValidationResult} = require('express-validator')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');


const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/user', userRouter);



app.listen(3000, ()=>{
    console.log("Server Running on Port 3000");
});