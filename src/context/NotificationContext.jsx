// src/context/NotificationContext.jsx
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children, baseUrl }) => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    console.log("fetched")
    try {
      const res = await axios.get(`${baseUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data)
      setNotifications(res.data || []);
      setUnread(res.data.filter(n => !n.read).length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  // Poll every 5 minutes
  useEffect(() => {
    fetchNotifications(); // initial load
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unread, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
