// pages/blog/BlogDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/blogs/get-blog/${id}`);
        if (response.data.success) {
          setBlog(response.data.blog);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to fetch blog');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!blog) return;
      
      try {
        setRelatedLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}/related?page=1&limit=3`);
        if (response.data.success) {
          setRelatedBlogs(response.data.relatedBlogs);
        }
      } catch (err) {
        console.error('Failed to fetch related blogs:', err);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [blog, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b] mx-auto mb-4"></div>
          <p className="text-[#001330] text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-[#001330] mb-2">Article Not Found</h2>
          <p className="text-[#b4b4b4] mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <button 
            onClick={() => navigate('/blog')}
            className="bg-[#47216b] hover:bg-[#001330] text-white px-6 py-3 rounded-full transition-colors duration-200"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero Section */}
      <div className="relative max-w-3xl mx-auto bg-gradient-to-br from-[#47216b] to-[#001330] text-white">
        <div className="absolute inset-0 bg-[#47216b] bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 lg:py-24">
          {/* Back Button */}
          <div className="absolute top-6 left-4">
            <button
              onClick={() => navigate('/blog')}
              className="bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-black p-2 rounded-full transition-all duration-200 border border-white border-opacity-20 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* Title and Meta */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {blog.mainHeading}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-black">{blog.author.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-medium">{blog.author}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                    <span>•</span>
                    <span>{blog.readTime} min read</span>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative max-w-3xl mx-auto h-64 md:h-80 lg:h-96 overflow-hidden">
          <img 
            src={blog.coverImage} 
            alt="Article cover" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Description */}
          {blog.description && (
            <div className="text-xl leading-relaxed text-[#001330] font-light mb-12 p-6 bg-gray-50 rounded-lg border-l-4 border-[#47216b]">
              {blog.description}
            </div>
          )}

          {blog.sections?.map((section, idx) => (
            <section key={idx} className="mb-12">
              {section?.subheading && (
                <h2 className="text-2xl md:text-3xl font-bold text-[#001330] mb-6 leading-tight border-l-4 border-[#47216b] pl-4">
                  {section.subheading}
                </h2>
              )}
              
              <div className="space-y-6">
                {section?.contentBlocks?.map((block, bIdx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={bIdx} className="text-lg leading-relaxed text-[#001330] font-light">
                        {block.content}
                      </p>
                    );
                  }
                  
                  if (block.type === "bullet") {
                    return (
                      <div key={bIdx} className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#47216b]">
                        <ul className="space-y-3">
                          {block.bullets.map((point, i) => (
                            <li key={i} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-[#47216b] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-[#001330] leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  
                  if (block.type === "image") {
                    return (
                      <figure key={bIdx} className="my-8">
                        <img
                          src={block.imageUrl}
                          alt="Article illustration"
                          className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />
                      </figure>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </section>
          ))}

          {/* Conclusion */}
          {blog?.conclusion && (
            <section className="mt-16 pt-8 border-t border-[#b4b4b4]">
              <h3 className="text-2xl font-bold text-[#001330] mb-6 flex items-center">
                <span className="w-8 h-8 bg-[#47216b] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  ✓
                </span>
                Conclusion
              </h3>
              <div className="bg-gradient-to-r from-[#47216b] via-purple-600 to-[#001330] p-6 rounded-lg text-white">
                <p className="text-lg leading-relaxed font-light">{blog.conclusion}</p>
              </div>
            </section>
          )}
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-[#b4b4b4]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#47216b] to-[#001330] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{blog.author.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="font-semibold text-[#001330]">{blog.author}</p>
                <p className="text-[#b4b4b4] text-sm">Published on {new Date(blog.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-gray-100 hover:bg-gray-200 text-[#001330] px-4 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
              
              <button 
                onClick={() => navigate('/blog')}
                className="bg-[#47216b] hover:bg-[#001330] text-white px-6 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <span>More Articles</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </article>

      {/* More Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001330] mb-4">More Articles You Might Like</h2>
              <p className="text-[#b4b4b4] text-lg">Discover more insights and expert opinions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.slice(0, 6).map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`/blog/${relatedBlog._id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative">
                    <img
                      src={relatedBlog.coverImage || "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"}
                      alt={relatedBlog.mainHeading}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedBlog.tags && relatedBlog.tags[0] && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#47216b] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {relatedBlog.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{relatedBlog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(relatedBlog.publishedAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedBlog.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#47216b] transition-colors duration-300 line-clamp-2">
                      {relatedBlog.mainHeading}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedBlog.description}
                    </p>
                    
                    {relatedBlog.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {relatedBlog.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center text-[#47216b] font-semibold group-hover:text-gray-900 transition-colors duration-300">
                      Read More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
