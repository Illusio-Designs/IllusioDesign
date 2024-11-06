const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');
const authenticate = require('../../middleware/auth'); // Assuming you have an authentication middleware


// Private routes
router.get('/', authenticate, appointmentController.getAllAppointments); // Get all appointments
router.get('/:id', authenticate, appointmentController.getAppointmentById); // Get appointment by ID
router.put('/:id/status', authenticate, appointmentController.updateAppointmentStatus); // Update appointment status

module.exports = router; 