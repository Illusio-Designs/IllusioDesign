const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');

// Public route to create an appointment
router.post('/', appointmentController.createAppointment);