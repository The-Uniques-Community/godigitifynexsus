import axios from 'axios';

export const logoutAdmin = async () => {
  try {
    // Call logout endpoint to destroy session on server
    await axios.post('http://localhost:5000/api/admin/logout', {}, {
      withCredentials: true
    });
  } catch (error) {
    console.error('Logout API error:', error);
    // Continue with local cleanup even if API call fails
  } finally {
    // Always clean up local storage
    localStorage.removeItem('adminInfo');
    
    // Redirect to login
    window.location.href = '/auth';
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/admin/verify-session', {
      withCredentials: true
    });
    return response.data.success && response.data.isAuthenticated;
  } catch (error) {
    return false;
  }
};

export const getAdminInfo = () => {
  try {
    const adminInfo = localStorage.getItem('adminInfo');
    return adminInfo ? JSON.parse(adminInfo) : null;
  } catch (error) {
    console.error('Error parsing admin info:', error);
    return null;
  }
};
