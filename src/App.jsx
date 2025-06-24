// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import { AuthProvider } from './context/AuthContext'
// import './index.css'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import Home from './pages/Home'
// import CreateTask from './pages/CreateTask'
// import { ToastContainer } from 'react-toastify'
// import Dashboard from './pages/Dashboard'

// function App() {


//   const baseUrl = "http://localhost:5000"

//   return (
//     <>
//       <AuthProvider>
//         <BrowserRouter>
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/signup" element={<Signup baseUrl={baseUrl}/>} />
//             <Route path="/login" element={<Login baseUrl={baseUrl}/>} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/tasks/create" element={<CreateTask />} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import AssignedTasks from './pages/AssignedTasks';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import TaskProgress from './pages/TaskProgress';
import AllTasks from './pages/AllTasks';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import './index.css'

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? children : <Navigate to="/login" />;
// };
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-10">Checking session...</div>; // Or spinner
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {

  const baseUrl = "http://localhost:5000"

  return (
    <AuthProvider>
      <NotificationProvider baseUrl={baseUrl}> {/* 👈 wrap everything */}
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup baseUrl={baseUrl} />} />
          <Route path="/login" element={<Login baseUrl={baseUrl} />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/tasks/create" element={<ProtectedRoute><CreateTask baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/tasks/my-tasks" element={<ProtectedRoute><MyTasks baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/tasks/assigned-by-me" element={<ProtectedRoute><AssignedTasks baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/tasks/:taskId/update" element={<ProtectedRoute><UpdateTask baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/tasks/:taskId/progress" element={<ProtectedRoute><TaskProgress baseUrl={baseUrl} /></ProtectedRoute>} />
          <Route path="/admin/tasks/all" element={<ProtectedRoute><AllTasks baseUrl={baseUrl}/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
