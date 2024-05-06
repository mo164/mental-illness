// const dotenv  = require('dotenv');
// dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const morgan = require('morgan')
const errorControllers = require('./controllers/errorControllers')
const AppError = require('./utils/appError')
const userRoutes = require('./routes/userRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const uploadRouts = require('./routes/uploadRoutes')
const bookRoutes = require('./routes/bookRoutes')
const doctorReviewsRoutes = require('./routes/doctorReviewsRoutes.js')
const bookReviewsRoutes = require('./routes/bookReviewsRoutes.js')
const getAllDoctors = require('./routes/getAllDoctors.js')
 const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/doctors',doctorRoutes);
app.use('/api/v1/upload',uploadRouts);
app.use('/api/v1/books',bookRoutes);
app.use('/api/v1/doctorReviews',doctorReviewsRoutes);
app.use('/api/v1/bookReviews',bookReviewsRoutes);
app.use('/api/v1/getAllDoctors',getAllDoctors)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
app.use(errorControllers);
console.log(process.env.PORT)
module.exports = app
