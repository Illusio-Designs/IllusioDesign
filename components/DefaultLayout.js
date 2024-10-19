import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu'; // Import the SideMenu component

const DefaultLayout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }}>
            <SideMenu /> {/* Render the SideMenu */}
            <div style={{ flex: 1, padding: '20px' }}> {/* Main content area */}
                <header>
                    <h1>My Application</h1>
                </header>
                <main>{children}</main>
                <footer>
                    <p>&copy; 2024 My Application</p>
                </footer>
            </div>
        </div>
    );
};

export default DefaultLayout;
