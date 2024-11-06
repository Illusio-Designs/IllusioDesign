const Appointment = require('../../models/Appointment');


// Create a new appointment
exports.createPublicAppointment = async (req, res) => {
    try {
        const { fullName, email, mobileNo, country, budget, message } = req.body;
        
        // Automatically set the appointmentDate to the current date
        const appointmentDate = new Date(); // or any other logic to set the date
        
        const newAppointment = await Appointment.create({ 
            fullName, 
            email, 
            mobileNo, 
            country, 
            budget, 
            message,
            appointmentDate // Include the automatically set date
        });
        
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};