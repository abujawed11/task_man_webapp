// // src/context/NotificationContext.jsx
// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children, baseUrl }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unread, setUnread] = useState(0);

//   const fetchNotifications = async () => {
//     const token = localStorage.getItem('token');
//     console.log("fetched")
//     try {
//       const res = await axios.get(`${baseUrl}/api/notifications`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data)
//       setNotifications(res.data || []);
//       setUnread(res.data.filter(n => !n.read).length);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   };

//   // Poll every 5 minutes
//   useEffect(() => {
//     fetchNotifications(); // initial load
//     const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <NotificationContext.Provider value={{ notifications, unread, fetchNotifications }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children, baseUrl }) => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${baseUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data || []);
      setUnread(res.data.filter((n) => !n.is_read).length); // use `is_read` from DB
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${baseUrl}/api/notifications/mark-read`,
        {}, // empty body, since your backend uses the token to identify user
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Re-fetch updated notifications
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications(); // initial load
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unread,
        fetchNotifications,
        markAsRead, // expose markAsRead to frontend
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
