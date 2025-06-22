// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// function Login({baseUrl}) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     try {
//       // Placeholder: Simulate API call
//       // Replace with actual API call to backend (e.g., /api/auth/login)
//       // const response = {
//       //   user: {
//       //     id: 1,
//       //     username: formData.username,
//       //     email: 'placeholder@example.com',
//       //     role: 'Software Developer',
//       //   },
//       //   token: 'dummy-jwt-token',
//       // };

//       // login(response.user, response.token);
//       // toast.success('Login successful!');
//       // navigate('/dashboard');
//       const response = await axios.post(`${baseUrl}/api/auth/login`, {
//         username: formData.username,
//         password: formData.password,
//       });
//       login(response.data.user, response.data.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');



//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="text-center text-3xl font-bold text-black">Login to TaskApp</h2>
//         </div>
//         <div className="mt-8 space-y-6 bg-yellow-100 p-6 rounded-lg shadow-md">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-black">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your username"
//               />
//               {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-black">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your password"
//               />
//               {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//               <div className="mt-2 flex items-center">
//                 <input
//                   id="showPassword"
//                   type="checkbox"
//                   checked={showPassword}
//                   onChange={toggleShowPassword}
//                   className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="showPassword" className="ml-2 text-sm text-black">
//                   Show Password
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={handleSubmit}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//             >
//               Login
//             </button>
//           </div>
//           <div className="text-center">
//             <p className="text-sm text-black">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-yellow-500 hover:text-yellow-600 font-medium">
//                 Register
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* <ToastContainer /> */}
//     </div>
//   );
// }

// export default Login;

// import { useState, useContext, useRef, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { Eye, EyeOff } from 'lucide-react'; // 👈 Importing eye icons

// function Login({ baseUrl }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const usernameRef = useRef(null);

//   useEffect(() => {
//     usernameRef.current?.focus();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     try {
//       // Placeholder: Simulate API call
//       // Replace with actual API call to backend (e.g., /api/auth/login)
//       // const response = {
//       //   user: {
//       //     id: 1,
//       //     username: formData.username,
//       //     email: 'placeholder@example.com',
//       //     role: 'Software Developer',
//       //   },
//       //   token: 'dummy-jwt-token',
//       // };

//       // login(response.user, response.token);
//       // toast.success('Login successful!');
//       // navigate('/dashboard');
//       const response = await axios.post(`${baseUrl}/api/auth/login`, {
//         username: formData.username,
//         password: formData.password,
//       });
//       const u = response.data.user;
//       console.log("user data",u)
//       login(response.data.user, response.data.token);
//       // login({
//       //   id: u.user_id,                        // ✅ what your app expects now
//       //   username: u.username,
//       //   email: u.email,
//       //   phoneNumber: u.phone_number,          // ✅ convert to camelCase
//       //   role: u.role,
//       //   accountType: u.accountType || u.account_type, // 👈 safe fallback
//       // }, response.data.token);
//       toast.success('Login successful!');
//       navigate('/dashboard');



//     } catch (error) {
//       toast.error('Login failed. Please check your credentials.');
//     }
//   };

//   const inputClass = (field) =>
//     `peer w-full px-4 pt-6 pb-2 pr-12 rounded-lg border text-black bg-white shadow-sm placeholder-transparent 
//      focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 
//      ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

//   const labelClass = `absolute left-3 top-2 text-sm text-gray-500 transition-all 
//     peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
//     peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center p-4">
//       <style>{`
//         @keyframes shake {
//           0% { transform: translateX(0); }
//           25% { transform: translateX(-4px); }
//           50% { transform: translateX(4px); }
//           75% { transform: translateX(-4px); }
//           100% { transform: translateX(0); }
//         }
//         .animate-shake {
//           animation: shake 0.3s ease-in-out;
//         }
//       `}</style>

//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <h2 className="text-4xl font-extrabold text-black drop-shadow-xl">Login to TaskApp</h2>
//         </div>
//         <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 transition transform hover:scale-[1.01] hover:shadow-yellow-400/50">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Username Field */}
//             <div className="relative">
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 className={inputClass('username')}
//                 ref={usernameRef}
//               />
//               <label htmlFor="username" className={labelClass}>Username</label>
//               {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
//             </div>

//             {/* Password Field with Eye Toggle */}
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className={inputClass('password')}
//               />
//               <label htmlFor="password" className={labelClass}>Password</label>
//               <div
//                 onClick={toggleShowPassword}
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-yellow-500 transition"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </div>
//               {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
//             </div>

//             {/* Login Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:-translate-y-[2px] active:translate-y-0 transition"
//               >
//                 Login
//               </button>
//             </div>

//             {/* Register Link */}
//             <div className="text-center">
//               <p className="text-sm text-black">
//                 Don&apos;t have an account?{' '}
//                 <Link
//                   to="/signup"
//                   className="inline-block bg-yellow-500 text-black px-4 py-1.5 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg font-semibold transform hover:-translate-y-0.5 transition"
//                 >
//                   Register
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* <ToastContainer /> */}
//     </div>
//   );
// }

// export default Login;


import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
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
            <div className="w-full bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-yellow-300">
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

                  {/* ✅ Only one working toggle icon */}
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



