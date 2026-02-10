import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Placera from '../../assets/images/placera.png'
import AlumLink from '../../assets/images/alumlink.png'
import TechLearns from '../../assets/images/techlearns.png'

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProductId, setActiveProductId] = useState(null);

  // Fallback data with enhanced product information
  const fallbackProducts = [
    {
      id: 1,
      name: 'Placera',
      tagline: 'Connecting colleges, students & recruiters seamlessly',
      description: 'Placera is a smart placement management platform designed for colleges and universities. It streamlines student profiles, recruiter access, interview scheduling, and performance analytics—all in one place.',
      logo: Placera,
      link: 'https://placera.vercel.app/',
      demoLink: '/request-demo/placera',
      usps: [
        'Streamlined campus placement management',
        'Real-time analytics dashboard',
        'Seamless recruiter-student matching',
        'Automated interview scheduling'
      ],
      services: [
        'Student profile management',
        'Recruiter portal access',
        'Placement analytics',
        'Interview scheduling',
        'Resume building tools'
      ],
      metrics: {
        clients: '50+',
        studentsPlaced: '10,000+',
        recruiters: '500+'
      },
      testimonial: {
        quote: "Placera transformed our campus placement process. What used to take weeks now happens seamlessly in days.",
        author: "Dr. Sharma",
        position: "Placement Director, ABC Institute of Technology"
      }
    },
    {
      id: 2,
      name: 'TechLearns',
      tagline: 'Future-ready learning for tomorrow\'s technologists',
      description: 'TechLearns provides an interactive learning platform for technical education, combining practical assignments, industry-relevant curriculum, and real-time progress tracking.',
      logo: TechLearns,
      link: 'https://tech-learns-project.vercel.app/',
      demoLink: '/request-demo/techlearns',
      usps: [
        'Industry-aligned curriculum',
        'Hands-on practical learning',
        'Real-time progress tracking',
        'AI-powered learning paths'
      ],
      services: [
        'Interactive course modules',
        'Assessment & certification',
        'Skill gap analysis',
        'Mentor access',
        'Project-based learning'
      ],
      metrics: {
        courses: '200+',
        students: '25,000+',
        completionRate: '93%'
      },
      testimonial: {
        quote: "TechLearns helped me transition from a beginner to a skilled developer in just 4 months.",
        author: "Rahul Patel",
        position: "Software Engineer, Microsoft"
      }
    },
    {
      id: 3,
      name: 'AlumLink',
      tagline: 'Bridging graduates with their alma mater',
      description: 'AlumLink creates meaningful connections between institutions and their alumni through networking opportunities, event management, and donation facilitation.',
      logo: AlumLink,
      link: 'https://alumnlink.com/Landing',
      demoLink: '/request-demo/alumlink',
      usps: [
        'Unified alumni database',
        'Event management system',
        'Donation & fundraising tools',
        'Alumni engagement analytics'
      ],
      services: [
        'Alumni directory & networking',
        'Event organization',
        'Job board & opportunities',
        'Fundraising campaigns',
        'Mentorship programs'
      ],
      metrics: {
        institutions: '75+',
        activeAlumni: '100,000+',
        annualEvents: '500+'
      },
      testimonial: {
        quote: "AlumLink has revolutionized how we connect with our alumni network, increasing engagement by 300% in just one year.",
        author: "Dr. Verma",
        position: "Alumni Relations Director, XYZ University"
      }
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get('https://Godigitify-backend.vercel.app/api/products/get-all-products');

        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('An error occurred while fetching products');

        // Use fallback data when API fails - FIXED
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Toggle product details
  const toggleProductDetails = (id) => {
    setActiveProductId(activeProductId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section 1 - Hero */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#47216b]">
              Real Challenges. <span className="text-gray-900">Smart Answers.</span> Built by US.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We build digital products that solve real challenges, elevate user experiences, and drive business growth.
              Explore our in-house solutions—designed for the future, ready for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Product Showcase */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-16 text-center">
            Explore Our Products
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white shadow-lg p-8 animate-pulse">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 bg-gray-200"></div>
                  </div>
                  <div className="h-6 bg-gray-200 mb-4 w-2/3 mx-auto"></div>
                  <div className="h-4 bg-gray-200 mb-2 w-5/6 mx-auto"></div>
                  <div className="h-4 bg-gray-200 mb-2 w-full mx-auto"></div>
                  <div className="h-4 bg-gray-200 mb-2 w-4/5 mx-auto"></div>
                  <div className="h-10 bg-gray-200 w-1/3 mx-auto mt-8"></div>
                </div>
              ))}
            </div>
          ) : error && products.length === 0 ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 text-center">
              <p>Failed to load products. Please try again later.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-1 gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white  overflow-hidden hover:shadow-sm transition-all duration-300 border border-gray-100"
                  variants={itemVariants}
                >
                  {/* Product Header */}
                  <div className="p-8 bg-white">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                        <img
                          src={product.logo}
                          alt={`${product.name} logo`}
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-8">
                        <h3 className="text-3xl font-bold text-[#47216b] mb-3">{product.name}</h3>
                        <p className="text-xl text-gray-700 font-medium mb-4 italic">"{product.tagline}"</p>
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {/* Product Metrics */}
                        <div className="flex flex-wrap gap-8 mb-6">
                          {product.metrics && Object.entries(product.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-2xl font-bold text-[#47216b]">{value}</p>
                              <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <Link
                            to={product.demoLink || '#'}
                            className="px-6 py-3 bg-[#47216b] text-white font-semibold hover:bg-[#371955] transition-colors duration-300 inline-flex items-center"
                          >
                            Get Demo
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </Link>
                          <Link
                            to={product.link || '#'}
                            target='_blank'
                            className="px-6 py-3 border-2 border-[#47216b] text-[#47216b] font-semibold hover:bg-[#47216b]/5 transition-colors duration-300"
                          >
                            Learn More
                          </Link>
                          <button
                            onClick={() => toggleProductDetails(product.id)}
                            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center"
                          >
                            {activeProductId === product.id ? 'Hide Details' : 'View Details'}
                            <svg
                              className={`ml-2 w-4 h-4 transition-transform duration-300 ${activeProductId === product.id ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Product Details */}
                  {activeProductId === product.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pt-0 pb-8 bg-white"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t pt-8 border-gray-200">
                        {/* USPs */}
                        <div>
                          <h4 className="text-xl font-bold text-[#47216b] mb-4 flex items-center">
                            <span className="w-8 h-8 bg-[#47216b] text-white flex items-center justify-center mr-2 text-sm">✓</span>
                            Key Features
                          </h4>
                          <ul className="space-y-3">
                            {product.usps?.map((usp, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 text-[#47216b] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{usp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Services */}
                        <div>
                          <h4 className="text-xl font-bold text-[#47216b] mb-4 flex items-center">
                            <span className="w-8 h-8 bg-[#47216b] text-white flex items-center justify-center mr-2 text-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </span>
                            Services Included
                          </h4>
                          <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.services?.map((service, i) => (
                              <li key={i} className="bg-gray-50 px-3 py-2 text-gray-700 text-sm">
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Testimonial */}
                      {product.testimonial && (
                        <div className="mt-8 bg-gray-50 p-6">
                          <div className="flex items-start">
                            <svg className="w-10 h-10 text-gray-300 mr-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <div>
                              <p className="italic text-gray-700 mb-4">{product.testimonial.quote}</p>
                              <div>
                                <p className="font-semibold">{product.testimonial.author}</p>
                                <p className="text-sm text-gray-600">{product.testimonial.position}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Final CTA */}
                      <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">Ready to transform your workflow with {product.name}?</p>
                        <div className="flex justify-center gap-4">
                          <Link
                            to={product.demoLink || '#'}
                            className="px-8 py-3 bg-[#47216b] text-white font-semibold hover:bg-[#371955] transition-colors duration-300"
                          >
                            Schedule a Demo
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Streamlined Custom Solution Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-t border-gray-100">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gray-100 -skew-x-12 transform -translate-x-20 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-6">
              Need a <span className="border-b-4 border-[#47216b]/50 pb-1">Custom Solution?</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              Looking for a product that matches your exact needs? We offer fully customizable,
              white-label digital solutions tailored for businesses, startups, and institutions.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-gray-700">Tailored to Your Business</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-gray-700">White-Label Ready</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-gray-700">Full Customization</span>
              </div>
            </div>

            <Link
              to="/solutions/custom-solutions"
              className="inline-flex items-center px-8 py-4 bg-[#47216b] text-white font-semibold text-lg hover:bg-[#371955] transition-colors duration-300 shadow-lg rounded-lg"
            >
              Explore Custom Solutions
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurProducts;