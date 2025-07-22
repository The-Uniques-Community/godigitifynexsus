// components/InitialLoader.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const InitialLoader = ({ onComplete }) => {
  const loaderRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    tl.fromTo(
      loaderRef.current,
      { y: 0 },
      {
        y: "-100%",
        delay: 2,
        duration: 1.2,
        ease: "power2.inOut",
      }
    );
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-black text-white flex items-center justify-center text-4xl z-[999]"
    >
      YourBrand Loading...
    </div>
  );
};

export default InitialLoader;
