import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure this path is correct
import AppLayout from './AppLayout'; // Assuming your AppLayout is in the same directory
import '../styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout /> {/* Use the AppLayout to manage layout */}
      </Router>
    </AuthProvider>
  );
};

export default App;
