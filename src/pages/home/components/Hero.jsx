import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Img from '../../../assets/heroimg1.png'

const Hero = () => {
  
  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Hero Content */}
      <section className="py-16 md:py-24 lg:py-36">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
            {/* Left Content - Takes full width on mobile, 4/6 on desktop */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#47216b] font-bold leading-tight">
                  Build<span className="font-medium text-black"> your</span> Brand
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed py-4 md:py-6 max-w-none lg:max-w-3xl mx-auto lg:mx-0">
                  From content to code, strategy to execution — <span className="font-semibold text-[#47216b]">GoDigitfy is your one-stop solution </span> creative, tech, and digital marketing partner. We help startups and enterprises unlock scalable growth with future-ready digital solutions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-8 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300">
                  Get Started
                </button>
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-[#47216b] text-[#47216b] rounded-full font-semibold hover:bg-[#47216b] hover:text-white transition-colors duration-300">
                  Learn More
                </button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 md:pt-16 lg:pt-20 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">500+</div>
                  <div className="text-gray-600 text-sm md:text-base">Projects Delivered</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">100+</div>
                  <div className="text-gray-600 text-sm md:text-base">Happy Clients</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">99%</div>
                  <div className="text-gray-600 text-sm md:text-base">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Illustration - Takes full width on mobile, 2/6 on desktop */}
            <div className="lg:col-span-2 relative order-last lg:order-last" >
              <div className="relative z-10 mx-auto scale-110 lg:scale-125" >
                <img 
                  className='w-full h-auto' 
                  src={Img}
                  alt="Hero Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero