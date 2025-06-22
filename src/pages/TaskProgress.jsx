import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { DocumentIcon, PlayIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';


function TaskProgress({ baseUrl }) {
  const { taskId } = useParams();
  const [updates, setUpdates] = useState([]);
  // const [updates, setUpdates] = useState([]);
  const [task, setTask] = useState(null);

  const location = useLocation();
  const from = location.state?.from || 'dashboard'; // fallback
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUpdates = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${baseUrl}/api/tasks/${taskId}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // setUpdates(res.data);
        setUpdates(res.data.updates);
        setTask(res.data.task);
      } catch (error) {
        console.error('Error fetching task updates:', error);
      }
    };
    fetchUpdates();
  }, [taskId]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        type="button"
        onClick={() => {
          if (from === 'myTasks') navigate('/tasks/my-tasks');
          else if (from === 'assignedTasks') navigate('/tasks/assigned-by-me');
          else navigate('/dashboard');
        }}
        className="flex items-center text-gray-600 hover:text-black mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-black">Task Progress</h2>
      <div className="relative border-l-2 border-gray-300 ml-4">

        {task && (
          <div className="mb-10 ml-6 relative">
            {/* Dot */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-30px] top-1.5 border-2 border-white"></div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200">
              <div className="text-sm text-gray-600 mb-2">
                <strong>Created By:</strong> {task.created_by} <span className="mx-2">|</span>
                <strong>Assigned To:</strong> {task.assigned_to} <span className="mx-2">|</span>
                <strong>Status:</strong> {task.status}
              </div>
              <div className="text-black font-semibold text-lg mb-1">{task.title}</div>
              <div className="text-gray-800 mb-1">{task.description}</div>
              <div className="text-sm text-gray-500">
                <strong>Priority:</strong> {task.priority} <span className="mx-2">|</span>
                <strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Created at: {new Date(task.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        )}


        {updates && updates.map((update, index) => (
          <div key={index} className="mb-10 ml-6 relative">
            {/* Dot */}
            <div className="absolute w-4 h-4 bg-yellow-500 rounded-full left-[-30px] top-1.5 border-2 border-white"></div>

            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <UserIcon className="h-4 w-4 mr-1" /> {update.updated_by}
                <span className="mx-2">|</span>
                <CalendarIcon className="h-4 w-4 mr-1" /> {new Date(update.updated_at).toLocaleString()}
              </div>

              {update.comment && <p className="text-black mb-2">{update.comment}</p>}

              {update.audio_path && (
                <div className="mb-2">
                  <audio controls src={`/${update.audio_path}`} className="w-full" />
                </div>
              )}

              {update.file_path && (
                <div>
                  <a
                    href={`/${update.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <DocumentIcon className="h-5 w-5 mr-1" /> View Attachment
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        {updates.length === 0 && <p className="text-gray-500 ml-4">No updates yet for this task.</p>}
      </div>
    </div>
  );
}

export default TaskProgress;
