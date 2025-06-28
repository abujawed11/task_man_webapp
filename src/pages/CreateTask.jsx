// import { useState, useEffect, useRef, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { MicrophoneIcon, PaperClipIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';


// function CreateTask({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   //console.log('👤 Logged-in user:', user); // ✅ Add this here
//   const navigate = useNavigate();
//   // const [formData, setFormData] = useState({
//   //   title: '',
//   //   description: '',
//   //   priority: '',
//   //   status: '',
//   //   assigned_to: '',
//   // });
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: '',
//     assigned_to: '',
//     due_date: '',
//   });
//   const [users, setUsers] = useState([]);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [file, setFile] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const timerRef = useRef(null);

//   // Fetch users for dropdown
//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       if (!token) throw new Error('No token found');
//   //       const response = await axios.get(`${baseUrl}/api/users/list`, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
//   //       setUsers(response.data);
//   //     } catch (error) {
//   //       toast.error('Failed to load users');
//   //       console.error('Fetch users error:', error);
//   //     }
//   //   };
//   //   if (user && !loading) fetchUsers();
//   // }, [user, loading, baseUrl]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const response = await axios.get(`${baseUrl}/api/tasks/list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // console.log(response.data)

//         //console.log('Fetched users:', response.data); // 👈 check shape here
//         // setUsers(Array.isArray(response.data) ? response.data : response.data.users);
//         setUsers(response.data);

//       } catch (error) {
//         toast.error('Failed to load users');
//         console.error('Fetch users error:', error);
//       }
//     };

//     if (user && !loading) fetchUsers();
//   }, []);


//   // Handle audio recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mimeType = MediaRecorder.isTypeSupported('audio/mp3') ? 'audio/mp3' : 'audio/webm';
//       mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) audioChunksRef.current.push(e.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
//         setAudioBlob(audioBlob);
//         stream.getTracks().forEach((track) => track.stop());
//         clearInterval(timerRef.current);
//         setRecordingTime(0);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       timerRef.current = setInterval(() => {
//         setRecordingTime((prev) => prev + 1);
//       }, 1000);
//     } catch (error) {
//       toast.error('Failed to start recording. Please allow microphone access.');
//       console.error('Recording error:', error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file input
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
//       toast.error('File size exceeds 5MB limit');
//       return;
//     }
//     setFile(selectedFile);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     if (!formData.title || !formData.assigned_to) {
//       toast.error('Title and assigned user are required');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found');
//       const data = new FormData();
//       data.append('title', formData.title);
//       data.append('description', formData.description);
//       data.append('priority', formData.priority);
//       data.append('assigned_to', formData.assigned_to);
//       data.append('due_date', formData.due_date);
//       //data.append('status', 'Pending'); // ✅ hardcoded
//       if (audioBlob) data.append('audio', audioBlob, `audio-note.${audioBlob.type.split('/')[1]}`);
//       if (file) data.append('file', file);

//       await axios.post(`${baseUrl}/api/tasks/create`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success('Task created successfully!');
//       setFormData({
//         title: '',
//         description: '',
//         priority: '',
//         //status: 'Pending',
//         assigned_to: '',
//       });
//       setAudioBlob(null);
//       setFile(null);
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create task');
//       console.error('Create task error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="flex items-center text-black hover:text-gray-700 mb-4"
//       >
//         <ArrowLeftIcon className="h-5 w-5 mr-1" />
//         Back to Dashboard
//       </button>
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-black mb-6 text-center">Create New Task</h2>
//         <form onSubmit={handleSubmit} className="space-y-6 bg-yellow-100 p-8 rounded-lg shadow-md">
//           {/* Title */}
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-black">
//               Title
//             </label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.title}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//               placeholder="Enter task title"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-black">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows="4"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.description}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//               placeholder="Enter task description"
//             />
//           </div>

//           {/* Priority */}
//           <div>
//             <label htmlFor="priority" className="block text-sm font-medium text-black">
//               Priority
//             </label>
//             <select
//               id="priority"
//               name="priority"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.priority}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//             >
//               <option value="" hidden>Select Priority</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           {/* Status
//           <div>
//             <label htmlFor="status" className="block text-sm font-medium text-black">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.status}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div> */}

//           {/* Due Date */}
//           <div>
//             <label htmlFor="due_date" className="block text-sm font-medium text-black">
//               Due Date
//             </label>
//             <input
//               id="due_date"
//               name="due_date"
//               type="date"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.due_date}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//             />
//           </div>

//           {/* Assigned To */}
//           <div>
//             <label htmlFor="assigned_to" className="block text-sm font-medium text-black">
//               Assign To
//             </label>
//             <select
//               id="assigned_to"
//               name="assigned_to"
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               value={formData.assigned_to}
//               onChange={handleInputChange}
//               disabled={isSubmitting}
//             >
//               <option value="" hidden>Select User to Assign</option>
//               {users && users.map((username, index) => (
//                 <option key={index} value={username}>
//                   {username}
//                 </option>
//               ))}
//               {/* <option value="">Select User</option>
//               {users && users.map((u) => (
//                 <option key={u.id} value={u.id}>
//                   {u.username}
//                 </option>
//               ))} */}
//               {/* {users && users.filter((u) => u.id !== user.id) // ✅ filter out current user
//                 .map((u) => (
//                   <option key={u.id} value={u.id}>
//                     {u.username}
//                   </option>
//                 ))} */}
//             </select>
//           </div>

//           {/* Audio Notes */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-2">
//               Audio Notes
//             </label>
//             <div className="flex items-center space-x-4">
//               <button
//                 type="button"
//                 onClick={isRecording ? stopRecording : startRecording}
//                 className={`flex items-center px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
//                   } transition disabled:bg-gray-600 sm:text-sm`}
//                 disabled={isSubmitting}
//               >
//                 <MicrophoneIcon className="h-5 w-5 mr-2" />
//                 <span>{isRecording ? `Stop Recording (${recordingTime}s)` : 'Record Audio'}</span>
//               </button>
//               {audioBlob && (
//                 <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs" />
//               )}
//             </div>
//           </div>

//           {/* File Attachment */}
//           <div>
//             <label htmlFor="file-upload" className="block text-sm font-medium text-black">
//               Attach File (PDF, JPG, PNG)
//             </label>
//             <div className="mt-1 flex items-center">
//               <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer sm:text-sm">
//                 <PaperClipIcon className="h-5 w-5 mr-2" />
//                 <span>{file ? file.name : 'Choose File'}</span>
//                 <input
//                   id="file-upload"
//                   name="file"
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                   disabled={isSubmitting}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition disabled:bg-gray-600 sm:text-sm"
//             >
//               {isSubmitting ? 'Creating Task...' : 'Create Task'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateTask;

// import { useState, useEffect, useRef, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { MicrophoneIcon, PaperClipIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
// import Tilt from 'react-parallax-tilt';

// function CreateTask({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     priority: '',
//     assigned_to: '',
//     due_date: '',
//   });
//   const [users, setUsers] = useState([]);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [file, setFile] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');
//         const response = await axios.get(`${baseUrl}/api/tasks/list`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         toast.error('Failed to load users');
//       }
//     };
//     if (user && !loading) fetchUsers();
//   }, [user, loading, baseUrl]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mimeType = MediaRecorder.isTypeSupported('audio/mp3') ? 'audio/mp3' : 'audio/webm';
//       mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (e) => {
//         if (e.data.size > 0) audioChunksRef.current.push(e.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
//         setAudioBlob(audioBlob);
//         stream.getTracks().forEach((track) => track.stop());
//         clearInterval(timerRef.current);
//         setRecordingTime(0);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//       timerRef.current = setInterval(() => {
//         setRecordingTime((prev) => prev + 1);
//       }, 1000);
//     } catch (error) {
//       toast.error('Failed to start recording. Please allow microphone access.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
//       toast.error('File size exceeds 5MB limit');
//       return;
//     }
//     setFile(selectedFile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     if (!formData.title || !formData.assigned_to) {
//       toast.error('Title and assigned user are required');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found');
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, val]) => data.append(key, val));
//       if (audioBlob) data.append('audio', audioBlob, `audio-note.${audioBlob.type.split('/')[1]}`);
//       if (file) data.append('file', file);

//       await axios.post(`${baseUrl}/api/tasks/create`, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success('Task created successfully!');
//       setFormData({ title: '', description: '', priority: '', assigned_to: '', due_date: '' });
//       setAudioBlob(null);
//       setFile(null);
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to create task');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>

//       <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center px-4 py-10">
//         {/* <button
//         onClick={() => navigate('/dashboard')}
//         className="flex items-center text-black hover:text-gray-700 mb-4"
//       >
//         <ArrowLeftIcon className="h-5 w-5 mr-1" />
//         Back to Dashboard
//       </button> */}
//         <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full max-w-3xl">
//           <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 hover:shadow-yellow-400/50">
//             <h2 className="text-3xl font-bold text-black text-center mb-6">Create New Task</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {['title', 'description', 'due_date'].map((field) => (
//                 <Tilt key={field} tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                   <div className="relative hover:shadow-yellow-400/50">
//                     {field !== 'description' ? (
//                       <input
//                         name={field}
//                         type={field === 'due_date' ? 'date' : 'text'}
//                         value={formData[field]}
//                         onChange={handleInputChange}
//                         placeholder=" "
//                         className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
//                       />
//                     ) : (
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         placeholder=" "
//                         rows="4"
//                         className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
//                       />
//                     )}
//                     <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
//                       {field === 'due_date' ? 'Due Date' : field.charAt(0).toUpperCase() + field.slice(1)}
//                     </label>
//                   </div>
//                 </Tilt>
//               ))}

//               <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                 <div className="relative hover:shadow-yellow-400/50">
//                   <select
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleInputChange}
//                     className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
//                   >
//                     <option value="" hidden>Select Priority</option>
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                   <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
//                     Priority
//                   </label>
//                 </div>
//               </Tilt>

//               <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                 <div className="relative hover:shadow-yellow-400/50">
//                   <select
//                     name="assigned_to"
//                     value={formData.assigned_to}
//                     onChange={handleInputChange}
//                     required
//                     className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
//                   >
//                     <option value="" hidden>Select User</option>
//                     {users.map((u, index) => (
//                       <option key={index} value={u}>{u}</option>
//                     ))}
//                   </select>
//                   <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
//                     Assign To
//                   </label>
//                 </div>
//               </Tilt>

//               <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                 <div className="flex items-center gap-4 hover:shadow-yellow-400/50">
//                   {/* <button
//                     type="button"
//                     onClick={isRecording ? stopRecording : startRecording}
//                     className={`flex items-center px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-600' : 'bg-black'} hover:opacity-90 transition hover:-translate-y-[2px] hover:shadow-yellow-300/60 animate-float`}
//                   > */}
//                   <button
//                     type="button"
//                     onClick={isRecording ? stopRecording : startRecording}
//                     className={`flex items-center px-4 py-2 rounded-md font-semibold transition hover:-translate-y-[2px] active:translate-y-0 animate-float
//                     ${isRecording
//                         ? 'bg-red-600 text-white hover:shadow-red-400/60'
//                         : 'bg-black text-yellow-400 hover:bg-gray-900 hover:shadow-yellow-400/50'
//                       }`}
//                   >
//                     <MicrophoneIcon className="h-5 w-5 mr-2" />
//                     {isRecording ? `Stop (${recordingTime}s)` : 'Record Audio'}
//                   </button>
//                   {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs" />}
//                 </div>
//               </Tilt>

//               <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                 <div className="hover:shadow-yellow-400/50">
//                   <label className="block text-sm text-black mb-1">Attach File</label>
//                   <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer hover:-translate-y-[2px] hover:shadow-yellow-300/50 animate-float transition">
//                     <PaperClipIcon className="h-5 w-5 mr-2" />
//                     <span>{file ? file.name : 'Choose File'}</span>
//                     <input
//                       type="file"
//                       // accept=".pdf,.jpg,.jpeg,.png"
//                       accept="*/*"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </Tilt>

//               <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] active:translate-y-0 animate-float"
//                 >
//                   {isSubmitting ? 'Creating...' : 'Create Task'}
//                 </button>
//               </Tilt>
//             </form>
//           </div>
//         </Tilt>
//       </div>
//     </>
//   );
// }

// export default CreateTask;


import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MicrophoneIcon, PaperClipIcon, TrashIcon } from '@heroicons/react/24/solid';
import Tilt from 'react-parallax-tilt';

function CreateTask({ baseUrl }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    assigned_to: '',
    due_date: '',
  });
  const [users, setUsers] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(`${baseUrl}/api/tasks/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to load users');
      }
    };
    if (user && !loading) fetchUsers();
  }, [user, loading, baseUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/mp3') ? 'audio/mp3' : 'audio/webm';
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(timerRef.current);
        setRecordingTime(0);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast.error('Failed to start recording. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    setFile(selectedFile);
  };

  const handleDeleteFile = () => {
    setFile(null);
    toast.success('File deleted');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!formData.title || !formData.assigned_to) {
      toast.error('Title and assigned user are required');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (audioBlob) data.append('audio', audioBlob, `audio-note.${audioBlob.type.split('/')[1]}`);
      if (file) data.append('file', file);

      await axios.post(`${baseUrl}/api/tasks/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Task created successfully!');
      setFormData({ title: '', description: '', priority: '', assigned_to: '', due_date: '' });
      setAudioBlob(null);
      setFile(null);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center px-4 py-10">
      <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full max-w-3xl">
        <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 hover:shadow-yellow-400/50">
          <h2 className="text-3xl font-bold text-black text-center mb-6">Create New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {['title', 'description', 'due_date'].map((field) => (
              <Tilt key={field} tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                <div className="relative hover:shadow-yellow-400/50">
                  {field !== 'description' ? (
                    <input
                      name={field}
                      type={field === 'due_date' ? 'date' : 'text'}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    />
                  ) : (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder=" "
                      rows="4"
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    />
                  )}
                  <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
                    {field === 'due_date' ? 'Due Date' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              </Tilt>
            ))}

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="relative hover:shadow-yellow-400/50">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                >
                  <option value="" hidden>Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                  Priority
                </label>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="relative hover:shadow-yellow-400/50">
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleInputChange}
                  required
                  className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                >
                  <option value="" hidden>Select User</option>
                  {users.map((u, index) => (
                    <option key={index} value={u}>{u}</option>
                  ))}
                </select>
                <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                  Assign To
                </label>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="flex items-center gap-4 hover:shadow-yellow-400/50">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center px-4 py-2 rounded-md font-semibold transition hover:-translate-y-[2px] active:translate-y-0 animate-float
                    ${isRecording
                      ? 'bg-red-600 text-white hover:shadow-red-400/60'
                      : 'bg-black text-yellow-400 hover:bg-gray-900 hover:shadow-yellow-400/50'
                    }`}
                >
                  <MicrophoneIcon className="h-5 w-5 mr-2" />
                  {isRecording ? `Stop (${recordingTime}s)` : 'Record Audio'}
                </button>
                {audioBlob && (
                  <div className="flex items-center gap-3 mt-2">
                    <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs rounded shadow" />
                    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
                      <button
                        type="button"
                        onClick={() => setAudioBlob(null)}
                        title="Delete Recording"
                        className="p-2 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-yellow-400 animate-float"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </Tilt>
                  </div>
                )}
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="hover:shadow-yellow-400/50">
                <label className="block text-sm text-black mb-1">Attach File</label>
                <div className="flex items-center gap-3 mt-2">
                  <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer hover:-translate-y-[2px] hover:shadow-yellow-400/50 animate-float transition">
                    <PaperClipIcon className="h-5 w-5 mr-2" />
                    <span>{file ? file.name : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="*/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        title="Delete File"
                        className="p-2 rounded-full bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-yellow-400 animate-float"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </Tilt>
                  )}
                </div>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] active:translate-y-0 animate-float"
              >
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </button>
            </Tilt>
          </form>
        </div>
      </Tilt>
    </div>
  );
}

export default CreateTask;