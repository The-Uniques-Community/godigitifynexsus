import React from "react";
import { Link } from "react-router";
import AisLogo from '../../../assets/aislogo.png'
const CompanyLogos = () => {
  // Sample company logos - you can add more logos here and the grid will expand
  const companies = [
    {
      id: 1,
      name: "SVIET",
      logo: "https://www.sviet.ac.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.8bdb37ea.webp&w=1200&q=75",
      link: "https://www.sviet.ac.in/",
    },
    {
      id: 2,
      name: "Alliance",
      logo: AisLogo,
      link: "https://ais.ac.in/",
    },
    {
      id: 3,
      name: "AbroadEducares",
      logo: "https://abroadeducares.com/_next/static/media/blackLogo.667801bb.png",
      link:"https://abroadeducares.com/"
    },
    // {
    //   id: 4,
    //   name: "Company 4",
    //   logo: "https://via.placeholder.com/120x60/cccccc/666666?text=Logo+4",
    //   link:""
    // }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-[#47216b]">Industry Leaders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the companies that trust us with their digital transformation
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {companies.map((company, index) => (
            <Link
              key={company.id}
              to={company.link}
              rel="noopener noreferrer"
              target="_blank"
              className={`relative group flex items-center justify-center p-4 md:p-6 lg:p-8 transition-all duration-500 ease-out hover:bg-gray-50 hover:shadow-lg ${
                (index + 1) % 5 !== 0 &&
                !(index === 3 && companies.length === 4) &&
                "lg:border-r lg:border-[#47216b]/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full h-auto opacity-50 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0 transform group-hover:scale-110"
                  />
                </div>
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#47216b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </Link>
          ))}

          {/* Your Logo Here Placeholder */}
          <div className="relative group flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 transition-all duration-500 ease-out hover:bg-gray-50 hover:shadow-lg">
            <div className="w-8 h-8 mb-3 flex items-center justify-center rounded-full border border-dashed border-gray-300 text-gray-300 group-hover:border-[#47216b] group-hover:text-[#47216b] transition-all duration-500">
              <svg
                className="w-4 h-4 transform group-hover:rotate-90 transition-transform duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="text-xs font-medium text-gray-400 group-hover:text-[#47216b] transition-colors duration-500">
              Your Logo Here
            </p>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#47216b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
