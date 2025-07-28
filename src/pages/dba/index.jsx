import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  categories,
  categoryStats,
  serviceOfferings,
  getCategoryDescription
} from './data/dbaData.js';

const index = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const solutionsRef = useRef(null);
  const solutionRefs = useRef({});
  
  const handleCategoryClick = (categorySlug) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (openCategory === categorySlug) {
      // Close the currently open category
      setOpenCategory(null);
      setIsTransitioning(false);
      return;
    }
    
    // Scroll to solutions section
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Set a timeout to ensure the scroll starts before opening the dropdown
    setTimeout(() => {
      setOpenCategory(categorySlug);
      
      // After opening, set another timeout to scroll to the specific solution
      setTimeout(() => {
        solutionRefs.current[categorySlug]?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
        setIsTransitioning(false);
      }, 300);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#47216b]">
                Digital Brand Architect <span className="text-gray-900">(DBA)</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                At GoDigitify, we architect complete digital ecosystems that transform businesses. 
                Our DBA service combines strategic thinking with technical expertise to build 
                brands that don't just exist online—they thrive and evolve. We specialize in 
                creating comprehensive digital solutions that drive growth, engagement, and measurable results.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-[#38134f] transition-colors duration-200">
                  Get in Touch
                </button>
                <button className="px-6 py-3 border border-[#47216b] text-[#47216b] rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
                  View Our Work
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#47216b] mb-6">Our DBA Services</h2>
              <div className="space-y-5">
                {categories.map((category) => (
                  <div 
                    key={category.slug} 
                    onClick={() => handleCategoryClick(category.slug)}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="mr-4">
                      <div className="w-10 h-10 bg-[#47216b] text-white rounded-full flex items-center justify-center">
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-500">Click to explore</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-[#47216b] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">How We Grow Your Business</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Discovery & Strategy',
                description: 'We dive deep into your business goals, target audience, and market positioning to develop a customized digital strategy.'
              },
              {
                step: 2,
                title: 'Design & Development',
                description: 'Our creative and technical teams collaborate to bring your digital presence to life through stunning design.'
              },
              {
                step: 3,
                title: 'Launch & Optimize',
                description: 'We execute a strategic launch and continuously monitor performance, making data-driven optimizations.'
              },
              {
                step: 4,
                title: 'Scale & Evolve',
                description: 'As your business grows, we scale your digital presence, continuously evolving your strategy.'
              }
            ].map((step, index) => (
              <motion.div 
                key={step.step}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-white text-[#47216b] rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Accordion Section */}
      <section ref={solutionsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-16 text-center">Our Solutions</h2>
          
          <div className="space-y-6">
            {categories.map((category, index) => (
              <div 
                key={category.slug}
                ref={el => solutionRefs.current[category.slug] = el}
                className={`bg-white rounded-xl shadow-lg overflow-hidden mb-4 transition-all duration-150
                  ${openCategory === category.slug ? 'ring-2 ring-[#47216b] shadow-xl' : 'hover:shadow-lg'}`}
              >
                {/* Header with smooth height animation */}
                <div 
                  className={`p-6 cursor-pointer transition-colors duration-200
                    ${openCategory === category.slug ? 'bg-[#47216b] text-white' : 
                      index % 2 === 0 ? 'bg-[#47216b]/10' : 'bg-[#47216b]/5'}`}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-2xl font-bold ${openCategory === category.slug ? 'text-white' : 'text-[#47216b]'}`}>
                      {category.name}
                    </h3>
                    <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-200
                      ${openCategory === category.slug ? 'rotate-180' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className={`mt-2 text-sm ${openCategory === category.slug ? 'text-white/80' : 'text-gray-600'}`}>
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
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="p-6">
                        {/* Hero section for the service */}
                        <div className="relative rounded-xl overflow-hidden mb-8 h-64">
                          <img 
                            src={category.slug === 'branding' ? 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
                                category.slug === 'marketing' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                                category.slug === 'web' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' :
                                category.slug === 'app' ? 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : 
                                'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#47216b]/90 to-transparent flex items-end p-6">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                              <p className="text-white/90">{category.shortDesc}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Stats cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {categoryStats[category.slug].map((stat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                            >
                              <div className="text-2xl font-bold text-[#47216b]">{stat.value}</div>
                              <div className="text-gray-600 text-sm">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                          <div>
                            <p className="text-lg text-gray-700 mb-6">
                              {getCategoryDescription(category.slug)}
                            </p>
                            <Link 
                              to={`/services/dba/${category.slug}`}
                              className="px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold hover:bg-[#38134f] transition-colors"
                            >
                              Learn More About {category.name}
                            </Link>
                          </div>
                          <div className="bg-[#47216b]/10 rounded-xl p-6">
                            <h4 className="text-xl font-semibold text-[#47216b] mb-4">Key Benefits</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-[#47216b] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Tailored to your specific business needs</span>
                              </li>
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-[#47216b] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Proven methodologies for maximum impact</span>
                              </li>
                              <li className="flex items-start">
                                <svg className="h-5 w-5 text-[#47216b] mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Measurable results and ROI tracking</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Services */}
                        <h4 className="text-xl font-semibold text-[#47216b] mb-4">Our Offerings:</h4>
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                              opacity: 1,
                              transition: { staggerChildren: 0.05 }
                            }
                          }}
                        >
                          {serviceOfferings[category.slug]?.map((service, idx) => (
                            <motion.div 
                              key={service.id}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                              }}
                              className={`p-5 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-[1.02] 
                                ${idx % 2 === 0 ? 'bg-[#47216b]' : 'bg-[#47216b]/10'}`}
                            >
                              <h5 className={`font-semibold mb-2 ${idx % 2 === 0 ? 'text-white' : 'text-[#47216b]'}`}>
                                {service.title}
                              </h5>
                              <p className={`text-sm ${idx % 2 === 0 ? 'text-white/80' : 'text-gray-600'}`}>
                                {service.description}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                        
                        {/* Process Section */}
                        <h4 className="text-xl font-semibold text-[#47216b] mb-4">Our Process:</h4>
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                              opacity: 1,
                              transition: { staggerChildren: 0.05 }
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
                              className="bg-[#47216b]/5 p-4 rounded-lg shadow-sm border border-[#47216b]/10 transform transition-all duration-200 hover:shadow-md hover:border-[#47216b]/30"
                            >
                              <div className="w-10 h-10 bg-[#47216b] text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">
                                {idx + 1}
                              </div>
                              <h5 className="font-semibold mb-2 text-[#47216b]">{step}</h5>
                              <p className="text-sm text-gray-600">
                                {idx === 0 ? "Understanding your goals and audience" : 
                                 idx === 1 ? "Planning the optimal approach" :
                                 idx === 2 ? "Bringing the vision to life" : "Continuous improvement"}
                              </p>
                            </motion.div>
                          ))}
                        </motion.div>
                        
                        {/* CTA */}
                        <div className="text-center mt-8">
                          <Link 
                            to={`/services/dba/${category.slug}`}
                            className="px-8 py-3 bg-[#47216b] text-white rounded-full text-lg font-semibold transform transition-all duration-200 hover:bg-[#38134f] hover:scale-105 active:scale-95"
                          >
                            Get Started with {category.name}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Solutions Section */}
      <section className="bg-[#47216b]/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">
                Custom Solutions
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Beyond our core offerings, we create bespoke solutions tailored to your unique business challenges. Our team combines technical expertise, creative thinking, and deep industry knowledge to develop custom implementations that drive tangible results.
              </p>
              <div className="space-y-4">
                {[
                  "Enterprise Integration Solutions",
                  "Bespoke Data Analytics",
                  "Digital Transformation Consulting"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#47216b] text-white flex items-center justify-center text-sm mt-1">✓</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item}</h4>
                      <p className="text-gray-600">
                        {index === 0 ? "Connect your systems and streamline operations with custom integration solutions." :
                         index === 1 ? "Tailored dashboards and reporting solutions to give you actionable insights." :
                         "Strategic guidance to navigate your organization's digital evolution."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-8 px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold transform transition-all duration-200 hover:bg-[#38134f] hover:scale-105 active:scale-95">
                Discuss Your Custom Needs
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#47216b]/10 rounded-full flex items-center justify-center text-[#47216b] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Start with a Consultation</h3>
                <p className="text-gray-600">
                  Book a free 30-minute consultation to discuss your business challenges and how our custom solutions can help.
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your project</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-all duration-200"
                    rows="3"
                    placeholder="Brief description of your needs..."
                  ></textarea>
                </div>
                <button className="w-full px-6 py-3 bg-[#47216b] text-white rounded-full font-semibold transform transition-all duration-200 hover:bg-[#38134f] hover:scale-[1.02] active:scale-[0.98]">
                  Schedule Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-[#47216b] py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-white text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Digital Brand?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's discuss how our DBA services can help you achieve your business goals and stand out in the digital landscape.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 bg-white text-[#47216b] rounded-full font-semibold shadow-md transform transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95">
              Contact Us
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold transform transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;