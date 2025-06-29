// import React from 'react'

// function AssignedTasks() {
//   return (
//     <div>
//       Task I Assigned
//     </div>
//   )
// }

// export default AssignedTasks

//---------------------------------------------------

// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//     FireIcon,
//     //   SnowflakeIcon,
//     ArrowDownIcon,
//     ArrowLeftIcon,
//     ClockIcon,
//     PlayIcon,
//     CheckCircleIcon,
//     CalendarIcon,
//     UserIcon,
//     DocumentArrowDownIcon,
//     MusicalNoteIcon,
// } from '@heroicons/react/24/solid';

// function AssignedTasks({ baseUrl }) {
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
//                 // const response = await axios.get(`${baseUrl}/api/tasks/assigned`, {
//                 //     headers: { Authorization: `Bearer ${token}` },
//                 // });
//                 const response = await axios.get(`${baseUrl}/api/tasks/created-by-me`, {
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
//             <h1 className="text-3xl text-center font-bold text-black mb-2">Assigend Task Page</h1>
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
//                                     <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start">
//                                         <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>

//                                         <div className="flex space-x-2">
//                                             <button
//                                                 onClick={() => navigate(`/tasks/${task.task_id}/progress`, { state: { from: 'assignedTasks' } })}
//                                                 className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
//                                             >
//                                                 View Progress
//                                             </button>

//                                             <button
//                                                 onClick={() => navigate(`/tasks/${task.task_id}/update`, { state: { from: 'assignedTasks' } })}

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


//                                         {/* Assigned To */}
//                                         <div className="flex items-center">
//                                             <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
//                                             <span className="text-black text-sm">Assigned To: {task.assigned_to}</span>
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

// export default AssignedTasks;


//---------------------------------------------------------------------------

// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { ArrowLeftIcon } from '@heroicons/react/24/solid';
// import TaskCard from '../components/TaskCard';

// function AssignedTasks({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');
//         const response = await axios.get(`${baseUrl}/api/tasks/created-by-me`, {
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

//   if (loading) {
//     return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
//   }

//   return (
//     <>
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="flex items-center text-black hover:text-gray-700 mb-4 ml-6 mt-4"
//       >
//         <ArrowLeftIcon className="h-5 w-5 mr-1" />
//         Back to Dashboard
//       </button>

//       <h1 className="text-3xl text-center font-bold text-black mb-2">Assigned Task Page</h1>

//       <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {tasks.length === 0 ? (
//             <p className="text-black text-center text-lg">No tasks assigned to you.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {tasks.map((task) => (
//                 <TaskCard
//                   key={task.task_id}
//                   task={task}
//                   baseUrl={baseUrl}
//                   expanded={expandedDescriptions[task.task_id]}
//                   toggleDescription={toggleDescription}
//                   location="assignedTasks"
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AssignedTasks;
//-----------------------------------------------------------------

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { FunnelIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
import Tilt from 'react-parallax-tilt';
import TaskCard from '../components/TaskCard';
import { downloadTaskExcel } from '../utils/downloadExcel';

//imports for filter
import TaskFilterMenu from '../components/TaskFilterMenu';
import TaskSortMenu from '../components/TaskSortMenu';
import useFilteredSortedTasks from '../hooks/useFilteredSortedTasks';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Add to imports

function AssignedTasks({ baseUrl }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});


  //------Filter and Sort Logic---------------------------
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    assigned_to: '',
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(`${baseUrl}/api/tasks/created-by-me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //For Filter users
        const usersResponse = await axios.get(`${baseUrl}/api/tasks/users/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        console.log(response.data)
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

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading tasks
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-10 px-4">
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
      <h1 className="text-3xl text-center font-bold text-black mb-10">Assigned Task Page</h1>

      {/* <div className="flex justify-end max-w-7xl mx-auto mb-6 px-2">
        <button
          // onClick={() => handleDownload('assign', user.username)}
          onClick={() => downloadTaskExcel({ baseUrl, mode: 'assign', username: user.username })}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition cursor-pointer"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download Assigned Tasks(.xlsx)
        </button>
      </div> */}

      <div className="flex flex-wrap justify-end items-center gap-4 max-w-7xl mx-auto px-2 mb-6 relative">
        <button
          // onClick={() => handleDownload('assign', user.username)}
          onClick={() => downloadTaskExcel({ baseUrl, mode: 'assign', username: user.username })}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition cursor-pointer"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download Assigned Tasks(.xlsx)
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
                  pageType="assignTasks"
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
            {/* {tasks.map((task,index) => (
              <TaskCard
                key={index}
                task={task}
                baseUrl={baseUrl}
                expanded={expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="assignedTasks"
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
                {[...filteredSortedTasks].reverse().map((task, index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    baseUrl={baseUrl}
                    expanded={expandedDescriptions[task.task_id]}
                    toggleDescription={toggleDescription}
                    location="assignedTasks"
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

export default AssignedTasks;
