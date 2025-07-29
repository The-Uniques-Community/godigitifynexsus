import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden flex items-center justify-center">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Minimal decorative circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#47216b]/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-[#8344c5]/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#47216b]/3 rounded-full blur-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Professional 404 Number */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 mt-24"
          >
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#47216b] leading-none tracking-tight">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Professional Icon */}
         

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Primary CTA - Home */}
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#47216b] to-[#8344c5] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Home</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Secondary CTA - Go Back */}
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-[#47216b] hover:text-[#47216b] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Support Information */}
         
        </motion.div>
      </div>

      {/* Minimal decorative elements */}
      <div className="absolute bottom-8 left-8 opacity-10">
        <div className="w-6 h-6 border border-[#47216b] rounded rotate-45"></div>
      </div>
      <div className="absolute top-8 right-8 opacity-10">
        <div className="w-4 h-4 bg-[#8344c5] rounded-full"></div>
      </div>
    </div>
  );
};

export default index;