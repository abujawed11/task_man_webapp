import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'; // Updated import
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
//import { ReactComponent as Logo } from '../assets/logo.svg'; // Make sure Webpack/Vite supports this
import logo from '../assets/logo.svg';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const hasUnreadNotifications = true; // Placeholder for notification logic

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
          <div className="flex-shrink-0">
            {/* <NavLink to="/" className="text-2xl font-bold text-black">
              TaskApp
            </NavLink> */}

            <NavLink to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
              {/* <span className="text-2xl font-bold text-black">TaskApp</span> */}
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {user && <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
                }`
              }
            >
              Dashboard
            </NavLink>}
            {user && (
              <NavLink
                to="/tasks/create"
                className={({ isActive }) =>
                  `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
                  }`
                }
              >
                Create Task
              </NavLink>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <NavLink to="/notifications">
                <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                )}
              </NavLink>
            </div>

            {/* Conditional Login/Register or Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-black text-white' : ''
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-500 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          {user && (
            <NavLink
              to="/tasks/create"
              className={({ isActive }) =>
                `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Create Task
            </NavLink>
          )}
          <NavLink
            to="/notifications"
            className="block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Notifications
            {hasUnreadNotifications && (
              <span className="inline-block h-2 w-2 bg-red-600 rounded-full ml-2"></span>
            )}
          </NavLink>
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
                  `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `block text-black hover:text-white hover:bg-black px-3 py-2 rounded-md text-base font-medium transition ${isActive ? 'bg-black text-white' : ''
                  }`
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
