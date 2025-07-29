import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  serviceOfferings,
  getCategoryDescription,
  categories as fallbackCategories
} from './data/dbaData.js';
import { 
  fetchAllCategories, 
  fetchCategoryBySlug,
  mapApiToUiFormat
} from './data/apiService.js';

// Default category stats as a fallback
const defaultCategoryStats = {
  branding: [
    { value: '50+', label: 'Brand Identities' },
    { value: '85%', label: 'Increased Recognition' },
    { value: '40+', label: 'Industries Served' }
  ],
  marketing: [
    { value: '200+', label: 'Campaigns' },
    { value: '35%', label: 'Average ROI Increase' },
    { value: '1M+', label: 'Customer Reach' }
  ],
  web: [
    { value: '100+', label: 'Websites Launched' },
    { value: '45%', label: 'Conversion Rate Boost' },
    { value: '99.9%', label: 'Uptime' }
  ],
  app: [
    { value: '70+', label: 'Mobile Apps' },
    { value: '4.8', label: 'Average Rating' },
    { value: '50K+', label: 'Daily Active Users' }
  ],
  graphic: [
    { value: '300+', label: 'Design Projects' },
    { value: '90%', label: 'Client Satisfaction' },
    { value: '25+', label: 'Design Awards' }
  ]
};

const Index = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const solutionsRef = useRef(null);
  const solutionRefs = useRef({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({});
    const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Fetch categories from API
  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchAllCategories();
  //       setCategories(mapApiToUiFormat(data));
  //       setError(null);
  //     } catch (err) {
  //       console.error('Failed to fetch categories:', err);
  //       setError('Failed to load service categories. Please try again later.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getCategories();
  // }, []);
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
        const data = await fetchAllCategories();
        
        if (data && data.length > 2) {
          setCategories(mapApiToUiFormat(data));
          setIsUsingFallback(false);
        } else {
          // If API returns empty data, use fallback
          throw new Error('API returned empty data');
        }
        
      } catch (err) {
        console.warn('API failed, using fallback data:', err);
        
        // Use fallback data from dbaData.js
        setCategories(fallbackCategories);
        setIsUsingFallback(true);
        setError(null); // Don't show error since we have fallback
        
      } finally {
        setLoading(false);
      }
      };

    getCategories();
  }, []);

  // Fetch category details when a category is opened
  // useEffect(() => {
  //   if (openCategory) {
  //     const getCategoryDetails = async () => {
  //       try {
  //         const data = await fetchCategoryBySlug(openCategory);
  //         if (data) {
  //           setCategoryDetails(prev => ({
  //             ...prev,
  //             [openCategory]: data
  //           }));
  //         }
  //       } catch (err) {
  //         console.error(`Failed to fetch details for ${openCategory}:`, err);
  //       }
  //     };

  //     // Only fetch if we don't already have the details
  //     if (!categoryDetails[openCategory]) {
  //       getCategoryDetails();
  //     }
  //   }
  // }, [openCategory]);
  useEffect(() => {
    if (openCategory) {
      const getCategoryDetails = async () => {
        // Skip API call if we're already using fallback data
        if (isUsingFallback) {
          return;
        }

        try {
          const data = await fetchCategoryBySlug(openCategory);
          if (data) {
            setCategoryDetails(prev => ({
              ...prev,
              [openCategory]: data
            }));
          }
        } catch (err) {
          console.warn(`Failed to fetch details for ${openCategory}, using fallback:`, err);
          // Details will come from the fallback categories data
        }
      };

      // Only fetch if we don't already have the details and not using fallback
      if (!categoryDetails[openCategory] && !isUsingFallback) {
        getCategoryDetails();
      }
    }
  }, [openCategory, isUsingFallback, categoryDetails]);

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

  const handleCategoryClick = (categorySlug) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (openCategory === categorySlug) {
      setOpenCategory(null);
      setIsTransitioning(false);
      return;
    }

    // Scroll to solutions section
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      setOpenCategory(categorySlug);
      setTimeout(() => {
        solutionRefs.current[categorySlug]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        setIsTransitioning(false);
      }, 300);
    }, 500);
  };

  
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Progress bar */}
      {/* <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#47216b] to-[#8344c5] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div> */}

      {/* Floating contact button */}
      <div className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Link to="/contact" className="flex items-center justify-center w-14 h-14 bg-[#47216b] text-white rounded-full shadow-lg hover:bg-[#38134f] hover:shadow-xl transition-all duration-300 transform ">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="absolute w-96 h-96 bg-[#47216b]/5 rounded-full -top-20 -left-20 blur-3xl z-0"></div>
        <div className="absolute w-64 h-64 bg-[#8344c5]/5 rounded-full top-40 right-10 blur-3xl z-0"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-4 py-1 rounded-full bg-[#47216b]/10 text-[#47216b] text-sm font-medium mb-4">
                  Digital Brand Solutions
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                    Digital Brand
                  </span>
                  <span className="text-gray-900"> Architect</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mt-6">
                  We architect complete digital ecosystems that transform businesses into industry leaders.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link to="/contact" className="px-8 py-4 bg-[#47216b] text-white rounded-full font-semibold shadow-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                    Get in Touch
                  </Link>
                 
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#47216b] to-[#8344c5] rounded-3xl blur opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-6 md:p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[#47216b]/10 rounded-full blur-xl"></div>

                  <div className="flex items-center space-x-2 mb-8">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Services</h2>

                  {loading ? (
                    // Loading state
                    <div className="py-4 space-y-4">
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl animate-pulse">
                        <div className="mr-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl animate-pulse">
                        <div className="mr-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl animate-pulse">
                        <div className="mr-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="flex-grow">
                          <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  ) : error ? (
                    // Error state
                    <div className="py-8 text-center bg-red-50 rounded-xl p-4">
                      <div className="text-red-500 mb-2">⚠️ {error}</div>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="text-[#47216b] hover:underline text-sm"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    // Categories list
                    <div className="grid gap-4">
                      {categories.map((category) => (
                        <motion.div
                          key={category.slug}
                          onClick={() => handleCategoryClick(category.slug)}
                          className="group flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer border border-transparent hover:border-[#47216b]/20 hover:bg-white transition-all duration-300"
                        >
                          <div className="mr-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#47216b] to-[#8344c5] text-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                              {category.icon}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.shortDesc?.substring(0, 60) || ""}...</p>
                          </div>
                          <div className="text-[#47216b]">
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature tabs section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                Comprehensive
              </span> Digital Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer end-to-end digital transformation services that help businesses thrive in today's competitive landscape.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {['overview', 'strategy', 'design', 'technology', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab
                  ? 'bg-[#47216b] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Brand Architecture</h3>
                      <p className="text-gray-700 mb-6">
                        We build comprehensive digital ecosystems that connect all aspects of your brand's online presence.
                        From website to social media, SEO to CRM, we ensure a cohesive experience that drives results.
                      </p>
                      <ul className="space-y-3">
                        {['Brand Identity Development', 'Digital Strategy', 'Customer Experience Design', 'Marketing Integration'].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                              ✓
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-[#47216b]/5 rounded-xl transform rotate-3"></div>
                      <img
                        src="https://images.unsplash.com/photo-1529119513315-c7c361862fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Digital Brand Architecture"
                        className="rounded-xl shadow-lg relative z-10 w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'strategy' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="order-2 md:order-1 relative">
                      <div className="absolute -inset-4 bg-[#8344c5]/5 rounded-xl transform -rotate-2"></div>
                      <img
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Digital Strategy"
                        className="rounded-xl shadow-lg relative z-10 w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Data-Driven Strategy</h3>
                      <p className="text-gray-700 mb-6">
                        Our strategic approach combines market research, competitor analysis, and consumer insights to create
                        targeted digital strategies that deliver measurable results and sustainable growth.
                      </p>
                      <ul className="space-y-3">
                        {['Market & Competitor Analysis', 'Customer Journey Mapping', 'Growth Planning', 'Performance Metrics'].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#8344c5]/10 text-[#8344c5] flex items-center justify-center flex-shrink-0 mt-1">
                              ✓
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">User-Centered Design</h3>
                      <p className="text-gray-700 mb-6">
                        Our design team creates stunning, intuitive interfaces that captivate your audience while ensuring
                        optimal user experience across all devices and touchpoints.
                      </p>
                      <ul className="space-y-3">
                        {['UI/UX Design', 'Responsive Web Design', 'Brand Identity', 'Visual Storytelling'].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                              ✓
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-[#47216b]/5 rounded-xl transform rotate-2"></div>
                      <img
                        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="UI/UX Design"
                        className="rounded-xl shadow-lg relative z-10 w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'technology' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="order-2 md:order-1 relative">
                      <div className="absolute -inset-4 bg-[#8344c5]/5 rounded-xl transform -rotate-3"></div>
                      <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Technology Solutions"
                        className="rounded-xl shadow-lg relative z-10 w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    <div className="order-1 md:order-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Cutting-Edge Technology</h3>
                      <p className="text-gray-700 mb-6">
                        We leverage the latest technologies to build scalable, secure, and high-performance digital platforms
                        that give your business a competitive edge in the digital landscape.
                      </p>
                      <ul className="space-y-3">
                        {['Custom Web Development', 'E-Commerce Solutions', 'CRM Integration', 'Cloud Infrastructure'].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#8344c5]/10 text-[#8344c5] flex items-center justify-center flex-shrink-0 mt-1">
                              ✓
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Performance Analytics</h3>
                      <p className="text-gray-700 mb-6">
                        Our data analytics approach provides clear insights into your digital performance, enabling informed
                        decision-making and continuous optimization of your digital strategy.
                      </p>
                      <ul className="space-y-3">
                        {['Conversion Optimization', 'User Behavior Analysis', 'ROI Tracking', 'Competitive Benchmarking'].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                              ✓
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-[#47216b]/5 rounded-xl transform rotate-3"></div>
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Analytics Dashboard"
                        className="rounded-xl shadow-lg relative z-10 w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* How We Work Section - Modern Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Proven Process</h2>
            <p className="text-lg text-gray-600">
              We follow a structured methodology that ensures consistent, high-quality results across all our projects.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#47216b] to-[#8344c5] hidden md:block"></div>

            <div className="space-y-20">
              {[
                {
                  step: 1,
                  title: 'Discovery & Strategy',
                  description: 'We dive deep into your business goals, target audience, and market positioning to develop a customized digital strategy.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80'
                },
                {
                  step: 2,
                  title: 'Design & Development',
                  description: 'Our creative and technical teams collaborate to bring your digital presence to life through stunning design and robust functionality.',
                  image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80'
                },
                {
                  step: 3,
                  title: 'Launch & Optimize',
                  description: 'We execute a strategic launch and continuously monitor performance, making data-driven optimizations to maximize results.',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80'
                },
                {
                  step: 4,
                  title: 'Scale & Evolve',
                  description: 'As your business grows, we scale your digital presence, continuously evolving your strategy to stay ahead of the competition.',
                  image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className={`md:w-1/2 relative ${index % 2 === 0 ? 'md:text-right' : ''
                    }`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                        {step.title}
                      </span>
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {[
                        index === 0 ? ['Research & Analysis', 'Target Audience Definition', 'Strategic Planning'] :
                          index === 1 ? ['UI/UX Design', 'Content Creation', 'Technical Development'] :
                            index === 2 ? ['Quality Assurance', 'Performance Monitoring', 'Continuous Improvement'] :
                              ['Growth Strategy', 'New Feature Rollout', 'Long-term Support']
                      ].map((item, idx) => (
                        <li key={idx} className={`flex items-center gap-2 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                          {index % 2 === 1 && <div className="w-1 h-1 bg-[#47216b] rounded-full"></div>}
                          <span className="text-sm text-gray-600">{item}</span>
                          {index % 2 === 0 && <div className="w-1 h-1 bg-[#47216b] rounded-full"></div>}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:w-1/2 relative">
                    {/* Circle connector */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl z-20 hidden md:flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#47216b] to-[#8344c5] rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#47216b]/10 rounded-xl transform rotate-3"></div>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-xl shadow-lg relative z-10"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Accordion Section */}
      <section ref={solutionsRef} className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                Specialized
              </span> Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Explore our range of specialized digital services designed to address specific business challenges.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              // Loading skeleton
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              // Error state
              <div className="text-center p-10 bg-white rounded-xl shadow-md">
                <div className="text-red-500 mb-4 text-xl">⚠️ Could not load services</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-[#47216b] text-white rounded-lg hover:bg-[#38134f] transition-colors"
                >
                  Try again
                </button>
              </div>
            ) : (
              // Actual categories
              categories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  ref={el => solutionRefs.current[category.slug] = el}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl overflow-hidden transition-all duration-300 ease-out
                    ${openCategory === category.slug ? 'shadow-xl ring-2 ring-[#47216b]/20' : 'shadow-md hover:shadow-lg'}`}
                >
                  {/* Rest of category content */}
                {/* Header with smooth height animation */}
                <div
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`p-6 cursor-pointer transition-all duration-300 
                    ${openCategory === category.slug
                      ? 'bg-gradient-to-r from-[#47216b] to-[#8344c5] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${openCategory === category.slug
                        ? 'bg-white/20 text-white'
                        : 'bg-[#47216b]/10 text-[#47216b]'
                        }`}>
                        {category.icon}
                      </div>
                      <h3 className={`text-xl font-bold ${openCategory === category.slug ? 'text-white' : 'text-gray-900'}`}>
                        {category.name}
                      </h3>
                    </div>
                    <div className={`transition-transform duration-300 ${openCategory === category.slug ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <p className={`mt-2 ${openCategory === category.slug ? 'text-white/80' : 'text-gray-600'}`}>
                    {category.shortDesc}
                  </p>
                </div>

                {/* Content with smooth reveal animation */}
                <AnimatePresence>
                  {openCategory === category.slug && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="p-6 md:p-8">
                        {/* Hero section for the service */}
                        <div className="relative rounded-xl overflow-hidden mb-10 h-72">
                          <img
                            src={category.slug === 'branding' ? 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                              category.slug === 'marketing' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                                category.slug === 'web' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                                  category.slug === 'app' ? 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                                    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-6">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                              <p className="text-white/90">{category.shortDesc}</p>
                            </div>
                          </div>
                        </div>

                        {/* Stats cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                          {(defaultCategoryStats[category.slug] || []).map((stat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5] mb-1">
                                {stat.value}
                              </div>
                              <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
                          <div className="lg:col-span-3">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                              {getCategoryDescription(category.slug)}
                            </p>
                            <Link
                              to={`/services/dba/${category.slug}`}
                              className="inline-flex items-center px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold shadow-sm hover:bg-[#38134f] transition-colors"
                            >
                              <span>Learn More About {category.name}</span>
                              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </div>
                          <div className="lg:col-span-2 bg-gradient-to-br from-[#47216b]/5 to-[#8344c5]/5 rounded-xl p-6">
                            <h4 className="text-xl font-semibold text-[#47216b] mb-4">Key Benefits</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                                  ✓
                                </div>
                                <span className="ml-3">Tailored to your specific business needs</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                                  ✓
                                </div>
                                <span className="ml-3">Proven methodologies for maximum impact</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                                  ✓
                                </div>
                                <span className="ml-3">Measurable results and ROI tracking</span>
                              </li>
                              <li className="flex items-start">
                                <div className="w-6 h-6 rounded-full bg-[#47216b]/10 text-[#47216b] flex items-center justify-center flex-shrink-0 mt-1">
                                  ✓
                                </div>
                                <span className="ml-3">Ongoing support and optimization</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Services Offering - Redesigned Cards */}
                        <div className="mb-10">
                          <h4 className="text-xl font-semibold text-gray-900 mb-6">Our Offerings:</h4>
                          <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.08 }
                              }
                            }}
                          >
                            {serviceOfferings[category.slug]?.map((service, idx) => (
                              <motion.div
                                key={service.id}
                                variants={{
                                  hidden: { opacity: 0, y: 20 },
                                  visible: { opacity: 1, y: 0 }
                                }}
                                className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#47216b]/30"
                                whileHover={{
                                  y: -5,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#47216b] to-[#8344c5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                                {/* Content */}
                                <div className="relative z-10 p-6">
                                  <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#47216b]/10 group-hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                                      <svg className="w-6 h-6 text-[#47216b] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {idx % 5 === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                                        {idx % 5 === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                                        {idx % 5 === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
                                        {idx % 5 === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                                        {idx % 5 === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                                      </svg>
                                    </div>
                                    <div className="ml-3 flex-grow">
                                      <span className="px-2 py-1 bg-[#47216b]/10 text-[#47216b] text-xs font-medium rounded-full group-hover:bg-white/10 group-hover:text-white transition-colors duration-300">
                                        {category.name}
                                      </span>
                                    </div>
                                  </div>

                                  <h5 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">{service.title}</h5>

                                  <p className="text-gray-600 group-hover:text-white/90 mb-4 transition-colors duration-300 line-clamp-3 group-hover:line-clamp-none">
                                    {service.description}
                                  </p>

                                  <div className="pt-2 mt-auto">
                                    <Link
                                      to={`/services/dba/${category.slug}/${service.id}`}
                                      className="flex items-center text-sm font-semibold text-[#47216b] group-hover:text-white transition-colors duration-300"
                                    >
                                      Learn more
                                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                      </svg>
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Process Section - Timeline Style */}
                        <div className="mb-10">
                          <h4 className="text-xl font-semibold text-gray-900 mb-6">Our Process:</h4>
                          <div className="relative pb-12">
                            {/* Timeline connector */}
                            <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-gradient-to-b from-[#47216b] via-[#8344c5] to-transparent"></div>

                            <motion.div
                              className="space-y-8"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                  opacity: 1,
                                  transition: { staggerChildren: 0.1 }
                                }
                              }}
                            >
                              {["Discovery", "Strategy", "Execution", "Optimization"].map((step, idx) => (
                                <motion.div
                                  key={step}
                                  variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                  }}
                                  className="flex items-start pl-12 relative"
                                >
                                  {/* Timeline node */}
                                  <div className="absolute left-0 w-10 h-10 bg-white rounded-full border-4 border-[#47216b] flex items-center justify-center text-[#47216b] font-bold shadow-md">
                                    {idx + 1}
                                  </div>

                                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 w-full">
                                    <h5 className="text-lg font-semibold mb-2 text-[#47216b]">{step}</h5>
                                    <p className="text-gray-700">
                                      {idx === 0 ? "Understanding your goals, audience, and market position to establish clear objectives." :
                                        idx === 1 ? "Developing a comprehensive plan with timelines, KPIs, and resource allocations." :
                                          idx === 2 ? "Implementing the strategy with precision while maintaining constant communication." :
                                            "Continuously refining the approach based on performance data and feedback."}
                                    </p>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center mt-10">
                          <Link
                            to={`/services/dba/${category.slug}`}
                            className="px-8 py-4 bg-gradient-to-r from-[#47216b] to-[#8344c5] text-white rounded-full text-lg font-semibold shadow-md transform transition-all duration-300 hover:shadow-lg inline-flex items-center"
                          >
                            Get Started with {category.name}
                            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section - Modern Split */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#47216b] to-[#8344c5]">
                    Bespoke Solutions
                  </span> for Unique Challenges
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Beyond our core offerings, we create tailored solutions for your unique business challenges.
                  Our team combines technical expertise, creative thinking, and deep industry knowledge to develop
                  custom implementations that drive tangible results.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Enterprise Integration Solutions",
                      description: "Connect your systems and streamline operations with custom integration solutions."
                    },
                    {
                      title: "Bespoke Data Analytics",
                      description: "Tailored dashboards and reporting solutions to give you actionable insights."
                    },
                    {
                      title: "Digital Transformation Consulting",
                      description: "Strategic guidance to navigate your organization's digital evolution."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#47216b]/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#47216b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />}
                          {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                          {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <button className="mt-8 px-8 py-4 bg-[#47216b] text-white rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-[#38134f] hover:shadow-lg transform hover:-translate-y-1">
                    Discuss Your Custom Needs
                  </button>
                </motion.div>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#47216b] to-[#8344c5] rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-[#47216b]/10 rounded-2xl flex items-center justify-center text-[#47216b] mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Start with a Free Consultation</h3>
                    <p className="text-gray-600 mb-4">
                      Book a 30-minute consultation to discuss your business challenges and how our custom solutions can help.
                    </p>
                  </div>

                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#47216b] focus:ring-2 focus:ring-[#47216b]/20 outline-none transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#47216b] focus:ring-2 focus:ring-[#47216b]/20 outline-none transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#47216b] focus:ring-2 focus:ring-[#47216b]/20 outline-none transition-all duration-200"
                        rows="3"
                        placeholder="Brief description of your needs..."
                      ></textarea>
                    </div>
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-[#47216b] to-[#8344c5] text-white rounded-lg font-semibold shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                      Schedule Consultation
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#47216b] to-[#8344c5] z-0"></div>
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Digital Brand?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Let's discuss how our DBA services can help you achieve your business goals and stand out in the digital landscape.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-[#47216b] rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Get in Touch
              </Link>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold transition-all duration-300 hover:bg-white/10">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to top button */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-8 z-40 transition-all duration-500 cursor-pointer ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="w-12 h-12 bg-[#47216b]/10 text-[#47216b] rounded-full flex items-center justify-center hover:bg-[#47216b]/20 transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Index;