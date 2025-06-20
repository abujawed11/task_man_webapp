// import { createContext, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Load user from localStorage on mount
//   // useEffect(() => {
//   //   const storedUser = localStorage.getItem('user');
//   //   if (storedUser) {
//   //     console.log(JSON.parse(storedUser))
//   //     setUser(JSON.parse(storedUser));
//   //   }
//   // }, []);

//   //   // Restore user session on app load
//   useEffect(() => {
//     const restoreSession = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await axios.get(`${baseUrl}/api/auth/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(response.data); // Set user data from /api/auth/me
//         } catch (error) {
//           console.error('Failed to restore session:', error);
//           localStorage.removeItem('token'); // Clear invalid token
//           toast.error('Session expired. Please log in again.');
//         }
//       }
//       setLoading(false); // Done loading
//     };
//     restoreSession();
//   }, []);

//   // Login function (placeholder)
//   const login = (userData, token) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//   };

//   // Signup function (placeholder, to be replaced with API call)
//   const signup = (userData, token) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('token', token);
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     toast.success('Logout successful!');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ You had this already
  const baseUrl = 'http://localhost:5000'; // ✅ Define this

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${baseUrl}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // ✅ set the user object
        } catch (error) {
          console.error('Failed to restore session:', error);
          localStorage.removeItem('token');
          toast.error('Session expired. Please log in again.');
        }
      }
      setLoading(false); // ✅ Tell the app we're done loading
    };
    restoreSession();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const signup = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logout successful!');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};





// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state
//   const baseUrl = 'http://localhost:5000';

//   // Restore user session on app load
//   useEffect(() => {
//     const restoreSession = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const response = await axios.get(`${baseUrl}/api/auth/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(response.data); // Set user data from /api/auth/me
//         } catch (error) {
//           console.error('Failed to restore session:', error);
//           localStorage.removeItem('token'); // Clear invalid token
//           toast.error('Session expired. Please log in again.');
//         }
//       }
//       setLoading(false); // Done loading
//     };
//     restoreSession();
//   }, []);

//    // Login function
//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(`${baseUrl}/api/auth/login`, { username, password });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       setUser(user);
//       toast.success('Login successful!');
//       return true;
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//       return false;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     toast.success('Logged out successfully!');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };