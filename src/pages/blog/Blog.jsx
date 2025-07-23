import React, { useState } from 'react'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const blogPosts = [
    {
      id: 1,
      category: "Strategy",
      title: "Building Digital Foundations: A Strategic Approach to Business Transformation",
      excerpt: "Discover how to establish strong digital foundations that drive sustainable business growth and competitive advantage in today's digital landscape.",
      content: "In today's rapidly evolving business environment, establishing strong digital foundations is crucial for long-term success. We explore strategic frameworks, implementation methodologies, and key considerations for businesses embarking on their digital transformation journey.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      author: "GoDigitify Team",
      date: "2025-01-15",
      readTime: "8 min read",
      tags: ["Strategy", "Digital Transformation", "Business Growth"]
    },
    {
      id: 2,
      category: "Development",
      title: "Modern Web Development: Building Scalable Applications with React and Node.js",
      excerpt: "Learn the best practices for creating high-performance, scalable web applications using modern JavaScript frameworks and technologies.",
      content: "Modern web development requires a deep understanding of both frontend and backend technologies. This comprehensive guide covers React best practices, Node.js optimization, and scalable architecture patterns.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      author: "Tech Team",
      date: "2025-01-12",
      readTime: "12 min read",
      tags: ["Development", "React", "Node.js", "Web Development"]
    },
    {
      id: 3,
      category: "Design",
      title: "UI/UX Design Trends 2025: Creating Engaging User Experiences",
      excerpt: "Explore the latest design trends and principles that will shape user experiences in 2025 and beyond.",
      content: "User experience design continues to evolve with new technologies and changing user expectations. We examine the key trends, tools, and methodologies that will define exceptional digital experiences in 2025.",
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
      author: "Design Team",
      date: "2025-01-10",
      readTime: "6 min read",
      tags: ["Design", "UI/UX", "Trends", "User Experience"]
    },
    {
      id: 4,
      category: "Marketing",
      title: "Digital Marketing Mastery: Leveraging Data-Driven Strategies for Growth",
      excerpt: "Harness the power of data analytics and modern marketing tools to drive measurable business growth and customer engagement.",
      content: "Data-driven marketing has become essential for business success. This article explores advanced analytics, automation tools, and strategic approaches to maximize your marketing ROI.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      author: "Marketing Team",
      date: "2025-01-08",
      readTime: "10 min read",
      tags: ["Marketing", "Analytics", "Growth", "Digital Strategy"]
    },
    {
      id: 5,
      category: "Technology",
      title: "AI Integration in Business: Practical Applications and Implementation Guide",
      excerpt: "A comprehensive guide to integrating artificial intelligence into your business operations for enhanced efficiency and innovation.",
      content: "Artificial intelligence is transforming how businesses operate. Learn practical approaches to AI integration, from automation to predictive analytics, and how to implement these technologies effectively.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      author: "AI Team",
      date: "2025-01-05",
      readTime: "15 min read",
      tags: ["Technology", "AI", "Innovation", "Business Intelligence"]
    },
    {
      id: 6,
      category: "Strategy",
      title: "E-commerce Evolution: Building Future-Ready Online Stores",
      excerpt: "Discover the latest e-commerce trends and technologies that will shape the future of online retail and customer experiences.",
      content: "E-commerce continues to evolve with new technologies and changing consumer behaviors. Explore cutting-edge solutions, platform choices, and strategic considerations for building successful online stores.",
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80",
      author: "E-commerce Team",
      date: "2025-01-03",
      readTime: "9 min read",
      tags: ["E-commerce", "Strategy", "Online Retail", "Digital Commerce"]
    }
  ]

  const categories = ['All', 'Strategy', 'Development', 'Design', 'Marketing', 'Technology']

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-4">OUR BLOG</h3>
            <h1 className="text-4xl md:text-7xl font-bold leading-tight text-[#47216b] mb-6">
              Insights & <span className="text-gray-900">Innovations</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
              Stay ahead of the curve with our latest articles, industry insights, and expert opinions. 
              We share our knowledge to help you navigate the evolving landscape of technology and business.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#47216b]">150+</div>
                <div className="text-gray-600">Articles Published</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#47216b]">50K+</div>
                <div className="text-gray-600">Monthly Readers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#47216b]">25+</div>
                <div className="text-gray-600">Expert Contributors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#47216b] focus:border-transparent text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#47216b] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#47216b] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#47216b] transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => openModal(post)}
                    className="flex items-center text-[#47216b] font-semibold hover:text-gray-900 transition-colors duration-300"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[#47216b] mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Subscribe to our newsletter and get the latest insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47216b] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-[#47216b] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="bg-[#47216b] text-white px-3 py-1 rounded-full text-xs font-semibold mr-4">
                  {selectedPost.category}
                </span>
                <span>{selectedPost.author}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.date}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.readTime}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedPost.content}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selectedPost.excerpt}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-8">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog