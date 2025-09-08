import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_BASEURL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('resetPasswordEmail');
      localStorage.removeItem('resetPasswordOtp');
      
      // Show one toast message only
      toast.error('Session expired. Please log in again.', {
        toastId: 'session-expired', // Prevent duplicate toasts
        autoClose: 3000,
      });
      
      // Call global logout function if available
      if (window.authLogout) {
        window.authLogout();
      }
      
      // Redirect to login page
      setTimeout(() => {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }, 1000);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;