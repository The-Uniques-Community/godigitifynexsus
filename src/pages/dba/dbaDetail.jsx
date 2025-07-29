import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  servicePages,
  categories
} from './data/dbaData.js';
import { fetchCategoryBySlug } from './data/apiService.js';
import axios from 'axios';

// API URL for services
const API_URL = import.meta.env.VITE_API_URL || 'https://godigitify-backend.vercel.app/api/services';

const DBADetail = () => {
  const { slug } = useParams();
  
  // Fallback data in case API fails
  const serviceData = servicePages[slug] || null;
  const categoryFallback = categories.find(cat => cat.slug === slug) || {
    slug: '',
    name: 'Service',
    color: '#47216b'
  };

  const [activeService, setActiveService] = useState(0); // First item open by default
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch category data from API
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get data from the API endpoint
        const response = await axios.get(`${API_URL}/categories/${slug}`);
        
        if (response.data) {
          // Process and enrich the data
          const categoryData = {
            ...response.data,
            // Ensure all required properties exist, fill with defaults if not
            name: response.data.name || categoryFallback.name,
            color: response.data.color || categoryFallback.color,
            slug: response.data.slug || slug,
            services: response.data.services || fallbackServiceList,
            stats: response.data.stats || [],
            whyChooseUs: response.data.whyChooseUs || [
              "Industry Expertise",
              "Cutting-Edge Technology",
              "Dedicated Support",
              "Proven Results"
            ],
            testimonials: response.data.testimonials || []
          };
          
          setCategory(categoryData);
        } else {
          throw new Error('API returned empty data');
        }
      } catch (err) {
        console.error('Failed to fetch category details from new API:', err);
        
        // Fallback to old API
        try {
          const data = await fetchCategoryBySlug(slug);
          if (data) {
            setCategory(data);
          } else {
            // If old API also fails, use static data
            setCategory(categoryFallback);
          }
        } catch (fallbackErr) {
          console.error('Fallback API also failed:', fallbackErr);
          setCategory(categoryFallback);
        }
      } finally {
        setLoading(false);
      }
    };

    getCategoryData();
  }, [slug]);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Company logos for slider
  const companyLogos = [
    { name: 'Shopify Partner', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=Shopify' },
    { name: 'Google Partner', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=Google' },
    { name: 'HubSpot Partner', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=HubSpot' },
    { name: 'Adobe Partner', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=Adobe' },
    { name: 'Zoho Partner', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=Zoho' },
    { name: 'ONDC', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=ONDC' },
    { name: 'MoEngage', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=MoEngage' },
    { name: 'PHP', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=PHP' },
    { name: 'React', logo: 'https://via.placeholder.com/120x60/47216b/ffffff?text=React' }
  ];

  // Fallback service list if API data is not available
  const fallbackServiceList = [
    {
      id: 'custom-web-dev',
      title: 'Custom Web Development',
      description: 'Tailored web solutions that meet your specific business needs and objectives.',
      icon: 'code'
    },
    {
      id: 'web-personalization',
      title: 'Web Personalization',
      description: 'Create unique user experiences based on visitor behavior and preferences.',
      icon: 'person'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'Intuitive, user-centered design that enhances engagement and conversions.',
      icon: 'design'
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      description: 'Improve your visibility online and drive more organic traffic to your website.',
      icon: 'search'
    },
    {
      id: 'crm-erp',
      title: 'CRM & ERP Solutions',
      description: 'Streamline your business operations with integrated management systems.',
      icon: 'settings'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Development',
      description: 'Build powerful online stores that drive sales and improve customer experience.',
      icon: 'shopping'
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing',
      description: 'Connect with your audience through targeted, effective email campaigns.',
      icon: 'mail'
    },
    {
      id: 'marketing-automation',
      title: 'Marketing Automation',
      description: 'Save time and increase efficiency with automated marketing workflows.',
      icon: 'automation'
    },
    {
      id: 'ai-chatbots',
      title: 'AI-Powered Chatbots',
      description: 'Enhance customer service with intelligent, conversational AI solutions.',
      icon: 'chat'
    }
  ];

  if (!category && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#47216b] mb-4">Service Not Found</h1>
          <p className="text-xl text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link
            to="/services/dba"
            className="px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold hover:bg-[#38134f] transition-colors"
          >
            Back to DBA Services
          </Link>
        </div>
      </div>
    );
  }

  // Instead of relying on serviceData, directly use the category state
  // which contains the API data or fallbacks
  const title = category?.name || 'Service';
  const heroImage = category?.heroImage || 'https://via.placeholder.com/1200x500';
  const overview = category?.overview || 'Comprehensive solutions for your business needs.';
  const whyChooseUs = category?.whyChooseUs || [];
  const process = category?.process || [];
  const testimonials = category?.testimonials || [];
  const companies = category?.companies || [];
  const stats = category?.stats || [];

  return (
    <div className="min-h-screen bg-white">
      {loading ? (
        // Main loading skeleton
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#47216b] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-xl font-medium text-gray-700">Loading service details...</h2>
          </div>
        </div>
      ) : (
        <>
          {/* Scroll Progress Bar */}
          {/* <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#47216b] to-[#8344c5] transform origin-left z-50"
            style={{ scaleX: scrollProgress / 100 }}
          /> */}

      {/* Back Button */}
      <div className={`fixed top-6 left-6 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md' : ''}`}>
        <Link
          to="/services/dba"
          className="inline-flex items-center space-x-2 text-[#47216b] hover:text-[#8344c5] transition-colors group"
        >
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Services</span>
        </Link>
      </div>

      {/* Modern Hero section with side-by-side content and image */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="absolute w-96 h-96 bg-[#47216b]/5 rounded-full -top-20 -left-20 blur-3xl z-0"></div>
        <div className="absolute w-64 h-64 bg-[#8344c5]/5 rounded-full top-40 right-10 blur-3xl z-0"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-[#47216b]/10 text-[#47216b] text-sm font-medium mb-4">
                {category.name}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                  {title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {overview}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#47216b] text-white rounded-full font-semibold shadow-md transition-all duration-300 transform hover:shadow-sm"
                >
                  Get Started
                </Link>
                <button className="px-8 py-4 border border-[#47216b] text-[#47216b] rounded-full font-semibold transition-all duration-300 hover:bg-[#47216b]/5">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#47216b] to-[#8344c5] rounded-md blur opacity-20"></div>
                <div className="relative bg-white rounded-md overflow-hidden shadow-xl">
                  <img
                    src={heroImage}
                    alt={title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats section - Enhanced with background */}
      {stats.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-[#47216b] to-[#8344c5] relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Proven Results That Matter
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Our track record speaks for itself. Here's what we've achieved for our clients!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                    <div className="text-4xl md:text-6xl font-bold mb-3 text-white">
                      {stat.value}
                    </div>
                    <div className="text-white/80 uppercase tracking-wider text-sm font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section - Enhanced Layout */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#47216b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#8344c5]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="sticky top-8">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                    Transforming
                  </span> Your Digital Presence
                </h2>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    Our Digital Transformation Team uses bleeding-edge technology to enable you to nurture customer relationships at every stage. We create integrated digital ecosystems covering web, social & paid media, CRM, ERP, search, e-commerce and other channels.
                  </p>

                  <p className="text-xl text-gray-700 leading-relaxed">
                    Our custom-made platforms and solutions help you attract, retain and engage every prospect with a personalized touch.
                  </p>
                </div>

                <div className="space-y-8">
                  {whyChooseUs.slice(0, 3).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.2 }}
                      className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div
                        className="w-14 h-14 rounded-sm flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg transition-all duration-300"
                        style={{ backgroundColor: category.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#47216b] transition-colors">{item}</h3>
                        <p className="text-gray-600 leading-relaxed">Our proven expertise delivers exceptional results that drive meaningful business growth and digital transformation.</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Service List with Enhanced Hover */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Services</h3>

                  {loading ? (
                    // Loading skeleton
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="bg-white p-5 rounded-sm shadow-sm animate-pulse">
                          <div className="flex items-center justify-between">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    // Error state
                    <div className="bg-red-50 p-4 rounded-md text-center">
                      <p className="text-red-500 mb-2">Could not load services</p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="text-sm text-[#47216b] hover:underline"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    // Services from API or fallback
                    <div className="space-y-3">
                      {(category && category.services && category.services.length > 0 
                        ? category.services 
                        : fallbackServiceList
                      ).map((service, index) => (
                        <motion.div
                          key={service.id || index}
                          className="relative"
                        >
                          <div
                            className={`p-5 rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-between ${activeService === index
                              ? 'bg-gradient-to-r from-[#47216b] to-[#8344c5] text-white shadow-lg'
                              : 'bg-white text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md'
                              }`}
                            onClick={() => setActiveService(activeService === index ? null : index)}
                          >
                            <span className="font-medium text-sm">{service.title}</span>
                            <svg
                              className={`w-5 h-5 transition-all duration-300 ${activeService === index
                                ? 'transform rotate-90 text-white'
                                : 'text-[#47216b]'
                                }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>

                          <AnimatePresence>
                            {activeService === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white p-6 rounded-sm shadow-xl border border-gray-100 mt-2">
                                  <h4 className="font-semibold text-[#47216b] mb-3 text-lg">{service.title}</h4>
                                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                                  <Link
                                    to={`/services/${service.id || service.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="inline-flex items-center gap-2 text-[#47216b] font-medium hover:text-[#8344c5] transition-colors group"
                                  >
                                    Learn more
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Partners Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#47216b]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#8344c5]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">Industry Leaders</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We collaborate with the world's most innovative technology companies to deliver cutting-edge solutions
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex space-x-8 animate-scroll">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-md h-24 w-48 flex items-center justify-center hover:shadow-xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#47216b]/5 group-hover:to-[#8344c5]/5 border border-gray-100">
                    <span className="font-bold text-[#47216b] text-lg group-hover:text-[#8344c5] transition-colors">{company.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Modern Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">Our {title}</span>
            </h2>
            <p className="text-xl text-gray-600">We combine industry expertise with innovative approaches to deliver exceptional results for our clients.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white h-full p-8 rounded-sm border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-5px]">
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center text-white text-xl mb-6 transition-transform"
                    style={{ backgroundColor: category.color }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#47216b]">{item}</h3>
                  <p className="text-gray-600">
                    Our expert team ensures the highest quality standards for your project.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline - Enhanced Layout */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Process</h2>
            <p className="text-xl text-gray-600">A structured approach to ensure quality and consistency in every project.</p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line - Responsive */}
            <div className="hidden lg:block h-1 bg-gradient-to-r from-[#47216b] to-[#8344c5] absolute top-16 left-0 right-0 z-0"></div>

            {/* Process Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.length > 0 ? process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg transition-all duration-300"
                      style={{ backgroundColor: category.color }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 w-full h-48 flex flex-col justify-between group hover:transform hover:-translate-y-2">
                    <div className="text-center flex-grow flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-[#47216b] mb-3 group-hover:text-[#8344c5] transition-colors">
                        {step.title || `Step ${index + 1}`}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description || 'Process description goes here'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )) : (
                // Default process steps if no data
                [
                  { title: "Discovery", description: "We analyze your requirements and understand your business goals." },
                  { title: "Planning", description: "Strategic roadmap creation with detailed project timeline." },
                  { title: "Development", description: "Building your solution with cutting-edge technologies." },
                  { title: "Launch", description: "Deploy and monitor your project for optimal performance." }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.15 }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Step Number Circle */}
                    <div className="relative z-10 mb-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg transition-all duration-300"
                        style={{ backgroundColor: category.color }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 w-full h-48 flex flex-col justify-between group hover:transform hover:-translate-y-2">
                      <div className="text-center flex-grow flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-[#47216b] mb-3 group-hover:text-[#8344c5] transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Work Showcase - Interactive Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Our Work</h2>
            <p className="text-xl text-gray-600">Explore some of our recent projects and success stories.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#47216b]/80 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={`https://via.placeholder.com/600x400/${index % 2 === 0 ? '47216b' : '8344c5'}/ffffff?text=Project+${index + 1}`}
                      alt={`Project ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="transform transition-transform duration-300 ">
                        <h3 className="text-2xl font-bold text-white mb-2">Project {index + 1}</h3>
                        <p className="text-white/90 mb-4 text-sm line-clamp-2 group-hover:line-clamp-none">
                          An innovative solution that delivered remarkable results for our client.
                        </p>
                        <button className="px-4 py-2 bg-white text-[#47216b] rounded-full text-sm font-semibold transform opacity-0 group-hover:opacity-100 transition-all duration-300">
                          View Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#47216b]">Client: Company {index + 1}</span>
                      <span className="text-xs bg-[#47216b]/10 text-[#47216b] px-3 py-1 rounded-full">
                        {['Web App', 'E-commerce', 'Digital Marketing'][index]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-[#47216b] text-[#47216b] rounded-full font-medium hover:bg-[#47216b] hover:text-white transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Cards */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Hear from businesses that have transformed their digital presence with our help.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonial.quote || 'The team delivered exactly what we needed. Highly recommended!'}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#47216b]/20 rounded-full flex items-center justify-center text-[#47216b] font-bold mr-4">
                      {(testimonial.author || 'Client')[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author || 'Satisfied Client'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.position || 'CEO'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#47216b] via-[#5a2c7a] to-[#8344c5] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-32 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">Transform</span> Your Business?
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Let's discuss how our {title} can help your business grow and reach new heights in the digital landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link
                to="/contact"
                className="group px-10 py-5 bg-white text-[#47216b] rounded-full font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-2 text-lg"
              >
                <span className="flex items-center gap-3">
                  Schedule a Consultation
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <motion.button
                className="px-10 py-5 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
              >
                View Our Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

        <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </>
      )}
    </div>
  );
};

export default DBADetail;