import React, { useState } from 'react'
import Logo from '../../../assets/GodigitifyCrop.png'
import Img from '../../../assets/heroimg1.png'
const Hero = () => {
  const [email, setEmail] = useState('')

  return (
    <div className=" bg-gray-50 relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-12 lg:px-24 py-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-52 h-auto rounded-sm flex items-center justify-center">
              <img src={Logo} alt="Godigitify Nexus" />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-black flex items-center space-x-1">
              <span>Product</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <a href="#" className="text-gray-700 hover:text-black">Why us</a>
            <a href="#" className="text-gray-700 hover:text-black">About us</a>
            <a href="#" className="text-gray-700 hover:text-black">Cases</a>
            <a href="#" className="text-gray-700 hover:text-black">Blog</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 border border-green-400 text-green-600 rounded-lg hover:bg-green-50">
            Book a demo
          </button>
          <button className="text-gray-700 hover:text-black flex items-center space-x-1">
            <span>English</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="py-36 container mx-auto">
        <div className=" mx-auto">
          <div className="grid lg:grid-cols-7 gap-12 items-center">
            {/* Left Content - 4 columns */}
            <div className="lg:col-span-4 ">
              <div className="space-y-6">
                <h1 className="text-5xl w-max md:text-8xl
                 text-[#47216b] font-bold leading-tight">
                  We Build <span className="font-medium text-black">digital</span> Futures
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed py-6 max-w-3xl">
                  From content to code, strategy to execution — <span className="font-semibold text-[#47216b]">GoDigitfy is your one-stop solution </span> creative, tech, and digital marketing partner. We help startups and enterprises unlock scalable growth with future-ready digital solutions.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex pt-8 flex-col sm:flex-row gap-4 max-w-md">
                <button className="px-8 py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition">
                  Get Started
                </button>
                <button className="px-8 py-4 border border-[#47216b] text-[#47216b] rounded-full font-semibold hover:bg-[#47216b] hover:text-white transition">
                  Learn More
                </button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-20">
                <div>
                  <div className="text-3xl font-bold text-[#47216b] mb-2">500+</div>
                  <div className="text-gray-600 text-sm">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#47216b] mb-2">100+</div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#47216b] mb-2">99%</div>
                  <div className="text-gray-600 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Illustration - 2 columns */}
            <div className="lg:col-span-3 relative">
              <div className="relative top-16 z-10">
               <img className='w-full h-auto' src={Img}/>
                {/* <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-12 mx-auto w-64">
                  <div className="bg-gray-100 rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Only Chat</span>
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">$ 42</span>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Active
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div> */}

                {/* Secondary Elements */}
                {/* <div className="absolute -top-8 -left-16 bg-white rounded-xl shadow-lg p-3 transform -rotate-12">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-xs">Task list</span>
                  </div>
                </div> */}

                {/* <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-lg p-4 transform rotate-6">
                  <div className="text-xs text-gray-600 mb-2">Performance</div>
                  <div className="text-lg font-semibold">85.7% ▲</div>
                </div> */}

                {/* Card Element */}
                {/* <div className="absolute top-4 -right-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 text-white transform -rotate-6">
                  <div className="text-xs opacity-75 mb-1">****</div>
                  <div className="text-sm font-medium">4532</div>
                </div> */}
              </div>

              {/* Background Decoration */}
              {/* <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero