// pages/BlogDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBlogById } from '../../data/blogData';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTooltip, setShowTooltip] = useState({ edit: false, delete: false });

  useEffect(() => {
    axios.get(`https://Godigitify-backend.vercel.app/api/blogs/get-blog/${id}`)
      .then(res => setBlog(res.data.blog))
      .catch(err => {
        console.error('Error fetching blog from API, using fallback data:', err);
        // Use fallback data when API fails
        const fallbackBlog = getBlogById(id);
        if (fallbackBlog) {
          setBlog(fallbackBlog);
        }
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://Godigitify-backend.vercel.app/api/blogs/delete-blog/${id}`);
      setShowDeleteConfirm(false);
      navigate('/cms/blogs'); // Redirect to blogs list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b] mx-auto mb-4"></div>
          <p className="text-[#001330] text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br max-w-3xl mx-auto from-[#47216b] to-[#001330] text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 lg:py-24">
          {/* Action Buttons - Floating */}
          <div className="absolute top-6 right-4 flex space-x-2 z-10">
            <div className="relative">
              <button
                onClick={() => navigate(`/cms/blogs/${blog._id}/edit`)}
                onMouseEnter={() => setShowTooltip(prev => ({ ...prev, edit: true }))}
                onMouseLeave={() => setShowTooltip(prev => ({ ...prev, edit: false }))}
                className="bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-black p-2 rounded-full transition-all duration-200 border border-white border-opacity-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              {showTooltip.edit && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#001330] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Edit Article
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                onMouseEnter={() => setShowTooltip(prev => ({ ...prev, delete: true }))}
                onMouseLeave={() => setShowTooltip(prev => ({ ...prev, delete: false }))}
                className="bg-red-500 bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 text-white p-2 rounded-full transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              {showTooltip.delete && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-[#001330] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Delete Article
                </div>
              )}
            </div>
          </div>

          {/* Title and Meta */}
          <div className="space-y-6 ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {blog.mainHeading}
            </h1>

            <div className="flex items-center space-x-4 text-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white bg-opacity-20 text-black rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{blog.author.charAt(0).toUpperCase()}</span>
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
          {blog.sections.map((section, idx) => (
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

            <button
              onClick={() => navigate('/cms/blogs')}
              className="bg-[#47216b] hover:bg-[#001330] text-white px-6 py-2 rounded-full transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Articles</span>
            </button>
          </div>
        </footer>
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#001330] mb-2">Delete Article</h3>
              <p className="text-[#b4b4b4] mb-6">Are you sure you want to delete this article? This action cannot be undone.</p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#001330] px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
