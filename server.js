const express = require('express');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/user');
const mongoose = require('mongoose');



//middleware to parse user data in json
app.use(express.json());


//mongodb connection
mongoose.connect(process.env.DATABASE);
const connection = mongoose.connection;
connection.on('open',()=>{
    console.log('connected successfully');
})


app.use('/user',userRouter);




app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`the server is listening on the port ${process.env.PORT}`);
})