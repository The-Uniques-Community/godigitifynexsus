import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Blogmain from '../../../assets/innovation.png'
import { getPaginatedBlogs } from '../../../data/blogData'

export default function Blog() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setError(null)
        const response = await axios.get('https://Godigitify-backend.vercel.app/api/blogs/get-all-blogs?limit=6')
        if (response.data.success) {
          setBlogPosts(response.data.blogs)
        } else {
          setError('Failed to load blogs')
        }
      } catch (error) {
        console.error('Failed to fetch blogs from API, using fallback data:', error)
        // Use fallback data when API fails
        const fallbackData = getPaginatedBlogs(1, 6)
        setBlogPosts(fallbackData.blogs)
        setError(null) // Clear error since we have fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    if (blogPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentPostIndex((prevIndex) => (prevIndex + 1) % blogPosts.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [blogPosts])

  if (loading) {
    return (
      <section className="w-full py-16 mb-4 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mb-12 md:mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">OUR BLOG</h3>
            <h1 className="text-4xl md:text-7xl pb-5 w-full font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-2 text-[#47216b]">
              Insights and Innovations
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Loading blog posts...
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-16 mb-4 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mb-12 md:mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">OUR BLOG</h3>
            <h1 className="text-4xl md:text-7xl pb-5 w-full font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-2 text-[#47216b]">
              Insights and Innovations
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Unable to load blog posts. Please try again later.
            </p>
            <Link
              to="/blog"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300 inline-block text-center"
            >
              VIEW BLOG
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (blogPosts.length === 0) {
    return (
      <section className="w-full py-16 mb-4 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 lg:px-8 mx-auto">
          <div className="max-w-5xl mb-12 md:mb-20">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">OUR BLOG</h3>
            <h1 className="text-4xl md:text-7xl pb-5 w-full font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-2 text-[#47216b]">
              Insights and Innovations
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              No blog posts available at the moment.
            </p>
            <Link
              to="/blog"
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300 inline-block text-center"
            >
              VIEW BLOG
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const currentPost = blogPosts[currentPostIndex]

  // Helper to trim description for card
  const getTrimmedDescription = (desc, maxLength = 380) => {
    if (!desc) return ""
    return desc.length > maxLength ? desc.slice(0, maxLength) + "..." : desc
  }

  // Counter click: go to that blog
  const handleCounterClick = (idx) => {
    setCurrentPostIndex(idx);
  };

  // Next/Prev navigation
  const handlePrev = () => {
    setCurrentPostIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };
  const handleNext = () => {
    setCurrentPostIndex((prev) => (prev + 1) % blogPosts.length);
  };

  return (
    <section className="w-full py-16 mb-4 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6 lg:px-8  mx-auto">
        {/* Top Section: Headings and Description */}
        <div className="max-w-5xl mb-12 md:mb-20">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">INSIGHTS & INTELLIGENCE</h3>
          <h1 className="text-4xl md:text-7xl pb-5 w-full font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-2 text-[#47216b]">
            Systems Thinking
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Strategic insights on building scalable digital infrastructure, AI-driven automation, and predictable growth systems. For leaders who think in systems, not campaigns.
          </p>
          <Link
            to="/blog"
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300 inline-block text-center"
          >
            READ MORE
          </Link>
        </div>

        {/* Main Content Section: Counter and Blog Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6 items-start">
          {/* Counter/Timeline Section */}
          <div className="hidden md:col-span-2 md:flex flex-row md:flex-col justify-center md:justify-start items-start md:items-start relative overflow-x-auto pb-2 md:pb-0">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-[20px] top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />
            {blogPosts.map((post, index) => (
              <button
                key={post._id}
                onClick={() => handleCounterClick(index)}
                className="relative z-10 flex flex-col items-center flex-shrink-0 mb-0 md:mb-8 mr-4 md:mr-0 last:mr-0 focus:outline-none"
                aria-label={`Go to blog ${post.mainHeading}`}
                type="button"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 ${currentPostIndex === index ? "bg-[#47216b] text-white" : "bg-gray-300 text-[#47216b]"
                    }`}
                  style={{
                    boxShadow: currentPostIndex === index ? "0 4px 16px 0 rgba(71,33,107,0.15)" : undefined,
                    transition: "background 0.3s, color 0.3s"
                  }}
                >
                  {index + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Blog Post Card Section */}
          <div className="md:col-span-10 md:ml-[-100px] lg:ml-[-130px]">
            <div className="p-0 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[450px] bg-white transition-all duration-500">
              {/* Image Half */}
              <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto h-64 md:h-auto">
                <img
                  src={currentPost.coverImage || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"}
                  alt={`Image for blog post ${currentPost.mainHeading}`}
                  className="object-cover w-full h-full rounded-r-3xl transition-all duration-700"
                  style={{ objectPosition: "center" }}
                  loading={currentPostIndex === 0 ? "eager" : "lazy"}
                />
              </div>
              {/* Content Half */}
              <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10 space-y-4 flex flex-col justify-center">
                <p className="text-sm font-semibold  text-gray-700">
                  {currentPost.tags && currentPost.tags.length > 0 ? currentPost.tags[0] : 'Blog'}
                </p>
                <h3 className="text-3xl font-bold leading-tight text-[#47216b]">{currentPost.mainHeading}</h3>
                <p className="text-gray-700 text-lg leading-relaxed flex-grow text-justify">
                  {getTrimmedDescription(currentPost.description, 380)}
                </p>
                <Link
                  to={`/blog/${currentPost._id}`}
                  className="flex items-center gap-2 px-0 py-2 text-[#47216b] hover:text-black font-semibold transition-colors duration-200 bg-transparent"
                >
                  Read Article
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Prev/Next navigation */}
            <div className="flex justify-center items-center gap-8 mt-6">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-[#47216b] hover:text-white text-[#47216b] transition-colors duration-200"
                aria-label="Previous Blog"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-[#47216b] hover:text-white text-[#47216b] transition-colors duration-200"
                aria-label="Next Blog"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}