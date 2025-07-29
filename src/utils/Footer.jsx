import React from "react";
import Logo from "../assets/GodigitifyCrop.png";
import { Link } from "react-router";

const links = [
  [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/dba" },
    // { label: "Terms of Service", href: "/terms" },
  ],
  [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    // { label: "Privacy Policy", href: "/privacy" },
  ],
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-4 relative">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Logo and tagline */}
          <div className="flex flex-col items-start space-y-6">
            <div className="mb-2">
              <img
                src={Logo}
                alt="Godigitify Nexus Logo"
                className="md:w-82 w-60 h-auto"
                style={{ filter: 'none' }}
              />
            </div>
            <div>
              <span className="block text-2xl md:text-3xl font-light text-gray-900 leading-tight">
                Digital solutions that
              </span>
              <span className="block text-2xl md:text-3xl font-light text-gray-900 leading-tight">
                <span className="italic text-[#47216b] font-normal">empower your business.</span>
              </span>
            </div>
          </div>

          {/* Right: Links grid */}
          <div className="w-full flex flex-col items-start justify-center">
            <div className="grid grid-cols-3 gap-x-8 gap-y-2 w-full">
              {links.flat().map((link, idx) => (
                <Link
                  to={link.href}
                  className="flex items-center text-gray-700 hover:text-[#47216b] text-base whitespace-nowrap group transition-colors"
                >
                  <span className="mr-1 text-lg group-hover:translate-x-1 transition-transform">→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom right copyright */}
      <div className="w-full flex justify-end mt-8 pr-6">
        <div className="text-xs text-gray-400 text-right">
          ALL RIGHTS RESERVED.<br />
          © 2025 GODIGITIFY NEXUS.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
