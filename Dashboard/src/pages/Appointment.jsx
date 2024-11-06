import React, { useEffect, useState } from 'react';
import { getAllAppointments, createAppointment, deleteAppointment, updateAppointmentStatus } from '../services/appointmentApi'; // Import the API functions
import AppointmentForm from '../components/AppointmentForm'; // Import the AppointmentForm component
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const Appointment = () => {
    const [appointments, setAppointments] = useState([]); // State to hold the list of appointments
    const [newAppointment, setNewAppointment] = useState({
        fullName: '',
        email: '',
        mobileNo: '',
        country: '',
        budget: '',
        message: '',
        appointmentDate: new Date().toISOString().slice(0, 10), // Default to today
        status: 'pending', // Default status
    }); // State for new appointment form
    const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
    const [isEditing, setIsEditing] = useState(false); // State to check if we are in editing mode
    const [editAppointmentId, setEditAppointmentId] = useState(null); // Store appointment ID for editing

    // Fetch the list of appointments when the component mounts
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAllAppointments();
                setAppointments(response); // Set the appointments state with the fetched data
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    // Handle input changes for other form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission to create or update an appointment
    const handleSubmit = async (formData) => {
        try {
            if (isEditing) {
                await updateAppointmentStatus(editAppointmentId, formData); // Call update API if editing
                setAppointments((prev) =>
                    prev.map((appt) =>
                        appt.id === editAppointmentId ? { ...appt, ...formData } : appt
                    )
                ); // Update the appointment list
                setIsEditing(false); // Reset editing state
            } else {
                const createdAppointment = await createAppointment(formData); // Send data to the API
                setAppointments((prev) => [...prev, createdAppointment]); // Add the new appointment to the list
            }

            // Reset the form after submission
            setNewAppointment({
                fullName: '',
                email: '',
                mobileNo: '',
                country: '',
                budget: '',
                message: '',
                appointmentDate: new Date().toISOString().slice(0, 10), // Reset to today
                status: 'pending', // Reset to default status
            });
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    };

    // Handle edit button click
    const handleEdit = (appointment) => {
        setIsEditing(true);
        setEditAppointmentId(appointment.id); // Set appointment ID for editing
        setNewAppointment({
            fullName: appointment.fullName,
            email: appointment.email,
            mobileNo: appointment.mobileNo,
            country: appointment.country,
            budget: appointment.budget,
            message: appointment.message,
            appointmentDate: appointment.appointmentDate.slice(0, 10), // Format date
            status: appointment.status, // Include status for editing
        });
        setShowForm(true); // Show the form in edit mode
    };

    // Handle delete button click
    const handleDelete = async (appointmentId) => {
        try {
            await deleteAppointment(appointmentId); // Call the API to delete the appointment
            setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId)); // Remove the deleted appointment from the list
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <div>
            <h1>Appointment Management</h1>
            <button onClick={() => setShowForm(true)}>Add New Appointment</button>

            {showForm && (
                <AppointmentForm
                    appointment={isEditing ? newAppointment : null}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Appointment List */}
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        <h2>{appointment.fullName}</h2>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(appointment.message) }} />
                        <p>Status: {appointment.status}</p> {/* Display the status */}
                        <button onClick={() => handleEdit(appointment)}>Edit</button>
                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointment;
