import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Check device type
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Updated slide structure with web URLs instead of images
  const slides = [
    {
      id: 1,
      webUrl: "https://www.theuniques.in/",
      title: "The Uniques - Integrated Growth System",
      description: "See how we architected an end-to-end digital ecosystem connecting brand, technology, and automation for scalable growth.",
      overlays: true
    },
    {
      id: 2,
      webUrl: "https://www.metropolitanfence.ca/",
      title: "Metropolitan Fence - E-Commerce Infrastructure",
      description: "Explore the scalable platform we built to handle complex product configurations and automated lead processing.",
      overlays: true
    },
    {
      id: 3,
      webUrl: "https://www.sviet.ac.in/",
      title: "SVIET - Educational Systems Platform",
      description: "Discover the institutional infrastructure powering admissions, communications, and student management at scale.",
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

      // Apply styling based on position and screen size
      const getPositionStyles = () => {
        if (screenSize.isMobile) {
          return {
            current: "opacity-100 z-20 translate-x-0 scale-100",
            prev: "opacity-0 -translate-x-full scale-90 z-10 pointer-events-none",
            next: "opacity-0 translate-x-full scale-90 z-10 pointer-events-none",
            hidden: "opacity-0 z-0 scale-80 pointer-events-none"
          };
        }
        return {
          current: "opacity-100 z-20 translate-x-0 scale-100",
          prev: "opacity-40 -translate-x-[85%] scale-90 z-10 pointer-events-none",
          next: "opacity-40 translate-x-[85%] scale-90 z-10 pointer-events-none",
          hidden: "opacity-0 z-0 scale-80 pointer-events-none"
        };
      };

      const positionStyles = getPositionStyles();

      const slideContent = (
        <div className="w-full max-w-full overflow-hidden">
          <div className={`
            ${screenSize.isMobile ? 'flex flex-col space-y-4' :
              screenSize.isTablet ? 'flex flex-col space-y-5' :
                'grid grid-cols-2 gap-8'} 
            h-full
          `}>
            {/* Web Content Side - Increased Heights */}
            <div className={`
              rounded-lg overflow-hidden flex-shrink-0
              ${screenSize.isMobile ? 'h-72 w-full' :
                screenSize.isTablet ? 'h-80 w-full' :
                  'h-full w-full min-h-[480px]'}
            `}>
              <div className="relative w-full h-full">
                <iframe
                  src={slide.webUrl}
                  className="w-full h-full border-0 rounded-lg"
                  title={`Web content for ${slide.title}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Overlay for branding/controls */}
                {slide.overlays && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Brand Logo */}
                    <div className={`
                      absolute bg-black/80 rounded flex items-center justify-center backdrop-blur-sm
                      ${screenSize.isMobile ? 'bottom-2 left-2 p-2' :
                        screenSize.isTablet ? 'bottom-3 left-3 p-2.5' :
                          'bottom-4 left-4 p-3'}
                    `}>
                      <div className={`
                        bg-pink-500 transform rotate-45
                        ${screenSize.isMobile ? 'w-3 h-3' :
                          screenSize.isTablet ? 'w-4 h-4' :
                            'w-5 h-5'}
                      `}></div>
                    </div>

                    {/* Web Indicator */}
                    <div className={`
                      absolute bg-pink-500/90 rounded-full backdrop-blur-sm
                      ${screenSize.isMobile ? 'top-2 right-2 px-3 py-1' :
                        screenSize.isTablet ? 'top-3 right-3 px-3 py-1' :
                          'top-4 right-4 px-4 py-2'}
                    `}>
                      <span className={`
                        text-white font-medium
                        ${screenSize.isMobile ? 'text-xs' :
                          screenSize.isTablet ? 'text-sm' :
                            'text-sm'}
                      `}>Live Web</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Text Side - Increased Heights */}
            <div className={`
              bg-gray-100 rounded-lg flex flex-col justify-center
              ${screenSize.isMobile ? 'p-4 min-h-[250px]' :
                screenSize.isTablet ? 'p-5 min-h-[280px]' :
                  'p-8 h-full min-h-[480px]'}
            `}>
              {/* Main Title */}
              <h3 className={`
                font-bold leading-tight
                ${screenSize.isMobile ? 'text-lg mb-4' :
                  screenSize.isTablet ? 'text-xl mb-5' :
                    'text-2xl xl:text-3xl 2xl:text-4xl mb-6'}
              `} style={{ color: '#47216b' }}>
                {slide.title}
              </h3>

              {/* Description */}
              <p className={`
                text-gray-600 leading-relaxed
                ${screenSize.isMobile ? 'text-sm mb-4' :
                  screenSize.isTablet ? 'text-base mb-5' :
                    'text-lg mb-8'}
              `}>
                {slide.description}
              </p>

              {/* Visit Website Button */}
              <button
                className={`
                  rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg self-start
                  ${screenSize.isMobile ? 'px-4 py-2 text-sm' :
                    screenSize.isTablet ? 'px-5 py-2.5 text-base' :
                      'px-6 py-3 text-base'}
                `}
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

  const getContainerHeight = () => {
    if (screenSize.isMobile) return '550px';
    if (screenSize.isTablet) return '650px';
    return '600px';
  };

  return (
    <section
      ref={sectionRef}
      className={`
        min-h-screen bg-white flex items-center justify-center relative overflow-hidden
        ${screenSize.isMobile ? 'py-6 px-3' :
          screenSize.isTablet ? 'py-8 px-4' :
            'py-16 px-4'}
      `}
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <h1
          ref={titleRef}
          className={`
            font-bold text-center leading-tight
            ${screenSize.isMobile ? 'text-lg mb-6 px-2' :
              screenSize.isTablet ? 'text-2xl mb-8 px-3' :
                'text-4xl xl:text-5xl 2xl:text-6xl mb-16 px-2'}
          `}
          style={{ color: '#47216b' }}
        >
          {screenSize.isMobile ? 'Systems We\'ve Built' : 'Systems in Action: Infrastructure That Scales'}
        </h1>

        {/* Cards Container - Increased Heights */}
        <div
          ref={cardsContainerRef}
          className={`
            relative overflow-hidden
            ${screenSize.isMobile ? 'mb-6' :
              screenSize.isTablet ? 'mb-8' :
                'mb-16'}
          `}
          style={{ minHeight: getContainerHeight() }}
        >
          {renderSlides()}
        </div>

        {/* Pagination */}
        <div className={`
          flex items-center justify-center
          ${screenSize.isMobile ? 'gap-3' :
            screenSize.isTablet ? 'gap-4' :
              'gap-6'}
        `}>
          {/* Previous button */}
          {currentSlide > 0 && (
            <button
              onClick={handlePrevSlide}
              className={`
                rounded-full border-2 border-gray-400 bg-white flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:-translate-x-1 group cursor-pointer
                ${screenSize.isMobile ? 'w-10 h-10' :
                  screenSize.isTablet ? 'w-11 h-11' :
                    'w-12 h-12'}
              `}
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
                className={`
                  transform group-hover:-translate-x-0.5 transition-transform
                  ${screenSize.isMobile ? 'w-4 h-4' :
                    screenSize.isTablet ? 'w-5 h-5' :
                      'w-5 h-5'}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <span className={`
            font-medium text-gray-600
            ${screenSize.isMobile ? 'text-base' :
              screenSize.isTablet ? 'text-lg' :
                'text-lg'}
          `}>
            {currentSlide + 1} / {totalSlides}
          </span>

          {/* Next button */}
          {currentSlide < totalSlides - 1 && (
            <button
              onClick={handleNextSlide}
              className={`
                rounded-full border-2 bg-white flex items-center justify-center text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer
                ${screenSize.isMobile ? 'w-10 h-10' :
                  screenSize.isTablet ? 'w-11 h-11' :
                    'w-12 h-12'}
              `}
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
                className={`
                  transform group-hover:translate-x-0.5 transition-transform
                  ${screenSize.isMobile ? 'w-4 h-4' :
                    screenSize.isTablet ? 'w-5 h-5' :
                      'w-5 h-5'}
                `}
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