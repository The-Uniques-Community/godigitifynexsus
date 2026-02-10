import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Img from "../../../assets/heroimg2.png";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Hero Content */}
      <section className="py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
            {/* Left Content - Takes full width on mobile, 4/6 on desktop */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="space-y-2 md:space-y-2">
                {/* Eyebrow */}
                {/* <p className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">
                  AI-Aligned Digital Growth Systems
                </p> */}
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-[#47216b] font-bold leading-tight">
                  Scale<span className="font-medium text-black"> Without</span>{" "}
                  Chaos
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed py-4 md:py-6 max-w-none lg:max-w-3xl mx-auto lg:mx-0">
                  We build{" "}
                  <span className="font-semibold text-[#47216b]">
                    integrated digital ecosystems{" "}
                  </span>
                  that replace fragmented tactics with predictable, automated growth systems. For established businesses ready to move from effort-based execution to scalable infrastructure.
                </p>

                {/* 3 Supporting Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                  <div className="flex items-start gap-2">
                    <span className="text-[#47216b] mt-1">✓</span>
                    <span className="text-sm text-gray-700"><strong>System-Level Automation</strong> — End manual bottlenecks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#47216b] mt-1">✓</span>
                    <span className="text-sm text-gray-700"><strong>Secure & Scalable</strong> — Built for enterprise load</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#47216b] mt-1">✓</span>
                    <span className="text-sm text-gray-700"><strong>Measurable ROI</strong> — Predictable growth metrics</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-8 justify-center lg:justify-start max-w-lg mx-auto lg:mx-0">
                <Link to={"/contact"}>
                  <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300">
                    Start Growth Diagnostic
                  </button>
                </Link>
                <Link to={'/services/dba'}>
                  <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-[#47216b] text-[#47216b] rounded-full font-semibold hover:bg-[#47216b] hover:text-white transition-colors duration-300">
                    Explore Our Systems
                  </button>
                </Link>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 md:pt-16 lg:pt-20 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">
                    500+
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Systems Deployed
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">
                    3.2x
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Avg. Efficiency Gain
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-bold text-[#47216b]">
                    97%
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    Client Retention
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration - Takes full width on mobile, 2/6 on desktop */}
            <div className="lg:col-span-2 relative order-last lg:order-last">
              <div className="relative z-10 mx-auto scale-110 lg:scale-125">
                <img
                  className="w-full h-auto"
                  src={Img}
                  alt="Digital Growth Systems Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
