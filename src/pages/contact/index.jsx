import React, { useState } from 'react'

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label className="block text-gray-900 font-medium mb-4">
                  Your Name
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
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-[#47216b] focus:outline-none focus:ring-0 transition-colors duration-300"
                  required
                />
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
                  Which services are you interested in?
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
                  className="bg-[#47216b] text-white px-12 py-4 rounded-full font-semibold hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit
                </button>
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
