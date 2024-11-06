import React from 'react';

const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState(appointment || {
        fullName: '',
        email: '',
        mobileNo: '',
        country: '',
        budget: '',
        message: '',
        appointmentDate: new Date().toISOString().slice(0, 10),
        status: 'pending', // Default status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        onSubmit(formData); // Pass the form data to the parent component
    };

    return (
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
            <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Mobile No"
                required
            />
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
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
            <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
            </select>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default AppointmentForm;
