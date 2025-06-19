import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup({baseUrl}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  //const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      // Replace with actual API call to backend (e.g., /api/auth/signup)
      // const response = {
      //   user: {
      //     id: 1,
      //     username: formData.username,
      //     email: formData.email,
      //     phoneNumber: formData.phoneNumber,
      //     role: formData.role,
      //   },
      //   token: 'dummy-jwt-token',
      // };

      // signup(response.user, response.token);
      // toast.success('Registration successful!');
      // navigate('/login');
      // console.log("Signing Up......")
      const response = await axios.post(`${baseUrl}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        password: formData.password,
      });
      //signup(response.data.user, response.data.token);
      // toast.success('Registration successful! Please log in.');
      // navigate('/login');
      toast.success('Registration successful! Please log in.', {
        autoClose: 1000, // Toast closes after 2 seconds
        onClose: () => navigate('/login'), // Navigate after toast closes
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-black">Register for TaskApp</h2>
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
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                // defaultValue={"Please select role"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
              >
                <option value="" disabled>Please select role</option>
                <option value="Software Developer">Software Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Designer">Product Designer</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Content Writer">Content Writer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="HR Professional">HR Professional</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Enter your password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Signup;

