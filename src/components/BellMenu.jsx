// import { useState, useRef, useEffect, useContext } from 'react';
// import { BellIcon } from '@heroicons/react/24/solid';
// import { NotificationContext } from '../context/NotificationContext';

// function BellMenu() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const bellRef = useRef(null);
//   const { notifications } = useContext(NotificationContext);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={bellRef}>
//       <button
//         onClick={() => setShowDropdown((prev) => !prev)}
//         className="relative focus:outline-none"
//       >
//         <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//         )}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//           {notifications.length > 0 ? (
//             <ul className="max-h-64 overflow-y-auto text-sm text-black">
//               {notifications.map((note, idx) => (
//                 <li
//                   key={idx}
//                   className="px-4 py-2 hover:bg-gray-100 border-b border-gray-100"
//                 >
//                   {note.message}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-4 text-gray-500 text-sm">No notifications</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BellMenu;


// import { useState, useRef, useEffect, useContext } from 'react';
// import { BellIcon } from '@heroicons/react/24/solid';
// import { NotificationContext } from '../context/NotificationContext';
// import { useNavigate } from 'react-router-dom';

// function BellMenu() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const bellRef = useRef(null);
//   const { notifications } = useContext(NotificationContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={bellRef}>
//       <button
//         onClick={() => setShowDropdown((prev) => !prev)}
//         className="relative focus:outline-none"
//       >
//         <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//         )}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//           {notifications.length > 0 ? (
//             <ul className="max-h-64 overflow-y-auto text-sm text-black">
//               {notifications.map((note, idx) => (
//                 <li
//                   key={idx}
//                   className="px-4 py-2 hover:bg-gray-100 border-b border-gray-100"
//                 >
//                   {note.message}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-4 text-gray-500 text-sm">No notifications</div>
//           )}

//           {/* View All Link */}
//           <div
//             onClick={() => {
//               setShowDropdown(false);
//               navigate('/notifications');
//             }}
//             className="text-center py-2 cursor-pointer text-yellow-500 hover:text-yellow-600 border-t border-gray-200 text-sm"
//           >
//             View All Notifications
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BellMenu;


// import { useState, useRef, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { NotificationContext } from '../context/NotificationContext';
// import {
//   BellIcon,
//   UserIcon,
//   CalendarIcon,
//   FireIcon,
//   // SnowflakeIcon,
//   ClockIcon,
//   PlayIcon,
//   CheckCircleIcon,
//   ArrowRightIcon,
// } from '@heroicons/react/24/solid';

// function BellMenu() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const bellRef = useRef(null);
//   const { notifications, markAsRead } = useContext(NotificationContext);
//   const navigate = useNavigate();
//   const [expandedMessages, setExpandedMessages] = useState({});

//   // Close dropdown on click outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Format date
//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const parsed = new Date(date);
//     return isNaN(parsed)
//       ? 'N/A'
//       : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   // Check if overdue
//   const isOverdue = (dueDate) => {
//     if (!dueDate) return false;
//     return new Date(dueDate) < new Date();
//   };

//   // Toggle message
//   const toggleMessage = (id) => {
//     setExpandedMessages((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // Handle mark as read
//   const handleMarkAsRead = (id) => {
//     markAsRead(id);
//     setShowDropdown(false);
//   };

//   // Handle view task
//   const handleViewTask = (taskId) => {
//     setShowDropdown(false);
//     navigate(`/tasks/${taskId}/progress`);
//   };

//   return (
//     <div className="relative" ref={bellRef}>
//       {/* Bell Icon */}
//       <button
//         onClick={() => setShowDropdown((prev) => !prev)}
//         className="relative focus:outline-none p-2 rounded-full hover:bg-yellow-100 transition"
//       >
//         <BellIcon className="h-6 w-6 text-black hover:text-yellow-400 transition" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border border-white"></span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-yellow-500 rounded-lg shadow-lg hover:shadow-yellow-400/50 z-50 max-h-96 overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="p-4 text-center text-black text-sm">
//               <BellIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
//               <p>No notifications</p>
//             </div>
//           ) : (
//             <ul className="divide-y divide-yellow-200">
//               {notifications.map((note) => (
//                 <li
//                   key={note.id}
//                   className={`p-4 hover:bg-yellow-50 transition ${note.is_read ? 'bg-gray-50' : 'bg-white'}`}
//                 >
//                   <div className="bg-yellow-100 p-3 rounded-t-md border-b border-yellow-500">
//                     <h3 className="text-sm font-bold text-black">Task Update</h3>
//                   </div>
//                   <div className="p-3 space-y-2 text-black text-xs">
//                     <div>
//                       <span className="font-semibold">Message:</span>
//                       <p className="mt-1">
//                         {expandedMessages[note.id] || note.message?.length <= 50
//                           ? note.message || 'No message'
//                           : `${note.message.slice(0, 50)}...`}
//                       </p>
//                       {note.message?.length > 50 && (
//                         <button
//                           onClick={() => toggleMessage(note.id)}
//                           className="text-yellow-500 hover:text-yellow-600 text-xs font-medium"
//                         >
//                           {expandedMessages[note.id] ? 'Read Less' : 'Read More'}
//                         </button>
//                       )}
//                     </div>
//                     <div className="flex items-center">
//                       <UserIcon className="h-4 w-4 text-yellow-500 mr-1" />
//                       <span>
//                         <span className="font-semibold">From:</span> {note.sender || 'N/A'}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <CalendarIcon className="h-4 w-4 text-yellow-500 mr-1" />
//                       <span
//                         className={`${
//                           isOverdue(note.due_date) ? 'text-red-600 font-semibold' : ''
//                         }`}
//                       >
//                         <span className="font-semibold">Due:</span> {formatDate(note.due_date)}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       {note.priority === 'High' && <FireIcon className="h-4 w-4 text-red-500 mr-1" />}
//                       {note.priority === 'Medium' && <FireIcon className="h-4 w-4 text-yellow-500 mr-1" />}
//                       {note.priority === 'Low' && <SnowflakeIcon className="h-4 w-4 text-blue-500 mr-1" />}
//                       <span>
//                         <span className="font-semibold">Priority:</span> {note.priority || 'N/A'}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       {note.status === 'Pending' && <ClockIcon className="h-4 w-4 text-gray-500 mr-1" />}
//                       {note.status === 'In Progress' && <PlayIcon className="h-4 w-4 text-blue-500 mr-1" />}
//                       {note.status === 'Completed' && <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />}
//                       <span>
//                         <span className="font-semibold">Status:</span> {note.status || 'N/A'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-3 border-t border-yellow-200 flex justify-between space-x-2">
//                     <button
//                       onClick={() => handleMarkAsRead(note.id)}
//                       className="bg-black text-yellow-400 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[1px]"
//                     >
//                       Mark as Read
//                     </button>
//                     {note.task_id && (
//                       <button
//                         onClick={() => handleViewTask(note.task_id)}
//                         className="bg-black text-yellow-400 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[1px]"
//                       >
//                         View Task
//                       </button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <div
//             onClick={() => {
//               setShowDropdown(false);
//               navigate('/notifications');
//             }}
//             className="text-center py-3 bg-black text-yellow-400 rounded-b-md cursor-pointer text-sm font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition flex items-center justify-center"
//           >
//             <ArrowRightIcon className="h-4 w-4 mr-1" />
//             View All Notifications
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BellMenu;


// import { useState, useRef, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { NotificationContext } from '../context/NotificationContext';
// import {
//   BellIcon,
//   ArrowRightIcon,
// } from '@heroicons/react/24/solid';

// function BellMenu() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const bellRef = useRef(null);
//   const { notifications, markAsRead } = useContext(NotificationContext);
//   const navigate = useNavigate();
//   const [expandedMessages, setExpandedMessages] = useState({});

//   // Close dropdown on click outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Toggle message
//   const toggleMessage = (id) => {
//     setExpandedMessages((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // Handle mark as read
//   const handleMarkAsRead = (id) => {
//     markAsRead(id);
//     setShowDropdown(false);
//   };

//   // Handle view task
//   const handleViewTask = (taskId) => {
//     setShowDropdown(false);
//     navigate(`/tasks/${taskId}/progress`);
//   };

//   return (
//     <div className="relative" ref={bellRef}>
//       {/* Bell Icon */}
//       <button
//         onClick={() => setShowDropdown((prev) => !prev)}
//         className="relative focus:outline-none p-2 rounded-full hover:bg-yellow-100 transition"
//       >
//         <BellIcon className="h-6 w-6 text-black hover:text-yellow-400 transition" />
//         {notifications.length > 0 && (
//           <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 roundednozilow rounded-full border border-white"></span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-yellow-500 rounded-lg shadow-lg hover:shadow-yellow-400/50 z-50 max-h-96 overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="p-4 text-center text-black text-sm">
//               <BellIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
//               <p>No notifications</p>
//             </div>
//           ) : (
//             <ul className="divide-y divide-yellow-200">
//               {notifications.map((note) => (
//                 <li
//                   key={note.id}
//                   className={`p-3 hover:bg-yellow-50 transition ${note.is_read ? 'bg-gray-50' : 'bg-white'}`}
//                 >
//                   <div className="bg-yellow-100 p-2 rounded-t-md border-b border-yellow-500">
//                     <h3 className="text-sm font-bold text-black">Task Update</h3>
//                   </div>
//                   <div className="p-2 text-black text-xs">
//                     <p>
//                       {expandedMessages[note.id] || note.message?.length <= 50
//                         ? note.message || 'No message'
//                         : `${note.message.slice(0, 50)}...`}
//                     </p>
//                     {note.message?.length > 50 && (
//                       <button
//                         onClick={() => toggleMessage(note.id)}
//                         className="text-yellow-500 hover:text-yellow-600 text-xs font-medium"
//                       >
//                         {expandedMessages[note.id] ? 'Read Less' : 'Read More'}
//                       </button>
//                     )}
//                   </div>
//                   <div className="p-2 border-t border-yellow-200 flex justify-between space-x-2">
//                     <button
//                       onClick={() => handleMarkAsRead(note.id)}
//                       className="bg-black text-yellow-400 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[1px]"
//                     >
//                       Mark as Read
//                     </button>
//                     {note.task_id && (
//                       <button
//                         onClick={() => handleViewTask(note.task_id)}
//                         className="bg-black text-yellow-400 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[1px]"
//                       >
//                         View Task
//                       </button>
//                     )}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <div
//             onClick={() => {
//               setShowDropdown(false);
//               navigate('/notifications');
//             }}
//             className="text-center py-3 bg-black text-yellow-400 rounded-b-md cursor-pointer text-sm font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition flex items-center justify-center"
//           >
//             <ArrowRightIcon className="h-4 w-4 mr-1" />
//             View All Notifications
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BellMenu;

import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/NotificationContext';
import { BellIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

function BellMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const bellRef = useRef(null);
  const { notifications, markAsRead } = useContext(NotificationContext);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    markAsRead(id);
    setShowDropdown(false);
  };

  const handleViewTask = (taskId) => {
    setShowDropdown(false);
    navigate(`/tasks/${taskId}/progress`);
  };

   // Notification type labels
  const typeLabels = {
    task_created: 'Task Created',
    task_updated: 'Task Updated',
    task_reassigned: 'Task Re-assigned',
  };
  return (
    <div className="relative" ref={bellRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-yellow-100 transition"
      >
        <BellIcon className="h-6 w-6 text-black hover:text-yellow-400 transition" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border border-white"></span>
        )}
      </button>

      {/* Dropdown Panel */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-yellow-500 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-black text-sm">
              <BellIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p>No notifications</p>
            </div>
          ) : (
            <ul className="divide-y divide-yellow-200">
              {notifications.map((note,index) => (
                <li key={index} className="p-3 bg-white hover:bg-yellow-50 transition">
                  <div className="text-sm text-black mb-2">
                    {/* <strong>Message: </strong> {note.message} */}
                    <strong>{typeLabels[note.type] || 'Task Notification'}:</strong> {note.message}
                  </div>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => handleMarkAsRead(note.notification_id)}
                      className="bg-black text-yellow-400 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-900"
                    >
                      Mark as Read
                    </button>
                    {note.task_id && (
                      <button
                        onClick={() => handleViewTask(note.task_id)}
                        className="bg-yellow-400 text-black px-3 py-1 rounded-md text-xs font-semibold hover:bg-yellow-500"
                      >
                        View Task
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div
            onClick={() => {
              setShowDropdown(false);
              navigate('/notifications');
            }}
            className="text-center py-3 bg-black text-yellow-400 rounded-b-md cursor-pointer text-sm font-semibold hover:bg-gray-900 flex items-center justify-center"
          >
            <ArrowRightIcon className="h-4 w-4 mr-1" />
            View All Notifications
          </div>
        </div>
      )}
    </div>
  );
}

export default BellMenu;
