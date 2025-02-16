import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/'); // Redirect to login page on logout
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Left: Brand */}
      <div 
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        ReMind-Ai
      </div>
      
      {/* Center: Navigation Button */}
      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/autismTest')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Take Autism Test
        </button>
      </div>
      
      {/* Right: Logout Button */}
      <div>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
