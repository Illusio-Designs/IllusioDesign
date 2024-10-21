import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import Auth context
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      console.log('Token:', token);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      setError('Login failed. Please check your credentials.');
    }
  };
  


  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p> {/* Navigation to Register */}
    </div>
  );
};

export default Login;
