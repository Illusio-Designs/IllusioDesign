// dashboard/src/pages/AddUser.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/loginApi';

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    image: null, // For file upload
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setUserData((prev) => ({ ...prev, image: e.target.files[0] })); // Store the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object to handle file uploads

    // Append user data to FormData
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      await registerUser(formData); // Send FormData to the API
      alert('User created successfully!');
      // Optionally, reset the form or redirect
      setUserData({
        username: '',
        email: '',
        password: '',
        image: null,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Profile Image:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*" // Accept only image files
            />
          </label>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AddUser;