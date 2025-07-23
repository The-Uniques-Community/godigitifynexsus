import React, { useState, useEffect } from "react";
import Logo from "../assets/GodigitifyCrop.png";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleServiceDropdown = () => {
    setServiceDropdownOpen(!serviceDropdownOpen);
    setSolutionDropdownOpen(false);
  };

  const handleSolutionDropdown = () => {
    setSolutionDropdownOpen(!solutionDropdownOpen);
    setServiceDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setServiceDropdownOpen(false);
      setSolutionDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Helper function to check if a route is active
  const isActiveRoute = (route) => {
    if (route === '/' && location.pathname === '/') return true;
    if (route !== '/' && location.pathname.startsWith(route)) return true;
    return false;
  };

  // Helper function to get link classes with active state
  const getLinkClasses = (route, baseClasses = "text-gray-700 hover:text-[#47216b] transition-all duration-300") => {
    const isActive = isActiveRoute(route);
    return `${baseClasses} ${isActive ? 'text-[#47216b] font-semibold relative' : ''}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 lg:px-24 py-4 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-gray-50 backdrop-blur-sm py-4"
        }`}
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div
              className={`rounded-sm flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${
                isScrolled ? "w-32 sm:w-40 h-auto" : "w-40 sm:w-52 h-auto"
              }`}
            >
            <Link to={'/'}>
              <img
                src={Logo}
                alt="Godigitify Nexus"
                className="relative z-10 transition-all duration-300 "
              /></Link>
        
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Service Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleServiceDropdown}
                className={`${getLinkClasses('/services')} flex items-center space-x-1`}
              >
                <span>Service</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    serviceDropdownOpen ? 'rotate-180' : ''
                  }`}
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
                {isActiveRoute('/services') && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
                )}
              </button>
              {serviceDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/services/dba"
                    className="block px-4 py-2 text-gray-700 hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setServiceDropdownOpen(false)}
                  >
                    DBA
                  </Link>
                </div>
              )}
            </div>

            {/* Solution Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleSolutionDropdown}
                className={`${getLinkClasses('/solutions')} flex items-center space-x-1`}
              >
                <span>Solution</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    solutionDropdownOpen ? 'rotate-180' : ''
                  }`}
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
                {isActiveRoute('/solutions') && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
                )}
              </button>
              {solutionDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/solutions/our-products"
                    className="block px-4 py-2 text-gray-700 hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setSolutionDropdownOpen(false)}
                  >
                    Our Products
                  </Link>
                  <Link
                    to="/solutions/custom-solutions"
                    className="block px-4 py-2 text-gray-700 hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setSolutionDropdownOpen(false)}
                  >
                    Custom Solutions
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`${getLinkClasses('/about')} relative`}
            >
              About
              {isActiveRoute('/about') && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/blog"
              className={`${getLinkClasses('/blog')} relative`}
            >
              Blog
              {isActiveRoute('/blog') && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/contact"
              className={`${getLinkClasses('/contact')} relative`}
            >
              Contact
              {isActiveRoute('/contact') && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className={`px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300 ${
              isScrolled ? "text-sm" : ""
            }`}
          >
            Let us Think
          </button>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={toggleMobileMenu}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-6">
              <Link
                to="#"
                className="block text-gray-700 hover:text-[#47216b] transition-colors duration-300"
              >
                Work
              </Link>
              
              {/* Mobile Service Section */}
              <div>
                <div className={`font-medium mb-2 ${isActiveRoute('/services') ? 'text-[#47216b]' : 'text-gray-700'}`}>
                  Service
                  {isActiveRoute('/services') && (
                    <div className="w-4 h-0.5 bg-[#47216b] rounded-full mt-1 animate-pulse"></div>
                  )}
                </div>
                <div className="ml-4">
                  <Link
                    to="/services/dba"
                    className="block text-gray-600 hover:text-[#47216b] transition-colors duration-300 py-1"
                    onClick={toggleMobileMenu}
                  >
                    DBA
                  </Link>
                </div>
              </div>

              {/* Mobile Solution Section */}
              <div>
                <div className={`font-medium mb-2 ${isActiveRoute('/solutions') ? 'text-[#47216b]' : 'text-gray-700'}`}>
                  Solution
                  {isActiveRoute('/solutions') && (
                    <div className="w-4 h-0.5 bg-[#47216b] rounded-full mt-1 animate-pulse"></div>
                  )}
                </div>
                <div className="ml-4 space-y-1">
                  <Link
                    to="/solutions/our-products"
                    className="block text-gray-600 hover:text-[#47216b] transition-colors duration-300 py-1"
                    onClick={toggleMobileMenu}
                  >
                    Our Products
                  </Link>
                  <Link
                    to="/solutions/custom-solutions"
                    className="block text-gray-600 hover:text-[#47216b] transition-colors duration-300 py-1"
                    onClick={toggleMobileMenu}
                  >
                    Custom Solutions
                  </Link>
                </div>
              </div>

              <Link
                to="/about"
                className={`${getLinkClasses('/about', 'block text-gray-700 hover:text-[#47216b] transition-colors duration-300')} relative`}
              >
                About
                {isActiveRoute('/about') && (
                  <div className="w-4 h-0.5 bg-[#47216b] rounded-full mt-1 animate-pulse"></div>
                )}
              </Link>
              <Link
                to="/blog"
                className={`${getLinkClasses('/blog', 'block text-gray-700 hover:text-[#47216b] transition-colors duration-300')} relative`}
                onClick={toggleMobileMenu}
              >
                Blog
                {isActiveRoute('/blog') && (
                  <div className="w-4 h-0.5 bg-[#47216b] rounded-full mt-1 animate-pulse"></div>
                )}
              </Link>
              <Link
                to="/contact"
                className={`${getLinkClasses('/contact', 'block text-gray-700 hover:text-[#47216b] transition-colors duration-300')} relative`}
                onClick={toggleMobileMenu}
              >
                Contact
                {isActiveRoute('/contact') && (
                  <div className="w-4 h-0.5 bg-[#47216b] rounded-full mt-1 animate-pulse"></div>
                )}
              </Link>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <button className="w-full px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300">
                  Let us Think
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
