import React, { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/home'
import About from "./pages/home/components/About";
import { useNavigation } from "react-router";
import InitialLoader from "./utils/InitialLoader";
import TransitionOverlay from "./utils/TransitionOverlay";


const RootLayout = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [transitionTrigger, setTransitionTrigger] = useState(false);
  const navigation = useNavigation();

  // Trigger page transition on route change
  useEffect(() => {
    if (navigation.state === "loading") {
      setTransitionTrigger(true);
    }
  }, [navigation.state]);

  return (
    <>
      {initialLoading && <InitialLoader onComplete={() => setInitialLoading(false)} />}
      <TransitionOverlay trigger={transitionTrigger} />
      {!initialLoading && <Outlet />}
    </>
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
      }
    ]
  },
]);














const lerp = (start, end, amt) => start + (end - start) * amt;

export default function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // target & current positions for cursor
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: targetPos.current.x, y: targetPos.current.y });

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
      targetOffset.current = { x: dx * 3, y: dy * 3 };
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
      // 1) Cursor position lerp
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

      // 2) Inner offset lerp (decays back to zero)
      currentOffset.current.x = lerp(currentOffset.current.x, targetOffset.current.x, 0.15);
      currentOffset.current.y = lerp(currentOffset.current.y, targetOffset.current.y, 0.15);
      // pull targetOffset back toward zero so it eases out
      targetOffset.current.x = lerp(targetOffset.current.x, 0, 0.1);
      targetOffset.current.y = lerp(targetOffset.current.y, 0, 0.1);

      // 3) Apply transforms
      if (cursorRef.current && ringRef.current) {
        const cx = currentPos.current.x + currentOffset.current.x - 4;
        const cy = currentPos.current.y + currentOffset.current.y - 4;
        cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        ringRef.current.style.transform = `translate3d(${currentPos.current.x - 25}px, ${currentPos.current.y - 25}px, 0)`;
      }

      // 4) Scroll‐indicator fade & movement
      if (scrollIndicatorRef.current) {
        // dot moves up/down
        const dot = scrollIndicatorRef.current.querySelector(".dot");
        if (dot) {
          dot.style.transform = `translateY(${scrollDir.current * 10}px)`;
        }
        // fade out
        scrollFade.current = lerp(scrollFade.current, 0, 0.05);
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
    width: 8,
    height: 8,
    backgroundColor: "#47216b",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    willChange: "transform",
  };
  const ringStyle = {
    width: 50,
    height: 50,
    border: "1px solid #47216b",
    borderRadius: "50%",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9998,
    willChange: "transform",
  };
  const scrollIndicatorContainer = {
    position: "fixed",
    top: "50%",
    right: 20,
    transform: "translateY(-50%)",
    width: 24,
    height: 60,
    border: "1px solid #47216b",
    borderRadius: 12,
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.2s ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const scrollDotStyle = {
    width: 6,
    height: 6,
    backgroundColor: "#47216b",
    borderRadius: "50%",
    transition: "transform 0.1s ease-out",
  };

  return (
    <>
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={ringRef} style={ringStyle} />
      <div ref={scrollIndicatorRef} style={scrollIndicatorContainer}>
        <div className="dot" style={scrollDotStyle} />
      </div>
      <RouterProvider router={router} />
    </>
  );
}
