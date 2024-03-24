const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')

 app.use('/api/v1/users',userRoutes);
module.exports = app
