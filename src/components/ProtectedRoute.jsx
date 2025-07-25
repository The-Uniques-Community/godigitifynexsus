import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = not authenticated
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if we have admin info in localStorage
        const adminInfo = localStorage.getItem('adminInfo');
        if (!adminInfo) {
          console.log('No admin info in localStorage');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify session with backend
        try {
          const response = await axios.get('http://localhost:5000/api/admin/verify-session', {
            withCredentials: true // Important for session cookie
          });

          console.log('Session verification response:', response.data);

          if (response.data.success && response.data.isAuthenticated) {
            setIsAuthenticated(true);
            
            // Update admin info if it's different
            if (response.data.admin) {
              localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
            }
          } else {
            // Session expired or invalid
            console.log('Session invalid or expired');
            localStorage.removeItem('adminInfo');
            setIsAuthenticated(false);
          }
        } catch (sessionError) {
          console.error('Session verification endpoint error:', sessionError);
          
          // If the verify-session endpoint doesn't exist or server is down,
          // temporarily allow access if we have localStorage info (for development)
          if (sessionError.response?.status === 404 || sessionError.code === 'ECONNREFUSED') {
            console.log('Session endpoint not available, using localStorage fallback');
            setIsAuthenticated(true); // Temporarily allow access
          } else if (sessionError.response?.status === 401 || sessionError.response?.status === 403) {
            localStorage.removeItem('adminInfo');
            setIsAuthenticated(false);
          } else {
            // For other errors, use localStorage as fallback
            console.log('Using localStorage fallback for auth');
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        
        // For network errors, try to use localStorage as fallback
        const adminInfo = localStorage.getItem('adminInfo');
        setIsAuthenticated(!!adminInfo);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]); // Re-check when route changes

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Authenticated - render protected content
  return children;
};

export default ProtectedRoute;
