import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to home page after logout
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Khabarbaz</Link>
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-400">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-400">Contact</Link>

          {/* Conditional Login/Logout Buttons */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="bg-blue-600 px-4 py-2 rounded mx-2">
                Login
              </Link>
              <Link to="/signup" className="bg-green-600 px-4 py-2 rounded">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
