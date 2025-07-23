import React, { useEffect, useRef , useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/home'
import About from "./pages/home/components/About";
import { useLocation } from "react-router-dom";
import InitialLoader from "./utils/InitialLoader";
import TransitionOverlay from "./utils/TransitionOverlay";
import { Outlet } from "react-router";
import { usePageTransition, PageTransitionProvider } from "./utils/PageTransitionProvider";

const RootLayout = () => {
  const location = useLocation();
  const { triggerTransition } = usePageTransition();
  const [initialLoading, setInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Run once on startup
  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialLoading(false);
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Trigger overlay on every path change
  useEffect(() => {
    if (!initialLoading) {
      setShowContent(false);
      triggerTransition();
      setTimeout(() => setShowContent(true), 800); // show content after animation
    }
  }, [location.pathname, initialLoading]); // Removed triggerTransition from deps

  return (
    <div className="relative ">
      {initialLoading ? (
        <InitialLoader onComplete={() => setInitialLoading(false)} />
      ) : (
        <>
          <TransitionOverlay />
          {showContent && <Outlet />}
        </>
      )}
    </div>
  );
};

// add page here

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />  ,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/about',
        element:<About />
      }
    ]
  },
]);




const lerp = (start, end, amt) => start + (end - start) * amt;

export default function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const isHoveringRef = useRef(false);

  // target & current positions for cursor
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: targetPos.current.x, y: targetPos.current.y });
  
  // smooth hover transition
  const targetSize = useRef(8);
  const currentSize = useRef(8);

  // scroll tracking
  const lastScroll = useRef(window.scrollY);
  const scrollDir = useRef(0);
  const scrollFade = useRef(0);

  useEffect(() => {
    // --- MOUSE MOVE HANDLER ---
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      // update target
      targetPos.current = { x, y };
      // compute delta for inner parallax
      const dx = x - lastMouse.current.x;
      const dy = y - lastMouse.current.y;
      lastMouse.current = { x, y };
      targetOffset.current = { x: dx * 2, y: dy * 2 }; // Reduced multiplier for subtler effect

      // Check if hovering over interactive elements
      const elementUnderCursor = document.elementFromPoint(x, y);
      
      // Debug logging
      console.log('Element under cursor:', elementUnderCursor?.tagName, elementUnderCursor);
      
      // Simplified and more reliable detection
      let isInteractive = false;
      
      if (elementUnderCursor) {
        // Check the element itself
        isInteractive = 
          elementUnderCursor.tagName === 'BUTTON' ||
          elementUnderCursor.tagName === 'A' ||
          elementUnderCursor.tagName === 'IMG' ||
          elementUnderCursor.tagName === 'H2' ||
          elementUnderCursor.tagName === 'H1' ||
          elementUnderCursor.tagName === 'INPUT' ||
          elementUnderCursor.tagName === 'TEXTAREA' ||
          elementUnderCursor.tagName === 'SELECT' ||
          elementUnderCursor.onclick ||
          elementUnderCursor.style.cursor === 'pointer' ||
          elementUnderCursor.classList.contains('hover-target') ||
          window.getComputedStyle(elementUnderCursor).cursor === 'pointer';
        
        // If not interactive, check parent elements
        if (!isInteractive && elementUnderCursor.closest) {
          isInteractive = !!(
            elementUnderCursor.closest('a') ||
            elementUnderCursor.closest('h2') ||
            elementUnderCursor.closest('h1') ||
            elementUnderCursor.closest('button') ||
            elementUnderCursor.closest('[role="button"]') ||
            elementUnderCursor.closest('.hover-target')
          );
        }
      }
      
      console.log('Is interactive:', isInteractive);
      
      // Update hover state and target size
      isHoveringRef.current = isInteractive;
      targetSize.current = isInteractive ? 76 : 10; // Increased base size to 10px, hover to 76px
    };

    // --- SCROLL HANDLER ---
    const onScroll = () => {
      const cur = window.scrollY;
      scrollDir.current = cur > lastScroll.current ? 1 : -1;
      lastScroll.current = cur;
      // start fade‑in
      scrollFade.current = 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    let rafId;
    const animate = () => {
      // 1) Cursor position lerp - optimized speed
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.2);

      // 2) Inner offset lerp (decays back to zero) - faster response
      currentOffset.current.x = lerp(currentOffset.current.x, targetOffset.current.x, 0.25);
      currentOffset.current.y = lerp(currentOffset.current.y, targetOffset.current.y, 0.25);
      // pull targetOffset back toward zero so it eases out - faster decay
      targetOffset.current.x = lerp(targetOffset.current.x, 0, 0.15);
      targetOffset.current.y = lerp(targetOffset.current.y, 0, 0.15);

      // 3) Size lerp for smooth hover transitions - faster response
      currentSize.current = lerp(currentSize.current, targetSize.current, 0.2);

      // 4) Apply transforms
      if (cursorRef.current && ringRef.current) {
        // Update cursor size
        const size = Math.round(currentSize.current); // Round to avoid sub-pixel blur
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        
        // Position cursor centered
        const cx = currentPos.current.x + currentOffset.current.x - (size / 2);
        const cy = currentPos.current.y + currentOffset.current.y - (size / 2);
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        
        // Ring position (always centered) - updated for 80px ring
        ringRef.current.style.transform = `translate3d(${currentPos.current.x - 40}px, ${currentPos.current.y - 40}px, 0)`;
        
        // Update ring opacity and cursor effects - more subtle fade
        ringRef.current.style.opacity = isHoveringRef.current ? 0.2 : 1;
        
        // Better filter implementation to avoid blur artifacts
        if (isHoveringRef.current) {
          cursorRef.current.style.mixBlendMode = "difference";
          cursorRef.current.style.backgroundColor = "#ffffff"; // White for better difference effect
        } else {
          cursorRef.current.style.mixBlendMode = "normal";
          cursorRef.current.style.backgroundColor = "#47216b"; // Original color
        }
      }

      // 5) Scroll‐indicator fade & movement
      if (scrollIndicatorRef.current) {
        // dot moves up/down
        const dot = scrollIndicatorRef.current.querySelector(".dot");
        if (dot) {
          dot.style.transform = `translateY(${scrollDir.current * 5}px)`;
        }
        // fade out - slower fade for better visibility
        scrollFade.current = lerp(scrollFade.current, 0, 0.03);
        scrollIndicatorRef.current.style.opacity = scrollFade.current.toFixed(2);
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- STYLES ---
  const cursorStyle = {
    width: 10, // Increased base size from 8px to 10px
    height: 10,
    backgroundColor: "#47216b",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    willChange: "transform",
    transformOrigin: "center center",
  };
  const ringStyle = {
    width: 80, // Increased outer ring size
    height: 80,
    border: "0.3px solid #47216b", // Thicker border for better visibility
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9998,
    willChange: "transform",
  };
  const scrollIndicatorContainer = {
    position: "fixed",
    top: "50%",
    right: 30, // Moved slightly away from edge
    transform: "translateY(-50%)",
    width: 28, // Slightly larger
    height: 70, // Taller for better visibility
    border: "2px solid #47216b", // Thicker border
    borderRadius: 14, // Adjusted for new size
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.3s ease-out", // Slower transition
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };
  const scrollDotStyle = {
    width: 8, // Slightly larger dot
    height: 8,
    backgroundColor: "#47216b",
    borderRadius: "50%",
    transition: "transform 0.15s ease-out", // Slightly slower
    zIndex:9999
  };

  return (
    <PageTransitionProvider>
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={ringRef} style={ringStyle} />
      <div ref={scrollIndicatorRef} style={scrollIndicatorContainer}>
        <div className="dot" style={scrollDotStyle} />
      </div>
      <RouterProvider router={router} />
    </PageTransitionProvider>
  );
}
