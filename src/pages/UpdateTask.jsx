// import { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../context/AuthContext';

// function UpdateTask({ baseUrl }) {
//   const { user } = useContext(AuthContext);
//   const { taskId } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState(null);
//   const [status, setStatus] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [priority, setPriority] = useState('Medium');
//   const [audio, setAudio] = useState(null);
//   const [file, setFile] = useState(null);

//   const fetchTask = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`${baseUrl}/api/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTask(res.data);
//       setStatus(res.data.status);
//       setTitle(res.data.title);
//       setDescription(res.data.description);
//       setDueDate(res.data.due_date?.split('T')[0] || '');
//       setPriority(res.data.priority);
//     } catch (error) {
//       toast.error('Failed to fetch task');
//     }
//   };

//   useEffect(() => {
//     fetchTask();
//   }, [taskId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('status', status);

//       if (user?.username === task?.created_by) {
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('due_date', dueDate);
//         formData.append('priority', priority);
//       }
//       if (audio) formData.append('audio', audio);
//       if (file) formData.append('file', file);

//       await axios.put(`${baseUrl}/api/tasks/${id}/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       toast.success('Task updated');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Update failed');
//     }
//   };

//   if (!task) return <div className="text-center mt-10 text-black">Loading task...</div>;

//   const isCreator = user?.username === task.created_by;
//   const isAssignee = user?.username === task.assigned_to;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow">
//       <h2 className="text-xl font-semibold text-black mb-4">Update Task</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {isCreator && (
//           <>
//             <div>
//               <label className="text-black block">Title</label>
//               <input
//                 className="w-full border px-3 py-2 rounded"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="text-black block">Description</label>
//               <textarea
//                 className="w-full border px-3 py-2 rounded"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               ></textarea>
//             </div>
//             <div>
//               <label className="text-black block">Due Date</label>
//               <input
//                 type="date"
//                 className="w-full border px-3 py-2 rounded"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="text-black block">Priority</label>
//               <select
//                 className="w-full border px-3 py-2 rounded"
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//               >
//                 <option>Low</option>
//                 <option>Medium</option>
//                 <option>High</option>
//               </select>
//             </div>
//           </>
//         )}

//         {isAssignee && (
//           <div>
//             <label className="text-black block">Status</label>
//             <select
//               className="w-full border px-3 py-2 rounded"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option>Pending</option>
//               <option>In Progress</option>
//               <option>Completed</option>
//             </select>
//           </div>
//         )}

//         <div>
//           <label className="text-black block">Add Audio (Optional)</label>
//           <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} />
//         </div>

//         <div>
//           <label className="text-black block">Attach File (Optional)</label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//         </div>

//         <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//           Update Task
//         </button>
//       </form>
//     </div>
//   );
// }

// export default UpdateTask;

// import { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../context/AuthContext';
// import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/solid';
// import { useLocation } from 'react-router-dom';




// function UpdateTask({ baseUrl }) {
//     const { user } = useContext(AuthContext);
//     const { taskId } = useParams();
//     const navigate = useNavigate();
//     const [comment, setComment] = useState('');
//     const [task, setTask] = useState(null);
//     const [status, setStatus] = useState('');
//     const [title, setTitle] = useState('');
//     const [assignedTo, setAssignedTo] = useState('')
//     const [description, setDescription] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [priority, setPriority] = useState('Medium');
//     const [audioBlob, setAudioBlob] = useState(null);
//     const [file, setFile] = useState(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const [mediaRecorder, setMediaRecorder] = useState(null);
//     const [recordingTime, setRecordingTime] = useState(0);
//     const [recordingInterval, setRecordingInterval] = useState(null);
//     const [users, setUsers] = useState([]);
//     const location = useLocation();
//     const from = location.state?.from || 'dashboard'; // fallback

//     const fetchTask = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.get(`${baseUrl}/api/tasks/${taskId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             console.log(res.data)
//             setTask(res.data);
//             setStatus(res.data.status);
//             setTitle(res.data.title);
//             setDescription(res.data.description);
//             setDueDate(res.data.due_date?.split('T')[0] || '');
//             setPriority(res.data.priority);
//             setAssignedTo(res.data.assigned_to)
//         } catch (error) {
//             toast.error('Failed to fetch task');
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) throw new Error('No token found');

//             const response = await axios.get(`${baseUrl}/api/tasks/list`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setUsers(response.data);

//         } catch (error) {
//             toast.error('Failed to load users');
//             console.error('Fetch users error:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTask();
//         fetchUsers();
//     }, [taskId]);

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             const recorder = new MediaRecorder(stream);
//             let chunks = [];

//             recorder.ondataavailable = (e) => chunks.push(e.data);
//             recorder.onstop = () => {
//                 const audio = new Blob(chunks, { type: 'audio/webm' });
//                 setAudioBlob(audio);
//                 stream.getTracks().forEach((track) => track.stop());
//             };

//             recorder.start();
//             setMediaRecorder(recorder);
//             setIsRecording(true);
//             setRecordingTime(0);
//             const interval = setInterval(() => {
//                 setRecordingTime((prev) => prev + 1);
//             }, 1000);
//             setRecordingInterval(interval);
//         } catch (err) {
//             toast.error('Could not access microphone');
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.stop();
//         }
//         setIsRecording(false);
//         clearInterval(recordingInterval);
//     };

//     const handleFileChange = (e) => setFile(e.target.files[0]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const formData = new FormData();
//             formData.append('status', status);
//             formData.append('comment', comment); // ✅ always append comment

//             if (user?.username === task?.created_by) {
//                 formData.append('title', title);
//                 formData.append('description', description);
//                 formData.append('due_date', dueDate);
//                 formData.append('priority', priority);
//                 formData.append('assigned_to', assignedTo);
//             }
//             if (audioBlob) formData.append('audio', audioBlob);
//             if (file) formData.append('file', file);

//             await axios.put(`${baseUrl}/api/tasks/${taskId}/update`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Task updated');
//             navigate('/dashboard');
//         } catch (error) {
//             toast.error('Update failed');
//         }
//     };

//     if (!task) return <div className="text-center mt-10 text-black">Loading task...</div>;

//     const isCreator = (user?.username === task.created_by) && (user?.accountType !== "Super Admin");
//     const isAssignee = (user?.username === task.assigned_to) || (user?.accountType === "Super Admin");
//     console.log(user)
//     // console.log(isAssignee)
//     // console.log(isCreator)

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow">
//             <h2 className="text-xl font-semibold text-black mb-4">Update Task</h2>
//             <button
//                 type="button"
//                 onClick={() => {
//                     if (from === 'myTasks') navigate('/tasks/my-tasks');
//                     else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
//                     else if (from === 'adminTasks') navigate('/admin/tasks/all');
//                     else navigate('/dashboard');
//                 }}
//                 className="flex items-center text-gray-600 hover:text-black mb-4"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back
//             </button>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {isCreator && (
//                     <>
//                         <div>
//                             <label className="text-black block">Title</label>
//                             <input
//                                 className="w-full border px-3 py-2 rounded"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-black block">Description</label>
//                             <textarea
//                                 className="w-full border px-3 py-2 rounded"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label className="text-black block">Due Date</label>
//                             <input
//                                 type="date"
//                                 className="w-full border px-3 py-2 rounded"
//                                 value={dueDate}
//                                 onChange={(e) => setDueDate(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-black block">Priority</label>
//                             <select
//                                 className="w-full border px-3 py-2 rounded"
//                                 value={priority}
//                                 onChange={(e) => setPriority(e.target.value)}
//                             >
//                                 <option>Low</option>
//                                 <option>Medium</option>
//                                 <option>High</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="text-black block">Assigned To</label>
//                             <select
//                                 className="w-full border px-3 py-2 rounded"
//                                 value={assignedTo}
//                                 onChange={(e) => setAssignedTo(e.target.value)}
//                             >

//                                 {users && users.map((username, index) => (
//                                     <option key={index} value={username}>
//                                         {username}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </>
//                 )}

//                 {isAssignee && (
//                     <div>
//                         <label className="text-black block">Status</label>
//                         <select
//                             className="w-full border px-3 py-2 rounded"
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}
//                         >
//                             <option>Pending</option>
//                             <option>In Progress</option>
//                             <option>Completed</option>
//                         </select>
//                         {/* <label className="text-black block">Comment</label>
//                         <textarea
//                             className="w-full border px-3 py-2 rounded"
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                         ></textarea> */}
//                     </div>

//                 )}

//                 <label className="text-black block">Comment</label>
//                 <textarea
//                     className="w-full border px-3 py-2 rounded"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                 ></textarea>


//                 {/* Audio Notes */}
//                 <div>
//                     <label className="block text-sm font-medium text-black mb-2">
//                         Audio Notes
//                     </label>
//                     <div className="flex items-center space-x-4">
//                         <button
//                             type="button"
//                             onClick={isRecording ? stopRecording : startRecording}
//                             className={`flex items-center px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
//                                 } transition disabled:bg-gray-600 sm:text-sm`}
//                         >
//                             <MicrophoneIcon className="h-5 w-5 mr-2" />
//                             <span>{isRecording ? `Stop Recording (${recordingTime}s)` : 'Record Audio'}</span>
//                         </button>
//                         {audioBlob && (
//                             <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs" />
//                         )}
//                     </div>
//                 </div>

//                 {/* File Attachment */}
//                 <div>
//                     <label htmlFor="file-upload" className="block text-sm font-medium text-black">
//                         Attach File (PDF, JPG, PNG)
//                     </label>
//                     <div className="mt-1 flex items-center">
//                         <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer sm:text-sm">
//                             <PaperClipIcon className="h-5 w-5 mr-2" />
//                             <span>{file ? file.name : 'Choose File'}</span>
//                             <input
//                                 id="file-upload"
//                                 name="file"
//                                 type="file"
//                                 accept=".pdf,.jpg,.jpeg,.png"
//                                 onChange={handleFileChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>
//                 </div>

//                 <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
//                     Update Task
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default UpdateTask;


import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { MicrophoneIcon, PaperClipIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Tilt from 'react-parallax-tilt';

function UpdateTask({ baseUrl }) {
  const { user } = useContext(AuthContext);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || 'dashboard';

  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [audioBlob, setAudioBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);
  const [users, setUsers] = useState([]);
  const [initialTask, setInitialTask] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(res.data);
        setStatus(res.data.status);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDueDate(res.data.due_date?.split('T')[0] || '');
        setPriority(res.data.priority);
        setAssignedTo(res.data.assigned_to);
        setInitialTask({
          title: res.data.title,
          description: res.data.description,
          due_date: res.data.due_date?.split('T')[0] || '',
          priority: res.data.priority,
          assigned_to: res.data.assigned_to,
          status: res.data.status,
        });
        // console.log(initialTask)
      } catch (error) {
        toast.error('Failed to fetch task');
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/tasks/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error('Failed to load users');
      }
    };

    fetchTask();
    fetchUsers();
  }, [taskId, baseUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const audio = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(audio);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
      setRecordingInterval(interval);
    } catch (err) {
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
    setIsRecording(false);
    clearInterval(recordingInterval);
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('status', status);
      formData.append('comment', comment);

      if (user?.username === task?.created_by || user?.accountType === "Super Admin") {
        formData.append('title', title);
        formData.append('description', description);
        formData.append('due_date', dueDate);
        formData.append('priority', priority);
        formData.append('assigned_to', assignedTo);
      }
      if (audioBlob) formData.append('audio', audioBlob);
      if (file) formData.append('file', file);

      await axios.put(`${baseUrl}/api/tasks/${taskId}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Task updated');
      navigate('/dashboard');
    } catch {
      toast.error('Update failed');
    }
  };

  if (!task) return <div className="text-center mt-10 text-black">Loading task...</div>;

  //   const isCreator = user?.username === task.created_by && user?.accountType !== 'Super Admin';
  //   const isAssignee = user?.username === task.assigned_to || user?.accountType === 'Super Admin';

  const isCreator = user?.username === task.created_by || user?.accountType === 'Super Admin';
  //   console.log("Created By:",task.created_by)
  //   console.log("Account Type:",user?.accountType)

  const isAssignee = user?.username === task.assigned_to;

  // const isSuperAdmin = user?.accountType === 'Super Admin';
  // const isLatestAssigner = user?.username === task.assigned_by;
  // const canEditAllFields = isSuperAdmin || isLatestAssigner;

  //const isCreatorOrSuperAdmin = user?.username === task?.created_by || user?.accountType === "Super Admin";

  const hasChangedByCreator = isCreator &&
    (
      title !== initialTask.title ||
      description !== initialTask.description ||
      dueDate !== initialTask.due_date ||
      priority !== initialTask.priority ||
      assignedTo !== initialTask.assigned_to ||
      status !== initialTask.status ||
      comment.trim() !== '' ||
      audioBlob ||
      file
    );

  const hasChangedByAssignee = isAssignee &&
    (
      comment.trim() !== '' ||
      audioBlob ||
      file
    );
  // console.log('Initial:', initialTask);
  // console.log('Current:', { title, description, dueDate, priority, assignedTo, status,comment,audioBlob,file });


  const canUpdate = hasChangedByCreator || hasChangedByAssignee;
  // console.log(canUpdate)
  // console.log(comment.trim() !== '')
  // console.log(hasChangedByAssignee)
  // console.log("isAssignee: ", isAssignee)


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white flex items-center justify-center px-4 py-10">
      <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full max-w-3xl">
        <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-yellow-200 hover:shadow-yellow-400/50">
          <div className="flex items-center mb-6">
            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </button>
            </Tilt>
            <h2 className="text-3xl font-bold text-black text-center flex-1">Update Task</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isCreator && (
              <>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                  <div className="relative hover:shadow-yellow-400/50">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    />
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
                      Title
                    </label>
                  </div>
                </Tilt>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                  <div className="relative hover:shadow-yellow-400/50">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder=" "
                      rows="4"
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    />
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
                      Description
                    </label>
                  </div>
                </Tilt>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                  <div className="relative hover:shadow-yellow-400/50">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    />
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
                      Due Date
                    </label>
                  </div>
                </Tilt>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                  <div className="relative hover:shadow-yellow-400/50">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    >
                      <option value="" hidden>Select Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                      Priority
                    </label>
                  </div>
                </Tilt>
                <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                  <div className="relative hover:shadow-yellow-400/50">
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    >
                      <option value="" hidden>Select User</option>
                      {users
                        .filter((u) => u !== task?.created_by) // ✅ Exclude task creator
                        .map((u, i) => (
                          <option key={i} value={u}>
                            {u}
                          </option>
                        ))}
                    </select>
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                      Assign To
                    </label>
                  </div>
                  {/* <div className="relative hover:shadow-yellow-400/50">
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                    >
                      <option value="" hidden>Select User</option>
                      {users.map((u, i) => <option key={i} value={u}>{u}</option>)}
                    </select>
                    <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                      Assign To
                    </label>
                  </div> */}
                </Tilt>
              </>
            )}

            {isAssignee && (
              <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
                <div className="relative hover:shadow-yellow-400/50">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                  >
                    <option value="" hidden>Select Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-focus:text-yellow-500">
                    Status
                  </label>
                </div>
              </Tilt>
            )}

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="relative hover:shadow-yellow-400/50">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder=" "
                  rows="4"
                  className="peer w-full px-4 pt-6 pb-2 rounded-lg border text-black bg-white/70 shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 border-gray-300 focus:shadow-yellow-400/60"
                />
                <label className="absolute left-3 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-500">
                  Comment
                </label>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="flex items-center gap-4 hover:shadow-yellow-400/50">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center px-4 py-2 rounded-md text-white ${isRecording ? 'bg-red-600' : 'bg-black'} hover:opacity-90 transition hover:-translate-y-[2px] hover:shadow-yellow-300/60 animate-float`}
                >
                  <MicrophoneIcon className="h-5 w-5 mr-2" />
                  {isRecording ? `Stop (${recordingTime}s)` : 'Record Audio'}
                </button>
                {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs" />}
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              <div className="hover:shadow-yellow-400/50">
                <label className="block text-sm text-black mb-1">Attach File</label>
                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer hover:-translate-y-[2px] hover:shadow-yellow-300/50 animate-float transition">
                  <PaperClipIcon className="h-5 w-5 mr-2" />
                  <span>{file ? file.name : 'Choose File'}</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
              {/* <button
                type="submit"
                className="w-full py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
              >
                Update Task
              </button> */}
              <button
                type="submit"
                disabled={!canUpdate}
                className={`w-full py-2 font-bold rounded-lg transition hover:-translate-y-[2px] animate-float ${canUpdate ? 'bg-black text-yellow-400 hover:bg-gray-900 hover:shadow-yellow-400/50 shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Update Task
              </button>
            </Tilt>
          </form>
        </div>
      </Tilt>
    </div>
  );
}

export default UpdateTask;

