import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/loginApi'; // Ensure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      console.log('Login Response:', response); // Log the response
      const token = response.data?.token; // Use optional chaining
      if (token) {
        setIsAuthenticated(true);
        return token;
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const response = await registerUser(formData);
      console.log('Registration Response:', response);
      if (response && response.token) {
        setIsAuthenticated(true);
        return response.token;
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
