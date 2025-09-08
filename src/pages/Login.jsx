
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { Eye, EyeOff } from 'lucide-react';
import Lottie from 'lottie-react';
import mascot from '../assets/mascot.json';
import Tilt from 'react-parallax-tilt';

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
      const response = await axiosInstance.post('/api/auth/login', {
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
    `peer w-full px-4 pt-6 pb-2 pr-12 rounded-xl border text-black bg-white/70 backdrop-blur-sm shadow-inner placeholder-transparent 
     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] transition-all duration-300 
     ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

  const labelClass = `absolute left-3 top-2 text-sm text-gray-600 transition-all 
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center p-4 transition-colors duration-500">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
          {/* Form Section */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="transition-transform duration-300">
            <div className="w-full bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-yellow-300 hover:shadow-yellow-400/50 active:shadow-yellow-400/50">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-extrabold text-black drop-shadow-xl">Login to TaskApp</h2>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Username */}
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

                {/* Password */}
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
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-yellow-500 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>

                  {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-xl shadow-xl hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition"
                >
                  Login
                </button>

                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-600 hover:text-yellow-500 underline transition-colors duration-200"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="text-center">
                  <p className="text-sm text-black">
                    Don't have an account?{' '}
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
          </Tilt>

          {/* Mascot Section */}
          <div className="hidden md:flex items-center justify-center">
            <Lottie animationData={mascot} loop={true} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



