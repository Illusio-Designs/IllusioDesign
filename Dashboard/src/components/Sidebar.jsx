// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/user">User</Link> {/* Updated link to /users */}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
