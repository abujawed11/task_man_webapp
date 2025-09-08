import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { ArrowLeft, Mail } from 'lucide-react';
import Lottie from 'lottie-react';
import mascot from '../assets/mascot.json';
import Tilt from 'react-parallax-tilt';

function ForgotPassword({ baseUrl }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post('/api/auth/forgot-password', { email });
      setIsEmailSent(true);
      toast.success('OTP sent to your email successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('OTP is required');
      toast.error('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      toast.error('OTP must be 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      // Store email and otp in localStorage to pass to reset password page
      localStorage.setItem('resetPasswordEmail', email);
      localStorage.setItem('resetPasswordOtp', otp);
      
      toast.success('OTP verified! Redirecting to reset password...');
      navigate('/reset-password');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid OTP. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const inputClass = `peer w-full px-4 pt-6 pb-2 pr-12 rounded-xl border text-black bg-white/70 backdrop-blur-sm shadow-inner placeholder-transparent 
     focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] transition-all duration-300 
     ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

  const labelClass = `absolute left-3 top-2 text-sm text-gray-600 transition-all 
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

  if (isEmailSent) {
    return (
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
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-black drop-shadow-xl mb-2">Enter OTP</h2>
                <p className="text-gray-700 mb-2">
                  We've sent a 6-digit OTP to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Enter the OTP below to reset your password
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter OTP"
                    className={inputClass}
                    disabled={isLoading}
                    maxLength="6"
                  />
                  <label htmlFor="otp" className={labelClass}>6-Digit OTP</label>
                  {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-xl shadow-xl hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className="space-y-2 text-center">
                  <button
                    type="button"
                    onClick={() => {setIsEmailSent(false); setEmail(''); setOtp(''); setError('');}}
                    className="text-sm text-gray-600 hover:text-yellow-500 underline transition-colors duration-200"
                  >
                    Try Different Email
                  </button>
                  
                  <div>
                    <Link
                      to="/login"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-yellow-500 underline transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Login
                    </Link>
                  </div>
                </div>
              </form>
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
                <h2 className="text-4xl font-extrabold text-black drop-shadow-xl">Forgot Password</h2>
                <p className="text-gray-700 mt-2">Enter your email to reset your password</p>
              </div>

              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className={inputClass}
                    disabled={isLoading}
                  />
                  <label htmlFor="email" className={labelClass}>Email Address</label>
                  {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-xl shadow-xl hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
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

export default ForgotPassword;