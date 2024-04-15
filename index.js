const express = require('express');
//const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const bodyParser = require('body-parser');
const errorControllers = require('./controllers/errorControllers')
const AppError = require('./utils/appError')
const userRoutes = require('./routes/userRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
//const compressions = require('compressions');
const app = express();
app.use(express.json());
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/doctors',doctorRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
app.use(errorControllers);
module.exports = app
