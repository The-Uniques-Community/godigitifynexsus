import React, { useState, useEffect } from "react";
import Logo from '../assets/GodigitifyCrop.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 lg:px-24 py-4 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-gray-50 backdrop-blur-sm py-4'
    }`}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className={`rounded-sm flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-300 ${
            isScrolled ? 'w-40 h-auto' : 'w-52 h-auto'
          }`}>
            <img src={Logo} alt="Godigitify Nexus" className="relative z-10 transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
            {/* Wipe effect rectangle */}
            <div className="absolute inset-0 bg-[#47216b] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-600 ease-out"></div>
            {/* White logo that appears during wipe */}
            <img src={Logo} alt="Godigitify Nexus" className="absolute inset-0 w-full h-full object-contain z-20 brightness-0 invert opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300" />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-700 hover:text-[#47216b] flex items-center space-x-1 transition-colors duration-300">
            <span>Product</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <a href="#" className="text-gray-700 hover:text-[#47216b] transition-colors duration-300">
            Why us
          </a>
          <a href="#" className="text-gray-700 hover:text-[#47216b] transition-colors duration-300">
            About us
          </a>
          <a href="#" className="text-gray-700 hover:text-[#47216b] transition-colors duration-300">
            Cases
          </a>
          <a href="#" className="text-gray-700 hover:text-[#47216b] transition-colors duration-300">
            Blog
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className={`px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300 ${
          isScrolled ? 'text-sm' : ''
        }`}>
          Let us Think
        </button>
        <button className="text-gray-700 hover:text-[#47216b] flex items-center space-x-1 transition-colors duration-300">
          <span>English</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
