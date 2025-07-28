import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated slide structure with web URLs instead of images
  const slides = [
    {
      id: 1,
      webUrl: "https://www.theuniques.in/",
      title: "The Uniques - Premium Digital Solutions for Modern Businesses",
      description: "Explore how The Uniques transforms businesses with innovative digital strategies, cutting-edge web solutions, and brand experiences that drive growth and engagement.",
      overlays: true
    },
    {
      id: 2,
      webUrl: "https://www.metropolitanfence.ca/",
      title: "Metropolitan Fence - Building Secure Boundaries with Quality",
      description: "Discover how Metropolitan Fence combines craftsmanship with technology to deliver premium fencing solutions across Canada, setting new standards in the industry.",
      overlays: true
    },
    {
      id: 3,
      webUrl: "https://www.sviet.ac.in/",
      title: "SVIET - Shaping Future Leaders Through Excellence in Education",
      description: "Learn how Swami Vivekanand Institute of Engineering & Technology is revolutionizing technical education with modern infrastructure and industry-focused curriculum.",
      overlays: true
    }
  ];
  const totalSlides = slides.length;

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const title = titleRef.current;

    // Initial setup - hide elements
    gsap.set(cardsContainer, {
      opacity: 0,
      y: 50
    });

    gsap.set(title, {
      opacity: 0,
      y: 30
    });

    // Create scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate elements in sequence
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(cardsContainer, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle carousel navigation
  const handleNextSlide = () => {
    if (currentSlide === totalSlides - 1) return;
    
    const cardsContainer = cardsContainerRef.current;

    // Animate the transition
    gsap.to(cardsContainer, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        
        gsap.to(cardsContainer, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  const handlePrevSlide = () => {
    if (currentSlide === 0) return;
    
    const cardsContainer = cardsContainerRef.current;

    // Animate the transition
    gsap.to(cardsContainer, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        
        gsap.to(cardsContainer, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  };

  // Render all slides with different styles based on position
  const renderSlides = () => {
    return slides.map((slide, slideIndex) => {
      // Determine slide position relative to current slide
      let position = "hidden";
      
      if (slideIndex === currentSlide) {
        position = "current";
      } else if (slideIndex === (currentSlide - 1 + totalSlides) % totalSlides) {
        position = "prev";
      } else if (slideIndex === (currentSlide + 1) % totalSlides) {
        position = "next";
      }

      // Apply styling based on position - Mobile first approach
      const positionStyles = {
        current: "opacity-100 z-20 translate-x-0 scale-100",
        prev: isMobile ? "opacity-0 -translate-x-full scale-90 z-10 pointer-events-none" : "opacity-40 -translate-x-[85%] scale-90 z-10 pointer-events-none",
        next: isMobile ? "opacity-0 translate-x-full scale-90 z-10 pointer-events-none" : "opacity-40 translate-x-[85%] scale-90 z-10 pointer-events-none",
        hidden: "opacity-0 z-0 scale-80 pointer-events-none"
      };

      const slideContent = (
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 h-full">
          {/* Web Content Side */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden h-48 sm:h-64 md:h-80 lg:h-full order-1 lg:order-1 flex-shrink-0">
            <div className="relative w-full h-full">
              <iframe 
                src={slide.webUrl}
                className="w-full h-full border-0"
                title={`Web content for ${slide.title}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                loading="lazy"
                allowFullScreen
              />
              
              {/* Overlay for branding/controls - responsive */}
              {slide.overlays && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Brand Logo */}
                  <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 md:bottom-4 md:left-4 bg-black/80 rounded p-1 sm:p-2 md:p-3 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 bg-pink-500 transform rotate-45"></div>
                  </div>
                  
                  {/* Web Indicator */}
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 bg-pink-500/90 rounded-full px-1 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 backdrop-blur-sm">
                    <span className="text-white text-xs font-medium">Live</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Text Side */}
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center order-2 lg:order-2 min-h-[200px] lg:h-full">
            {/* Main Title - Purple - Very responsive text sizes */}
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4 lg:mb-6" style={{ color: '#47216b' }}>
              {slide.title}
            </h3>
            
            {/* Description - Very responsive text */}
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed">
              {slide.description}
            </p>
            
            {/* Visit Website Button - Very responsive sizing */}
            <button 
              className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded font-semibold text-white transition-all duration-300 hover:shadow-lg self-start text-xs sm:text-sm md:text-base"
              style={{ backgroundColor: '#47216b' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a2980';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#47216b';
              }}
              onClick={() => window.open(slide.webUrl, '_blank')}
            >
              Visit Website
            </button>
          </div>
        </div>
      );

      return (
        <div 
          key={slide.id} 
          className={`absolute top-0 transition-all duration-500 ease-in-out w-full ${positionStyles[position]}`}
        >
          {slideContent}
        </div>
      );
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 px-2 sm:px-4 bg-white flex items-center justify-center relative"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Title - Very responsive text sizing */}
        <h1 
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 leading-tight px-1 sm:px-2"
          style={{ color: '#47216b' }}
        >
          Discovery to Decisions: Marketing in the AI era
        </h1>
        
        {/* Cards Container with slide overflow - Very responsive height */}
        <div 
          ref={cardsContainerRef}
          className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16"
          style={{ 
            minHeight: isMobile ? '420px' : 
                      window.innerWidth < 1024 ? '500px' : '500px' 
          }}
        >
          {renderSlides()}
        </div>

        {/* Pagination - Very responsive sizing */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {/* Only show prev button if not on first slide */}
          {currentSlide > 0 && (
            <button 
              onClick={handlePrevSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:-translate-x-1 group cursor-pointer"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#47216b';
                e.target.style.borderColor = '#47216b';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#9ca3af';
              }}
              aria-label="Previous slide"
            >
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transform group-hover:-translate-x-0.5 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <span className="text-sm sm:text-base md:text-base lg:text-lg font-medium text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </span>
          
          {/* Only show next button if not on last slide */}
          {currentSlide < totalSlides - 1 && (
            <button 
              onClick={handleNextSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 bg-white flex items-center justify-center text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer"
              style={{
                backgroundColor: '#47216b',
                borderColor: '#47216b'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a2980';
                e.target.style.borderColor = '#5a2980';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#47216b';
                e.target.style.borderColor = '#47216b';
              }}
              aria-label="Next slide"
            >
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-0.5 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Project;

