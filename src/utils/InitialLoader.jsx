// components/InitialLoader.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LoadingLogo from "../assets/logoanime.mp4";

const InitialLoader = ({ onComplete }) => {
  const loaderRef = useRef();
  const videoRef = useRef();
  const [started, setStarted] = useState(false);

  // Once "started" flips to true, play video (with sound) and kick off GSAP.
  useEffect(() => {
    if (!started) return;

    // Unmute & play
    videoRef.current.muted = false;
    videoRef.current.volume = 1.0;
    videoRef.current.play().catch(() => {
      console.warn("Playback still blocked?");
    });

    // Animate loader off after videoDuration seconds
    const videoDuration = 10; // Increased delay from 7 to 10 seconds
    const tl = gsap.timeline({ onComplete });
    tl.to(loaderRef.current, {
      y: "-100%",
      delay: videoDuration,
      duration: 1.2, // Increased transition duration from 1.2 to 3 seconds
      ease: "power2.inOut",
    });

    // Fallback to ensure onComplete fires
    const fallback = setTimeout(onComplete, (videoDuration + 3.5) * 1000); // Updated fallback timing
    return () => clearTimeout(fallback);
  }, [started, onComplete]);

  // Render a one‑time overlay when not started
  if (!started) {
    return (
      <div
        className="fixed inset-0 bg-black text-white flex items-center justify-center z-[9999] cursor-pointer"
        onClick={() => setStarted(true)}
      >
        <p className="text-2xl">Tap anywhere to begin</p>
      </div>
    );
  }

  // Once started, show the actual loader video
  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[999]"
    >
      <video
        ref={videoRef}
        src={LoadingLogo}
        autoPlay
        playsInline
        muted={true}       // start muted until user gesture
        preload="auto"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default InitialLoader;
