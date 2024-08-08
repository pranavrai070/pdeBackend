const express = require('express');
const router = express.Router();
const {authMiddleware }= require('../middleware/authMiddleware');
const appointmentController = require('../controllers/appointmentController');

router.post('/', authMiddleware,appointmentController.createAppointment);

module.exports = router;
