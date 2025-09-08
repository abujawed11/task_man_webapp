// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axiosInstance from '../utils/axios';
// import { toast } from 'react-toastify';
// import {
//     FireIcon,
//     //   SnowflakeIcon,
//     ArrowDownIcon,
//     ClockIcon,
//     PlayIcon,
//     CheckCircleIcon,
//     CalendarIcon,
//     UserIcon,
//     DocumentArrowDownIcon,
//     MusicalNoteIcon,
//     ArrowLeftIcon
// } from '@heroicons/react/24/solid';

// function MyTasks({ baseUrl }) {
//     const { user, loading, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [tasks, setTasks] = useState([]);
//     const [expandedDescriptions, setExpandedDescriptions] = useState({});

//     // Fetch tasks assigned to the user
//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) throw new Error('No token found');
//                 const response = await axiosInstance.get(`${baseUrl}/api/tasks/assigned`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setTasks(response.data);
//             } catch (error) {
//                 toast.error('Failed to load tasks');
//                 console.error('Fetch tasks error:', error);
//             }
//         };
//         if (user && !loading) fetchTasks();
//     }, [user, loading, baseUrl]);

//     // Toggle description expansion
//     const toggleDescription = (taskId) => {
//         setExpandedDescriptions((prev) => ({
//             ...prev,
//             [taskId]: !prev[taskId],
//         }));
//     };

//     // Format date
//     const formatDate = (dateStr) => {
//         if (!dateStr) return 'N/A';
//         return new Date(dateStr).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         });
//     };

//     // Check if due date is overdue
//     const isOverdue = (dueDate) => {
//         if (!dueDate) return false;
//         return new Date(dueDate) < new Date();
//     };

//     if (loading) {
//         return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
//     }

//     return (
//         <>
//             <button
//                 onClick={() => navigate('/dashboard')}
//                 className="flex items-center text-black hover:text-gray-700 mb-4 ml-6 mt-4"
//             >
//                 <ArrowLeftIcon className="h-5 w-5 mr-1" />
//                 Back to Dashboard
//             </button>
//             <h1 className="text-3xl text-center font-bold text-black mb-2">MyTask Page</h1>
//             <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">


//                 <div className="max-w-7xl mx-auto">
//                     {tasks.length === 0 ? (
//                         <p className="text-black text-center text-lg">No tasks assigned to you.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {tasks.map((task) => (
//                                 <div
//                                     key={task.task_id}
//                                     className="bg-white border border-yellow-500 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition transform duration-300"
//                                 >
//                                     {/* Title */}
//                                     {/* <div className="bg-yellow-100 p-4 border-b border-yellow-500">
//                                     <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
//                                 </div> */}
//                                     {/* <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start">
//                                     <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
//                                     <div className="flex space-x-2">
//                                         <button
//                                             onClick={() => navigate(`/tasks/${task.id}/progress`)}
//                                             className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
//                                         >
//                                             View Progress
//                                         </button>

//                                         <button
//                                             onClick={() => navigate(`/tasks/${task.id}/update`)}
//                                             className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                                         >
//                                             Update
//                                         </button>

//                                     </div>
//                                 </div> */}

//                                     <div className="bg-yellow-100 p-4 border-b border-yellow-500">
//                                         <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>

//                                         <div className="flex space-x-2">
//                                             <button
//                                                 onClick={() => navigate(`/tasks/${task.task_id}/progress`, { state: { from: 'myTasks' } })}
//                                                 className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
//                                             >
//                                                 View Progress
//                                             </button>

//                                             {/* <button
//                                             onClick={() => navigate(`/tasks/${task.task_id}/update`)}
//                                             className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
//                                         >
//                                             Update
//                                         </button> */}
//                                             <button
//                                                 onClick={() =>
//                                                     navigate(`/tasks/${task.task_id}/update`, { state: { from: 'myTasks' } })
//                                                 }
//                                                 className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
//                                             >
//                                                 Update
//                                             </button>
//                                         </div>


//                                     </div>


//                                     {/* Content */}
//                                     <div className="p-4 space-y-3">
//                                         {/* Description */}
//                                         <div>
//                                             <p className="text-black text-sm">
//                                                 {expandedDescriptions[task.task_id] || task.description?.length <= 100
//                                                     ? task.description || 'No description'
//                                                     : `${task.description.slice(0, 100)}...`}
//                                             </p>
//                                             {task.description?.length > 100 && (
//                                                 <button
//                                                     onClick={() => toggleDescription(task.task_id)}
//                                                     className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//                                                 >
//                                                     {expandedDescriptions[task.task_id] ? 'Read Less' : 'Read More'}
//                                                 </button>
//                                             )}
//                                         </div>

//                                         {/* Priority */}
//                                         <div className="flex items-center">
//                                             {task.priority === 'High' && <FireIcon className="h-5 w-5 text-red-500 mr-2" />}
//                                             {task.priority === 'Medium' && <FireIcon className="h-5 w-5 text-yellow-500 mr-2" />}
//                                             {/* {task.priority === 'Low' && <SnowflakeIcon className="h-5 w-5 text-blue-500 mr-2" />} */}
//                                             {task.priority === 'Low' && <ArrowDownIcon className="h-5 w-5 text-blue-500 mr-2" />}
//                                             <span className="text-black text-sm">Priority: {task.priority}</span>
//                                         </div>

//                                         {/* Status */}
//                                         <div className="flex items-center">
//                                             {task.status === 'Pending' && <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />}
//                                             {task.status === 'In Progress' && <PlayIcon className="h-5 w-5 text-blue-500 mr-2" />}
//                                             {task.status === 'Completed' && <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />}
//                                             <span className="text-black text-sm">Status: {task.status}</span>
//                                         </div>

//                                         {/* Created At */}
//                                         <div className="flex items-center">
//                                             <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
//                                             <span className="text-black text-sm">Created: {formatDate(task.created_at)}</span>
//                                         </div>

//                                         {/* Due Date */}
//                                         <div className="flex items-center">
//                                             <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
//                                             <span
//                                                 className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'
//                                                     }`}
//                                             >
//                                                 Due: {formatDate(task.due_date)}
//                                             </span>
//                                         </div>

//                                         {/* Created By */}
//                                         <div className="flex items-center">
//                                             <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
//                                             <span className="text-black text-sm">Assigned By: {task.created_by}</span>
//                                         </div>

//                                         {/* Audio */}
//                                         {task.audio_path && (
//                                             <div className="mt-4">
//                                                 <div className="flex items-center mb-2">
//                                                     <MusicalNoteIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                                                     <span className="text-black text-sm">Audio Note</span>
//                                                 </div>
//                                                 <audio
//                                                     controls
//                                                     src={`${baseUrl}/${task.audio_path}`}
//                                                     className="w-full max-w-xs"
//                                                 />
//                                             </div>
//                                         )}

//                                         {/* File */}
//                                         {task.file_path && (
//                                             <div className="mt-4">
//                                                 <div className="flex items-center mb-2">
//                                                     <DocumentArrowDownIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                                                     <span className="text-black text-sm">Attached File</span>
//                                                 </div>
//                                                 {task.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
//                                                     <div className="relative">
//                                                         <img
//                                                             src={`${baseUrl}/${task.file_path}`}
//                                                             alt="Task attachment"
//                                                             className="max-w-full h-40 object-cover rounded-md"
//                                                         />
//                                                         <a
//                                                             href={`${baseUrl}/${task.file_path}`}
//                                                             // download
//                                                             target="_blank"
//                                                             rel="noopener noreferrer"
//                                                             className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs hover:bg-gray-800"
//                                                         >
//                                                             Download
//                                                         </a>
//                                                     </div>
//                                                 ) : (
//                                                     <a
//                                                         href={`${baseUrl}/${task.file_path}`}
//                                                         // download
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="flex items-center text-yellow-500 hover:text-yellow-600 text-sm"
//                                                     >
//                                                         <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
//                                                         Download {task.file_path.split('/').pop()}
//                                                     </a>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default MyTasks;

//--------------------------------------------------------------------------------------------
//working code

// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axiosInstance from '../utils/axios';
// import { toast } from 'react-toastify';
// import {
//   FireIcon,
//   ArrowDownIcon,
//   ClockIcon,
//   PlayIcon,
//   CheckCircleIcon,
//   CalendarIcon,
//   UserIcon,
//   DocumentArrowDownIcon,
//   MusicalNoteIcon,
//   ArrowLeftIcon,
// } from '@heroicons/react/24/solid';

// function MyTasks({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');
//         const response = await axiosInstance.get(`${baseUrl}/api/tasks/assigned`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         toast.error('Failed to load tasks');
//         console.error('Fetch tasks error:', error);
//       }
//     };
//     if (user && !loading) fetchTasks();
//   }, [user, loading, baseUrl]);

//   const toggleDescription = (taskId) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const isOverdue = (dueDate) => {
//     if (!dueDate) return false;
//     return new Date(dueDate) < new Date();
//   };

//   if (loading) {
//     return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-12 px-4 sm:px-6 lg:px-8 relative">
//       {/* Updated Back Button */}
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="absolute top-4 left-4 z-10 text-black hover:text-yellow-600 transition-colors flex items-center gap-2 p-3 rounded-full bg-yellow-100/80 hover:bg-yellow-200 hover:shadow-lg hover:shadow-yellow-400/60"
//       >
//         <ArrowLeftIcon className="h-6 w-6" />
//         <span className="text-lg font-semibold">Back to Dashboard</span>
//       </button>

//       <div className="max-w-7xl mx-auto">
//         {tasks.length === 0 ? (
//           <p className="text-black text-center text-lg">No tasks assigned to you.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {tasks.map((task) => (
//               <div
//                 key={task.task_id}
//                 className="bg-white border border-yellow-500 rounded-xl shadow-md p-2 transition-transform transform hover:scale-105 hover:shadow-yellow-300/60 hover:shadow-2xl hover:ring-2 hover:ring-yellow-300 hover:ring-offset-2"
//               >
//                 <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start rounded-t-xl">
//                   <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => navigate(`/tasks/${task.task_id}/progress`, { state: { from: 'myTasks' } })}
//                       className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
//                     >
//                       View Progress
//                     </button>
//                     <button
//                       onClick={() => navigate(`/tasks/${task.task_id}/update`, { state: { from: 'myTasks' } })}
//                       className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Update
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-4 space-y-3">
//                   <p className="text-black text-sm">
//                     {expandedDescriptions[task.task_id] || task.description?.length <= 100
//                       ? task.description || 'No description'
//                       : `${task.description.slice(0, 100)}...`}
//                   </p>
//                   {task.description?.length > 100 && (
//                     <button
//                       onClick={() => toggleDescription(task.task_id)}
//                       className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//                     >
//                       {expandedDescriptions[task.task_id] ? 'Read Less' : 'Read More'}
//                     </button>
//                   )}

//                   <div className="flex items-center">
//                     {task.priority === 'High' && <FireIcon className="h-5 w-5 text-red-500 mr-2" />}
//                     {task.priority === 'Medium' && <FireIcon className="h-5 w-5 text-yellow-500 mr-2" />}
//                     {task.priority === 'Low' && <ArrowDownIcon className="h-5 w-5 text-blue-500 mr-2" />}
//                     <span className="text-black text-sm">Priority: {task.priority}</span>
//                   </div>

//                   <div className="flex items-center">
//                     {task.status === 'Pending' && <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />}
//                     {task.status === 'In Progress' && <PlayIcon className="h-5 w-5 text-blue-500 mr-2" />}
//                     {task.status === 'Completed' && <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />}
//                     <span className="text-black text-sm">Status: {task.status}</span>
//                   </div>

//                   <div className="flex items-center">
//                     <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-black text-sm">Created: {formatDate(task.created_at)}</span>
//                   </div>

//                   <div className="flex items-center">
//                     <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span
//                       className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'}`}
//                     >
//                       Due: {formatDate(task.due_date)}
//                     </span>
//                   </div>

//                   <div className="flex items-center">
//                     <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-black text-sm">Assigned By: {task.created_by}</span>
//                   </div>

//                   {task.audio_path && (
//                     <div className="mt-4">
//                       <div className="flex items-center mb-2">
//                         <MusicalNoteIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                         <span className="text-black text-sm">Audio Note</span>
//                       </div>
//                       <audio
//                         controls
//                         src={`${baseUrl}/${task.audio_path}`}
//                         className="w-full max-w-xs"
//                       />
//                     </div>
//                   )}

//                   {task.file_path && (
//                     <div className="mt-4">
//                       <div className="flex items-center mb-2">
//                         <DocumentArrowDownIcon className="h-5 w-5 text-yellow-500 mr-2" />
//                         <span className="text-black text-sm">Attached File</span>
//                       </div>
//                       {task.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
//                         <div className="relative">
//                           <img
//                             src={`${baseUrl}/${task.file_path}`}
//                             alt="Task attachment"
//                             className="max-w-full h-40 object-cover rounded-md"
//                           />
//                           <a
//                             href={`${baseUrl}/${task.file_path}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs hover:bg-gray-800"
//                           >
//                             Download
//                           </a>
//                         </div>
//                       ) : (
//                         <a
//                           href={`${baseUrl}/${task.file_path}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center text-yellow-500 hover:text-yellow-600 text-sm"
//                         >
//                           <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
//                           Download {task.file_path.split('/').pop()}
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyTasks;

//----------------------------------------------------------------

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { FunnelIcon, AdjustmentsVerticalIcon} from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Add to imports
import Tilt from 'react-parallax-tilt';
import TaskCard from '../components/TaskCard';
import { formatDate, formatDateTime, isOverdue } from '../utils/dateUtils';
import { downloadTaskExcel } from '../utils/downloadExcel';
import TaskFilterMenu from '../components/TaskFilterMenu';
import TaskSortMenu from '../components/TaskSortMenu';
import useFilteredSortedTasks from '../hooks/useFilteredSortedTasks';


function MyTasks({ baseUrl }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axiosInstance.get(`${baseUrl}/api/tasks/assigned`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //   console.log('Fetched tasks:', response.data.map(t => ({
        //   task_id: t.task_id,
        //   last_updated_at: t.last_updated_at,
        //   parsed: new Date(t.last_updated_at),
        // })));

        const usersResponse = await axiosInstance.get(`${baseUrl}/api/tasks/users/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        // console.log(response.data)
        setTasks(response.data);
      } catch (error) {
        toast.error('Failed to load tasks');
        console.error('Fetch tasks error:', error);
      }
    };
    if (user && !loading) fetchTasks();
  }, [user, loading, baseUrl]);

  const toggleDescription = (taskId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };


  //------Filter and Sort Logic---------------------------
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    assigned_by: '',
    created_by: '',
    status: '',
    priority: '',
    due_date: '',
    created_at: '',
    last_updated_at_date: '',
  });

  const [sortConfig, setSortConfig] = useState({
    field: '',     // or 'created_at'
    order: '',     // or 'DESC'
  });

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const filteredSortedTasks = useFilteredSortedTasks(tasks, filters, sortConfig);

  //---------------upto this is a filter logig----------------------------------------------


  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="flex items-center mb-6">
        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
        </Tilt>
      </div>
      <h1 className="text-3xl text-center font-bold text-black mb-10">My Tasks</h1>

      <div className="flex flex-wrap justify-end items-center gap-4 max-w-7xl mx-auto px-2 mb-6 relative">
        <button
          onClick={() => downloadTaskExcel({ baseUrl, mode: 'my', username: user.username })}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download My Tasks (.xlsx)
        </button>

        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          <FunnelIcon className="h-5 w-5" />
          Filter
        </button>

        <button
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          <AdjustmentsVerticalIcon className="h-5 w-5" />
          Sort
        </button>
        <AnimatePresence>
          {showFilterMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-7xl mx-auto overflow-hidden"
            >
              <div className="bg-white border border-yellow-500 rounded-xl shadow-md p-6 mb-6">
                <TaskFilterMenu
                  filters={filters}
                  setFilters={setFilters}
                  onClose={() => setShowFilterMenu(false)}
                  users={users}
                  pageType="myTasks"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSortMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-7xl mx-auto overflow-hidden"
            >
              <TaskSortMenu
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
                onClose={() => setShowSortMenu(false)}
                onSortClick={() => {
                  // Optionally refetch or trigger useFilteredSortedTasks
                  // setShowSortMenu(false);
                  setSortConfig({ ...sortConfig });
                }}
                baseUrl={baseUrl}
                user={user}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="max-w-7xl mx-auto">
        {tasks.length === 0 ? (
          <p className="text-black text-center text-lg">No tasks assigned to you.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {tasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                baseUrl={baseUrl}
                expanded={expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="myTasks"
              />
            ))} */}
            {/* {filteredSortedTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                baseUrl={baseUrl}
                expanded={expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="myTasks"
              />
            ))} */}

            {filteredSortedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-gray-600 py-12 col-span-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75h.008v.008H9.75V9.75zm.75 3h2v2h-2v-2zM4.5 4.5l15 15m0 0L4.5 4.5M12 2.25a9.75 9.75 0 011.17 19.4m0 0A9.75 9.75 0 0112 2.25z"
                  />
                </svg>
                <p className="text-lg font-semibold text-black">No tasks found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters or sorting options.</p>
              </div>
            ) : (
              <>
                {/* {filteredSortedTasks.map((task,index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    baseUrl={baseUrl}
                    expanded={expandedDescriptions[task.task_id]}
                    toggleDescription={toggleDescription}
                    location="myTasks"
                  />
                ))} */}
                {[...filteredSortedTasks].reverse().map((task, index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    baseUrl={baseUrl}
                    expanded={expandedDescriptions[task.task_id]}
                    toggleDescription={toggleDescription}
                    location="myTasks"
                  />
                ))}

              </>
            )}


          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;
