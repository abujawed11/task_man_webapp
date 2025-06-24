// import { NavLink } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="min-h-screen bg-yellow-50 text-black">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center py-20 px-4">
//         <h1 className="text-4xl font-bold mb-4">Manage Your Tasks, Collaborate with Ease</h1>
//         <p className="text-lg mb-8 max-w-xl">
//           A smart task management app to assign, track, and complete tasks efficiently with real-time updates.
//         </p>
//         <div className="space-x-4">
//           <NavLink
//             to="/signup"
//             className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md shadow"
//           >
//             Get Started
//           </NavLink>
//           <NavLink
//             to="/login"
//             className="border border-yellow-500 hover:bg-yellow-100 text-black font-semibold px-6 py-2 rounded-md"
//           >
//             Login
//           </NavLink>
//         </div>
//       </section>

//       {/* Feature Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-5xl mx-auto px-4">
//           <h2 className="text-2xl font-bold text-center mb-12">Why Use TaskApp?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Assign Tasks Easily</h3>
//               <p>Create tasks and assign them to your team with deadlines and priority levels.</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Get Real-Time Notifications</h3>
//               <p>Stay updated with instant alerts when tasks are created or updated.</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
//               <p>Change task status and keep your work organized from start to finish.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-6 text-sm text-gray-600">
//         &copy; {new Date().getFullYear()} TaskApp. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Home;

// import { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { CheckCircleIcon, UsersIcon, ChartBarIcon, BellIcon } from '@heroicons/react/24/solid';
// import logo_white_background from '../assets/logo_white_background.svg';
// import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

// function Home() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="bg-yellow-100 py-20 text-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <img src={logo_white_background} alt="TaskApp Logo" className="h-16 w-auto mx-auto mb-4" />
//           {/* <ClipboardDocumentIcon className="w-12 h-12 text-yellow-500" /> */}
//           <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
//             {user ? `Welcome, ${user.username}!` : 'Manage Your Tasks with Ease'}
//           </h1>
//           <p className="text-lg text-black mb-8">
//             {user
//               ? 'Get started by viewing your dashboard or creating a new task.'
//               : 'Organize, track, and collaborate on tasks in one place.'}
//           </p>
//           <div className="flex justify-center space-x-4">
//             {user ? (
//               <>
//                 <NavLink
//                   to="/dashboard"
//                   className="bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition"
//                 >
//                   Go to Dashboard
//                 </NavLink>
//                 <NavLink
//                   to="/tasks/create"
//                   className="bg-yellow-500 text-black px-6 py-3 rounded-md text-base font-medium hover:bg-yellow-600 transition"
//                 >
//                   Create Task
//                 </NavLink>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/signup"
//                   className="bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition"
//                 >
//                   Get Started
//                 </NavLink>
//                 <NavLink
//                   to="/login"
//                   className="bg-yellow-500 text-black px-6 py-3 rounded-md text-base font-medium hover:bg-yellow-600 transition"
//                 >
//                   Login
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section (Hidden for Authenticated Users) */}
//       {!user && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-black text-center mb-12">Why Choose TaskApp?</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
//                 <CheckCircleIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-black text-center mb-2">Task Creation</h3>
//                 <p className="text-black text-center text-sm">
//                   Easily create tasks with priorities and deadlines.
//                 </p>
//               </div>
//               <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
//                 <UsersIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-black text-center mb-2">Team Collaboration</h3>
//                 <p className="text-black text-center text-sm">
//                   Assign tasks to team members and track progress.
//                 </p>
//               </div>
//               <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
//                 <ChartBarIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-black text-center mb-2">Dashboard Overview</h3>
//                 <p className="text-black text-center text-sm">
//                   View all your tasks in a clean, organized dashboard.
//                 </p>
//               </div>
//               <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
//                 <BellIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-black text-center mb-2">Notifications</h3>
//                 <p className="text-black text-center text-sm">
//                   Stay updated with task reminders and notifications.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Footer Section */}
//       <footer className="bg-black text-white py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p className="text-sm mb-4">&copy; 2025 TaskApp. All rights reserved.</p>
//           <div className="flex justify-center space-x-4">
//             <a href="#" className="text-white hover:text-yellow-500 text-sm">About</a>
//             <a href="#" className="text-white hover:text-yellow-500 text-sm">Contact</a>
//             <a href="#" className="text-white hover:text-yellow-500 text-sm">Privacy Policy</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { CheckCircleIcon, UsersIcon, ChartBarIcon, BellIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import logo_white_background from '../assets/logo_white_background.svg';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-yellow-100 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={logo_white_background}
            alt="TaskApp Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            {user ? `Welcome, ${user.username}!` : 'Manage Your Tasks with Ease'}
          </h1>
          <p className="text-lg text-black mb-8">
            {user
              ? 'Get started by viewing your dashboard or creating a new task.'
              : 'Organize, track, and collaborate on tasks in one place.'}
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition"
                >
                  Go to Dashboard
                </NavLink>
                <NavLink
                  to="/tasks/create"
                  className="bg-yellow-500 text-black px-6 py-3 rounded-md text-base font-medium hover:bg-yellow-600 transition"
                >
                  Create Task
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className="bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition"
                >
                  Get Started
                </NavLink>
                <NavLink
                  to="/login"
                  className="bg-yellow-500 text-black px-6 py-3 rounded-md text-base font-medium hover:bg-yellow-600 transition"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {!user && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Why Choose TaskApp?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
                <CheckCircleIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black text-center mb-2">
                  Task Creation
                </h3>
                <p className="text-black text-center text-sm">
                  Easily create tasks with priorities and deadlines.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
                <UsersIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black text-center mb-2">
                  Team Collaboration
                </h3>
                <p className="text-black text-center text-sm">
                  Assign tasks to team members and track progress.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
                <ChartBarIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black text-center mb-2">
                  Dashboard Overview
                </h3>
                <p className="text-black text-center text-sm">
                  View all your tasks in a clean, organized dashboard.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md hover:bg-yellow-200 transition transform hover:scale-105">
                <BellIcon className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black text-center mb-2">
                  Notifications
                </h3>
                <p className="text-black text-center text-sm">
                  Stay updated with task reminders and notifications.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Us Section with Animation */}
      <motion.section
        className="bg-white py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            About Us – SunRack Tech
          </h2>
          <p className="text-gray-700 text-base mb-4">
            <strong>SunRack Tech</strong> is the digital solutions wing of SunRack Technologies — a global leader in solar PV mounting systems.
            As pioneers in sustainable infrastructure, we understand the power of{' '}
            <strong>precision, structure, and time</strong> — and bring that same
            philosophy to task management.
          </p>
          <p className="text-gray-700 text-base mb-4">
            Our mission is to <strong>empower engineering and operations teams</strong> with intelligent tools to plan, assign, and track tasks with ease — from the factory floor to project sites across 100+ countries.
          </p>
          <div className="mt-6 text-left space-y-2 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-yellow-600">✨ What Drives Us</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Built by engineers, for engineers</strong></li>
              <li><strong>Trusted by renewable energy professionals</strong></li>
              <li><strong>Designed for real-world execution pressure</strong></li>
            </ul>
            <p className="text-gray-700 mt-4">
              We’re not just another task app. We’re built with the same structural excellence that powers megawatt solar plants.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm mb-4">&copy; 2025 TaskApp. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-yellow-500 text-sm">About</a>
            <a href="#" className="text-white hover:text-yellow-500 text-sm">Contact</a>
            <a href="#" className="text-white hover:text-yellow-500 text-sm">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

