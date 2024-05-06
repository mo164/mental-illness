const express = require('express');
const validator = require('./../validator')
const bookController = require('./../controllers/bookController')
const authControllers = require('./../controllers/authControllers')
const router = express.Router();
router.get('/',bookController.getAll);

router
  .route('/:id')
  .delete(authControllers.restrictTo('admin'),bookController.delete)
  .get(bookController.getbook)
module.exports = router