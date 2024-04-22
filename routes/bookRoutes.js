const express = require('express');
const validator = require('./../validator')
const bookController = require('./../controllers/bookController')
const authControllers = require('./../controllers/authControllers')
const router = express.Router();
router.get('/',bookController.getAll);

router
  .route('/:id')
  .delete(authControllers.protect, authControllers.restrictTo('admin'),bookController.delete)
  .get(authControllers.protect,bookController.getbook)
module.exports = router