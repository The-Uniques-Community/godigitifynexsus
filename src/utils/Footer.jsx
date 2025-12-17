import React from "react";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import Logo from '../assets/GodigitifyCropWhite.png';

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy", href: "/privacy" },
];

const socialLinks = [
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/godigitifyofficial/" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/godigitify/" },
  { icon: <FaYoutube />, href: "https://youtube.com" },
  { icon: <FaFacebook />, href: "https://www.facebook.com/godigitify" },
];

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 z-0 bg-[#47216b] pt-16 pb-12 px-4 md:px-0 flex flex-col items-center" style={{minHeight: '340px'}}>
      {/* Logo Image */}
      <div className="flex justify-center items-center mb-8 md:mb-16 pt-32 md:pt-64">
        <img src={Logo} alt="GoDigitify Logo" className="w-64 md:w-[1000px] h-auto object-contain" />
      </div>
      {/* Social + Nav */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        {/* Social Icons */}
        <div className="flex space-x-6 text-white text-2xl">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
              {s.icon}
            </a>
          ))}
        </div>
        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-white text-base font-medium">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-gray-200 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      {/* Bottom Text */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between text-xs text-gray-200 opacity-80 gap-2">
        <span>Proudly created in India.</span>
        <span>All Right Reserved, All Wrong Reversed.</span>
      </div>
    </footer>
  );
};

export default Footer;
