import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'

function App() {

  
  const baseUrl = "http://localhost:5000"

  return (
    <>
      <AuthProvider>
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
            <Route path="/signup" element={<Signup baseUrl={baseUrl}/>} />
            <Route path="/login" element={<Login baseUrl={baseUrl}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks/create" element={<CreateTask />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
