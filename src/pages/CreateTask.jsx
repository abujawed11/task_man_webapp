import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/solid';

function CreateTask() {
  const { user, baseUrl, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    assigned_to: '',
  });
  const [users, setUsers] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Fetch users for dropdown
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) throw new Error('No token found');
  //       const response = await axios.get(`${baseUrl}/api/users/list`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUsers(response.data);
  //     } catch (error) {
  //       toast.error('Failed to load users');
  //       console.error('Fetch users error:', error);
  //     }
  //   };
  //   if (user && !loading) fetchUsers();
  // }, [user, loading, baseUrl]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${baseUrl}/api/users/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched users:', response.data); // 👈 check shape here
      setUsers(Array.isArray(response.data) ? response.data : response.data.users);
      
    } catch (error) {
      toast.error('Failed to load users');
      console.error('Fetch users error:', error);
    }
  };

  if (user && !loading) fetchUsers();
}, [user, loading, baseUrl]);


  // Handle audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/mp3') ? 'audio/mp3' : 'audio/webm';
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(timerRef.current);
        setRecordingTime(0);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast.error('Failed to start recording. Please allow microphone access.');
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    setFile(selectedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!formData.title || !formData.assigned_to) {
      toast.error('Title and assigned user are required');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priority', formData.priority);
      data.append('status', formData.status);
      data.append('assigned_to', formData.assigned_to);
      if (audioBlob) data.append('audio', audioBlob, `audio-note.${audioBlob.type.split('/')[1]}`);
      if (file) data.append('file', file);

      await axios.post(`${baseUrl}/api/tasks/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        assigned_to: '',
      });
      setAudioBlob(null);
      setFile(null);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      console.error('Create task error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-yellow-100 p-8 rounded-lg shadow-md">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-black">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-black">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={formData.priority}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-black">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label htmlFor="assigned_to" className="block text-sm font-medium text-black">
              Assign To
            </label>
            <select
              id="assigned_to"
              name="assigned_to"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={formData.assigned_to}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          {/* Audio Notes */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Audio Notes
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center px-4 py-2 rounded-md text-white ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'
                } transition disabled:bg-gray-600 sm:text-sm`}
                disabled={isSubmitting}
              >
                <MicrophoneIcon className="h-5 w-5 mr-2" />
                <span>{isRecording ? `Stop Recording (${recordingTime}s)` : 'Record Audio'}</span>
              </button>
              {audioBlob && (
                <audio controls src={URL.createObjectURL(audioBlob)} className="max-w-xs" />
              )}
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-black">
              Attach File (PDF, JPG, PNG)
            </label>
            <div className="mt-1 flex items-center">
              <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-50 cursor-pointer sm:text-sm">
                <PaperClipIcon className="h-5 w-5 mr-2" />
                <span>{file ? file.name : 'Choose File'}</span>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition disabled:bg-gray-600 sm:text-sm"
            >
              {isSubmitting ? 'Creating Task...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;