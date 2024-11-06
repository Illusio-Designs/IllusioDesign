const express = require('express');
const router = express.Router();
const appointmentPublicController = require('../../controller/public/appointmentPublicController');

// Public route to create an appointment
router.post('/', appointmentPublicController.createPublicAppointment);

module.exports = router;
