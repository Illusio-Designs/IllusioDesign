// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/project">Project</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
