const express = require('express');
const router = express.Router();
const doctorController = require('./../controllers/doctorController')
router.get('/', doctorController.getAll)
router
.route('/:id')
.get(doctorController.getDoctor)

module.exports = router