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
          style={{ border: '1px solid green', borderRadius: '6px'}}
          className="hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Take Autism Test
        </button>
      </div>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/user-stats')}
          style={{ border: '1px solid green', borderRadius: '6px'}}
          className="hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          User Stats
        </button>
      </div>

      <div className="flex space-x-6">
        <a
          href="https://www.scu.edu/bewell/"
          style={{ border: '1px solid blue', borderRadius: '6px'}}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Contact Cowell
        </a>
      </div>
      
      {/* Right: Logout Button */}
      <div>
        <button
          onClick={handleSignOut}
          style={{ border: '1px solid red', borderRadius: '6px'}}
          
          className=" hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
