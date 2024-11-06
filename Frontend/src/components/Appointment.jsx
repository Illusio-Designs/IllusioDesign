import React, { useState } from 'react';
import { createPublicAppointment } from '../utils/api';
import '../styles/Appointment.css';

const countries = [
    { name: 'India', code: 'in', dialCode: '+91' },
    { name: 'United States', code: 'us', dialCode: '+1' },
    { name: 'United Kingdom', code: 'gb', dialCode: '+44' },
    { name: 'Australia', code: 'au', dialCode: '+61' },
    { name: 'Canada', code: 'ca', dialCode: '+1' },
    { name: 'Germany', code: 'de', dialCode: '+49' },
    { name: 'France', code: 'fr', dialCode: '+33' },
    { name: 'Japan', code: 'jp', dialCode: '+81' },
    { name: 'China', code: 'cn', dialCode: '+86' },
    { name: 'Brazil', code: 'br', dialCode: '+55' },
    { name: 'South Africa', code: 'za', dialCode: '+27' },
    { name: 'New Zealand', code: 'nz', dialCode: '+64' },
    { name: 'Singapore', code: 'sg', dialCode: '+65' },
    { name: 'United Arab Emirates', code: 'ae', dialCode: '+971' },
    { name: 'Russia', code: 'ru', dialCode: '+7' },
    // Add more countries as needed
];

const CombinedCountryPhoneInput = ({ phoneValue, selectedCountry, onChange }) => {
    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        const country = countries.find((c) => c.code === countryCode);
        if (country) {
            onChange(`${country.dialCode}${phoneValue}`, country.code);
        }
    };

    const handlePhoneChange = (e) => {
        const newPhoneValue = e.target.value;
        onChange(newPhoneValue, selectedCountry);
    };

    return (
        <div className="country-phone-input">
            <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="country-dropdown"
            >
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name} ({country.dialCode})
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={phoneValue}
                onChange={handlePhoneChange}
                placeholder="Enter mobile number with dial code"
                required
                className="input is--phone w-input"
            />
        </div>
    );
};

const Appointment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        countryCode: 'in',
        budget: '',
        message: '',
        appointmentDate: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCombinedInputChange = (phone, countryCode) => {
        setFormData((prev) => ({
            ...prev,
            phone,
            countryCode,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPublicAppointment(formData);
            alert('Appointment created successfully!');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                countryCode: 'in',
                budget: '',
                message: '',
                appointmentDate: new Date().toISOString().slice(0, 10),
            });
        } catch (error) {
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
                <CombinedCountryPhoneInput
                    phoneValue={formData.phone}
                    selectedCountry={formData.countryCode}
                    onChange={handleCombinedInputChange}
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
