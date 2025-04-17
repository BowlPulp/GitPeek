import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub, FaSearch } from 'react-icons/fa';
import '../../App.css';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!username.trim()) {
      toast.info('Please enter a GitHub username');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        toast.error(`No user found with username "${username}"`);
      } else {
        navigate(`/profile/${username}`);
      }
    } catch (error) {
      toast.error('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div 
      className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-4 md:px-16 lg:px-32 py-8 pt-20 md:pt-24 relative"
      style={{
        background: '#0f1218',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#0f1218] bg-opacity-90 z-0"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: "url('/background.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 p-6 md:p-10 rounded-lg backdrop-blur-sm bg-[#161b22]/70 border border-[#30363d] shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <FaGithub className="text-4xl text-[#76a9fa]" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#76a9fa] to-[#58a6ff] text-transparent bg-clip-text">
              GitPeek
            </h1>
          </div>
          
          <h2 className="text-3xl font-semibold text-white mb-4 md:text-left text-center">
            Discover GitHub Profiles
          </h2>
          
          <p className="text-gray-300 md:text-left text-center mb-8 leading-relaxed">
            Explore, Discover, Collaborate: Elevate your GitHub experience with GitPeek. 
            Visualize coding journeys and understand developer profiles at a glance.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter GitHub username"
                className="w-full p-4 pl-5 pr-12 rounded-md bg-[#1d2433] text-white border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:border-transparent transition-all duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-6 w-full px-6 py-3 bg-[#2563eb] text-white rounded-md hover:bg-[#3b82f6] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </div>
              ) : (
                'Search Profile'
              )}
            </button>
          </form>
        </div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 md:ml-8">
          <img 
            src="/Laptop.png" 
            alt="GitHub Profile Visualization" 
            className="w-full h-auto object-cover rounded-md shadow-md"
          />
        </div>
      </div>

      {/* Customized Toast Container */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default LandingPage;