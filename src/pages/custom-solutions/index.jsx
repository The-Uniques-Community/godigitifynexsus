import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CustomSolutions = () => {
  // Form state
  const [formData, setFormData] = useState({
    businessName: '',
    problemSolved: '',
    targetAudience: '',
    goals: '',
    services: {
      branding: false,
      website: false,
      printables: false,
      eventPlanning: false,
      digitalMedia: false
    },
    budgetRange: '',
    launchTimeline: '',
    files: []
  });
  
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked
      }
    }));
  };
  
  // Handle file uploads
  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      files: [...e.target.files]
    }));
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create form data for file upload
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'files' && key !== 'services') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add services as JSON string
      formDataToSend.append('services', JSON.stringify(formData.services));
      
      // Add files
      formData.files.forEach(file => {
        formDataToSend.append('files', file);
      });
      
      // Send to backend API
      const response = await axios.post(
        'https://godigitify-backend.vercel.app/api/custom-solutions/submit',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data.success) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormData({
          businessName: '',
          problemSolved: '',
          targetAudience: '',
          goals: '',
          services: {
            branding: false,
            website: false,
            printables: false,
            eventPlanning: false,
            digitalMedia: false
          },
          budgetRange: '',
          launchTimeline: '',
          files: []
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const steps = [
    {
      number: 1,
      title: "Warm Welcome & Next Steps",
      description: "We send a friendly welcome email introducing our team and guiding you through what to expect next—no jargon, just clarity."
    },
    {
      number: 2,
      title: "Tell Us About Your Idea",
      description: "Complete a short intake form with: Your product name and purpose, who you'll serve, goals, services needed, timeline, and budget. This helps us understand you quickly and accurately."
    },
    {
      number: 3,
      title: "Discovery Chat",
      description: "A brief video or call to review your responses, clarify vision, suggest improvements, and ensure we're aligned before next steps."
    },
    {
      number: 4,
      title: "Tailored Strategy & Planning",
      description: "We conduct research and craft a customized roadmap covering branding, website, print, events, and timelines. You approve before we move ahead."
    },
    {
      number: 5,
      title: "Execution & Milestone Feedback",
      description: "We deliver everything—while you relax. At each milestone (e.g., design draft or website layout), we collect your feedback and refine as needed."
    },
    {
      number: 6,
      title: "Launch & Lasting Support",
      description: "Once live, we monitor performance, optimize your solution, and remain available for future updates or enhancements."
    }
  ];

  // Form navigation
  const nextStep = () => {
    setFormStep(prev => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => {
    setFormStep(prev => Math.max(prev - 1, 0));
  };
  
  const formSteps = [
    // Step 1: Business/Product Name
    <div key="step1">
      <h3 className="text-2xl font-semibold text-[#47216b] mb-6">1. Business / Product Name</h3>
      <div className="mb-8">
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
          What's the name of your product or business?
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
          placeholder="Enter business or product name"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-[#47216b] text-white rounded-full font-medium hover:bg-[#371955] transition-colors duration-200 flex items-center"
        >
          Next
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>,
    
    // Step 2: Problem & Target Audience
    <div key="step2">
      <h3 className="text-2xl font-semibold text-[#47216b] mb-6">2. The Problem & Audience</h3>
      <div className="mb-6">
        <label htmlFor="problemSolved" className="block text-sm font-medium text-gray-700 mb-2">
          Briefly describe the challenge your product addresses and why it matters.
        </label>
        <textarea
          id="problemSolved"
          name="problemSolved"
          value={formData.problemSolved}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
          placeholder="What problem does your product solve?"
        ></textarea>
      </div>
      <div className="mb-8">
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
          Who will use this product?
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
          placeholder="Describe your target audience"
        />
      </div>
      <div className="mb-8">
        <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
          What outcome do you want for them—awareness, leads, sales, engagement?
        </label>
        <input
          type="text"
          id="goals"
          name="goals"
          value={formData.goals}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
          placeholder="Your primary goals for this project"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-[#47216b] text-white rounded-full font-medium hover:bg-[#371955] transition-colors duration-200 flex items-center"
        >
          Next
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>,
    
    // Step 3: Services Needed
    <div key="step3">
      <h3 className="text-2xl font-semibold text-[#47216b] mb-6">3. Services You Need</h3>
      <div className="mb-8 space-y-4">
        <p className="text-gray-700">Select all services that apply to your project:</p>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="branding"
            name="branding"
            checked={formData.services.branding}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
          />
          <label htmlFor="branding" className="ml-3 text-gray-700">
            Branding & Visual Identity
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="website"
            name="website"
            checked={formData.services.website}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
          />
          <label htmlFor="website" className="ml-3 text-gray-700">
            Website Design & Development
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="printables"
            name="printables"
            checked={formData.services.printables}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
          />
          <label htmlFor="printables" className="ml-3 text-gray-700">
            Printables (brochures, flyers, etc.)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="eventPlanning"
            name="eventPlanning"
            checked={formData.services.eventPlanning}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
          />
          <label htmlFor="eventPlanning" className="ml-3 text-gray-700">
            Event Planning & Execution
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="digitalMedia"
            name="digitalMedia"
            checked={formData.services.digitalMedia}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
          />
          <label htmlFor="digitalMedia" className="ml-3 text-gray-700">
            Digital Media & Campaigns
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 bg-[#47216b] text-white rounded-full font-medium hover:bg-[#371955] transition-colors duration-200 flex items-center"
        >
          Next
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>,
    
    // Step 4: Budget & Timeline
    <div key="step4">
      <h3 className="text-2xl font-semibold text-[#47216b] mb-6">4. Budget & Timeline</h3>
      <div className="mb-6">
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
          What's your estimated budget range?
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
        >
          <option value="">Select a budget range</option>
          <option value="Under $5,000">Under $5,000</option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
          <option value="$50,000+">$50,000+</option>
        </select>
      </div>
      <div className="mb-8">
        <label htmlFor="launchTimeline" className="block text-sm font-medium text-gray-700 mb-2">
          When do you aim to launch?
        </label>
        <select
          id="launchTimeline"
          name="launchTimeline"
          value={formData.launchTimeline}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
        >
          <option value="">Select a timeline</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6+ months">6+ months</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Any References (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#47216b] hover:text-[#371955] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#47216b]">
                <span>Upload files</span>
                <input 
                  id="file-upload" 
                  name="files" 
                  type="file" 
                  multiple
                  className="sr-only" 
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF up to 10MB
            </p>
          </div>
        </div>
        {formData.files.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">{formData.files.length} file(s) selected</p>
            <ul className="mt-1 text-xs text-gray-500 list-disc pl-5">
              {Array.from(formData.files).map((file, index) => (
                <li key={index}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#47216b] text-white rounded-full font-medium hover:bg-[#371955] transition-colors duration-200 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1 - Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#47216b]/5 to-white pointer-events-none"></div>
        <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-[#47216b]/5 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#47216b] mb-6 leading-tight">
              Your Idea, Our Expertise: <br />
              <span className="text-black">Let's Build Together</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              We turn your product vision into reality. Tell us what you want to create—your product, your goals, your audience—and we'll translate it into a digital solution. From branding and website development to execution, our end-to-end service ensures you're completely taken care of.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-4 bg-[#47216b] text-white rounded-full font-semibold hover:bg-[#371955] transition-colors duration-300"
            >
              Start Your Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Section 2 - Onboarding Flow */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-4">
              GoDigitfy Onboarding Flow
            </h2>
            <p className="text-xl text-gray-700">
              Stress-Free, End‑to‑End Service – We Digitfy Your Vision in 6 Simple Steps
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeIn}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="absolute top-0 left-0 -mt-5 -ml-5 w-12 h-12 bg-[#47216b] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#47216b] mb-4 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Section 3 - Modern Full Width Form (Single Page) */}
      <section id="get-started" className="py-24 bg-gradient-to-br from-white to-[#47216b]/5 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-64 bg-[#47216b]/3 -skew-y-6 transform -translate-y-32 z-0"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#47216b]/5 blur-3xl z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-4 text-center">
              Tell Us About Your Product
            </h2>
            <p className="text-xl text-gray-700 text-center mb-12 max-w-xl mx-auto">
              A few simple details are all we need to get started. Your vision, stress‑free execution.
            </p>
            
            {/* Form Status Messages */}
            {submitStatus === 'success' && (
              <div className="max-w-3xl mx-auto mb-12 p-6 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Thank you for your submission!</h3>
                <p className="text-base">We'll be in touch with you shortly to discuss your project.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="max-w-3xl mx-auto mb-12 p-6 bg-red-50 border border-red-200 text-red-800 rounded-lg text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong.</h3>
                <p className="text-base">Please try again or contact us directly.</p>
              </div>
            )}
            
            {/* Modern Single-Page Form */}
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[#47216b] via-purple-500 to-[#47216b]"></div>
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Business/Product Name */}
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                        1. Business / Product Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
                        placeholder="What's the name of your product or business?"
                      />
                    </div>
                    
                    {/* Problem Solved */}
                    <div>
                      <label htmlFor="problemSolved" className="block text-sm font-medium text-gray-700 mb-2">
                        2. The Problem You Solve
                      </label>
                      <textarea
                        id="problemSolved"
                        name="problemSolved"
                        value={formData.problemSolved}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
                        placeholder="Briefly describe the challenge your product addresses and why it matters"
                      ></textarea>
                    </div>
                    
                    {/* Target Audience & Goals */}
                    <div>
                      <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
                        3. Target Audience & Goals
                      </label>
                      <input
                        type="text"
                        id="targetAudience"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200 mb-4"
                        placeholder="Who will use this product?"
                      />
                      <input
                        type="text"
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
                        placeholder="What outcome do you want—awareness, leads, sales?"
                      />
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Services Needed */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        4. Services You Need
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <input
                            type="checkbox"
                            id="branding"
                            name="branding"
                            checked={formData.services.branding}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
                          />
                          <label htmlFor="branding" className="ml-3 text-gray-700 text-sm">
                            Branding & Visual Identity
                          </label>
                        </div>
                        
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <input
                            type="checkbox"
                            id="website"
                            name="website"
                            checked={formData.services.website}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
                          />
                          <label htmlFor="website" className="ml-3 text-gray-700 text-sm">
                            Website & Development
                          </label>
                        </div>
                        
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <input
                            type="checkbox"
                            id="printables"
                            name="printables"
                            checked={formData.services.printables}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
                          />
                          <label htmlFor="printables" className="ml-3 text-gray-700 text-sm">
                            Printables
                          </label>
                        </div>
                        
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <input
                            type="checkbox"
                            id="eventPlanning"
                            name="eventPlanning"
                            checked={formData.services.eventPlanning}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
                          />
                          <label htmlFor="eventPlanning" className="ml-3 text-gray-700 text-sm">
                            Event Planning
                          </label>
                        </div>
                        
                        <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 sm:col-span-2">
                          <input
                            type="checkbox"
                            id="digitalMedia"
                            name="digitalMedia"
                            checked={formData.services.digitalMedia}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-[#47216b] border-gray-300 rounded focus:ring-[#47216b]"
                          />
                          <label htmlFor="digitalMedia" className="ml-3 text-gray-700 text-sm">
                            Digital Media & Campaigns
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Budget & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
                          5. Estimated Budget
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
                        >
                          <option value="">Select budget</option>
                          <option value="Under $5,000">Under $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000+">$50,000+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="launchTimeline" className="block text-sm font-medium text-gray-700 mb-2">
                          6. Launch Timeline
                        </label>
                        <select
                          id="launchTimeline"
                          name="launchTimeline"
                          value={formData.launchTimeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-[#47216b] focus:border-[#47216b] outline-none transition-colors duration-200"
                        >
                          <option value="">Select timeline</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        7. Upload References (Optional)
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="file-upload" className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-sm text-gray-500">Upload files or drag and drop</span>
                          <span className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</span>
                          <input 
                            id="file-upload" 
                            name="files" 
                            type="file" 
                            multiple
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {formData.files.length > 0 && (
                        <div className="mt-3 text-xs text-gray-500 flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{formData.files.length} file(s) selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Submit Button - Full Width */}
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#47216b] text-white rounded-lg font-medium hover:bg-[#371955] transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Your Project Request
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    By submitting, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Modern Minimalistic Why Choose Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Minimal background element */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-[#47216b] clip-diagonal"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="mb-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Why Choose <span className="text-[#47216b]">GoDigitfy</span>
              </h2>
              <div className="w-16 h-1 bg-[#47216b] mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left side - Why choose us points */}
              <motion.div 
                className="space-y-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#47216b]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Single Team, Full Execution</h3>
                    <p className="text-gray-600">Share your vision once — we handle everything from branding to development to execution under one roof.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#47216b]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Speed & Clarity</h3>
                    <p className="text-gray-600">Rapid execution with continuous updates. No confusion, no delays, just transparent progress.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#47216b]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#47216b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Focus on Core Business</h3>
                    <p className="text-gray-600">You drive your business strategy. We handle every digital execution detail.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Right side - CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#47216b]/10 rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#47216b]/5 rounded-full"></div>
                
                <div className="relative p-10 md:p-12 bg-white rounded-2xl shadow-xl border border-gray-100 z-10">
                  <h3 className="text-2xl font-bold text-[#47216b] mb-6">Ready to build your digital vision?</h3>
                  <p className="text-gray-600 mb-8">
                    Our end-to-end service ensures you're completely taken care of—from concept to execution and beyond.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Single point of contact</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Complete confidentiality</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">Ongoing technical support</p>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <a
                      href="#get-started"
                      className="block w-full py-4 bg-[#47216b] text-white rounded-xl font-semibold text-center hover:bg-[#371955] transition-colors duration-300"
                    >
                      Start Your Project
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* CSS for diagonal clip */}
        <style jsx>{`
          .clip-diagonal {
            clip-path: polygon(0 100%, 100% 30%, 100% 100%, 0% 100%);
          }
        `}</style>
      </section>
    </div>
  );
};

export default CustomSolutions;