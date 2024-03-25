const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
//const compressions = require('compressions');

 app.use('/api/v1/users',userRoutes);
module.exports = app
