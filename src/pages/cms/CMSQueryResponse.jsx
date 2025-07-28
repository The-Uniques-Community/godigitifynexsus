import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CMSQueryResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [responseData, setResponseData] = useState({
    subject: "",
    content: "",
    rawContent: "",
    template: "custom",
  });

  const emailTemplates = {
    acknowledgment: {
      subject: "Thank you for your inquiry - GoDigitify",
      content: `Dear {{name}},

Thank you for reaching out to GoDigitify. We have received your inquiry and appreciate your interest in our services.

Our team will review your requirements and get back to you within 2 business days with a detailed response.

Best regards,
The GoDigitify Team`,
    },
    consultation: {
      subject: "Let's schedule a consultation - GoDigitify",
      content: `Dear {{name}},

Thank you for your interest in GoDigitify's services. We would love to discuss your {{services}} requirements in detail.

Would you be available for a consultation call this week? Please let us know your preferred time, and we'll schedule a meeting to understand your needs better.

Best regards,
The GoDigitify Team`,
    },
    quote: {
      subject: "Proposal for your project - GoDigitify",
      content: `Dear {{name}},

Thank you for considering GoDigitify for your {{services}} needs. Based on your requirements, we have prepared a customized proposal for your organization.

We would like to schedule a presentation to walk you through our approach and discuss the investment involved.

Best regards,
The GoDigitify Team`,
    },
    followup: {
      subject: "Following up on your inquiry - GoDigitify",
      content: `Dear {{name}},

We wanted to follow up on your recent inquiry about our {{services}} services. 

We understand that choosing the right digital partner is an important decision, and we're here to answer any questions you might have.

Please feel free to reach out if you'd like to discuss your requirements further.

Best regards,
The GoDigitify Team`,
    },
  };

  useEffect(() => {
    fetchQuery();
  }, [id]);

  const fetchQuery = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://godigitify-backend.vercel.app/api/contact/get-query/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setQuery(response.data.data);
        // Set default subject if none exists
        if (!responseData.subject) {
          setResponseData((prev) => ({
            ...prev,
            subject: `Re: Your inquiry about ${
              response.data.data.services?.join(", ") || "our services"
            }`,
          }));
        }
      } else {
        setError("Query not found");
      }
    } catch (err) {
      console.error("Error fetching query:", err);
      setError("Failed to load query details");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (templateKey) => {
    if (templateKey === "custom") {
      setResponseData((prev) => ({
        ...prev,
        template: "custom",
        subject: "",
        content: "",
        rawContent: "",
      }));
    } else {
      const template = emailTemplates[templateKey];
      const processedContent = template.content
        .replace(/{{name}}/g, query?.name || "Valued Client")
        .replace(/{{services}}/g, query?.services?.join(", ") || "our services")
        .replace(
          /{{organization}}/g,
          query?.organization || "your organization"
        );

      setResponseData((prev) => ({
        ...prev,
        template: templateKey,
        subject: template.subject,
        content: processedContent,
        rawContent: template.content,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If changing content, check for and process template variables
    if (name === 'content') {
      // Store the raw content with template variables intact
      setResponseData((prev) => ({
        ...prev,
        [name]: value,
        rawContent: value,
      }));
    } else {
      setResponseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to process custom template content with dynamic variables
  const processCustomContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/{{name}}/g, query?.name || "Valued Client")
      .replace(/{{services}}/g, query?.services?.join(", ") || "our services")
      .replace(/{{organization}}/g, query?.organization || "your organization");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!responseData.subject.trim() || !responseData.content.trim()) {
      setError("Subject and content are required");
      return;
    }

    try {
      setSending(true);
      setError("");
      
      // Get the raw content or use the current content if no raw content exists
      const contentToProcess = responseData.rawContent || responseData.content;
      
      // Process content to replace template variables
      const processedContent = processCustomContent(contentToProcess);

      const response = await axios.post(
        `https://godigitify-backend.vercel.app/api/contact/respond-query/${id}`,
        {
          subject: responseData.subject.trim(),
          content: processedContent.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccess("Response sent successfully!");
        setTimeout(() => {
          navigate(`/cms/query/${id}`);
        }, 2000);
      } else {
        setError(response.data.message || "Failed to send response");
      }
    } catch (err) {
      console.error("Error sending response:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send response. Please try again.");
      }
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b]"></div>
      </div>
    );
  }

  if (error && !query) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Query Not Found
        </h2>
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/cms/query/${id}`}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Respond to Query
            </h1>
            <p className="text-gray-600">Send a response to {query?.name}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-700">{success}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Query Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden sticky top-4">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Query Summary
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Name
                </label>
                <p className="text-gray-900">{query?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-gray-900">{query?.email}</p>
              </div>
              {query?.organization && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Organization
                  </label>
                  <p className="text-gray-900">{query?.organization}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Services
                </label>
                <div className="mt-1">
                  {query?.services?.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              {query?.message && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Message
                  </label>
                  <div className="mt-1 bg-gray-50 p-2 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
                    {query.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Compose Response
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Template
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleTemplateChange("acknowledgment")}
                    className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                      responseData.template === "acknowledgment"
                        ? "border-[#47216b] bg-purple-50 text-[#47216b]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium text-sm">Acknowledgment</div>
                    <div className="text-xs text-gray-500">
                      Thank you for inquiry
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTemplateChange("consultation")}
                    className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                      responseData.template === "consultation"
                        ? "border-[#47216b] bg-purple-50 text-[#47216b]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium text-sm">Consultation</div>
                    <div className="text-xs text-gray-500">
                      Schedule a meeting
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTemplateChange("quote")}
                    className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                      responseData.template === "quote"
                        ? "border-[#47216b] bg-purple-50 text-[#47216b]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium text-sm">Quote Request</div>
                    <div className="text-xs text-gray-500">Send proposal</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTemplateChange("custom")}
                    className={`p-3 text-left border rounded-lg transition-colors duration-200 ${
                      responseData.template === "custom"
                        ? "border-[#47216b] bg-purple-50 text-[#47216b]"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium text-sm">Custom</div>
                    <div className="text-xs text-gray-500">Write your own</div>
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={responseData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47216b] focus:border-transparent transition-all duration-200"
                  placeholder="Enter email subject"
                />
              </div>

              {/* Content */}
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="12"
                    value={responseData.content}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#47216b] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter your response message"
                  />
                  
                  <div className="text-xs text-gray-500 mt-1">
                    Use <span className="font-mono">{'{{name}}'}</span>, <span className="font-mono">{'{{organization}}'}</span>, <span className="font-mono">{'{{services}}'}</span> for dynamic content
                  </div>
                </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  to={`/cms/query/${id}`}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </Link>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setResponseData({
                        subject: "",
                        content: "",
                        template: "custom",
                      });
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Clear
                  </button>

                  <button
                    type="submit"
                    disabled={
                      sending ||
                      !responseData.subject.trim() ||
                      !responseData.content.trim()
                    }
                    className="bg-[#47216b] hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Send Response
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSQueryResponse;
