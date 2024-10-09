import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <div>
                            <h1>Welcome to the Dashboard</h1>
                            <p>Please <a href="/login">login</a> or <a href="/register">register</a>.</p>
                        </div>
                    } />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
