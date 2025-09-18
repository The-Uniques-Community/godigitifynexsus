import React, { useEffect, useRef, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import InitialLoader from "../utils/InitialLoader";
import TransitionOverlay from "../utils/TransitionOverlay";
import { usePageTransition } from "../utils/PageTransitionProvider";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";

const lerp = (start, end, amt) => start + (end - start) * amt;

const MainLayout = () => {
  const location = useLocation();
  const { triggerTransition } = usePageTransition();
  const [initialLoading, setInitialLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const isHoveringRef = useRef(false);

  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: targetPos.current.x, y: targetPos.current.y });
  
  const targetSize = useRef(8);
  const currentSize = useRef(8);

  const lastScroll = useRef(window.scrollY);
  const scrollDir = useRef(0);
  const scrollFade = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialLoading(false);
      setShowContent(true);
      setInitialLoadComplete(true);
    }, 8200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!initialLoading && initialLoadComplete) {
      setShowContent(false);
      triggerTransition();
      setTimeout(() => setShowContent(true), 800);
    }
  }, [location.pathname]);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      targetPos.current = { x, y };
      const dx = x - lastMouse.current.x;
      const dy = y - lastMouse.current.y;
      lastMouse.current = { x, y };
      targetOffset.current = { x: dx * 2, y: dy * 2 };

      const elementUnderCursor = document.elementFromPoint(x, y);
      
      let isInteractive = false;
      
      if (elementUnderCursor) {
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
      
      isHoveringRef.current = isInteractive;
      targetSize.current = isInteractive ? 76 : 10;
    };

    const onScroll = () => {
      const cur = window.scrollY;
      scrollDir.current = cur > lastScroll.current ? 1 : -1;
      lastScroll.current = cur;
      scrollFade.current = 1;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    let rafId;
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.2);

      currentOffset.current.x = lerp(currentOffset.current.x, targetOffset.current.x, 0.25);
      currentOffset.current.y = lerp(currentOffset.current.y, targetOffset.current.y, 0.25);
      targetOffset.current.x = lerp(targetOffset.current.x, 0, 0.15);
      targetOffset.current.y = lerp(targetOffset.current.y, 0, 0.15);

      currentSize.current = lerp(currentSize.current, targetSize.current, 0.2);

      if (cursorRef.current && ringRef.current) {
        const size = Math.round(currentSize.current);
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
        
        const cx = currentPos.current.x + currentOffset.current.x - (size / 2);
        const cy = currentPos.current.y + currentOffset.current.y - (size / 2);
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        
        ringRef.current.style.transform = `translate3d(${currentPos.current.x - 40}px, ${currentPos.current.y - 40}px, 0)`;
        
        ringRef.current.style.opacity = isHoveringRef.current ? 0.2 : 1;
        
        if (isHoveringRef.current) {
          cursorRef.current.style.mixBlendMode = "difference";
          cursorRef.current.style.backgroundColor = "#ffffff";
        } else {
          cursorRef.current.style.mixBlendMode = "normal";
          cursorRef.current.style.backgroundColor = "#47216b";
        }
      }

      if (scrollIndicatorRef.current) {
        const dot = scrollIndicatorRef.current.querySelector(".dot");
        if (dot) {
          dot.style.transform = `translateY(${scrollDir.current * 20}px)`;
        }
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

  const cursorStyle = {
    width: 10,
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
    width: 80,
    height: 80,
    border: "0.3px solid #47216b",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9998,
    willChange: "transform",
  };
  const scrollIndicatorContainer = {
    position: "fixed",
    top: "50%",
    right: 30,
    transform: "translateY(-50%)",
    width: 28,
    height: 70,
    border: "2px solid #47216b",
    borderRadius: 14,
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.3s ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };
  const scrollDotStyle = {
    width: 8,
    height: 8,
    backgroundColor: "#47216b",
    borderRadius: "50%",
    transition: "transform 0.15s ease-out",
    zIndex: 9999
  };

  return (
    <div className="relative">
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={ringRef} style={ringStyle} />
      <div ref={scrollIndicatorRef} style={scrollIndicatorContainer}>
        <div className="dot" style={scrollDotStyle} />
      </div>

      {/* Main Layout Content */}
      {initialLoading ? (
        <InitialLoader onComplete={() => setInitialLoading(false)} />
      ) : (
        <>
          <Navbar />
          <TransitionOverlay />
          {showContent && (
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow md:mb-[29rem] mb-[24rem] z-10 pb-20  pt-16 md:pt-20 lg:pt-20 md:rounded-b-[5rem] rounded-b-[2rem] bg-white">
                <Outlet />
              </main>
              <Footer />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainLayout;
