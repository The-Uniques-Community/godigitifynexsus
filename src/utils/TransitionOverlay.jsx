import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePageTransition } from "./PageTransitionProvider";

const TransitionOverlay = () => {
  const overlayRef = useRef();
  const stripRefs = [useRef(), useRef(), useRef(), useRef()]; // 4 strip refs
  const { isTransitioning, transitionStage } = usePageTransition();

  useEffect(() => {
    if (!isTransitioning || !overlayRef.current) return;

    // Check if all strips exist
    if (stripRefs.some(ref => !ref.current)) return;

    const overlay = overlayRef.current;
    const strips = stripRefs.map(ref => ref.current);

    // Create timeline for the transition
    const tl = gsap.timeline();

    if (transitionStage === 'exit') {
      // Setup overlay
      gsap.set(overlay, {
        display: 'block',
        visibility: 'visible',
        opacity: 1
      });

      // Setup initial strip positions - all off-screen left
      strips.forEach((strip, index) => {
        const delay = index * 0.08; // Stagger the strips

        gsap.set(strip, {
          left: '-120%',
          top: `${index * 25}%`, // Each strip takes 25% of the height
          height: '25%',        // Each strip is 25% of the viewport height
          width: '100%',
          scaleX: 0.2           // Thin strips to start
        });

        // Animate each strip in with staggered timing
        tl.to(strip, {
          left: '0%',
          scaleX: 1,
          duration: 0.45,
          ease: "power2.inOut",
          delay: delay
        }, index === 0 ? 0 : "<0.15"); // Slightly overlap animations
      });

    } else if (transitionStage === 'enter') {
      // Animate strips continuing across screen with staggered timing
      strips.forEach((strip, index) => {
        const delay = index * 0.06; // Slightly faster staggering for exit

        tl.to(strip, {
          left: '120%',
          duration: 0.5,
          ease: "power2.inOut",
          delay: delay
        }, index === 0 ? 0 : "<0.12");
      });

      // Hide overlay after all strips are off-screen
      tl.add(() => {
        gsap.set(overlay, {
          display: 'none',
          visibility: 'hidden',
          opacity: 0
        });
      }, ">-0.1");
    }
  }, [isTransitioning, transitionStage]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      style={{
        display: 'none',
        visibility: 'hidden',
        backgroundColor: 'transparent'
      }}
    >
      {/* Strip 1 - Pure White */}
      <div
        ref={stripRefs[0]}
        className="absolute"
        style={{
          position: 'absolute',
          left: '-100%',
          top: '0%',
          height: '25%',
          width: '100%',
          backgroundColor: '#ffffff',
          transformOrigin: 'center center'
        }}
      />
      {/* Strip 2 - Main Purple */}
      <div
        ref={stripRefs[1]}
        className="absolute"
        style={{
          position: 'absolute',
          left: '-100%',
          top: '25%',
          height: '25%',
          width: '100%',
          backgroundColor: '#47216b',
          transformOrigin: 'center center'
        }}
      />
      {/* Strip 3 - Light Purple */}
      <div
        ref={stripRefs[2]}
        className="absolute"
        style={{
          position: 'absolute',
          left: '-100%',
          top: '50%',
          height: '25%',
          width: '100%',
          backgroundColor: '#5a359b',
          transformOrigin: 'center center'
        }}
      />
      {/* Strip 4 - Off-white */}
      <div
        ref={stripRefs[3]}
        className="absolute"
        style={{
          position: 'absolute',
          left: '-100%',
          top: '75%',
          height: '25%',
          width: '100%',
          backgroundColor: '#f5f5f5',
          transformOrigin: 'center center'
        }}
      />
    </div>
  );
};

// The PageTransition component remains unchanged
export const PageTransition = ({ children, className = "" }) => {
  const pageRef = useRef();
  const { isTransitioning, transitionStage } = usePageTransition();

  useEffect(() => {
    if (!pageRef.current) return;

    const page = pageRef.current;
    const tl = gsap.timeline();

    if (transitionStage === 'exit') {
      // Old page fades out faster
      tl.to(page, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in"
      });
    } else if (transitionStage === 'enter') {
      // New page fades in with slight delay
      tl.set(page, {
        opacity: 0
      })
        .to(page, {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
          delay: 0.3 // Slightly reduced delay
        });
    }
  }, [transitionStage]);

  return (
    <div
      ref={pageRef}
      className={`transition-container ${className}`}
      style={{ opacity: 1 }}
    >
      {children}
    </div>
  );
};

export default TransitionOverlay;
