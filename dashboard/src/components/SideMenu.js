import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css'; // Optional: Import CSS for styling

const SideMenu = () => {
    return (
        <div className="side-menu">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/team">Team</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/blog">Blog</Link>
                </li>
                <li>
                    <Link to="/referral">Referral</Link>
                </li>
                <li>
                    <Link to="/booking">Booking</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
