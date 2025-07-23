import React, { useState } from 'react'

const Service = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const services = [
    {
      id: 1,
      title: "Brand Solution",
      description: "We provide customised solutions to meet partner needs. We understand the objectives and requirements to develop strategies & create holistic consumer experiences and fully serve clients.",
      color: "bg-[#47216b]",
      hoverColor: "hover:bg-white",
      textColor: "text-white",
      hoverTextColor: "hover:text-gray-800",
      buttonText: "More Details",
      link: "View Work",
      icon: "→"
    },
    {
      id: 2,
      title: "Tech Solution", 
      description: "Cutting-edge technology solutions tailored to your business needs. From web development to mobile apps, we deliver innovative digital products.",
      color: "bg-gray-100",
      hoverColor: "hover:bg-[#47216b]",
      textColor: "text-gray-800",
      hoverTextColor: "hover:text-white",
      buttonText: "Explore Tech",
      link: "View Projects",
      icon: "→"
    },
    {
      id: 3,
      title: "Media Solution",
      description: "Creative media solutions that capture attention and drive engagement. From content creation to digital campaigns.",
      color: "bg-gray-100", 
      hoverColor: "hover:bg-[#47216b]",
      textColor: "text-gray-800",
      hoverTextColor: "hover:text-white",
      buttonText: "Media Services",
      link: "View Portfolio",
      icon: "→"
    },
    {
      id: 4,
      title: "Research Solution",
      description: "Data-driven insights and market research to inform your business decisions and strategy development.",
      color: "bg-gray-100",
      hoverColor: "hover:bg-[#47216b]", 
      textColor: "text-gray-800",
      hoverTextColor: "hover:text-white",
      buttonText: "Research Info",
      link: "View Studies",
      icon: "→"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#47216b]">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions for your digital transformation journey
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ease-out transform  ${
                service.id === 1 && hoveredCard && hoveredCard !== 1
                  ? 'bg-gray-300' 
                  : service.color
              } ${service.hoverColor}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
                {/* Title */}
                <div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300 ${
                    service.id === 1 
                      ? hoveredCard && hoveredCard !== 1
                        ? 'text-black'
                        : 'text-white group-hover:text-gray-800'
                      : 'text-gray-800 group-hover:text-white'
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm md:text-base leading-relaxed mb-8 transition-colors duration-300 ${
                    service.id === 1 
                      ? hoveredCard && hoveredCard !== 1
                        ? 'text-black'
                        : 'text-white group-hover:text-gray-800'
                      : 'text-gray-800 group-hover:text-white'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  {/* Button */}
                  <button className={`w-full px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
                    service.id === 1 
                      ? hoveredCard && hoveredCard !== 1
                        ? 'border-black text-black'
                        : 'border-white text-white group-hover:border-gray-800 group-hover:text-gray-800 group-hover:bg-transparent'
                      : 'border-gray-800 text-gray-800 group-hover:border-white group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    {service.buttonText}
                  </button>

                  {/* Link with Arrow */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm transition-colors duration-300 ${
                      service.id === 1 
                        ? hoveredCard && hoveredCard !== 1
                          ? 'text-black'
                          : 'text-white group-hover:text-gray-800'
                        : 'text-gray-800 group-hover:text-white'
                    }`}>
                      {service.link}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      service.id === 1 
                        ? hoveredCard && hoveredCard !== 1
                          ? 'bg-black text-white'
                          : 'bg-white text-[#47216b] group-hover:bg-gray-800 group-hover:text-white'
                        : 'bg-gray-800 text-white group-hover:bg-white group-hover:text-[#47216b]'
                    }`}>
                      <span className="text-lg font-bold transform transition-transform duration-300 group-hover:translate-x-1">
                        {service.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Background Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
              </div>

              {/* Swipe Animation Effect */}
              <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out opacity-20">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service