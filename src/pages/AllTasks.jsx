// import { useState, useEffect, useContext } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//   FireIcon,
//   SparklesIcon,
//   ClockIcon,
//   PlayIcon,
//   CheckCircleIcon,
//   CalendarIcon,
//   UserIcon,
//   DocumentArrowDownIcon,
//   MusicalNoteIcon,
//   FunnelIcon,
// } from '@heroicons/react/24/solid';

// function AllTasks({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});
//   // const [filters, setFilters] = useState({
//   //   assigned_to: '',
//   //   created_by: '',
//   //   status: '',
//   //   priority: '',
//   //   due_date_start: '',
//   //   due_date_end: '',
//   //   created_at_start: '',
//   //   created_at_end: '',
//   // });
//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',         // ⬅️ single field now
//     created_at: '',       // ⬅️ single field now
//   });

//   // Fetch tasks and users
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         // Fetch all tasks
//         const tasksResponse = await axios.get(`${baseUrl}/api/tasks/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(tasksResponse.data);
//         setFilteredTasks(tasksResponse.data);
//         // console.log(tasksResponse.data[0])
//         // console.log("filter:---->",filteredTasks)

//         // Fetch users for filters
//         const usersResponse = await axios.get(`${baseUrl}/api/tasks/users/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersResponse.data);
//       } catch (error) {
//         toast.error('Failed to load data');
//         console.error('Fetch data error:', error);
//       }
//     };
//     if (user && !loading && user.accountType === 'Super Admin') fetchData();
//     else if (!loading) {
//       toast.error('Access denied');
//       navigate('/dashboard');
//     }
//   }, [user, loading, baseUrl, navigate]);

//   // Apply filters

//   useEffect(() => {
//     let filtered = tasks;

//     if (filters.assigned_to) {
//       filtered = filtered.filter((task) => task.assigned_to === filters.assigned_to);
//     }

//     if (filters.created_by) {
//       filtered = filtered.filter((task) => task.created_by === filters.created_by);
//     }

//     if (filters.status) {
//       filtered = filtered.filter((task) => task.status === filters.status);
//     }

//     if (filters.priority) {
//       filtered = filtered.filter((task) => task.priority === filters.priority);
//     }

//     // if (filters.due_date) {
//     //   filtered = filtered.filter((task) => task.due_date?.slice(0, 10) === filters.due_date);
//     // }
//     // if (filters.due_date) {


//     //   filtered = filtered.filter((task) => {
//     //     console.log('Comparing:', {
//     //       fromDB: new Date(task.due_date).toISOString().slice(0, 10),
//     //       fromFilter: filters.due_date,
//     //     });
//     //     const dueDateStr = new Date(task.due_date).toISOString().slice(0, 10);
//     //     return dueDateStr === filters.due_date;
//     //   });
//     // }

//     if (filters.due_date) {
//       filtered = filtered.filter(
//         (task) =>
//           new Date(task.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );
//     }

//     if (filters.created_at) {
//       filtered = filtered.filter((task) => task.created_at?.slice(0, 10) === filters.created_at);
//     }

//     setFilteredTasks(filtered);
//   }, [filters, tasks]);

//   // useEffect(() => {
//   //   let filtered = tasks;
//   //   if (filters.assigned_to) {
//   //     filtered = filtered.filter((task) => task.assigned_to === filters.assigned_to);
//   //   }
//   //   if (filters.created_by) {
//   //     filtered = filtered.filter((task) => task.created_by === filters.created_by);
//   //   }
//   //   if (filters.status) {
//   //     filtered = filtered.filter((task) => task.status === filters.status);
//   //   }
//   //   if (filters.priority) {
//   //     filtered = filtered.filter((task) => task.priority === filters.priority);
//   //   }
//   //   if (filters.due_date_start) {
//   //     filtered = filtered.filter((task) => task.due_date >= filters.due_date_start);
//   //   }
//   //   if (filters.due_date_end) {
//   //     filtered = filtered.filter((task) => task.due_date <= filters.due_date_end);
//   //   }
//   //   if (filters.created_at_start) {
//   //     filtered = filtered.filter((task) => task.created_at >= filters.created_at_start);
//   //   }
//   //   if (filters.created_at_end) {
//   //     filtered = filtered.filter((task) => task.created_at <= filters.created_at_end);
//   //   }
//   //   setFilteredTasks(filtered);
//   // }, [filters, tasks]);

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Toggle description
//   const toggleDescription = (taskId) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [taskId]: !prev[taskId],
//     }));
//   };

//   // Format date
//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   // Check if overdue
//   const isOverdue = (dueDate) => {
//     if (!dueDate) return false;
//     return new Date(dueDate) < new Date();
//   };

//   // Handle logout
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   if (loading) {
//     return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         {/* <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-black">All Tasks</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition sm:text-sm"
//           >
//             Logout
//           </button>
//         </div> */}

//         {/* Filters */}
//         <div className="bg-white border border-yellow-500 rounded-lg shadow-md p-6 mb-8">
//           <div className="flex items-center mb-4">
//             <FunnelIcon className="h-6 w-6 text-yellow-500 mr-2" />
//             <h3 className="text-lg font-semibold text-black">Filter Tasks</h3>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Assigned To</label>
//               <select
//                 name="assigned_to"
//                 value={filters.assigned_to}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created By</label>
//               <select
//                 name="created_by"
//                 value={filters.created_by}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Status</label>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Priority</label>
//               <select
//                 name="priority"
//                 value={filters.priority}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>


//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Due Date</label>
//               <input
//                 type="date"
//                 name="due_date"
//                 value={filters.due_date}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created Date</label>
//               <input
//                 type="date"
//                 name="created_at"
//                 value={filters.created_at}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>

//             {/* <div>
//               <label className="block text-sm font-medium text-black mb-1">Due Date Start</label>
//               <input
//                 type="date"
//                 name="due_date_start"
//                 value={filters.due_date_start}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Due Date End</label>
//               <input
//                 type="date"
//                 name="due_date_end"
//                 value={filters.due_date_end}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created Date Start</label>
//               <input
//                 type="date"
//                 name="created_at_start"
//                 value={filters.created_at_start}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created Date End</label>
//               <input
//                 type="date"
//                 name="created_at_end"
//                 value={filters.created_at_end}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div> */}
//           </div>
//         </div>

//         {/* Tasks */}
//         {filteredTasks.length === 0 ? (
//           <div className="text-center text-black text-lg">
//             <DocumentArrowDownIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//             <p>No tasks found.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-white border border-yellow-500 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition transform duration-300"
//               >

//                 {/* <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start">
//                   <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>

//                   <div className="flex space-x-2"> */}

//                 {/* </div>
//                 </div> */}



//                 <div className="bg-yellow-100 p-4 border-b border-yellow-500">
//                   <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => navigate(`/tasks/${task.task_id}/progress`, { state: { from: 'adminTasks' } })}
//                       className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
//                     >
//                       View Progress
//                     </button>
//                     <button
//                       onClick={() =>
//                         navigate(`/tasks/${task.task_id}/update`, { state: { from: 'adminTasks' } })
//                       }
//                       className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
//                     >
//                       Update
//                     </button>
//                   </div>


//                 </div>
//                 <div className="p-4 space-y-3">
//                   <p className="text-black text-sm">
//                     {expandedDescriptions[task.id] || task.description?.length <= 100
//                       ? task.description || 'No description'
//                       : `${task.description.slice(0, 100)}...`}
//                   </p>
//                   {task.description?.length > 100 && (
//                     <button
//                       onClick={() => toggleDescription(task.id)}
//                       className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//                     >
//                       {expandedDescriptions[task.id] ? 'Read Less' : 'Read More'}
//                     </button>
//                   )}
//                   <div className="flex items-center">
//                     {task.priority === 'High' && <FireIcon className="h-5 w-5 text-red-500 mr-2" />}
//                     {task.priority === 'Medium' && <FireIcon className="h-5 w-5 text-yellow-500 mr-2" />}
//                     {task.priority === 'Low' && <SparklesIcon className="h-5 w-5 text-blue-500 mr-2" />}
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
//                       className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'
//                         }`}
//                     >
//                       Due: {formatDate(task.due_date)}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-black text-sm">Assigned To: {task.assigned_to}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
//                     <span className="text-black text-sm">Created By: {task.created_by}</span>
//                   </div>
//                   {/* <NavLink
//                     to={`/tasks/${task.id}/progress`}
//                     state={{ from: 'allTasks' }}
//                     className="inline-block mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm"
//                   >
//                     View Progress
//                   </NavLink> */}
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
//                             download
//                             className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs hover:bg-gray-800"
//                           >
//                             Download
//                           </a>
//                         </div>
//                       ) : (
//                         <a
//                           href={`${baseUrl}/${task.file_path}`}
//                           download
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

// export default AllTasks;


// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { DocumentArrowDownIcon, FunnelIcon } from '@heroicons/react/24/solid';
// import TaskCard from '../components/TaskCard'; // ✅ import your TaskCard

// function AllTasks({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const tasksResponse = await axios.get(`${baseUrl}/api/tasks/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(tasksResponse.data);
//         setFilteredTasks(tasksResponse.data);

//         const usersResponse = await axios.get(`${baseUrl}/api/tasks/users/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersResponse.data);
//       } catch (error) {
//         toast.error('Failed to load data');
//         console.error('Fetch data error:', error);
//       }
//     };

//     if (user && !loading && user.accountType === 'Super Admin') fetchData();
//     else if (!loading) {
//       toast.error('Access denied');
//       navigate('/dashboard');
//     }
//   }, [user, loading, baseUrl, navigate]);

//   useEffect(() => {
//     let filtered = tasks;

//     if (filters.assigned_to) {
//       filtered = filtered.filter((task) => task.assigned_to === filters.assigned_to);
//     }
//     if (filters.created_by) {
//       filtered = filtered.filter((task) => task.created_by === filters.created_by);
//     }
//     if (filters.status) {
//       filtered = filtered.filter((task) => task.status === filters.status);
//     }
//     if (filters.priority) {
//       filtered = filtered.filter((task) => task.priority === filters.priority);
//     }
//     if (filters.due_date) {
//       filtered = filtered.filter(
//         (task) => new Date(task.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );
//     }
//     if (filters.created_at) {
//       filtered = filtered.filter((task) => task.created_at?.slice(0, 10) === filters.created_at);
//     }

//     setFilteredTasks(filtered);
//   }, [filters, tasks]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

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
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Filters */}
//         <div className="bg-white border border-yellow-500 rounded-lg shadow-md p-6 mb-8">
//           <div className="flex items-center mb-4">
//             <FunnelIcon className="h-6 w-6 text-yellow-500 mr-2" />
//             <h3 className="text-lg font-semibold text-black">Filter Tasks</h3>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Assigned To</label>
//               <select
//                 name="assigned_to"
//                 value={filters.assigned_to}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created By</label>
//               <select
//                 name="created_by"
//                 value={filters.created_by}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Status</label>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Priority</label>
//               <select
//                 name="priority"
//                 value={filters.priority}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>


//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Due Date</label>
//               <input
//                 type="date"
//                 name="due_date"
//                 value={filters.due_date}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created Date</label>
//               <input
//                 type="date"
//                 name="created_at"
//                 value={filters.created_at}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>

//           </div>
//         </div>


//         {/* Tasks List */}
//         {filteredTasks.length === 0 ? (
//           <div className="text-center text-black text-lg">
//             <DocumentArrowDownIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//             <p>No tasks found.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTasks.map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task}
//                 baseUrl={baseUrl}
//                 expanded={expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="adminTasks"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllTasks;

//-------------------------------------------------------------------------


// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
//   DocumentArrowDownIcon,
//   FunnelIcon,
//   ArrowUpIcon,
//   ArrowDownIcon,
//   ArrowLeftIcon
// } from '@heroicons/react/24/solid';
// import TaskCard from '../components/TaskCard';
// import TaskFilterSort from '../components/TaskFilterSort';
// import Tilt from 'react-parallax-tilt';


// function AllTasks({ baseUrl }) {
//   const { user, loading } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   const [filters, setFilters] = useState({
//     assigned_to: '',
//     created_by: '',
//     status: '',
//     priority: '',
//     due_date: '',
//     created_at: '',
//   });
//   const [sortConfig, setSortConfig] = useState({
//     field: 'created_at',
//     order: 'DESC',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('No token found');

//         const tasksResponse = await axios.get(`${baseUrl}/api/tasks/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log(tasksResponse.data)


//         setTasks(tasksResponse.data);
//         setFilteredTasks(tasksResponse.data);

//         const usersResponse = await axios.get(`${baseUrl}/api/tasks/users/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(usersResponse.data);
//       } catch (error) {
//         toast.error('Failed to load data');
//         console.error('Fetch data error:', error);
//       }
//     };

//     if (user && !loading && user.accountType === 'Super Admin') fetchData();
//     else if (!loading) {
//       toast.error('Access denied');
//       navigate('/dashboard');
//     }
//   }, [user, loading, baseUrl, navigate]);

//   useEffect(() => {
//     let filtered = tasks;

//     if (filters.assigned_to) {
//       filtered = filtered.filter((task) => task.assigned_to === filters.assigned_to);
//     }
//     if (filters.created_by) {
//       filtered = filtered.filter((task) => task.created_by === filters.created_by);
//     }
//     if (filters.status) {
//       filtered = filtered.filter((task) => task.status === filters.status);
//     }
//     if (filters.priority) {
//       filtered = filtered.filter((task) => task.priority === filters.priority);
//     }
//     if (filters.due_date) {
//       filtered = filtered.filter(
//         (task) => new Date(task.due_date).toLocaleDateString('en-CA') === filters.due_date
//       );
//     }
//     if (filters.created_at) {
//       filtered = filtered.filter((task) => task.created_at?.slice(0, 10) === filters.created_at);
//     }



//     // Apply sorting
//     filtered.sort((a, b) => {
//       const field = sortConfig.field;
//       const order = sortConfig.order === 'ASC' ? 1 : -1;

//       if (field === 'priority') {
//         const priorityMap = { High: 3, Medium: 2, Low: 1 };
//         return (priorityMap[a[field]] - priorityMap[b[field]]) * order;
//       } else if (field === 'status') {
//         const statusMap = { Pending: 3, 'In Progress': 2, Completed: 1 };
//         return (statusMap[a[field]] - statusMap[b[field]]) * order;
//       } else if (field === 'due_date' || field === 'created_at') {
//         const aDate = a[field] ? new Date(a[field]) : new Date(0);
//         const bDate = b[field] ? new Date(b[field]) : new Date(0);
//         return (aDate - bDate) * order;
//       } else if (field === 'created_time') {
//         const aTime = new Date(a.created_at || 0).getTime();
//         const bTime = new Date(b.created_at || 0).getTime();
//         return (aTime - bTime) * order;
//       }
//       else {
//         return a[field].localeCompare(b[field]) * order;
//       }
//     });

//     setFilteredTasks(filtered);
//   }, [filters, sortConfig, tasks]);

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       assigned_to: '',
//       created_by: '',
//       status: '',
//       priority: '',
//       due_date: '',
//       created_at: '',
//     });
//   };

//   // Handle sort change
//   const handleSortChange = (field) => {
//     setSortConfig((prev) => ({
//       field,
//       order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC',
//     }));
//   };

//   // Toggle description
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
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="flex items-center px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-2" />
//             Back
//           </button>
//         </Tilt>
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-black">All Tasks</h2>
//           {/* <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition sm:text-sm"
//           >
//             Logout
//           </button> */}
//         </div>

//         {/* Filters and Sorting */}
//         {/* <TaskFilterSort
//           filters={filters}
//           onFilterChange={handleFilterChange}
//           onResetFilters={resetFilters}
//           sortConfig={sortConfig}
//           onSortChange={setSortConfig}
//           users={users}
//         />

//         <button
//           onClick={() => setSortConfig({ ...sortConfig })}
//           className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
//         >
//           Sort
//         </button> */}


//         {/* Filters */}
//         <div className="bg-white border border-yellow-500 rounded-lg shadow-md p-6 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <FunnelIcon className="h-6 w-6 text-yellow-500 mr-2" />
//               <h3 className="text-lg font-semibold text-black">Filter Tasks</h3>
//             </div>
//             <button
//               onClick={resetFilters}
//               className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//             >
//               Clear Filters
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Assigned To</label>
//               <select
//                 name="assigned_to"
//                 value={filters.assigned_to}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created By</label>
//               <select
//                 name="created_by"
//                 value={filters.created_by}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 {users.map((u) => (
//                   <option key={u.username} value={u.username}>{u.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Status</label>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Priority</label>
//               <select
//                 name="priority"
//                 value={filters.priority}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="">All</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Due Date</label>
//               <input
//                 type="date"
//                 name="due_date"
//                 value={filters.due_date}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-black mb-1">Created Date</label>
//               <input
//                 type="date"
//                 name="created_at"
//                 value={filters.created_at}
//                 onChange={handleFilterChange}
//                 className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//               />
//             </div>

//           </div>
//         </div>

//         {/* Sorting */}

//         <div className="flex items-center mb-6 space-x-4">
//           <label className="text-sm font-medium text-black">Sort By:</label>

//           <select
//             value={sortConfig.field}
//             onChange={(e) => setSortConfig((prev) => ({ ...prev, field: e.target.value }))}
//             className="border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//           >
//             <option value="created_at">Created Date</option>
//             <option value="created_time">Created Time</option>
//             <option value="due_date">Due Date</option>
//             <option value="priority">Priority</option>
//             <option value="status">Status</option>
//             <option value="assigned_to">Assigned To</option>
//             <option value="created_by">Created By</option>
//           </select>


//           <select
//             value={sortConfig.order}
//             onChange={(e) => setSortConfig((prev) => ({ ...prev, order: e.target.value }))}
//             className="border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
//           >
//             <option value="ASC">Ascending</option>
//             <option value="DESC">Descending</option>
//           </select>

//           <button
//             onClick={() => setSortConfig({ ...sortConfig })}
//             className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
//           >
//             Sort
//           </button>
//         </div>


//         {/* Tasks List */}
//         {filteredTasks.length === 0 ? (
//           <div className="text-center text-black text-lg">
//             <DocumentArrowDownIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//             <p>No tasks found.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTasks.map((task) => (
//               <TaskCard
//                 key={task.task_id}
//                 task={task}
//                 baseUrl={baseUrl}
//                 expanded={expandedDescriptions[task.task_id]}
//                 toggleDescription={toggleDescription}
//                 location="adminTasks"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllTasks;


import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  DocumentArrowDownIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';
import TaskCard from '../components/TaskCard';
import Tilt from 'react-parallax-tilt';
import { downloadTaskExcel } from '../utils/downloadExcel';

function AllTasks({ baseUrl }) {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [filters, setFilters] = useState({
    assigned_to: '',
    created_by: '',
    status: '',
    priority: '',
    due_date: '',
    created_at: '',
    updated_at_date: '',
    updated_at_hour: '',  // Format: '1', '2', ..., '23'
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    order: 'DESC',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const tasksResponse = await axios.get(`${baseUrl}/api/tasks/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // console.log(tasksResponse.data)

        setTasks(tasksResponse.data);
        setFilteredTasks(tasksResponse.data);

        const usersResponse = await axios.get(`${baseUrl}/api/tasks/users/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Fetch data error:', error);
      }
    };

    if (user && !loading && user.accountType === 'Super Admin') fetchData();
    else if (!loading) {
      toast.error('Access denied');
      navigate('/dashboard');
    }
  }, [user, loading, baseUrl, navigate]);

  useEffect(() => {
    let filtered = tasks;

    if (filters.assigned_to) {
      filtered = filtered.filter((task) => task.assigned_to === filters.assigned_to);
    }
    if (filters.created_by) {
      filtered = filtered.filter((task) => task.created_by === filters.created_by);
    }
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter((task) => task.priority === filters.priority);
    }
    if (filters.due_date) {
      filtered = filtered.filter(
        (task) => new Date(task.due_date).toLocaleDateString('en-CA') === filters.due_date
      );
    }
    if (filters.created_at) {
      filtered = filtered.filter((task) => task.created_at?.slice(0, 10) === filters.created_at);
    }

    // if (filters.updated_at_date) {
    //   filtered = filtered.filter(
    //     (task) => task.updated_at?.slice(0, 10) === filters.updated_at_date
    //   );
    // }

    if (filters.updated_at_date) {
      filtered = filtered.filter((task) => {
        if (!task.updated_at) return false;
        const taskDate = new Date(task.updated_at);
        const localDateStr = taskDate.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
        return localDateStr === filters.updated_at_date;
      });
    }

    // console.log(filteredTasks)

    // if (filters.updated_at_hour !== '') {
    //   const selectedHour = parseInt(filters.updated_at_hour);
    //   filtered = filtered.filter((task) => {
    //     if (!task.updated_at) return false;
    //     const taskHour = new Date(task.updated_at).getHours();
    //     return taskHour === selectedHour;
    //   });
    // }

    if (filters.updated_at_hour !== '') {
      const selectedHour = parseInt(filters.updated_at_hour);
      filtered = filtered.filter((task) => {
        if (!task.updated_at) return false;
        const taskHour = new Date(task.updated_at).getHours(); // local time
        return taskHour === selectedHour;
      });
    }


    // Apply sorting
    filtered.sort((a, b) => {
      const field = sortConfig.field;
      const order = sortConfig.order === 'ASC' ? 1 : -1;

      if (field === 'priority') {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        return (priorityMap[a[field]] - priorityMap[b[field]]) * order;
      } else if (field === 'status') {
        const statusMap = { Pending: 3, 'In Progress': 2, Completed: 1 };
        return (statusMap[a[field]] - statusMap[b[field]]) * order;
      } else if (field === 'due_date' || field === 'created_at' || field === 'updated_at') {
        const aDate = a[field] ? new Date(a[field]) : new Date(0);
        const bDate = b[field] ? new Date(b[field]) : new Date(0);
        return (aDate - bDate) * order;
      } else if (field === 'created_time') {
        const aTime = new Date(a.created_at || 0).getTime();
        const bTime = new Date(b.created_at || 0).getTime();
        return (aTime - bTime) * order;
      }
      else {
        return a[field].localeCompare(b[field]) * order;
      }
    });

    setFilteredTasks(filtered);
  }, [filters, sortConfig, tasks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      assigned_to: '',
      created_by: '',
      status: '',
      priority: '',
      due_date: '',
      created_at: '',
      updated_at_date: '',
      updated_at_hour: '',
    });
  };

  // const handleSortChange = (field) => {
  //   setSortConfig((prev) => ({
  //     field,
  //     order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC',
  //   }));
  // };

  // const handleDownload = async (mode, username) => {
  //   console.log(mode, username)
  //   try {
  //     const response = await axios.get(`${baseUrl}/api/tasks/export`, {
  //       params: { mode, username },
  //       responseType: 'blob',
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     const fileName = mode + "Task";
  //     link.setAttribute('download', `${fileName}.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (err) {
  //     console.error('Download failed', err);
  //   }
  // };

  const toggleDescription = (taskId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>
      </Tilt>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">All Tasks</h2>
        </div>

        {/* Filters */}
        <div className="bg-white border border-yellow-500 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FunnelIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-black">Filter Tasks</h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Assigned To</label>
              <select
                name="assigned_to"
                value={filters.assigned_to}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All</option>
                {users.map((u) => (
                  <option key={u.username} value={u.username}>{u.username}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Created By</label>
              <select
                name="created_by"
                value={filters.created_by}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All</option>
                {users.map((u) => (
                  <option key={u.username} value={u.username}>{u.username}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Priority</label>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={filters.due_date}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Created Date</label>
              <input
                type="date"
                name="created_at"
                value={filters.created_at}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Updated Date</label>
              <input
                type="date"
                name="updated_at_date"
                value={filters.updated_at_date}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Updated Hour Range</label>
              <select
                name="updated_at_hour"
                value={filters.updated_at_hour}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All</option>
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={i}>
                    Between {i % 12 === 0 ? 12 : i % 12}{i < 12 ? 'AM' : 'PM'} - {(i + 1) % 12 === 0 ? 12 : (i + 1) % 12}{(i + 1) < 12 || i === 23 ? 'AM' : 'PM'}
                  </option>
                ))}
              </select>
            </div>



          </div>
        </div>

        {/* Sorting */}
        {/* <div className="flex items-center mb-6 space-x-4">
          <label className="text-sm font-medium text-black">Sort By:</label>

          <select
            value={sortConfig.field}
            onChange={(e) => setSortConfig((prev) => ({ ...prev, field: e.target.value }))}
            className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="created_at">Created Date</option>
            <option value="created_time">Created Time</option>
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="assigned_to">Assigned To</option>
            <option value="created_by">Created By</option>
          </select>

          <select
            value={sortConfig.order}
            onChange={(e) => setSortConfig((prev) => ({ ...prev, order: e.target.value }))}
            className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>

          <button
            onClick={() => setSortConfig({ ...sortConfig })}
            className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
          >
            Sort
          </button>


          <div className="flex justify-end max-w-7xl mx-auto mb-6 px-2">
            <button
              onClick={() => handleDownload('all', user.username)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition cursor-pointer"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download All Tasks(.xlsx)
            </button>
          </div>
        </div> */}

        <div className="flex justify-between items-center flex-wrap mb-6">
          {/* Left: Sorting controls */}
          <div className="flex items-center flex-wrap gap-4">
            <label className="text-sm font-medium text-black">Sort By:</label>

            <select
              value={sortConfig.field}
              onChange={(e) => setSortConfig((prev) => ({ ...prev, field: e.target.value }))}
              className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="created_at">Created Date</option>
              <option value="created_time">Created Time</option>
              <option value="due_date">Due Date</option>
              <option value="updated_at">Last Updated Time</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="assigned_to">Assigned To</option>
              <option value="created_by">Created By</option>

            </select>

            <select
              value={sortConfig.order}
              onChange={(e) => setSortConfig((prev) => ({ ...prev, order: e.target.value }))}
              className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>

            <button
              onClick={() => setSortConfig({ ...sortConfig })}
              className="bg-white text-black border border-black px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
            >
              Sort
            </button>
          </div>

          {/* Right: Download button */}
          <div className="mt-4 md:mt-0">
            <button
              // onClick={() => handleDownload('all', user.username)}
              onClick={() => downloadTaskExcel({ baseUrl, mode: 'all', username: user.username })}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition cursor-pointer"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download All Tasks (.xlsx)
            </button>
          </div>
        </div>



        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <div className="text-center text-black text-lg">
            <DocumentArrowDownIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <p>No tasks found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {filteredTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                baseUrl={baseUrl}
                expanded={expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="adminTasks"
              />
            ))} */}
            {[...filteredTasks].reverse().map((task,index) => (
              <TaskCard
                key={index}
                task={task}
                baseUrl={baseUrl}
                expanded={expandedDescriptions[task.task_id]}
                toggleDescription={toggleDescription}
                location="adminTasks"
              />
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default AllTasks;
