import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { logoutAdmin, getAdminInfo } from "../utils/auth";
import logo from '../assets/GodigitifyCrop.png'
const lerp = (start, end, amt) => start + (end - start) * amt;

const CMSLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const location = useLocation();

  // Get admin info on component mount
  useEffect(() => {
    const info = getAdminInfo();
    setAdminInfo(info);
  }, []);
  // Helper function to check if a route is active
  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Cursor refs
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

  // Cursor animation effect
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
      targetOffset.current = { x: dx * 2, y: dy * 2 };

      // Check if hovering over interactive elements
      const elementUnderCursor = document.elementFromPoint(x, y);

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

      // Update hover state and target size
      isHoveringRef.current = isInteractive;
      targetSize.current = isInteractive ? 76 : 10;
    };

    // --- SCROLL HANDLER ---
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
      // 1) Cursor position lerp
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.2);

      // 2) Inner offset lerp (decays back to zero)
      currentOffset.current.x = lerp(currentOffset.current.x, targetOffset.current.x, 0.25);
      currentOffset.current.y = lerp(currentOffset.current.y, targetOffset.current.y, 0.25);
      targetOffset.current.x = lerp(targetOffset.current.x, 0, 0.15);
      targetOffset.current.y = lerp(targetOffset.current.y, 0, 0.15);

      // 3) Size lerp for smooth hover transitions
      currentSize.current = lerp(currentSize.current, targetSize.current, 0.2);

      // 4) Apply transforms
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

      // 5) Scroll indicator fade & movement
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

  // --- STYLES ---
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
    <div className="relative min-h-screen bg-gray-50">
      {/* Custom Cursor Elements */}
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={ringRef} style={ringStyle} />
      <div ref={scrollIndicatorRef} style={scrollIndicatorContainer}>
        <div className="dot" style={scrollDotStyle} />
      </div>

      {/* Page Transition Overlay */}

      {/* CMS Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 fixed top-0 right-0 z-40 left-0 lg:left-64">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-xl font-semibold text-gray-900">CMS</h1>
          </div>


        </div>
      </header>

      {/* CMS Layout Container */}
      <div className="flex min-h-screen">
        {/* Animated Sidebar */}
        <aside className={`
              fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0
            `}>
          <div className="flex flex-col h-full">
            {/* Logo/Brand Section - Fixed at top */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="" />
              </div>
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              {/* Navigation Links */}
              <div className="space-y-2">
                {/* Dashboard */}
                <Link
                  to="/cms/dashboard"
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg ${isActiveRoute('/cms/dashboard')
                      ? 'text-gray-900 bg-purple-50 border-r-4 border-purple-600 rounded-l-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActiveRoute('/cms/dashboard') ? 'text-purple-600' : 'group-hover:text-purple-600'} transition-colors duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  Dashboard
                </Link>

                {/* Blogs */}
                <Link
                  to="/cms/blogs"
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg group ${isActiveRoute('/cms/blogs')
                      ? 'text-gray-900 bg-purple-50 border-r-4 border-purple-600 rounded-l-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActiveRoute('/cms/blogs') ? 'text-purple-600' : 'group-hover:text-purple-600'} transition-colors duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 .22l4 2a1 1 0 01.78.97V18a2 2 0 01-2 2z" />
                  </svg>
                  Blogs

                </Link>

                {/* Contact Query */}
                <Link
                  to="/cms/manage-queries"
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg group ${isActiveRoute('/cms/manage-queries')
                      ? 'text-gray-900 bg-purple-50 border-r-4 border-purple-600 rounded-l-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActiveRoute('/cms/manage-queries') ? 'text-purple-600' : 'group-hover:text-purple-600'} transition-colors duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Query

                </Link>

                {/* Add Services */}
                <Link
                  to="/cms/manage-services"
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg group ${isActiveRoute('/cms/manage-services')
                      ? 'text-gray-900 bg-purple-50 border-r-4 border-purple-600 rounded-l-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <svg className={`mr-3 h-5 w-5 ${isActiveRoute('/cms/manage-services') ? 'text-purple-600' : 'group-hover:text-purple-600'} transition-colors duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Services
                </Link>

              </div>
            </nav>

            {/* Bottom Section - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
              {/* Admin Info */}
              {adminInfo && (
                <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#47216b] to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {adminInfo.name ? adminInfo.name.charAt(0).toUpperCase() : 'A'}
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-xs font-medium text-gray-900">{adminInfo.name || 'Admin'}</p>
                      <p className="text-xs text-gray-500 truncate">{adminInfo.email}</p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={logoutAdmin}
                    className="mt-3 w-full text-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}

              {/* Help Section */}

            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* CMS Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="min-h-screen">
            {/* Content with proper padding for header and scrolling */}
            <div className="pt-16 lg:pt-20">
              <div className="p-6 lg:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
