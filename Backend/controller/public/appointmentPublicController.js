const Appointment = require('../../models/Appointment');


// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { fullName, email, mobileNo, country, budget, message } = req.body;
        const newAppointment = await Appointment.create({ fullName, email, mobileNo, country, budget, message });
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};