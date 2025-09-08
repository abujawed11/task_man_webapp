// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axios';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { DocumentIcon, PlayIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
// import TaskUpdateCard from '../components/TaskUpdateCard';


// function TaskProgress({ baseUrl }) {
//   const { taskId } = useParams();
//   const [updates, setUpdates] = useState([]);
//   // const [updates, setUpdates] = useState([]);
//   const [task, setTask] = useState(null);

//   const location = useLocation();
//   const from = location.state?.from || 'dashboard'; // fallback
//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchUpdates = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axiosInstance.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // setUpdates(res.data);
//         setUpdates(res.data.updates);
//         setTask(res.data.task);
//       } catch (error) {
//         console.error('Error fetching task updates:', error);
//       }
//     };
//     fetchUpdates();
//   }, [taskId]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <button
//         type="button"
//         onClick={() => {
//           if (from === 'myTasks') navigate('/tasks/my-tasks');
//           else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
//           else navigate('/dashboard');
//         }}
//         className="flex items-center text-gray-600 hover:text-black mb-4"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         Back
//       </button>
//       <h2 className="text-2xl font-bold mb-6 text-black">Task Progress</h2>
//       <div className="relative border-l-2 border-gray-300 ml-4">

//         {task && (
//           <div className="mb-10 ml-6 relative">
//             {/* Dot */}
//             <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-30px] top-1.5 border-2 border-white"></div>

//             <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200">
//               <div className="text-sm text-gray-600 mb-2">
//                 <strong>Created By:</strong> {task.created_by} <span className="mx-2">|</span>
//                 <strong>Assigned To:</strong> {task.assigned_to} <span className="mx-2">|</span>
//                 <strong>Status:</strong> {task.status}
//               </div>
//               <div className="text-black font-semibold text-lg mb-1">{task.title}</div>
//               <div className="text-gray-800 mb-1">{task.description}</div>
//               <div className="text-sm text-gray-500">
//                 <strong>Priority:</strong> {task.priority} <span className="mx-2">|</span>
//                 <strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}
//               </div>
//               <div className="text-sm text-gray-400 mt-1">
//                 Created at: {new Date(task.created_at).toLocaleString()}
//               </div>
//             </div>
//           </div>
//         )}


//         {updates && updates.map((update, index) => (
//           <div key={index} className="mb-10 ml-6 relative">
//             {updates && updates.map((update, index) => (
//               <TaskUpdateCard key={index} update={update} baseUrl={baseUrl}/>
//             ))}



//             {/* Dot */}
//             {/* <div className="absolute w-4 h-4 bg-yellow-500 rounded-full left-[-30px] top-1.5 border-2 border-white"></div>

//             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
//               <div className="flex items-center mb-2 text-sm text-gray-600">
//                 <UserIcon className="h-4 w-4 mr-1" /> {update.updated_by}
//                 <span className="mx-2">|</span>
//                 <CalendarIcon className="h-4 w-4 mr-1" /> {new Date(update.updated_at).toLocaleString()}
//               </div>

//               {update.comment && <p className="text-black mb-2">{update.comment}</p>}

//               {update.audio_path && (
//                 <div className="mb-2">
//                   <audio controls src={`/${update.audio_path}`} className="w-full" />
//                 </div>
//               )}

//               {update.file_path && (
//                 <div>
//                   <a
//                     href={`/${update.file_path}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline flex items-center"
//                   >
//                     <DocumentIcon className="h-5 w-5 mr-1" /> View Attachment
//                   </a>
//                 </div>
//               )}
//             </div> */}
//           </div>
//         ))}
//         {updates.length === 0 && <p className="text-gray-500 ml-4">No updates yet for this task.</p>}
//       </div>
//     </div>
//   );
// }

// export default TaskProgress;


// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axios';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { DocumentIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
// import TaskUpdateCard from '../components/TaskUpdateCard'; // 👈 your custom card

// function TaskProgress({ baseUrl }) {
//   const { taskId } = useParams();
//   const [updates, setUpdates] = useState([]);
//   const [task, setTask] = useState(null);
//   const location = useLocation();
//   const from = location.state?.from || 'dashboard';
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUpdates = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axiosInstance.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUpdates(res.data.updates || []);
//         setTask(res.data.task || null);
//       } catch (error) {
//         console.error('Error fetching task updates:', error);
//       }
//     };
//     fetchUpdates();
//   }, [taskId]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <button
//         type="button"
//         onClick={() => {
//           if (from === 'myTasks') navigate('/tasks/my-tasks');
//           else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
//           else navigate('/dashboard');
//         }}
//         className="flex items-center text-gray-600 hover:text-black mb-4"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         Back
//       </button>

//       <h2 className="text-2xl font-bold mb-6 text-black">Task Progress</h2>

//       <div className="relative border-l-2 border-gray-300 ml-6">
//         {/* 🔵 Original Task Card */}
//         {task && (
//           <div className="mb-10 relative">
//             <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-30px] top-1.5 border-2 border-white"></div>

//             <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200">
//               <div className="text-sm text-gray-600 mb-2">
//                 <strong>Created By:</strong> {task.created_by} <span className="mx-2">|</span>
//                 <strong>Assigned To:</strong> {task.assigned_to} <span className="mx-2">|</span>
//                 <strong>Status:</strong> {task.status}
//               </div>
//               <div className="text-black font-semibold text-lg mb-1">{task.title}</div>
//               <div className="text-gray-800 mb-1">{task.description}</div>
//               <div className="text-sm text-gray-500">
//                 <strong>Priority:</strong> {task.priority} <span className="mx-2">|</span>
//                 <strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}
//               </div>
//               <div className="text-sm text-gray-400 mt-1">
//                 Created at: {new Date(task.created_at).toLocaleString()}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 🟡 Update Cards */}
//         {updates && updates.length > 0 ? (
//           updates.map((update, index) => (
//             <TaskUpdateCard key={index} update={update} />
//           ))
//         ) : (
//           <p className="text-gray-500 ml-4 mt-6">No updates yet for this task.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TaskProgress;



// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axios';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeftIcon,
//   UserIcon,
//   CalendarIcon,
//   FireIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   DocumentIcon,
// } from '@heroicons/react/24/solid';
// import TaskUpdateCard from '../components/TaskUpdateCard';

// function TaskProgress({ baseUrl }) {
//   const { taskId } = useParams();
//   const [updates, setUpdates] = useState([]);
//   const [task, setTask] = useState(null);
//   const location = useLocation();
//   const from = location.state?.from || 'dashboard';
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUpdates = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axiosInstance.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUpdates(res.data.updates || []);
//         setTask(res.data.task || null);
//       } catch (error) {
//         console.error('Error fetching task updates:', error);
//       }
//     };
//     fetchUpdates();
//   }, [taskId, baseUrl]);

//   // Format date
//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   // Get priority icon
//   const getPriorityIcon = (priority) => {
//     switch (priority) {
//       case 'High':
//         return <FireIcon className="h-5 w-5 text-red-500" />;
//       case 'Medium':
//         return <FireIcon className="h-5 w-5 text-yellow-500" />;
//       case 'Low':
//         return <FireIcon className="h-5 w-5 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Pending':
//         return <ClockIcon className="h-5 w-5 text-gray-500" />;
//       case 'In Progress':
//         return <ClockIcon className="h-5 w-5 text-blue-500" />;
//       case 'Completed':
//         return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}
//         <button
//           type="button"
//           onClick={() => {
//             if (from === 'myTasks') navigate('/tasks/my-tasks');
//             else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
//             else navigate('/dashboard');
//           }}
//           className="flex items-center text-black hover:text-yellow-500 mb-6 transition sm:text-sm"
//         >
//           <ArrowLeftIcon className="h-5 w-5 mr-2" />
//           Back
//         </button>

//         {/* Header */}
//         <h2 className="text-3xl font-bold text-black mb-8 text-center">Task Progress</h2>

//         {/* Timeline */}
//         <div className="relative border-l-4 border-yellow-500 pl-8">
//           {/* Original Task Card */}
//           {task && (
//             <div className="mb-12 relative">
//               <div className="absolute w-5 h-5 bg-yellow-500 rounded-full left-[-22px] top-3 border-2 border-white shadow-md"></div>
//               <div className="bg-white border border-yellow-500 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">
//                 <div className="bg-yellow-100 p-4 rounded-t-lg border-b border-yellow-500">
//                   <h3 className="text-xl font-bold text-black truncate">{task.title}</h3>
//                 </div>
//                 <div className="p-4 space-y-3">
//                   <p className="text-black text-sm">{task.description || 'No description'}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//                     <div className="flex items-center">
//                       <UserIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                       <span>Created By: {task.created_by}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <UserIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                       <span>Assigned To: {task.assigned_to}</span>
//                     </div>
//                     <div className="flex items-center">
//                       {getStatusIcon(task.status)}
//                       <span className="ml-2">Status: {task.status}</span>
//                     </div>
//                     <div className="flex items-center">
//                       {getPriorityIcon(task.priority)}
//                       <span className="ml-2">Priority: {task.priority}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                       <span>Due: {formatDate(task.due_date)}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                       <span>Created: {formatDate(task.created_at)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Update Cards */}
//           {updates.length > 0 ? (
//             updates.map((update, index) => (
//               <TaskUpdateCard key={index} update={update} baseUrl={baseUrl} />
//             ))
//           ) : (
//             <div className="text-center text-black text-sm mt-8">
//               <DocumentIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//               <p>No updates yet for this task.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskProgress;


// import { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axios';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import {
//   ArrowLeftIcon,
//   UserIcon,
//   CalendarIcon,
//   FireIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   DocumentIcon,
// } from '@heroicons/react/24/solid';
// import TaskUpdateCard from '../components/TaskUpdateCard';

// function TaskProgress({ baseUrl }) {
//   const { taskId } = useParams();
//   const [updates, setUpdates] = useState([]);
//   const [task, setTask] = useState(null);
//   const location = useLocation();
//   const from = location.state?.from || 'dashboard';
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUpdates = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axiosInstance.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUpdates(res.data.updates || []);
//         setTask(res.data.task || null);
//       } catch (error) {
//         console.error('Error fetching task updates:', error);
//       }
//     };
//     fetchUpdates();
//   }, [taskId, baseUrl]);

//   // Format date
//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   // Get priority icon
//   const getPriorityIcon = (priority) => {
//     switch (priority) {
//       case 'High':
//         return <FireIcon className="h-5 w-5 text-red-500" />;
//       case 'Medium':
//         return <FireIcon className="h-5 w-5 text-yellow-500" />;
//       case 'Low':
//         return <FireIcon className="h-5 w-5 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Pending':
//         return <ClockIcon className="h-5 w-5 text-gray-500" />;
//       case 'In Progress':
//         return <ClockIcon className="h-5 w-5 text-blue-500" />;
//       case 'Completed':
//         return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}
//         <button
//           type="button"
//           onClick={() => {
//             if (from === 'myTasks') navigate('/tasks/my-tasks');
//             else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
//             else if (from === 'adminTasks') navigate('/admin/tasks/all');
//             else navigate('/dashboard');
//           }}
//           className="flex items-center text-black hover:text-yellow-500 mb-6 transition sm:text-sm"
//         >
//           <ArrowLeftIcon className="h-5 w-5 mr-2" />
//           Back
//         </button>

//         {/* Header */}
//         <h2 className="text-3xl font-bold text-black mb-8 text-center">Task Progress</h2>

//         {/* Timeline */}
//         <div className="relative border-l-4 border-yellow-500 pl-8">
//           {/* Original Task Card */}
//           {task && (
//             <div className="mb-12 relative">
//               <div className="absolute w-5 h-5 bg-blue-500 rounded-full left-[-22px] top-3 border-2 border-white shadow-md"></div>
//               <div className="bg-white border border-blue-500 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">
//                 <div className="bg-blue-100 p-4 rounded-t-lg border-b border-blue-500">
//                   <h3 className="text-xl font-bold text-black truncate">{task.title}</h3>
//                 </div>
//                 <div className="p-4 space-y-3">
//                   <p className="text-black text-sm">{task.description || 'No description'}</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//                     <div className="flex items-center">
//                       <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
//                       <span>Created By: {task.created_by}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
//                       <span>Assigned To: {task.assigned_to}</span>
//                     </div>
//                     <div className="flex items-center">
//                       {getStatusIcon(task.status)}
//                       <span className="ml-2">Status: {task.status}</span>
//                     </div>
//                     <div className="flex items-center">
//                       {getPriorityIcon(task.priority)}
//                       <span className="ml-2">Priority: {task.priority}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
//                       <span>Due: {formatDate(task.due_date)}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
//                       <span>Created: {formatDate(task.created_at)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Update Cards */}
//           {updates.length > 0 ? (
//             updates.map((update, index) => (
//               <TaskUpdateCard key={index} update={update} baseUrl={baseUrl} assigned_to={task.assigned_to}/>
//             ))
//           ) : (
//             <div className="text-center text-black text-sm mt-8">
//               <DocumentIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//               <p>No updates yet for this task.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskProgress;

import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserIcon,
  CalendarIcon,
  FireIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid';
import TaskUpdateCard from '../components/TaskUpdateCard';
import Tilt from 'react-parallax-tilt';

function TaskProgress({ baseUrl }) {
  const { taskId } = useParams();
  const [updates, setUpdates] = useState([]);
  const [task, setTask] = useState(null);
  const location = useLocation();
  const from = location.state?.from || 'dashboard';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpdates = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axiosInstance.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUpdates(res.data.updates || []);
        setTask(res.data.task || null);
        // console.log(res.data.task)
      } catch (error) {
        console.error('Error fetching task updates:', error);
      }
    };
    fetchUpdates();
  }, [taskId, baseUrl]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return <FireIcon className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <FireIcon className="h-5 w-5 text-yellow-500" />;
      case 'Low':
        return <FireIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
      case 'In Progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Updated Back Button */}

        {/* Updated Back Button */}
        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
          <button
            type="button"
            onClick={() => {
              if (from === 'myTasks') navigate('/tasks/my-tasks');
              else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
              else if (from === 'adminTasks') navigate('/admin/tasks/all');
              else if (from === 'noti') navigate('/notifications');
              else navigate('/dashboard');
            }}
            className="flex items-center px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>
        </Tilt>

        {/* Header */}
        <h2 className="text-3xl font-bold text-black mb-8 text-center">Task Progress</h2>

        {/* Timeline */}
        <div className="relative border-l-4 border-yellow-500 pl-8">
          {/* Task Card */}
          {task && (
            <div className="mb-12 relative">
              <div className="absolute w-5 h-5 bg-blue-500 rounded-full left-[-22px] top-3 border-2 border-white shadow-md"></div>
              <div className="bg-white border border-blue-500 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">

                {/* Header */}
                <div className="bg-yellow-400 p-4 rounded-t-lg border-b border-yellow-500">
                  <h3 className="text-xl font-bold text-black truncate">{task.title}</h3>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-black text-sm">{task.description || 'No description'}</p>

                  {/* Info Grid */}
                  {/* Info Section using Flex Layout to prevent right-side gap */}
                  <div className="flex flex-col sm:flex-row justify-between text-sm gap-8 w-full">
                    {/* Left Column */}
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Created By: {task.created_by}</span>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(task.status)}
                        <span className="ml-2">Status: {task.status}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Due: {formatDate(task.due_date)}</span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Assigned To: {task.assigned_to}</span>
                      </div>
                      <div className="flex items-center">
                        {getPriorityIcon(task.priority)}
                        <span className="ml-2">Priority: {task.priority}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Created: {formatDate(task.created_at)}</span>
                      </div>
                    </div>
                  </div>


                  {/* Audio and File in a single row */}
                  {(task.audio_path || task.file_path) && (
                    <div className="mt-4 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 w-full">

                        {/* Audio Note */}
                        {task.audio_path && (
                          <div className="flex flex-col w-full sm:w-1/2">
                            <span className="font-medium text-sm text-black mb-1">Audio Note:</span>
                            <audio
                              controls
                              src={`${baseUrl}/${task.audio_path}`}
                              className="w-full"
                            />
                          </div>
                        )}

                        {/* Attached File */}
                        {task.file_path && (
                          <div className="flex flex-col w-full sm:w-1/2">
                            <span className="font-medium text-sm text-black mb-1">Attached File:</span>
                            {task.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
                              <a
                                href={`${baseUrl}/${task.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`${baseUrl}/${task.file_path}`}
                                  alt="Task Attachment"
                                  className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                                />
                              </a>
                            ) : (
                              <a
                                href={`${baseUrl}/${task.file_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-500 hover:text-yellow-600 text-sm underline"
                              >
                                Download {task.file_path.split('/').pop()}
                              </a>
                            )}
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}


          {/* Update Cards */}
          {(updates.length > 1) ? (
            [...updates]
              .filter(update => !update.is_system_generated) // ✅ exclude system-generated updates
              .reverse()
              .map((update, index) => (
                <TaskUpdateCard
                  key={index}
                  update={update}
                  baseUrl={baseUrl}
                  assigned_to={task.assigned_to}
                />
              ))
          ) : (
            <div className="text-center text-black text-sm mt-8">
              <DocumentIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
              <p>No updates yet for this task.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default TaskProgress;
