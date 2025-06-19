import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login({baseUrl}) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      // Placeholder: Simulate API call
      // Replace with actual API call to backend (e.g., /api/auth/login)
      // const response = {
      //   user: {
      //     id: 1,
      //     username: formData.username,
      //     email: 'placeholder@example.com',
      //     role: 'Software Developer',
      //   },
      //   token: 'dummy-jwt-token',
      // };

      // login(response.user, response.token);
      // toast.success('Login successful!');
      // navigate('/dashboard');
      const response = await axios.post(`${baseUrl}/api/auth/login`, {
        username: formData.username,
        password: formData.password,
      });
      login(response.data.user, response.data.token);
      toast.success('Login successful!');
      navigate('/dashboard');



    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-black">Login to TaskApp</h2>
        </div>
        <div className="mt-8 space-y-6 bg-yellow-100 p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Enter your username"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              <div className="mt-2 flex items-center">
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="showPassword" className="ml-2 text-sm text-black">
                  Show Password
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-black">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-500 hover:text-yellow-600 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
