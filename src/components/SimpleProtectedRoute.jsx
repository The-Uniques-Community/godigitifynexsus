import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SimpleProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Simple check - just look for admin info in localStorage
        const adminInfo = localStorage.getItem('adminInfo');
        console.log('SimpleProtectedRoute - checking auth, adminInfo:', adminInfo);
        
        if (adminInfo) {
          try {
            const parsed = JSON.parse(adminInfo);
            console.log('Parsed admin info:', parsed);
            setIsAuthenticated(true);
          } catch (e) {
            console.error('Error parsing admin info:', e);
            localStorage.removeItem('adminInfo');
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  console.log('SimpleProtectedRoute state:', { isLoading, isAuthenticated, pathname: location.pathname });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47216b] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  console.log('Authenticated, rendering children');
  return children;
};

export default SimpleProtectedRoute;
