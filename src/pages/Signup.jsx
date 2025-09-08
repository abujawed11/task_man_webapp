// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// //import { AuthContext } from '../context/AuthContext.jsx';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axiosInstance from '../utils/axios';

// function Signup({baseUrl}) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   //const { signup } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error for the field being edited
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
//     if (!formData.role) newErrors.role = 'Role is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
//       // Replace with actual API call to backend (e.g., /api/auth/signup)
//       // const response = {
//       //   user: {
//       //     id: 1,
//       //     username: formData.username,
//       //     email: formData.email,
//       //     phoneNumber: formData.phoneNumber,
//       //     role: formData.role,
//       //   },
//       //   token: 'dummy-jwt-token',
//       // };

//       // signup(response.user, response.token);
//       // toast.success('Registration successful!');
//       // navigate('/login');
//       // console.log("Signing Up......")
//       const response = await axiosInstance.post(`${baseUrl}/api/auth/signup`, {
//         username: formData.username,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         role: formData.role,
//         password: formData.password,
//       });
//       //signup(response.data.user, response.data.token);
//       // toast.success('Registration successful! Please log in.');
//       // navigate('/login');
//       toast.success('Registration successful! Please log in.', {
//         autoClose: 1000, // Toast closes after 2 seconds
//         onClose: () => navigate('/login'), // Navigate after toast closes
//       });
//     } catch (error) {
//       toast.error('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="text-center text-3xl font-bold text-black">Register for TaskApp</h2>
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
//               <label htmlFor="email" className="block text-sm font-medium text-black">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your email"
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>
//             <div>
//               <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 type="tel"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your phone number"
//               />
//               {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
//             </div>
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-black">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 // defaultValue={"Please select role"}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//               >
//                 <option value="" disabled>Please select role</option>
//                 <option value="Software Developer">Software Developer</option>
//                 <option value="UI/UX Designer">UI/UX Designer</option>
//                 <option value="Product Designer">Product Designer</option>
//                 <option value="Marketing Specialist">Marketing Specialist</option>
//                 <option value="Content Writer">Content Writer</option>
//                 <option value="Project Manager">Project Manager</option>
//                 <option value="Business Analyst">Business Analyst</option>
//                 <option value="Quality Assurance">Quality Assurance</option>
//                 <option value="DevOps Engineer">DevOps Engineer</option>
//                 <option value="Data Analyst">Data Analyst</option>
//                 <option value="Digital Marketing">Digital Marketing</option>
//                 <option value="Sales Executive">Sales Executive</option>
//                 <option value="HR Professional">HR Professional</option>
//               </select>
//               {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-black">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your password"
//               />
//               {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//             </div>
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={handleSubmit}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* <ToastContainer /> */}
//     </div>
//   );
// }

// export default Signup;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axiosInstance from '../utils/axios';

// function Signup({ baseUrl = 'http://localhost:5000' }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//     password: '',
//     confirmPassword: '',
//     accountType: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [inviteCode, setInviteCode] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
//     if (!formData.role) newErrors.role = 'Role is required';
//     if (!formData.accountType) newErrors.accountType = 'Account type is required';
//     if (!otp) newErrors.otp = 'OTP is required. Please click "Send OTP" to receive one.';
//     if (formData.accountType === 'Super Admin' && !inviteCode) newErrors.inviteCode = 'Invite code is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error('Enter a valid email first');
//       return;
//     }
//     try {
//       await axiosInstance.post(`${baseUrl}/api/auth/send-otp`, { email: formData.email });
//       setOtpSent(true);
//       toast.success('OTP sent to your email!');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to send OTP');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
//     try {
//       const response = await axiosInstance.post(`${baseUrl}/api/auth/signup`, {
//         username: formData.username,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         role: formData.role,
//         password: formData.password,
//         otp,
//         inviteCode: formData.accountType === 'Super Admin' ? inviteCode : null,
//         accountType: formData.accountType,
//       });
//       toast.success('Registration successful! Please log in.', {
//         autoClose: 1000,
//         onClose: () => navigate('/login'),
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <h2 className="text-center text-3xl font-bold text-black">Register for TaskApp</h2>
//         <div className="mt-8 space-y-6 bg-yellow-100 p-6 rounded-lg shadow-md">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-black">Username</label>
//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your username"
//               />
//               {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black">Email</label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your email"
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black">Phone Number</label>
//               <input
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your phone number"
//               />
//               {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black">Account Type</label>
//               <select
//                 name="accountType"
//                 value={formData.accountType}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//               >
//                 <option value="" disabled>
//                   Select Account Type
//                 </option>
//                 <option value="User">User</option>
//                 <option value="Super Admin">Super Admin</option>
//               </select>
//               {errors.accountType && <p className="mt-1 text-sm text-red-600">{errors.accountType}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//               >
//                 <option value="" disabled>
//                   Please select role
//                 </option>
//                 <option value="Software Developer">Software Developer</option>
//                 <option value="UI/UX Designer">UI/UX Designer</option>
//                 <option value="Product Designer">Product Designer</option>
//                 <option value="Marketing Specialist">Marketing Specialist</option>
//                 <option value="Content Writer">Content Writer</option>
//                 <option value="Project Manager">Project Manager</option>
//                 <option value="Business Analyst">Business Analyst</option>
//                 <option value="Quality Assurance">Quality Assurance</option>
//                 <option value="DevOps Engineer">DevOps Engineer</option>
//                 <option value="Data Analyst">Data Analyst</option>
//                 <option value="Digital Marketing">Digital Marketing</option>
//                 <option value="Sales Executive">Sales Executive</option>
//                 <option value="HR Professional">HR Professional</option>
//               </select>
//               {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
//             </div>

//             <button
//               onClick={handleSendOtp}
//               className="w-full py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition"
//             >
//               Send OTP
//             </button>

//             {otpSent && (
//               <div>
//                 <label className="block text-sm font-medium text-black">OTP</label>
//                 <input
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                   placeholder="Enter OTP"
//                 />
//                 {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
//               </div>
//             )}

//             {formData.accountType === 'Super Admin' && (
//               <div>
//                 <label className="block text-sm font-medium text-black">Invite Code</label>
//                 <input
//                   value={inviteCode}
//                   onChange={(e) => setInviteCode(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                   placeholder="Enter Invite Code"
//                 />
//                 {errors.inviteCode && <p className="mt-1 text-sm text-red-600">{errors.inviteCode}</p>}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-black">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Enter your password"
//               />
//               {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-black"
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//             </div>
//           </div>
//           <button
//             onClick={handleSubmit}
//             className="w-full py-2 px-4 mt-4 rounded-md text-white bg-black hover:bg-gray-800 transition"
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axiosInstance from '../utils/axios';

// function Signup({ baseUrl = 'http://localhost:5000' }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     role: '',
//     password: '',
//     confirmPassword: '',
//     accountType: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [inviteCode, setInviteCode] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
//     if (!formData.role) newErrors.role = 'Role is required';
//     if (!formData.accountType) newErrors.accountType = 'Account type is required';
//     if (!otp) newErrors.otp = 'OTP is required. Please click "Send OTP" to receive one.';
//     if (formData.accountType === 'Super Admin' && !inviteCode) newErrors.inviteCode = 'Invite code is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error('Enter a valid email first');
//       return;
//     }
//     try {
//       await axiosInstance.post(`${baseUrl}/api/auth/send-otp`, { email: formData.email });
//       setOtpSent(true);
//       toast.success('OTP sent to your email!');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to send OTP');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }
//     try {
//       const response = await axiosInstance.post(`${baseUrl}/api/auth/signup`, {
//         username: formData.username,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         role: formData.role,
//         password: formData.password,
//         otp,
//         inviteCode: formData.accountType === 'Super Admin' ? inviteCode : null,
//         accountType: formData.accountType,
//       });
//       toast.success('Registration successful! Please log in.', {
//         autoClose: 1000,
//         onClose: () => navigate('/login'),
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
//     }
//   };

//   const labelClass = `absolute left-3 top-2 text-sm text-gray-500 transition-all \
//     peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 \
//     peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

//   const inputClass = (field) =>
//     `peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white shadow-sm placeholder-transparent \
//      focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 \
//      ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'}`;

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

//       <div className="w-full max-w-xl space-y-6">
//         <h2 className="text-center text-4xl font-extrabold text-black drop-shadow-xl">Register for TaskApp</h2>
//         <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 transition transform hover:scale-[1.01] hover:shadow-yellow-400/50">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {['username', 'email', 'phoneNumber'].map((field) => (
//               <div key={field} className="relative">
//                 <input
//                   name={field}
//                   type="text"
//                   value={formData[field]}
//                   onChange={handleChange}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   className={inputClass(field)}
//                 />
//                 <label className={labelClass}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                 {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
//               </div>
//             ))}

//             <div className="relative">
//               <select
//                 name="accountType"
//                 value={formData.accountType}
//                 onChange={handleChange}
//                 className={inputClass('accountType')}
//               >
//                 <option value="" hidden>Select Account Type</option>
//                 <option value="User">User</option>
//                 <option value="Super Admin">Super Admin</option>
//               </select>
//               <label className={labelClass}>Account Type</label>
//               {errors.accountType && <p className="text-sm text-red-600 mt-1">{errors.accountType}</p>}
//             </div>

//             <div className="relative">
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className={inputClass('role')}
//               >
//                 <option value="" hidden>Select Role</option>
//                 {[ 'Software Developer', 'UI/UX Designer', 'Product Designer',
//                    'Marketing Specialist', 'Content Writer', 'Project Manager',
//                    'Business Analyst', 'Quality Assurance', 'DevOps Engineer',
//                    'Data Analyst', 'Digital Marketing', 'Sales Executive', 'HR Professional'
//                 ].map((r) => <option key={r} value={r}>{r}</option>)}
//               </select>
//               <label className={labelClass}>Role</label>
//               {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
//             </div>

//             <button
//               type="button"
//               onClick={handleSendOtp}
//               className="w-full py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition"
//             >
//               Send OTP
//             </button>

//             {otpSent && (
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   placeholder="OTP"
//                   className={inputClass('otp')}
//                 />
//                 <label className={labelClass}>OTP</label>
//                 {errors.otp && <p className="text-sm text-red-600 mt-1">{errors.otp}</p>}
//               </div>
//             )}

//             {formData.accountType === 'Super Admin' && (
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={inviteCode}
//                   onChange={(e) => setInviteCode(e.target.value)}
//                   placeholder="Invite Code"
//                   className={inputClass('inviteCode')}
//                 />
//                 <label className={labelClass}>Invite Code</label>
//                 {errors.inviteCode && <p className="text-sm text-red-600 mt-1">{errors.inviteCode}</p>}
//               </div>
//             )}

//             {['password', 'confirmPassword'].map((field) => (
//               <div key={field} className="relative">
//                 <input
//                   type="password"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
//                   className={inputClass(field)}
//                 />
//                 <label className={labelClass}>{field === 'password' ? 'Password' : 'Confirm Password'}</label>
//                 {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
//               </div>
//             ))}

//             <button
//               type="submit"
//               className="w-full py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transform hover:-translate-y-[2px] active:translate-y-0 transition"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Tilt from 'react-parallax-tilt';

function Signup({ baseUrl = 'http://localhost:5000' }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: '',
    confirmPassword: '',
    accountType: '',
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.accountType) newErrors.accountType = 'Account type is required';
    if (!otp) newErrors.otp = 'OTP is required. Please click "Send OTP" to receive one.';
    if (formData.accountType === 'Super Admin' && !inviteCode) newErrors.inviteCode = 'Invite code is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Enter a valid email first');
      return;
    }
    try {
      await axiosInstance.post(`${baseUrl}/api/auth/send-otp`, { email: formData.email });
      setOtpSent(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    try {
      const response = await axiosInstance.post(`${baseUrl}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        password: formData.password,
        otp,// 🔐 Bypass actual OTP entry
        inviteCode: formData.accountType === 'Super Admin' ? inviteCode : null,
        accountType: formData.accountType,
      });
      toast.success('Registration successful! Please log in.', {
        autoClose: 1000,
        onClose: () => navigate('/login'),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/.test(password)) return 'Strong';
    return 'Medium';
  };

  const strength = getPasswordStrength(formData.password);

  const labelClass = `absolute left-3 top-2 text-sm text-gray-500 transition-all \
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 \
    peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500`;

  const inputClass = (field) =>
    `peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent \
     focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 \
     ${errors[field] ? 'border-red-500 animate-shake' : 'border-gray-300'} focus:shadow-yellow-400/60`;

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

      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} className="w-full max-w-xl">
        <div className="space-y-6 bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 transition transform hover:scale-[1.02] hover:shadow-yellow-400/50">
          <h2 className="text-center text-4xl font-extrabold text-black drop-shadow-xl">Register for TaskApp</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {['username', 'email', 'phoneNumber'].map((field) => (
              <div key={field} className="relative">
                <input
                  name={field}
                  type="text"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={inputClass(field)}
                />
                <label className={labelClass}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div className="relative">
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className={inputClass('accountType')}
              >
                <option value="" hidden>Select Account Type</option>
                <option value="User">User</option>
                <option value="Super Admin">Super Admin</option>
              </select>
              <label className={labelClass}>Account Type</label>
              {errors.accountType && <p className="text-sm text-red-600 mt-1">{errors.accountType}</p>}
            </div>

            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClass('role')}
              >
                <option value="" hidden>Select Role</option>
                {[ 'Software Developer', 'UI/UX Designer', 'Product Designer',
                   'Marketing Specialist', 'Content Writer', 'Project Manager',
                   'Business Analyst', 'Quality Assurance', 'DevOps Engineer',
                   'Data Analyst', 'Digital Marketing', 'Sales Executive', 'HR Professional', 'Founder', 'Co-Founder'
                ].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <label className={labelClass}>Role</label>
              {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition"
            >
              Send OTP
            </button>

            {otpSent && (
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className={inputClass('otp')}
                />
                <label className={labelClass}>OTP</label>
                {errors.otp && <p className="text-sm text-red-600 mt-1">{errors.otp}</p>}
              </div>
            )}

            {formData.accountType === 'Super Admin' && (
              <div className="relative">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="Super-Admin Invite Code"
                  className={inputClass('inviteCode')}
                />
                <label className={labelClass}>Invite Code</label>
                {errors.inviteCode && <p className="text-sm text-red-600 mt-1">{errors.inviteCode}</p>}
              </div>
            )}

            {['password', 'confirmPassword'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === 'password' ? 'Password' : 'Confirm Password'}
                  className={inputClass(field)}
                />
                <label className={labelClass}>{field === 'password' ? 'Password' : 'Confirm Password'}</label>
                <div
                  onClick={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition"
                >
                  {(field === 'password' ? showPassword : showConfirmPassword)
                    ? <EyeSlashIcon className="h-5 w-5 text-yellow-500" />
                    : <EyeIcon className="h-5 w-5 text-yellow-500" />}
                </div>
                {errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
              </div>
            ))}

            {formData.password && (
              <div className="text-sm mt-1">
                <span className={`font-semibold ${
                  strength === 'Weak' ? 'text-red-500' : strength === 'Medium' ? 'text-yellow-500' : 'text-green-600'
                }`}>
                  Password Strength: {strength}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transform transition hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              Register
            </button>
          </form>
        </div>
      </Tilt>
    </div>
  );
}

export default Signup;



