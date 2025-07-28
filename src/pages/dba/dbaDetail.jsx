import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  servicePages,
  categories
} from './data/dbaData.js';

const DbaDetailPage = () => {
  const { slug } = useParams();
  const serviceData = servicePages[slug] || null;
  const category = categories.find(cat => cat.slug === slug) || {
    slug: '',
    name: 'Service',
    color: '#47216b'
  };

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

  // Service list for right column
  const serviceList = [
    'Custom Web Development',
    'Web Personalization',
    'UI/UX Design',
    'Search Engine Optimization',
    'CRM & ERP Solutions',
    'E-Commerce Development',
    'Email Marketing',
    'Marketing Automation',
    'AI-Powered Chatbots'
  ];

  if (!serviceData) {
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

  const {
    title = 'Service',
    heroImage = 'https://via.placeholder.com/1200x500',
    overview = 'Comprehensive solutions for your business needs.',
    whyChooseUs = [],
    process = [],
    testimonials = [],
    companies = [],
    stats = []
  } = serviceData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="relative rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <img 
          src={heroImage} 
          alt={title}
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end pb-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
                <p className="text-xl text-white/90 mb-8">{overview}</p>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-white text-[#47216b] rounded-full font-semibold inline-block hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      {stats.length > 0 && (
        <section className="py-16 bg-white -mt-20 relative z-30 rounded-t-3xl shadow-lg">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-8 rounded-xl text-center"
                >
                  <div className="text-4xl font-bold mb-2 text-[#47216b]">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section - Two Column Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#47216b] mb-6">{title}</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our Digital Transformation Team uses bleeding-edge technology to enable you to nurture customer relationships at every stage. We create integrated digital ecosystems covering web, social & paid media, CRM, ERP, search, e-commerce and other channels.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our custom-made platforms and solutions help you attract, retain and engage every prospect with a personalized touch.
                </p>
                
                <div className="border-t border-gray-300 pt-6 mb-8">
                  <p className="text-lg text-gray-700 mb-6">Proudly innovating with leading technology leaders in the market...</p>
                  
                  {/* Company Logos Slider */}
                  <div className="relative overflow-hidden">
                    <div className="flex space-x-8 animate-scroll">
                      {[...companyLogos, ...companyLogos].map((company, index) => (
                        <div key={index} className="flex-shrink-0">
                          <div className="bg-gray-100 rounded-lg p-4 h-16 flex items-center justify-center">
                            <span className="text-sm font-semibold text-[#47216b]">{company.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Service List */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-[#47216b] mb-6">Our Services</h3>
                <div className="space-y-0">
                  {serviceList.map((service, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-700 font-medium">{service}</span>
                      <svg className="w-5 h-5 text-[#47216b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">Why Choose Our {title}</h2>
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
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">Our Process</h2>
            <p className="text-xl text-gray-600">A structured approach to ensure quality and consistency in every project.</p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#47216b]/20 h-full"></div>
            
            <div className="space-y-12">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#47216b]/10">
                      <h3 className="text-xl font-semibold text-[#47216b] mb-2">{step.title || `Step ${index + 1}`}</h3>
                      <p className="text-gray-600">{step.description || 'Process description'}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">Our Work</h2>
            <p className="text-xl text-gray-600">Explore some of our recent projects and success stories.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-[#47216b]/20 to-[#47216b]/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#47216b] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-[#47216b]">Project {index + 1}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Client Success Story</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#47216b] font-medium">View Case Study</span>
                    <svg className="w-5 h-5 text-[#47216b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Hear from businesses that have transformed their digital presence with our help.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-8 rounded-xl"
                >
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6">
                    "{testimonial.quote || 'Great service and results!'}"
                  </blockquote>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author || 'Satisfied Client'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#47216b]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">Let's discuss how our {title} can help your business grow.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white text-[#47216b] rounded-full font-semibold shadow-md transform transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
              <button 
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold transform transition-all duration-200 hover:bg-white/10 hover:scale-105 active:scale-95"
                style={{ backgroundColor: category.color, borderColor: 'white' }}
              >
                Schedule a Call
              </button>
            </div>
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
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DbaDetailPage;