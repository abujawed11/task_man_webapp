// // src/context/NotificationContext.jsx
// import { createContext, useEffect, useState } from 'react';
// import axiosInstance from '../utils/axios';

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children, baseUrl }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unread, setUnread] = useState(0);

//   const fetchNotifications = async () => {
//     const token = localStorage.getItem('token');
//     console.log("fetched")
//     try {
//       const res = await axiosInstance.get(`${baseUrl}/api/notifications`, {
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


import { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axiosInstance from '../utils/axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children, baseUrl }) => {
  const { user, loading } = useContext(AuthContext); // ✅ get user and loading state
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axiosInstance.get(`${baseUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data)
      setNotifications(res.data || []);
      setUnread(res.data.filter((n) => !n.is_read).length); // use `is_read` from DB
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    try {
      await axiosInstance.post(
        `${baseUrl}/api/notifications/mark-read`,
        { notificationId },  // ✅ send notificationId in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // ✅ Refresh notification list after marking as read
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };


  // useEffect(() => {
  //   fetchNotifications(); // initial load
  //   const interval = setInterval(fetchNotifications, 1 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // ✅ Only fetch when user is ready (after login)
  useEffect(() => {
    if (user && !loading) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 2 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user, loading]);

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
