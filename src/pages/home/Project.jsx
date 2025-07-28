import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const titleRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Updated slide structure with title and description
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Where brands go to reach premium audiences in India",
      description: "Discover how brands are leveraging YouTube's Connected TV platform to reach high-value audiences across India's growing digital landscape.",
      overlays: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "How India's creators are reshaping beauty and fashion content",
      description: "Explore the revolutionary impact of Indian content creators on beauty and fashion trends, and why brands are taking notice.",
      overlays: true
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "How Nykaa helped people meet unique beauty needs with AI",
      description: "Learn how personalized AI technology is transforming the beauty industry and creating meaningful customer experiences.",
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

      // Apply styling based on position
      const positionStyles = {
        current: "opacity-100 z-20 translate-x-0 scale-100",
        prev: "opacity-40 -translate-x-[85%] scale-90 z-10 pointer-events-none",
        next: "opacity-40 translate-x-[85%] scale-90 z-10 pointer-events-none",
        hidden: "opacity-0 z-0 scale-80 pointer-events-none"
      };

      const slideContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Image Side */}
          <div className="rounded-3xl overflow-hidden h-full">
            <div className="relative w-full h-full">
              <img 
                src={slide.image} 
                alt="Featured content" 
                className="w-full h-full object-cover"
              />
              {slide.overlays && (
                <div className="absolute inset-0">
                  {/* Brand Logo */}
                  <div className="absolute bottom-4 left-4 bg-black rounded-lg p-3 flex items-center justify-center">
                    <div className="w-5 h-5 bg-pink-500 transform rotate-45"></div>
                  </div>
                  
                  {/* CTV Indicator */}
                  <div className="absolute bottom-4 right-4 bg-pink-500 rounded-full px-4 py-2">
                    <div className="w-6 h-3 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Text Side */}
          <div className="bg-gray-100 rounded-3xl p-8 flex flex-col justify-center h-full">
            {/* Main Title - Now Purple */}
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: '#47216b' }}>
              {slide.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {slide.description}
            </p>
            
            {/* Know More Button */}
            <button 
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg self-start"
              style={{ backgroundColor: '#47216b' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a2980';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#47216b';
              }}
            >
              Know More
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
      className="min-h-screen py-16 px-4 bg-white flex items-center justify-center relative"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 leading-tight"
          style={{ color: '#47216b' }}
        >
          Discovery to Decisions: Marketing in the AI era
        </h1>
        
        {/* Cards Container with slide overflow */}
        <div 
          ref={cardsContainerRef}
          className="relative mb-16"
          style={{ minHeight: '500px' }}
        >
          {renderSlides()}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6">
          {/* Only show prev button if not on first slide */}
          {currentSlide > 0 && (
            <button 
              onClick={handlePrevSlide}
              className="w-12 h-12 rounded-full border-2 border-gray-400 bg-white flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:-translate-x-1 group cursor-pointer"
              style={{
                '--hover-bg': '#47216b',
                '--hover-border': '#47216b'
              }}
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
                className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <span className="text-lg font-medium text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </span>
          
          {/* Only show next button if not on last slide */}
          {currentSlide < totalSlides - 1 && (
            <button 
              onClick={handleNextSlide}
              className="w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center text-white transition-all duration-300 hover:translate-x-1 group cursor-pointer"
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
                className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" 
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