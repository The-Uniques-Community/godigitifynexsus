import React, { useState } from "react";
import { Link } from "react-router";
const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const teamMembers = [
  {
    id: 1,
    name: "Niraj Gupta",
    role: "Head of Business & Partnerships",
    image:
      "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumjhrHKDEKYdovOsGfC3D9tNMk6nXaAzRVqy05",
    bio: "Strategic leader driving innovation, partnerships, and sustainable business growth.",
    linkedin: "https://www.linkedin.com/in/niraj-gupta-04b3ba255/", // Replace with real URL
  },
  {
    id: 2,
    name: "Abhishek Mishra",
    role: "Project Delivery Manager",
    image:
      "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumR0pTg4mu2iQAmoaFD3d9eMskP7J6LXV4IRly",
    bio: "Expert in executing complex projects with a focus on agile methodologies and cross-team collaboration.",
    linkedin: "https://www.linkedin.com/in/abhishek-mishra-b6a80224a/", // Replace with real URL
  },
  {
    id: 3,
    name: "Kumar Sujal",
    role: "Product Strategy Lead",
    image:
      "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum4BvIOmxnuBQDwqki5StcHL06KrMghUGEalm7",
    bio: "Driven product leader blending user feedback with market research to craft winning digital solutions.",
    linkedin: "https://www.linkedin.com/in/kumar-sujal/", // Replace with real URL
  },
  {
    id: 4,
    name: "Aryan Kamboj",
    role: "Lead - Research & Innovation",
    image:
      "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumDfpkrmc3imC02hJzTjuAPrdk64eXYnEVlBgZ",
    bio: "Pioneering researcher exploring next-gen tech for real-world impact and scalable innovation.",
    linkedin: "https://www.linkedin.com/in/aryan-kammboz-110521252/", // Replace with real URL
  },
  {
    id: 5,
    name: "Aman Deep",
    role: "Head of Design & Creativity",
    image:
      "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum2oN0nZyWvT53OZ1aHF8mkfdPiU0cDoMlRG9z",
    bio: "Design visionary shaping immersive digital experiences with user-first creative thinking.",
    linkedin: "https://www.linkedin.com/in/aman-deep-720390247/", // Replace with real URL
  },
];


  const values = [
    {
      id: 1,
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.",
      icon: "💡",
    },
    {
      id: 2,
      title: "Client Success",
      description:
        "Your success is our success. We're committed to delivering results that exceed expectations.",
      icon: "🎯",
    },
    {
      id: 3,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in everything we do, from code to customer service.",
      icon: "⭐",
    },
    {
      id: 4,
      title: "Collaborative Spirit",
      description:
        "We believe in the power of collaboration, both within our team and with our clients.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-4">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-4">
                  ABOUT US
                </h3>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#47216b] font-bold leading-tight">
                  Shaping
                  <span className="font-medium text-black"> Digital</span>{" "}
                  Futures
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed py-4 md:py-6">
                  At{" "}
                  <span className="font-semibold text-[#47216b]">
                    GoDigitify Nexus
                  </span>
                  , we are more than just a digital agency. We are your
                  strategic partner in navigating the complex world of digital
                  transformation, creating innovative solutions that drive real
                  business results.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 md:pt-16 lg:pt-20">
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#47216b]">
                    7+
                  </div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#47216b]">
                    500+
                  </div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#47216b]">
                    50+
                  </div>
                  <div className="text-gray-600">Team Members</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-2 relative">
              <div className="relative z-10 mx-auto">
                <img
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                  alt="About Us Illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
              {[
                { id: "mission", label: "Our Mission" },
                { id: "vision", label: "Our Vision" },
                { id: "values", label: "Our Values" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 mx-2 mb-4 font-semibold transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                      ? "text-[#47216b] border-[#47216b]"
                      : "text-gray-600 border-transparent hover:text-[#47216b]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === "mission" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">
                      Our Mission
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      To empower businesses with innovative digital solutions
                      that drive growth, efficiency, and competitive advantage.
                      We believe in transforming ideas into reality through
                      cutting-edge technology and creative excellence.
                    </p>
                    <p className="text-md text-gray-600 leading-relaxed">
                      Every project we undertake is guided by our commitment to
                      deliver exceptional value, exceed expectations, and build
                      lasting partnerships with our clients.
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
                      alt="Our Mission"
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {activeTab === "vision" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                      alt="Our Vision"
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">
                      Our Vision
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      To be the leading digital transformation partner that
                      businesses trust to navigate the future. We envision a
                      world where technology seamlessly integrates with human
                      creativity to solve complex challenges.
                    </p>
                    <p className="text-md text-gray-600 leading-relaxed">
                      By 2030, we aim to be recognized globally as innovators
                      who don't just follow trends—we create them, setting new
                      standards for digital excellence and client satisfaction.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "values" && (
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-12 text-center">
                    Our Core Values
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => (
                      <div
                        key={value.id}
                        className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                      >
                        <div className="text-4xl mb-4">{value.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-[#47216b] mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                We combine expertise, innovation, and dedication to deliver
                exceptional digital solutions that drive your business forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Lightning Fast Delivery
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our agile development process ensures rapid delivery without
                    compromising on quality. Get your projects launched faster
                    than ever.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Proven Track Record
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    With 500+ successful projects and 99% client satisfaction
                    rate, our results speak for themselves. Trust in our proven
                    expertise.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Expert Team
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our multidisciplinary team of designers, developers, and
                    strategists brings diverse expertise to every project we
                    undertake.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    24/7 Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're here when you need us. Our dedicated support team
                    ensures your digital solutions run smoothly around the
                    clock.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Scalable Solutions
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our solutions grow with your business. Built with
                    scalability in mind to adapt to your evolving needs and
                    market demands.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Cost-Effective
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get maximum value for your investment. Our efficient
                    processes and smart solutions deliver premium results within
                    your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-[#47216b] mb-4">
                Leadership Vision
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Meet the visionary leader driving our commitment to innovation and digital excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* CEO Image - 5/12 width */}
              <div className="lg:col-span-5">
                <div className="relative bg-white rounded-xl p-6 shadow-lg">
                  <img
                    src="https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum9g425VoJQ5AcTPoua6UY3sS7XMiGqmnIVwtL"
                    alt="CEO - GoDigitify Nexus"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* CEO Content - 7/12 width */}
              <div className="lg:col-span-7 mx-8">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-lg text-gray-700 leading-relaxed italic text-justify">
  "At GoDigitify Nexus, we believe technology should empower possibilities and ignite progress. 
  Our mission is to transform ideas into impact through inclusive, innovative, and intelligent solutions."
</p>

<p className="text-gray-600 leading-relaxed text-justify">
  With over a decade of leadership across education, research, and business strategy, 
  our CEO, Ankur Gill, has cultivated a future-focused approach that bridges academia with industry. 
  His vision drives our dedication to innovation, equity, and meaningful transformation.
</p>

<p className="text-gray-600 leading-relaxed text-justify">
  Under his guidance, GoDigitify Nexus has delivered 50+ successful projects, 
  empowering institutions and enterprises to achieve their digital goals while 
  championing access, creativity, and long-term impact.
</p>

                  </div>

                  {/* CEO Name and Designation */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Er. Ankur Gill
                    </h3>
                    <p className="text-[#47216b] font-semibold text-lg mb-4">
                      Chief Executive Officer & Founder
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                      <a
                        href="https://www.linkedin.com/in/ankurgillofficial/"
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-[#47216b] hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/ankurgillofficial"
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-[#47216b] hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/ankurgillofficial/"
                        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-[#47216b] hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-[#47216b] mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our diverse team of experts brings together years of experience,
                creativity, and passion to deliver exceptional results for our
                clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-6 overflow-hidden rounded-xl ">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72  object-cover transition-transform duration-300 "
                    />
                    <div className="absolute inset-0 "></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#47216b] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center text-[#47216b] hover:text-gray-900 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        {/* Decorative pill/cylinder shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-82 h-32 bg-[#47216b]/5 rounded-full "></div>
          <div className="absolute top-40 right-32 w-48 h-88 bg-[#8344c5]/5 rounded-full "></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-[#8344c5]/3 rounded-full "></div>
        </div>
        {/* Main CTA content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#47216b]">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-700 opacity-90">
              Let's work together to create digital solutions that drive your
              business forward. Our team is ready to turn your vision into
              reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to='/contact'>
              <button className="px-8 py-4 bg-[#47216b] text-white font-semibold hover:bg-[#371955] transition-colors duration-300">
                Start Your Project
              </button></Link>
            {/* <Link to=''>
              <button className="px-8 py-4 border-2 border-[#47216b] text-[#47216b] font-semibold hover:bg-[#47216b] hover:text-white transition-colors duration-300">
                Schedule a Call
              </button></Link> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
