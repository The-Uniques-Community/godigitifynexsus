// components/TransitionOverlay.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TransitionOverlay = ({ trigger }) => {
  const overlayRef = useRef();

  useEffect(() => {
    if (!trigger) return;

    const tl = gsap.timeline();

    tl.set(overlayRef.current, { y: "100%" })
      .to(overlayRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power2.in",
      })
      .to(overlayRef.current, {
        y: "-100%",
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
  }, [trigger]);

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-full bg-[#111] z-[998]"
    ></div>
  );
};

export default TransitionOverlay;
