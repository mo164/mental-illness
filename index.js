const express = require('express');
//const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
//const compressions = require('compressions');
const app = express();
app.use(express.json());
app.use('/api/v1/users',userRoutes);
module.exports = app
