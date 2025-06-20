import { useState, useContext,  useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Importing eye icons

function Login({ baseUrl }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

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

  const inputClass = (field) =>
    `peer w-full px-4 pt-6 pb-2 pr-12 rounded-lg border text-black bg-white shadow-sm placeholder-transparent 
     focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 
     ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

  const labelClass = `absolute left-3 top-2 text-sm text-gray-500 transition-all 
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center p-4">
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-black drop-shadow-xl">Login to TaskApp</h2>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 transition transform hover:scale-[1.01] hover:shadow-yellow-400/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={inputClass('username')}
                ref={usernameRef}
              />
              <label htmlFor="username" className={labelClass}>Username</label>
              {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={inputClass('password')}
              />
              <label htmlFor="password" className={labelClass}>Password</label>
              <div
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-yellow-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:-translate-y-[2px] active:translate-y-0 transition"
              >
                Login
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-black">
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  className="inline-block bg-yellow-500 text-black px-4 py-1.5 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg font-semibold transform hover:-translate-y-0.5 transition"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
