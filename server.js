const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const app = require('./index')

mongoose.connect(process.env.URL)
.then(()=>{
    console.log('DB connection sucsses')
}).catch((error)=>{
    console.log(error)
})
app.listen(process.env.PORT||5000 ,()=>{
    console.log('listening on port')
});
// try again
// Done 