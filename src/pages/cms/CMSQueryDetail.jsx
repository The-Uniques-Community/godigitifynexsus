import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CMSQueryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchQuery();
  }, [id]);

  const fetchQuery = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/contact/get-query/${id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setQuery(response.data.data);
      } else {
        setError('Query not found');
      }
    } catch (err) {
      console.error('Error fetching query:', err);
      setError('Failed to load query details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      setDeleting(true);
      const response = await axios.delete(`http://localhost:5000/api/contact/delete-query/${id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        navigate('/cms/manage-queries', { 
          state: { message: 'Query deleted successfully' } 
        });
      } else {
        setError(response.data.message || 'Failed to delete query');
      }
    } catch (err) {
      console.error('Error deleting query:', err);
      setError('Failed to delete query');
    } finally {
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      responded: { bg: 'bg-green-100', text: 'text-green-800', label: 'Responded' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Closed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Query Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/cms/manage-queries"
          className="bg-[#47216b] hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Back to Queries
        </Link>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❓</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Query Not Found</h2>
        <p className="text-gray-600 mb-6">The requested query could not be found.</p>
        <Link
          to="/cms/manage-queries"
          className="bg-[#47216b] hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Back to Queries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/cms/manage-queries"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Query Details</h1>
            <p className="text-gray-600">View and manage contact query</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {getStatusBadge(query.status)}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  <p className="text-lg font-medium text-gray-900">{query.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg text-gray-900">{query.email}</p>
                    <a
                      href={`mailto:${query.email}`}
                      className="text-[#47216b] hover:text-purple-700 transition-colors duration-200"
                      title="Send Email"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {query.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg text-gray-900">{query.phone}</p>
                      <a
                        href={`tel:${query.phone}`}
                        className="text-[#47216b] hover:text-purple-700 transition-colors duration-200"
                        title="Call"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}

                {query.organization && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Organization</label>
                    <p className="text-lg text-gray-900">{query.organization}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Requirements */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Requirements</h3>
            </div>
            <div className="p-6">
              {query.services && query.services.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {query.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No specific services mentioned</p>
              )}
            </div>
          </div>

          {/* Message */}
          {query.message && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Message</h3>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {query.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Response History */}
          {query.responses && query.responses.length > 0 && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Response History</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {query.responses.map((response, index) => (
                    <div key={index} className="border-l-4 border-green-400 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Response #{index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(response.sentAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Subject:</strong> {response.subject}
                      </p>
                      <div className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                        {response.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Query Metadata */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Query Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Query ID</label>
                <p className="text-sm font-mono text-gray-900">{query._id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                {getStatusBadge(query.status)}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Submitted</label>
                <p className="text-sm text-gray-900">{formatDate(query.createdAt)}</p>
              </div>

              {query.updatedAt && query.updatedAt !== query.createdAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Updated</label>
                  <p className="text-sm text-gray-900">{formatDate(query.updatedAt)}</p>
                </div>
              )}

              {query.priority && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Priority</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    query.priority === 'high' ? 'bg-red-100 text-red-800' :
                    query.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {query.priority.charAt(0).toUpperCase() + query.priority.slice(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
            </div>
            <div className="p-4 space-y-3">
              <Link
                to={`/cms/query/${id}/respond`}
                className="w-full bg-[#47216b] hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Response
              </Link>

              <a
                href={`mailto:${query.email}?subject=Re: Your inquiry about our services`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Directly
              </a>

              {query.phone && (
                <a
                  href={`tel:${query.phone}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              )}

              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`w-full px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                    deleteConfirm
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-red-100 hover:bg-red-200 text-red-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {deleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : deleteConfirm ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Confirm Delete
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Query
                    </>
                  )}
                </button>
                
                {deleteConfirm && (
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Info</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Services Requested</span>
                <span className="text-sm font-medium text-gray-900">
                  {query.services?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Responses Sent</span>
                <span className="text-sm font-medium text-gray-900">
                  {query.responses?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days Since Inquiry</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.ceil((new Date() - new Date(query.createdAt)) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSQueryDetail;
