// import { useState, useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx'; // Updated import
// import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
// //import { ReactComponent as Logo } from '../assets/logo.svg'; // Make sure Webpack/Vite supports this
// import logo from '../assets/logo.svg';


// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext) || {};
//   const navigate = useNavigate();
//   const hasUnreadNotifications = true; // Placeholder for notification logic

//   const handleLogout = () => {
//     if (logout) {
//       logout();
//       navigate('/login');
//     }
//   };

//   return (
//     <nav className="bg-yellow-500 text-black sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             {/* <NavLink to="/" className="text-2xl font-bold text-black">
//               TaskApp
//             </NavLink> */}

//             <NavLink to="/" className="flex items-center">
//               <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
//               {/* <span className="text-2xl font-bold text-black">TaskApp</span> */}
//             </NavLink>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex space-x-8 items-center">
//             {user && <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
//                 }`
//               }
//             >
//               Dashboard
//             </NavLink>}
//             {user && (
//               <NavLink
//                 to="/tasks/create"
//                 className={({ isActive }) =>
//                   `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
//                   }`
//                 }
//               >
//                 Create Task
//               </NavLink>
//             )}

//             {/* Notification Bell */}
//             <div className="relative">
//               <NavLink to="/notifications">
//                 <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
//                 {hasUnreadNotifications && (
//                   <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//                 )}
//               </NavLink>
//             </div>

//             {/* Conditional Login/Register or Logout */}
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
//                     }`
//                   }
//                 >
//                   Login
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
//                     }`
//                   }
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-black hover:text-white focus:outline-none"
//             >
//               {isMenuOpen ? (
//                 <XMarkIcon className="h-6 w-6" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-yellow-500 px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
//               }`
//             }
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Dashboard
//           </NavLink>
//           {user && (
//             <NavLink
//               to="/tasks/create"
//               className={({ isActive }) =>
//                 `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
//                 }`
//               }
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Create Task
//             </NavLink>
//           )}
//           <NavLink
//             to="/notifications"
//             className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Notifications
//             {hasUnreadNotifications && (
//               <span className="inline-block h-2 w-2 bg-red-600 rounded-full ml-2"></span>
//             )}
//           </NavLink>
//           {user ? (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMenuOpen(false);
//               }}
//               className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition w-full text-left"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) =>
//                   `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/signup"
//                 className={({ isActive }) =>
//                   `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

// import { useState, useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
// import logo from '../assets/logo.svg';
// import UserAvatar from './UserAvatar.jsx';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext) || {};
//   const navigate = useNavigate();
//   const hasUnreadNotifications = true; // Placeholder for notification logic
//   const [showDropdown, setShowDropdown] = useState(false);


//   const handleLogout = () => {
//     if (logout) {
//       logout();
//       navigate('/login');
//     }
//   };

//   return (
//     <nav className="bg-yellow-500 text-black sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <NavLink to="/" className="flex items-center">
//             <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
//           </NavLink>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8 items-center">
//             {user && (
//               <>
//                 <NavLink
//                   to="/dashboard"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                   }
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink
//                   to="/tasks/create"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                   }
//                 >
//                   Create Task
//                 </NavLink>

//                 {/* Notifications */}
//                 <div className="relative">
//                   <NavLink to="/notifications">
//                     <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
//                     {hasUnreadNotifications && (
//                       <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
//                     )}
//                   </NavLink>
//                 </div>

//                 {/* Profile Avatar with Dropdown */}

//                 {/* <div
//                   className="relative"
//                   onMouseEnter={() => setShowDropdown(true)}
//                   onMouseLeave={() => setShowDropdown(false)} */}
//                 {/* > */}
//                   {/* Avatar Circle */}
//                   {/* <div className="flex items-center justify-center h-9 w-9 rounded-full bg-black text-white font-semibold cursor-pointer">
//                     {user.username.charAt(0).toUpperCase()}
//                   </div> */}

//                   {/* Dropdown */}
//                   {/* {showDropdown && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-50">
//                       <div className="p-4 text-sm text-gray-800 space-y-1">
//                         <p><span className="font-semibold">Username:</span> {user.username}</p>
//                         <p><span className="font-semibold">Email:</span> {user.email}</p>
//                         <p><span className="font-semibold">Role:</span> {user.role}</p>
//                         <p><span className="font-semibold">Account:</span> {user.accountType}</p>
//                       </div>
//                       <div className="border-t border-gray-200">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   )} */}
//                 {/* </div> */}

//                 {user && <UserAvatar/>}



//                 {/* <div className="relative">
//                   <div
//                     className="flex items-center justify-center h-9 w-9 rounded-full bg-black text-white font-semibold cursor-pointer"
//                     onMouseEnter={() => setShowDropdown(true)}
//                     onMouseLeave={() => setShowDropdown(false)}
//                   >
//                     {user.username.charAt(0).toUpperCase()}
//                   </div>

//                   {showDropdown && (
//                     <div
//                       className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-50"
//                       onMouseEnter={() => setShowDropdown(true)}
//                       onMouseLeave={() => setShowDropdown(false)}
//                     >
//                       <div className="p-4 text-sm text-gray-800 space-y-1">
//                         <p><span className="font-semibold">Username:</span> {user.username}</p>
//                         <p><span className="font-semibold">Email:</span> {user.email}</p>
//                         <p><span className="font-semibold">Role:</span> {user.role}</p>
//                         <p><span className="font-semibold">Account:</span> {user.accountType}</p>
//                       </div>
//                       <div className="border-t border-gray-200">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div> */}


//                 {/* <div className="relative group">
//                   <div className="flex items-center justify-center h-9 w-9 rounded-full bg-black text-white font-semibold cursor-pointer">
//                     {user.username.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
//                     <div className="p-4 text-sm text-gray-800 space-y-1">
//                       <p><span className="font-semibold">Username:</span> {user.username}</p>
//                       <p><span className="font-semibold">Email:</span> {user.email}</p>
//                       <p><span className="font-semibold">Role:</span> {user.role}</p>
//                       <p><span className="font-semibold">Account:</span> {user.accountType}</p>
//                     </div>
//                     <div className="border-t border-gray-200">
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 </div> */}
//               </>
//             )}

//             {!user && (
//               <>
//                 <NavLink
//                   to="/login"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                   }
//                 >
//                   Login
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className={({ isActive }) =>
//                     `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                   }
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-black hover:text-white focus:outline-none"
//             >
//               {isMenuOpen ? (
//                 <XMarkIcon className="h-6 w-6" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-yellow-500 px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//             }
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Dashboard
//           </NavLink>
//           {user && (
//             <NavLink
//               to="/tasks/create"
//               className={({ isActive }) =>
//                 `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//               }
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Create Task
//             </NavLink>
//           )}
//           <NavLink
//             to="/notifications"
//             className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Notifications
//             {hasUnreadNotifications && (
//               <span className="inline-block h-2 w-2 bg-red-600 rounded-full ml-2"></span>
//             )}
//           </NavLink>
//           {user ? (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMenuOpen(false);
//               }}
//               className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition w-full text-left"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) =>
//                   `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/signup"
//                 className={({ isActive }) =>
//                   `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </NavLink>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { NotificationContext } from '../context/NotificationContext.jsx';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.svg';
import UserAvatar from './UserAvatar.jsx';
import BellMenu from './BellMenu';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext) || {};
  const { notifications, unread } = useContext(NotificationContext) || {};
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-yellow-500 text-black sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/tasks/create"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                  }
                >
                  Create Task
                </NavLink>

                {/* Notifications */}
                {/* <div className="relative">
                  <button
                    className="relative"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
                    {unread > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                    )}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 p-2 max-h-80 overflow-y-auto">
                      {notifications?.length > 0 ? (
                        notifications.map((note, index) => (
                          <div key={index} className="text-sm text-black border-b py-1">
                            {note.message}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No notifications</p>
                      )}
                    </div>
                  )}
                </div> */}

                <BellMenu />

                {user && <UserAvatar />}
              </>
            )}

            {!user && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-500 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          {user && (
            <NavLink
              to="/tasks/create"
              className={({ isActive }) =>
                `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Create Task
            </NavLink>
          )}
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition"
          >
            Notifications
            {unread > 0 && (
              <span className="inline-block h-2 w-2 bg-red-600 rounded-full ml-2"></span>
            )}
          </button>
          {showDropdown && (
            <div className="bg-white p-2 rounded-md shadow-md">
              {notifications?.length > 0 ? (
                notifications.map((note, index) => (
                  <div key={index} className="text-sm text-black border-b py-1">
                    {note.message}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications</p>
              )}
            </div>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition w-full text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;


