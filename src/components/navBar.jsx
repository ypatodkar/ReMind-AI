import React from 'react';
import { useClerk } from '@clerk/clerk-react'; // Import Clerk's useClerk hook

const Navbar = () => {
  const { signOut } = useClerk(); // Use Clerk's signOut function

  return (
    <nav className="flex justify-between items-center px-5 py-2 bg-gray-800 text-white">
      {/* Logo aligned to the left */}
      <div className="text-xl font-semibold">
        ReMind-Ai
      </div>

      {/* Logout button aligned to the right */}
      <button 
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
