import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePageTransition } from "../utils/PageTransitionProvider";

const TransitionOverlay = () => {
  const overlayRef = useRef();
  const { isTransitioning } = usePageTransition();

  useEffect(() => {
    if (!isTransitioning) return;

    const tl = gsap.timeline();
    tl.set(overlayRef.current, { y: "100%" })
      .to(overlayRef.current, { y: "0%", duration: 0.5, ease: "power2.in" })
      .to(overlayRef.current, { y: "-100%", duration: 0.5, delay: 0.3, ease: "power2.out" });
  }, [isTransitioning]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-white z-[998] pointer-events-none"
      style={{ transform: "translateY(100%)" }}
    />
  );
};

export default TransitionOverlay;
