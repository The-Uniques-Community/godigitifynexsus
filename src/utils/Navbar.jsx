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

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Helper function to check if a route is active
  const isActiveRoute = (route) => {
    if (route === "/" && location.pathname === "/") return true;
    if (route !== "/" && location.pathname.startsWith(route)) return true;
    return false;
  };

  // Helper function to get link classes with active state
  const getLinkClasses = (
    route,
    baseClasses = "text-gray-700 hover:text-[#47216b] transition-all duration-300"
  ) => {
    const isActive = isActiveRoute(route);
    return `${baseClasses} ${isActive ? "text-[#47216b] font-semibold relative" : ""
      }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 lg:px-24 py-4 transition-all duration-300 ease-in-out ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-gray-50 backdrop-blur-sm py-4"
          }`}
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div
              className={`rounded-sm flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${isScrolled ? "w-32 sm:w-40 h-auto" : "w-40 sm:w-52 h-auto"
                }`}
            >
              <Link to={"/"}>
                <img
                  src={Logo}
                  alt="Godigitify"
                  className="relative z-10 transition-all duration-300 "
                />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Service Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleServiceDropdown}
                className={`${getLinkClasses(
                  "/services"
                )} flex items-center space-x-1`}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${serviceDropdownOpen ? "rotate-180" : ""
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
                {isActiveRoute("/services") && (
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
                    System and Architecture
                  </Link>
                </div>
              )}
            </div>

            {/* Solution Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleSolutionDropdown}
                className={`${getLinkClasses(
                  "/solutions"
                )} flex items-center space-x-1`}
              >
                <span>Solutions</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${solutionDropdownOpen ? "rotate-180" : ""
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
                {isActiveRoute("/solutions") && (
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
              className={`${getLinkClasses("/about")} relative`}
            >
              Our Approach
              {isActiveRoute("/about") && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link to="/blog" className={`${getLinkClasses("/blog")} relative`}>
              Insights
              {isActiveRoute("/blog") && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/contact"
              className={`${getLinkClasses("/contact")} relative`}
            >
              Contact
              {isActiveRoute("/contact") && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#47216b] rounded-full animate-pulse"></div>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/contact">
            <button
              className={`px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300 ${isScrolled ? "text-sm" : ""
                }`}
            >
              Start Diagnostic
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-90 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={toggleMobileMenu}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header: Logo + Close Button */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <Link to="/" onClick={toggleMobileMenu} className="flex items-center space-x-2">
                <img src={Logo} alt="Godigitify" className="w-24 h-auto" />
              </Link>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Scrollable Nav Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <nav className="space-y-2">
                {/* Service Dropdown (Collapsible) */}
                <div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-2 py-3 text-gray-700 font-medium rounded hover:bg-gray-50 focus:outline-none"
                    onClick={e => {
                      e.stopPropagation();
                      setServiceDropdownOpen(!serviceDropdownOpen);
                      setSolutionDropdownOpen(false);
                    }}
                    aria-expanded={serviceDropdownOpen}
                    aria-controls="mobile-service-dropdown"
                  >
                    <span>Services</span>
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform ${serviceDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {serviceDropdownOpen && (
                    <div id="mobile-service-dropdown" className="ml-4 mt-1 space-y-1">
                      <Link
                        to="/services/dba"
                        className="block px-2 py-2 text-gray-600 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                        onClick={toggleMobileMenu}
                      >
                        System and Architecture
                      </Link>
                    </div>
                  )}
                </div>
                {/* Solution Dropdown (Collapsible) */}
                <div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-2 py-3 text-gray-700 font-medium rounded hover:bg-gray-50 focus:outline-none"
                    onClick={e => {
                      e.stopPropagation();
                      setSolutionDropdownOpen(!solutionDropdownOpen);
                      setServiceDropdownOpen(false);
                    }}
                    aria-expanded={solutionDropdownOpen}
                    aria-controls="mobile-solution-dropdown"
                  >
                    <span>Solutions</span>
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform ${solutionDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {solutionDropdownOpen && (
                    <div id="mobile-solution-dropdown" className="ml-4 mt-1 space-y-1">
                      <Link
                        to="/solutions/our-products"
                        className="block px-2 py-2 text-gray-600 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                        onClick={toggleMobileMenu}
                      >
                        Our Products
                      </Link>
                      <Link
                        to="/solutions/custom-solutions"
                        className="block px-2 py-2 text-gray-600 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                        onClick={toggleMobileMenu}
                      >
                        Custom Solutions
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/about"
                  className="block px-2 py-3 text-gray-700 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Our Approach
                </Link>
                <Link
                  to="/blog"
                  className="block px-2 py-3 text-gray-700 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Insights
                </Link>
                <Link
                  to="/contact"
                  className="block px-2 py-3 text-gray-700 rounded hover:text-[#47216b] hover:bg-gray-50 transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Start Diagnostic
                </Link>
              </nav>
            </div>
            {/* CTA Button at Bottom */}
            <div className="px-6 pb-6 pt-4 border-t border-gray-200">
              <Link to="/contact" onClick={toggleMobileMenu}>
                <button className="w-full px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300">
                  Start Growth Diagnostic
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
