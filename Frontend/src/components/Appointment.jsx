import React, { useState } from 'react';
import { createPublicAppointment } from '../utils/api';
import './Appointment.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Appointment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNo: '',
        country: 'in', // Default country code
        budget: '',
        message: '',
        appointmentDate: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (phone, countryData) => {
        console.log('Phone:', phone); // Log the phone number
        console.log('Country Data:', countryData); // Log country data to check values
        console.log('Country ISO2:', countryData.iso2); // Log the ISO2 code specifically
        setFormData((prev) => ({
            ...prev,
            mobileNo: phone,
            country: countryData.iso2 || 'in', // Capture the country code (ISO 3166-1 alpha-2), default to 'in' if undefined
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log the form data to check values
        try {
            await createPublicAppointment(formData); // Ensure formData includes country
            alert('Appointment created successfully!');
            setFormData({
                fullName: '',
                email: '',
                mobileNo: '',
                country: 'in', // Reset to default country code
                budget: '',
                message: '',
                appointmentDate: new Date().toISOString().slice(0, 10),
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <PhoneInput
                    country={formData.country}
                    value={formData.mobileNo}
                    onChange={(phone, countryData) => handlePhoneChange(phone, countryData)}
                    placeholder="Mobile Number"
                    required
                />
                <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Budget"
                    required
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                />
                <div className="button-group">
                    <button type="submit" className="submit-button">Create Appointment</button>
                </div>
            </form>
        </div>
    );
};

export default Appointment;
