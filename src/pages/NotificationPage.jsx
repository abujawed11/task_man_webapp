
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { NotificationContext } from '../context/NotificationContext';

// function NotificationPage() {
//   const navigate = useNavigate();
//   const { notifications, markAsRead } = useContext(NotificationContext);

//   const formatDate = (date) => {
//     if (!date) return '—';
//     const parsed = new Date(date);
//     return isNaN(parsed) ? '—' : parsed.toLocaleString();
//   };

//   console.log("Notification--->",notifications)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-10 px-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 bg-black text-yellow-400 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold text-center mb-10 text-black">All Notifications</h1>

//       <div className="flex flex-wrap gap-6 justify-center">
//         {notifications.length === 0 ? (
//           <p className="text-gray-600 text-lg">No notifications.</p>
//         ) : (
//           notifications.map((note) => (
//             <div
//               key={note.id}
//               className="w-96 h-[300px] bg-white border border-yellow-300 rounded-2xl p-4 shadow-md hover:shadow-yellow-400/50 transition-transform hover:-translate-y-[2px] animate-float flex flex-col justify-between"
//             >
//               <div className="space-y-1 text-black">
//                 <h2 className="font-bold text-lg">Task Update</h2>
//                 <p className="text-sm">{note.message}</p>
//                 <p className="text-xs text-gray-700">Created At: {formatDate(note.created_at)}</p>
//                 <p className="text-xs text-gray-700">Due Date: {formatDate(note.due_date)}</p>
//                 <p className="text-xs text-gray-700">Created By: {note.sender || '—'}</p>
//                 {/* <p className="text-xs text-gray-700">Received At: {formatDate(note.created_at)}</p> */}
//                 <p className="text-xs text-gray-700">Priority: {note.priority || '—'}</p>
//                 <p className="text-xs text-gray-700">Status: {note.status || '—'}</p>
//               </div>

//               <div className="flex justify-end mt-3">
//                 <button
//                   onClick={() => markAsRead(note.id)}
//                   className="bg-black text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
//                 >
//                   Mark as Read
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default NotificationPage;


// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { NotificationContext } from '../context/NotificationContext';
// import {
//   ArrowLeftIcon,
//   BellIcon,
//   UserIcon,
//   CalendarIcon,
//   FireIcon,
//   // SnowflakeIcon,
//   ClockIcon,
//   PlayIcon,
//   CheckCircleIcon,
// } from '@heroicons/react/24/solid';

// function NotificationPage() {
//   const navigate = useNavigate();
//   const { notifications, markAsRead } = useContext(NotificationContext);
//   const [expandedMessages, setExpandedMessages] = useState({});

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     const parsed = new Date(date);
//     return isNaN(parsed)
//       ? 'N/A'
//       : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return 'N/A';
//     const date = new Date(dateStr);

//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';

//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes.toString().padStart(2, '0');

//     const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();

//     return `${time} | ${day}/${month}/${year}`;
//   };

//   const isOverdue = (dueDate) => {
//     if (!dueDate) return false;
//     return new Date(dueDate) < new Date();
//   };

//   const toggleMessage = (id) => {
//     setExpandedMessages((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   console.log(notifications)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-10 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center bg-black text-yellow-400 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] text-sm"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-2" />
//             Back
//           </button>
//           <h1 className="text-3xl font-bold text-black">All Notifications</h1>
//           <div className="w-20"></div> {/* Spacer for alignment */}
//         </div>

//         {/* Notifications */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {notifications.length === 0 ? (
//             <div className="text-center text-black text-lg">
//               <BellIcon className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
//               <p>No notifications.</p>
//             </div>
//           ) : (
//             notifications.map((note,index) => (
//               <div
//                 key={index}
//                 className="bg-white border border-yellow-500 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
//               >

//                 <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-black">Task Update</h2>
//                   <span className="text-sm text-gray-700">{formatDateTime(note.created_at)}</span>
//                 </div>


//                 <div className="p-4 space-y-3 text-black text-sm">
//                   <div>
//                     <span className="font-semibold">Message:</span>
//                     {note.type === "task_created" && (
//                       <p>
//                         New task "<strong>{note.message}</strong>" has been assigned to you by <strong>{note.sender}</strong>
//                       </p>
//                     )}

//                     {note.type === "task_updated" && (
//                       <p>
//                         Task "<strong>{note.message}</strong>" was updated by <strong>{note.sender}</strong>
//                       </p>
//                     )}

//                     {note.type === "task_reassigned" && (
//                       <p>
//                         You were re-assigned task "<strong>{note.message}</strong>" by <strong>{note.sender}</strong>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="p-4 border-t border-yellow-500 flex justify-end">
//                   <button
//                     onClick={() => markAsRead(note.id)}
//                     className="bg-black text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] text-sm"
//                   >
//                     Mark as Read
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NotificationPage;

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/NotificationContext';

function NotificationPage() {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useContext(NotificationContext);

  // Track locally hidden (read) notifications
  const [hiddenNotificationIds, setHiddenNotificationIds] = useState([]);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id); // still calls server
    setHiddenNotificationIds((prev) => [...prev, id]); // hide from UI
  };

  const handleViewTask = (taskId) => {
    // navigate(`/task-progress/${taskId}`);
    navigate(`/tasks/${taskId}/progress`);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-black text-yellow-400 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 transition text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-black">All Notifications</h1>
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.length === 0 || notifications.filter(n => !hiddenNotificationIds.includes(n.id)).length === 0 ? (
            <div className="text-center text-black text-lg col-span-full">
              <p>No unread notifications.</p>
            </div>
          ) : (
            notifications
              .filter((note) => !hiddenNotificationIds.includes(note.id))
              .map((note,index) => (
                <div
                  key={index}
                  className="bg-white border border-yellow-500 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-black">Task Update</h2>
                    <span className="text-sm text-gray-700">{formatDateTime(note.created_at)}</span>
                  </div>

                  <div className="p-4 text-black text-sm space-y-2">
                    <span className="font-semibold">Message:</span>
                    {note.type === 'task_created' && (
                      <p>
                        New task "<strong>{note.message}</strong>" has been assigned to you by <strong>{note.sender}</strong>
                      </p>
                    )}
                    {note.type === 'task_updated' && (
                      <p>
                        Task "<strong>{note.message}</strong>" was updated by <strong>{note.sender}</strong>
                      </p>
                    )}
                    {note.type === 'task_reassigned' && (
                      <p>
                        You were re-assigned task "<strong>{note.message}</strong>" by <strong>{note.sender}</strong>
                      </p>
                    )}
                  </div>

                  <div className="p-4 border-t border-yellow-500 flex justify-end gap-4">
                    <button
                      onClick={() => handleViewTask(note.task_id)}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition text-sm"
                    >
                      View Task
                    </button>
                    <button
                      onClick={() => handleMarkAsRead(note.notification_id)}
                      className="bg-black text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-gray-900 transition text-sm"
                    >
                      Mark as Read
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
