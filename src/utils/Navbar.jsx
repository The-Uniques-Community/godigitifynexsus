import React, { useState, useEffect } from "react";
import Logo from "../assets/GodigitifyCrop.png";
import { Link } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <Link
              to="#"
              className="text-gray-700 hover:text-[#47216b] transition-colors duration-300"
            >
              Work
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-[#47216b] transition-colors duration-300"
            >
              Solution
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-[#47216b] transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-[#47216b] transition-colors duration-300"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#47216b] transition-colors duration-300"
            >
              Contact
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
          <button className="text-gray-700 hover:text-[#47216b] flex items-center space-x-1 transition-colors duration-300">
            <span className="hidden lg:inline">English</span>
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
              <Link
                to="#"
                className="block text-gray-700 hover:text-[#47216b] transition-colors duration-300"
              >
                Solution
              </Link>
              <Link
                to="#"
                className="block text-gray-700 hover:text-[#47216b] transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="#"
                className="block text-gray-700 hover:text-[#47216b] transition-colors duration-300"
              >
                Blog
              </Link>
              <Link
                to="#"
                className="block text-gray-700 hover:text-[#47216b] transition-colors duration-300"
              >
                Contact
              </Link>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <button className="w-full px-4 py-2 border border-[#47216b] text-[#47216b] rounded-lg hover:bg-[#47216b] hover:text-white transition-all duration-300">
                  Let us Think
                </button>
                <button className="w-full text-left text-gray-700 hover:text-[#47216b] flex items-center justify-between transition-colors duration-300">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
