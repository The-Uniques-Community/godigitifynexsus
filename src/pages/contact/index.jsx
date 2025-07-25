import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    number: '',
    website: '',
    services: [],
    office: '',
    message: '',
    source: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (error) setError('')
    
    // Validate email in real-time
    if (name === 'email') {
      validateEmail(value)
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleCheckboxChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset states
    setError('')
    setEmailError('')
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }
    
    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    
    // Check if at least one service is selected
    if (formData.services.length === 0) {
      setError('Please select at least one service')
      return
    }
    
    try {
      setLoading(true)
      
      const response = await axios.post('https://godigitify-backend.vercel.app/api/contact/create', {
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim().toLowerCase(),
        number: formData.number.trim(),
        website: formData.website.trim(),
        services: formData.services,
        office: formData.office,
        message: formData.message.trim(),
        source: formData.source
      })
      
      if (response.data.success) {
        setSubmitted(true)
        // Reset form
        setFormData({
          name: '',
          organization: '',
          email: '',
          number: '',
          website: '',
          services: [],
          office: '',
          message: '',
          source: ''
        })
      } else {
        setError(response.data.message || 'Failed to submit your query. Please try again.')
      }
    } catch (err) {
      console.error('Form submission error:', err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.status === 400) {
        setError('Please check your input and try again.')
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.')
      } else {
        setError('Failed to submit your query. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const services = [
    'Branding',
    'Social Media Management',
    'Content Creation & Marketing',
    'Ad Film/Video Production',
    'SEO',
    'Website Transformation',
    'Mobile App Development & UI/UX',
    'CRM/Sales Pipeline Development',
    'Influencer Marketing',
    'IP Creation',
    'Email & SMS Marketing Automation',
    'Performance Media',
    'Growth via Media Buying',
    'Social Listening & ORM',
    'Consumer & Market Research',
    'Integrated Campaigns',
    'Others'
  ]

  const offices = ['Mumbai', 'Bangalore', 'Delhi', 'UK (London)', 'Amsterdam']

  const sources = [
    'Referral',
    'Media & News',
    'LinkedIn',
    'Instagram/Facebook',
    'Emails/Newsletter',
    'Search',
    'Other Sources'
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Form */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2 tracking-wider uppercase">
                GOT AN IDEA?
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Drop Us A Message
              </h1>
              <p className="text-gray-600 mb-4">
                We're excited to work with you soon! Please drop an email with your details & 
                requirements to <a href="mailto:bd@godigitify.com" className="text-[#47216b] hover:underline">bd@godigitify.com</a>.
              </p>
              <p className="text-gray-600">
                You can also fill this form & we'll get back in 2 business days.
              </p>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-green-800 font-medium">Thank you for reaching out!</h3>
                    <p className="text-green-700 text-sm mt-1">Your query has been submitted successfully. We'll get back to you within 2 business days.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300"
                  required
                />
              </div>

              {/* Organization Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Your Organization's Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border-0 border-b-2 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#47216b]'
                  }`}
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Your Number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300"
                />
              </div>

              {/* Website Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Website/Social Media Link
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300"
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-gray-900 font-medium mb-6">
                  Which services are you interested in? *
                </label>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleCheckboxChange(service, 'services')}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                        formData.services.includes(service)
                          ? 'bg-[#47216b] text-white border-[#47216b]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#47216b] hover:text-[#47216b]'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
                {formData.services.length === 0 && error.includes('service') && (
                  <p className="text-red-500 text-sm mt-2">Please select at least one service</p>
                )}
              </div>

              {/* Office Selection */}
              <div>
                <label className="block text-gray-900 font-medium mb-6">
                  Please select our closest preferred office for servicing you
                </label>
                <div className="flex flex-wrap gap-3">
                  {offices.map((office) => (
                    <button
                      key={office}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, office }))}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                        formData.office === office
                          ? 'bg-[#47216b] text-white border-[#47216b]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#47216b] hover:text-[#47216b]'
                      }`}
                    >
                      {office}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  What's on your mind?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300 resize-none"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-gray-900 font-medium mb-6">
                  How did you hear about us?
                </label>
                <div className="flex flex-wrap gap-3">
                  {sources.map((source) => (
                    <button
                      key={source}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, source }))}
                      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                        formData.source === source
                          ? 'bg-[#47216b] text-white border-[#47216b]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-[#47216b] hover:text-[#47216b]'
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading || emailError}
                  className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[140px] ${
                    loading || emailError
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-[#47216b] text-white hover:bg-gray-900'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-3">* Required fields</p>
              </div>
            </form>
          </div>

          {/* Right Side - Images and Office Info */}
          <div className="space-y-8">
            {/* Images Grid */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Tech workspace" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white text-sm bg-black/20 px-3 py-1 rounded">
                  Shot by GoDigitify Team
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Creative workspace" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white text-sm bg-black/20 px-3 py-1 rounded">
                  Shot by GoDigitify Team
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital marketing" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 right-4 text-white text-sm bg-black/20 px-3 py-1 rounded">
                  Shot by GoDigitify Team
                </div>
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Mumbai Office" 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mumbai</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Kamala Mills Compound, 301/302 Trade World,</p>
                    <p>Tower D, Lower Parel, Mumbai, Maharashtra 400013</p>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="mailto:bd@godigitify.com" 
                      className="text-[#47216b] hover:underline font-medium"
                    >
                      bd@godigitify.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
