import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../App.css';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <div className="animated-gradient flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-4 md:px-32 py-8">
      {/* Left Section */}
      <div className="flex flex-col items-center w-full md:w-1/2 p-6 md:p-10 rounded-lg">
        <div className="text-4xl font-bold text-white mb-4">
          @Search Username
        </div>
        <p className="text-gray-300 text-center mb-4">
        Explore, Discover, Collaborate: Elevate your GitHub experience with our Profile Viewer. Visualize your coding journey in a single glance!
        </p>
        <input
          type="text"
          placeholder="Enter your GitHub username"
          className="w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Submit
        </button>
      </div>
      
      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center rounded-lg mt-8 md:mt-0 md:ml-8">
        <img src="Laptop.png" alt="Laptop" className="w-full h-auto object-cover rounded-md" />
      </div>
    </div>
  );
}

export default LandingPage;
