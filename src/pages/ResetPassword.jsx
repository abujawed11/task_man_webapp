import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Lottie from 'lottie-react';
import mascot from '../assets/mascot.json';
import Tilt from 'react-parallax-tilt';

function ResetPassword({ baseUrl }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Get email and OTP from localStorage (set by ForgotPassword component)
    const resetEmail = localStorage.getItem('resetPasswordEmail');
    const resetOtp = localStorage.getItem('resetPasswordOtp');
    
    if (!resetEmail || !resetOtp) {
      toast.error('Invalid reset session. Please start over.');
      navigate('/forgot-password');
    } else {
      setEmail(resetEmail);
      setOtp(resetOtp);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${baseUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword: formData.newPassword
      });

      // Clear localStorage after successful reset
      localStorage.removeItem('resetPasswordEmail');
      localStorage.removeItem('resetPasswordOtp');

      setIsSuccess(true);
      toast.success('Password reset successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password. Please try again.';
      toast.error(message);
      
      if (message.includes('Invalid') || message.includes('expired')) {
        setTimeout(() => navigate('/forgot-password'), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `peer w-full px-4 pt-6 pb-2 pr-12 rounded-xl border text-black bg-white/70 backdrop-blur-sm shadow-inner placeholder-transparent 
     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] transition-all duration-300 
     ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

  const labelClass = `absolute left-3 top-2 text-sm text-gray-600 transition-all 
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center p-4 transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="transition-transform duration-300">
            <div className="w-full bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-yellow-300 hover:shadow-yellow-400/50 active:shadow-yellow-400/50">
              <div className="text-center">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-black drop-shadow-xl mb-2">Password Reset Complete</h2>
                  <p className="text-gray-700 mb-8">
                    Your password has been successfully reset. You can now login with your new password.
                  </p>
                </div>
                
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-xl shadow-xl hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go to Login
                </Link>
              </div>
            </div>
          </Tilt>

          <div className="hidden md:flex items-center justify-center">
            <Lottie animationData={mascot} loop={true} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    );
  }

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
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="transition-transform duration-300">
            <div className="w-full bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-yellow-300 hover:shadow-yellow-400/50 active:shadow-yellow-400/50">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-extrabold text-black drop-shadow-xl">Reset Your Password</h2>
                <p className="text-gray-700 mt-2">Enter your new password below</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className={inputClass('newPassword')}
                    disabled={isLoading}
                  />
                  <label htmlFor="newPassword" className={labelClass}>New Password</label>
                  
                  <div
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-yellow-500 transition"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>

                  {errors.newPassword && <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={inputClass('confirmPassword')}
                    disabled={isLoading}
                  />
                  <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
                  
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-yellow-500 transition"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>

                  {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-xl shadow-xl hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-yellow-500 underline transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </Tilt>

          <div className="hidden md:flex items-center justify-center">
            <Lottie animationData={mascot} loop={true} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;