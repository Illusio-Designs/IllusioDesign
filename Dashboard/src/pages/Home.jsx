import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth for logout functionality
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { logout } = useAuth(); // Get logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to remove the token and reset auth state
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <div className="home-page">
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
    </div>
  );
};

export default Home;
