// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { CheckCircle } from 'lucide-react';

// function Dashboard() {
// const [showSuccess, setShowSuccess] = useState(true);

// useEffect(() => {
// const timer = setTimeout(() => setShowSuccess(false), 3000);
// return () => clearTimeout(timer);
// }, []);

// const taskStats = [
// { label: 'Snoozed', count: 0 },
// { label: 'Active Tasks', count: 1 },
// { label: 'Pending Tasks', count: 0 },
// { label: 'Completed', count: 0 }
// ];

// return (
// <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-50 to-white text-black p-6">
// {/* Success Animation */}
// {showSuccess && (
// <motion.div
// initial={{ y: -60, opacity: 0 }}
// animate={{ y: 0, opacity: 1 }}
// exit={{ y: -60, opacity: 0 }}
// className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-yellow-400 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 z-50"
// >
// <CheckCircle className="w-5 h-5 text-green-400 animate-ping" />
// <span className="font-semibold">Login Successful!</span>
// </motion.div>
// )}

//   <div className="max-w-4xl mx-auto space-y-6">
//     <h1 className="text-4xl font-extrabold text-center drop-shadow-lg">Dashboard</h1>

//     {/* Task Summary Grid */}
//     <div className="grid grid-cols-2 gap-5">
//       {taskStats.map((task, index) => (
//         <div
//           key={index}
//           className="rounded-2xl bg-black text-yellow-400 shadow-xl p-6 flex flex-col justify-center items-center hover:scale-105 transition transform"
//         >
//           <h2 className="text-sm uppercase tracking-wider">{task.label}</h2>
//           <p className="text-3xl font-bold mt-2">{task.count}</p>
//         </div>
//       ))}
//     </div>

//     {/* Task Lists */}
//     <div className="space-y-4">
//       {/* My Tasks */}
//       <div className="bg-black rounded-2xl p-5 shadow-xl text-yellow-300">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-lg font-semibold">My Tasks</h3>
//           <Link
//             to="/my-tasks"
//             className="text-sm bg-yellow-400 text-black px-3 py-1 rounded-lg shadow hover:bg-yellow-500 transition"
//           >
//             View All
//           </Link>
//         </div>
//         <p className="text-sm text-yellow-200">No tasks available</p>
//       </div>

//       {/* Assigned Tasks */}
//       <div className="bg-black rounded-2xl p-5 shadow-xl text-yellow-300">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-lg font-semibold">Assigned Tasks</h3>
//           <Link
//             to="/assigned-tasks"
//             className="text-sm bg-yellow-400 text-black px-3 py-1 rounded-lg shadow hover:bg-yellow-500 transition"
//           >
//             View All
//           </Link>
//         </div>
//         <p className="text-sm text-yellow-200">No assigned tasks</p>
//       </div>
//     </div>
//   </div>
// </div>
// );
// }

// export default Dashboard;


import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  UserIcon,
  PaperAirplaneIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

function Dashboard({baseUrl}) {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    assignedToMe: 0,
    assignedByMe: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  // const baseUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${baseUrl}/api/tasks/dashboard`, { headers });
        setStats(response.data.stats);
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error('Dashboard error:', error);
      }
    };
    if (user) fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="bg-yellow-100 p-6 rounded-lg shadow-md mb-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome, {user?.username || 'User'}!
          </h1>
          <p className="text-lg text-black">
            Role: {user?.role || 'N/A'} | Account Type: {user?.accountType || 'N/A'}
          </p>
          <NavLink
            to="/tasks/create"
            className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Create New Task
          </NavLink>
        </section>

        {/* Task Statistics */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Task Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-50 transition hover:scale-105">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-black">Tasks Assigned to Me</p>
                  <p className="text-2xl text-black">{stats.assignedToMe}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-50 transition hover:scale-105">
              <div className="flex items-center">
                <PaperAirplaneIcon className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-black">Tasks I Assigned</p>
                  <p className="text-2xl text-black">{stats.assignedByMe}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-50 transition hover:scale-105">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-black">Pending Tasks</p>
                  <p className="text-2xl text-black">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-50 transition hover:scale-105">
              <div className="flex items-center">
                <PlayIcon className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-black">In-Progress Tasks</p>
                  <p className="text-2xl text-black">{stats.inProgress}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-50 transition hover:scale-105">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold text-black">Completed Tasks</p>
                  <p className="text-2xl text-black">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Panel (Super Admin Only) */}
        {user?.accountType === 'Super Admin' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Admin Panel</h2>
            <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
              <p className="text-black mb-4">Manage users and system settings.</p>
              <NavLink
                to="/admin/users"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 mr-2"
              >
                Manage Users
              </NavLink>
              <NavLink
                to="/admin/invite-codes"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Generate Invite Codes
              </NavLink>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;