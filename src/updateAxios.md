# Files to Update for Axios Instance

To complete the token expiry fix, update these files to use `axiosInstance`:

## Steps for each file:

1. **Replace the import:**
   ```js
   // OLD
   import axios from 'axios';
   
   // NEW 
   import axiosInstance from '../utils/axios';
   ```

2. **Replace all axios calls:**
   ```js
   // OLD
   axios.post(`${baseUrl}/api/...`)
   axios.get(`${baseUrl}/api/...`)
   
   // NEW
   axiosInstance.post('/api/...')
   axiosInstance.get('/api/...')
   ```

## Files to update:
- [ ] pages/Signup.jsx
- [ ] pages/Dashboard.jsx  
- [ ] pages/MyTasks.jsx
- [ ] pages/AssignedTasks.jsx
- [ ] pages/AllTasks.jsx
- [ ] pages/CreateTask.jsx
- [ ] pages/UpdateTask.jsx
- [ ] pages/TaskProgress.jsx
- [ ] context/NotificationContext.jsx
- [ ] utils/downloadExcel.js

## Already Updated:
- ✅ context/AuthContext.jsx
- ✅ pages/Login.jsx
- ✅ pages/ForgotPassword.jsx
- ✅ pages/ResetPassword.jsx