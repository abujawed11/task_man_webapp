import { useState, useRef, useEffect, useContext } from 'react';
import { BellIcon } from '@heroicons/react/24/solid';
import { NotificationContext } from '../context/NotificationContext';

function BellMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const bellRef = useRef(null);
  const { notifications } = useContext(NotificationContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="relative focus:outline-none"
      >
        <BellIcon className="h-6 w-6 text-black hover:text-white transition" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {notifications.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto text-sm text-black">
              {notifications.map((note, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 border-b border-gray-100"
                >
                  {note.message}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500 text-sm">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
}

export default BellMenu;
