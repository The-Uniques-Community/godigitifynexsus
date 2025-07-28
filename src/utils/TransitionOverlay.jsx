import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePageTransition } from "../utils/PageTransitionProvider";

const TransitionOverlay = () => {
  const overlayRef = useRef();
  const maskRef = useRef();
  const { isTransitioning, transitionStage } = usePageTransition();

  useEffect(() => {
    if (!isTransitioning) return;

    const overlay = overlayRef.current;
    const mask = maskRef.current;
    
    // Create timeline for the transition
    const tl = gsap.timeline();

    if (transitionStage === 'exit') {
      // Phase 1: Fade in overlay mask
      tl.set(overlay, { display: 'block' })
        .set(mask, { opacity: 0, scale: 0.8 })
        .to(mask, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
    } else if (transitionStage === 'enter') {
      // Phase 2: Fade out overlay mask to reveal new page
      tl.to(mask, {
          opacity: 0,
          scale: 1.1,
          duration: 0.6,
          ease: "power2.inOut"
        })
        .set(overlay, { display: 'none' });
    }
    
  }, [isTransitioning, transitionStage]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[998] pointer-events-none"
      style={{ display: 'none' }}
    >
      {/* Smooth gradient mask */}
      <div
        ref={maskRef}
        className="absolute inset-0 bg-gradient-to-br from-[#47216b] via-[#47216b]/90 to-[#47216b]/80"
        style={{ 
          opacity: 0,
          transform: 'scale(0.8)',
          backdropFilter: 'blur(2px)'
        }}
      />
      
      {/* Optional: Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-50" />
      </div>
    </div>
  );
};

// Enhanced page transition wrapper component
export const PageTransition = ({ children, className = "" }) => {
  const pageRef = useRef();
  const { isTransitioning, transitionStage } = usePageTransition();

  useEffect(() => {
    if (!pageRef.current) return;

    const page = pageRef.current;
    const tl = gsap.timeline();

    if (transitionStage === 'exit') {
      // Old page slides out and fades
      tl.to(page, {
        x: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    } else if (transitionStage === 'enter') {
      // New page slides in and fades in
      tl.set(page, { 
          x: 50, 
          opacity: 0 
        })
        .to(page, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2 // Slight delay for smoother transition
        });
    }

  }, [transitionStage]);

  return (
    <div 
      ref={pageRef}
      className={`transition-container ${className}`}
      style={{ opacity: 1, transform: 'translateX(0)' }}
    >
      {children}
    </div>
  );
};

export default TransitionOverlay;
