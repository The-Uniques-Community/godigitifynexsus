import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Img from '../../../assets/heroimg1.png'

const Hero = () => {
  const [email, setEmail] = useState('')
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    const container = containerRef.current
    
    if (!img || !container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      // Calculate rotation values (reduced for subtle effect)
      const rotateX = (deltaY / rect.height) * -15
      const rotateY = (deltaX / rect.width) * 15
      
      gsap.to(img, {
        duration: 0.6,
        rotationX: rotateX,
        rotationY: rotateY,
        transformOrigin: "center center",
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(img, {
        duration: 0.8,
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out"
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className=" bg-gray-50 relative overflow-hidden">
      {/* Navigation */}


      {/* Hero Content */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-36 container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
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

            {/* Right Illustration - 3 columns */}
            <div className="lg:col-span-3 relative" ref={containerRef}>
              <div className="relative top-16 z-10" style={{ perspective: '1000px' }}>
                <img 
                  ref={imgRef}
                  className='w-full h-auto' 
                  src={Img}
                  style={{ transformStyle: 'preserve-3d' }}
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