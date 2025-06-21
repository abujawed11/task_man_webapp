import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    FireIcon,
    //   SnowflakeIcon,
    ArrowDownIcon,
    ClockIcon,
    PlayIcon,
    CheckCircleIcon,
    CalendarIcon,
    UserIcon,
    DocumentArrowDownIcon,
    MusicalNoteIcon,
} from '@heroicons/react/24/solid';

function MyTasks({ baseUrl }) {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Fetch tasks assigned to the user
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');
                const response = await axios.get(`${baseUrl}/api/tasks/assigned`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                toast.error('Failed to load tasks');
                console.error('Fetch tasks error:', error);
            }
        };
        if (user && !loading) fetchTasks();
    }, [user, loading, baseUrl]);

    // Toggle description expansion
    const toggleDescription = (taskId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Check if due date is overdue
    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    if (loading) {
        return <div className="min-h-screen bg-white flex items-center justify-center text-black">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {tasks.length === 0 ? (
                    <p className="text-black text-center text-lg">No tasks assigned to you.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white border border-yellow-500 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition transform duration-300"
                            >
                                {/* Title */}
                                {/* <div className="bg-yellow-100 p-4 border-b border-yellow-500">
                                    <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
                                </div> */}
                                {/* <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/tasks/${task.id}/progress`)}
                                            className="text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
                                        >
                                            View Progress
                                        </button>

                                        <button
                                            onClick={() => navigate(`/tasks/${task.id}/update`)}
                                            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>

                                    </div>
                                </div> */}

                                <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => navigate(`/tasks/${task.id}/progress`)}
                                            className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                                        >
                                            View Progress
                                        </button>

                                        <button
                                            onClick={() => navigate(`/tasks/${task.id}/update`)}
                                            className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>


                                {/* Content */}
                                <div className="p-4 space-y-3">
                                    {/* Description */}
                                    <div>
                                        <p className="text-black text-sm">
                                            {expandedDescriptions[task.id] || task.description?.length <= 100
                                                ? task.description || 'No description'
                                                : `${task.description.slice(0, 100)}...`}
                                        </p>
                                        {task.description?.length > 100 && (
                                            <button
                                                onClick={() => toggleDescription(task.id)}
                                                className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                                            >
                                                {expandedDescriptions[task.id] ? 'Read Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Priority */}
                                    <div className="flex items-center">
                                        {task.priority === 'High' && <FireIcon className="h-5 w-5 text-red-500 mr-2" />}
                                        {task.priority === 'Medium' && <FireIcon className="h-5 w-5 text-yellow-500 mr-2" />}
                                        {/* {task.priority === 'Low' && <SnowflakeIcon className="h-5 w-5 text-blue-500 mr-2" />} */}
                                        {task.priority === 'Low' && <ArrowDownIcon className="h-5 w-5 text-blue-500 mr-2" />}
                                        <span className="text-black text-sm">Priority: {task.priority}</span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center">
                                        {task.status === 'Pending' && <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />}
                                        {task.status === 'In Progress' && <PlayIcon className="h-5 w-5 text-blue-500 mr-2" />}
                                        {task.status === 'Completed' && <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />}
                                        <span className="text-black text-sm">Status: {task.status}</span>
                                    </div>

                                    {/* Created At */}
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-black text-sm">Created: {formatDate(task.created_at)}</span>
                                    </div>

                                    {/* Due Date */}
                                    <div className="flex items-center">
                                        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                                        <span
                                            className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'
                                                }`}
                                        >
                                            Due: {formatDate(task.due_date)}
                                        </span>
                                    </div>

                                    {/* Created By */}
                                    <div className="flex items-center">
                                        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-black text-sm">Assigned By: {task.created_by}</span>
                                    </div>

                                    {/* Audio */}
                                    {task.audio_path && (
                                        <div className="mt-4">
                                            <div className="flex items-center mb-2">
                                                <MusicalNoteIcon className="h-5 w-5 text-yellow-500 mr-2" />
                                                <span className="text-black text-sm">Audio Note</span>
                                            </div>
                                            <audio
                                                controls
                                                src={`${baseUrl}/${task.audio_path}`}
                                                className="w-full max-w-xs"
                                            />
                                        </div>
                                    )}

                                    {/* File */}
                                    {task.file_path && (
                                        <div className="mt-4">
                                            <div className="flex items-center mb-2">
                                                <DocumentArrowDownIcon className="h-5 w-5 text-yellow-500 mr-2" />
                                                <span className="text-black text-sm">Attached File</span>
                                            </div>
                                            {task.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
                                                <div className="relative">
                                                    <img
                                                        src={`${baseUrl}/${task.file_path}`}
                                                        alt="Task attachment"
                                                        className="max-w-full h-40 object-cover rounded-md"
                                                    />
                                                    <a
                                                        href={`${baseUrl}/${task.file_path}`}
                                                        download
                                                        className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs hover:bg-gray-800"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            ) : (
                                                <a
                                                    href={`${baseUrl}/${task.file_path}`}
                                                    download
                                                    className="flex items-center text-yellow-500 hover:text-yellow-600 text-sm"
                                                >
                                                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                                                    Download {task.file_path.split('/').pop()}
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyTasks;