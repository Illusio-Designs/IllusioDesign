import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';

const DefaultLayout = ({ children, logout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // Call the logout function passed as prop
    // Navigation is handled in the parent component after logout
  };

  return (
    <div className="min-h-screen flex">
      <SideMenu />
      <div className="flex-1">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">My Application</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            aria-label="Logout"
          >
            Logout
          </button>
        </header>
        <main className="p-6">
          {children}
        </main>
        <footer className="p-4 text-center text-gray-600">
          © 2024 My Application
        </footer>
      </div>
    </div>
  );
};

export default DefaultLayout;
