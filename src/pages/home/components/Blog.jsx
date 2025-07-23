import { useState, useEffect } from "react"

const blogPosts = [
  {
    id: "01",
    category: "Strategy",
    title: "Identifying Your Core Needs for Success",
    description:
      "We begin by understanding your ultimate goals and aspirations. From there, we meticulously pinpoint the project scope, specific requirements, and essential content needed to achieve your vision. This foundational step ensures alignment and clarity from the outset.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "02",
    category: "Planning",
    title: "Crafting a Robust Plan for Execution",
    description:
      "Based on the identified needs, we develop a detailed and actionable plan, coupled with a strategic roadmap. This ensures efficient and effective project execution, minimizing roadblocks and maximizing productivity. Every step is carefully considered.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "03",
    category: "Development",
    title: "Bringing Ideas to Life with Precision",
    description:
      "Our expert team then moves into the development and design phase. We meticulously transform your concepts into a tangible reality, focusing on precision, creativity, and adherence to the highest quality standards. Your vision takes shape with us.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "04",
    category: "Launch",
    title: "Deployment and Beyond: Continuous Support",
    description:
      "Finally, we deploy your project, ensuring a smooth and successful launch. But our commitment doesn't end there; we provide continuous support and optimization to guarantee its sustained success and optimal performance in the long run. We're with you every step.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "05",
    category: "Analytics",
    title: "Measuring Impact and Optimizing Performance",
    description:
      "Post-launch, we dive deep into analytics to measure the impact of our work. We continuously monitor performance, gather insights, and implement optimizations to ensure your project not only meets but exceeds its objectives.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "06",
    category: "Growth",
    title: "Scaling for Future Success and Expansion",
    description:
      "Our focus extends to long-term growth. We work with you to identify opportunities for scaling, expansion, and innovation, ensuring your solution remains competitive and continues to drive value in a dynamic market.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
  },
]

export default function Blog() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
   const [modalOpen, setModalOpen] = useState(false)
  const [modalPost, setModalPost] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) => (prevIndex + 1) % blogPosts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentPost = blogPosts[currentPostIndex]
const handleOpenModal = (post) => {
    setModalPost(post)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setModalPost(null)
    document.body.style.overflow = ""
  }

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
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#47216b] mb-2">OUR BLOG</h3>
          <h1 className="text-4xl md:text-7xl pb-5 w-full font-bold leading-tight sm:text-5xl xl:text-6xl/none mb-2 text-[#47216b]">
            Insights and Innovations
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            Stay updated with our latest articles, industry trends, and expert opinions. We share our knowledge to help
            you succeed and navigate the evolving landscape of technology and business.
          </p>
          <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#47216b] text-white rounded-full font-semibold shadow hover:bg-black transition-colors duration-300">
            READ MORE
          </button>
        </div>

        {/* Main Content Section: Counter and Blog Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6 items-start">
          {/* Counter/Timeline Section */}
          <div className="hidden md:col-span-2 md:flex flex-row md:flex-col justify-center md:justify-start items-start md:items-start relative overflow-x-auto pb-2 md:pb-0">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-[20px] top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />
            {blogPosts.map((post, index) => (
             <button
                key={post.id}
                onClick={() => handleCounterClick(index)}
                className="relative z-10 flex flex-col items-center flex-shrink-0 mb-0 md:mb-8 mr-4 md:mr-0 last:mr-0 focus:outline-none"
                aria-label={`Go to blog ${post.title}`}
                type="button"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 ${
                    currentPostIndex === index ? "bg-[#47216b] text-white" : "bg-gray-300 text-[#47216b]"
                  }`}
                  style={{
                    boxShadow: currentPostIndex === index ? "0 4px 16px 0 rgba(71,33,107,0.15)" : undefined,
                    transition: "background 0.3s, color 0.3s"
                  }}
                >
                  {post.id}
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
                  src={currentPost.image}
                  alt={`Image for blog post ${currentPost.id}`}
                  className="object-cover w-full h-full rounded-r-3xl transition-all duration-700"
                  style={{ objectPosition: "center" }}
                  loading={currentPostIndex === 0 ? "eager" : "lazy"}
                />
              </div>
              {/* Content Half */}
              <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-10 space-y-4 flex flex-col justify-center">
                <p className="text-sm font-semibold  text-gray-700">{currentPost.category}</p>
                <h3 className="text-3xl font-bold leading-tight text-[#47216b]">{currentPost.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed flex-grow text-justify">
                   {getTrimmedDescription(currentPost.description, 380)}
                </p>
                <button className="flex items-center gap-2 px-0 py-2 text-[#47216b] hover:text-black font-semibold transition-colors duration-200 bg-transparent" onClick={() => handleOpenModal(currentPost)}>
                  Read Article
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
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

        {/* Modal */}
      {modalOpen && modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto p-6 md:p-10 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-[#47216b] text-2xl font-bold transition"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={modalPost.image}
              alt={modalPost.title}
              className="w-full h-56 object-cover rounded-xl mb-6"
            />
            <span className="text-sm font-semibold uppercase text-[#47216b]">{modalPost.category}</span>
            <h2 className="text-3xl font-bold text-[#47216b] mt-2 mb-4">{modalPost.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-2">{modalPost.fullContent || modalPost.description}</p>
          </div>
        </div>
      )}
      {/* Modal animation */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeInModal 0.3s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes fadeInModal {
            from { opacity: 0; transform: translateY(40px) scale(0.98);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
    </section>
  )
}