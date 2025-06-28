// src/components/TaskCard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    FireIcon,
    ArrowDownIcon,
    ClockIcon,
    PlayIcon,
    CheckCircleIcon,
    CalendarIcon,
    UserIcon,
    DocumentArrowDownIcon,
    MusicalNoteIcon,
} from '@heroicons/react/24/solid';

function TaskCard({ task, baseUrl, expanded, toggleDescription, location = 'myTasks' }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${time} | ${day}/${month}/${year}`;
    };


    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    const isUser = (user?.accountType === "Super Admin" && location === "adminTasks");
    // console.log(isUser)
    // console.log(user?.accountType)

    return (
        <div className="bg-white border border-yellow-500 rounded-xl shadow-md p-2 transition-transform transform hover:scale-105 hover:shadow-yellow-300/60 hover:shadow-2xl hover:ring-2 hover:ring-yellow-300 hover:ring-offset-2">
            <div className="bg-yellow-100 p-4 border-b border-yellow-500 flex justify-between items-start rounded-t-xl">
                <h3 className="text-xl font-semibold text-black truncate">{task.title}</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => navigate(`/tasks/${task.task_id}/progress`, { state: { from: location } })}
                        className="cursor-pointer text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
                    >
                        View Progress
                    </button>
                    {/* {location === 'myTasks' && ( */}
                    <button
                        onClick={() => navigate(`/tasks/${task.task_id}/update`, { state: { from: location } })}
                        className="cursor-pointer text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                        Update
                    </button>
                    {/* //   )} */}
                </div>
            </div>

            <div className="p-4 space-y-3">
                {/* <p className="text-black text-sm">
                    {expanded || task.description?.length <= 100
                        ? task.description || 'No description'
                        : `${task.description.slice(0, 100)}...`}
                </p> */}
                <p className="text-black text-sm">
                    {expanded || (task.description || '').length <= 100
                        ? task.description || 'No description'
                        : `${(task.description || '').slice(0, 100)}...`}
                </p>
                {task.description?.length > 100 && (
                    <button
                        onClick={() => toggleDescription(task.task_id)}
                        className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                    >
                        {expanded ? 'Read Less' : 'Read More'}
                    </button>
                )}

                <div className="flex items-center">
                    {task.priority === 'High' && <FireIcon className="h-5 w-5 text-red-500 mr-2" />}
                    {task.priority === 'Medium' && <FireIcon className="h-5 w-5 text-yellow-500 mr-2" />}
                    {task.priority === 'Low' && <ArrowDownIcon className="h-5 w-5 text-blue-500 mr-2" />}
                    <span className="text-black text-sm">Priority: {task.priority}</span>
                </div>

                <div className="flex items-center">
                    {task.status === 'Pending' && <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />}
                    {task.status === 'In Progress' && <PlayIcon className="h-5 w-5 text-blue-500 mr-2" />}
                    {task.status === 'Completed' && <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />}
                    <span className="text-black text-sm">Status: {task.status}</span>
                </div>

                <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-black text-sm">Created: {formatDateTime(task.created_at)}</span>
                </div>

                <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-semibold' : 'text-black'}`}>
                        Due: {formatDate(task.due_date)}
                    </span>
                </div>



                {isUser ? (<>

                    <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-black text-sm">
                            Created By: {task.created_by}
                        </span>
                    </div>
                    {(task.created_by !== task.assigned_by) && <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-black text-sm">
                            Re-assigned By: {task.assigned_by}
                        </span>
                    </div>}

                    <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-black text-sm">
                            Assigned To: {task.assigned_to}
                        </span>
                    </div>
                </>) :
                    (<div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-black text-sm">

                            {/* {(location === 'myTasks') ? `Assigned By: ${task.assigned_by}` : `Assigned To: ${task.assigned_to}`} */}

                            {(location === 'myTasks') ? `Assigned By: ${task.assigned_by || task.created_by}` : `Assigned To: ${task.assigned_to}`}
                        </span>
                    </div>)
                }

                <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                    {/* <span className="text-black text-sm">Created: {formatDateTime(task.created_at)}</span> */}
                    Last Updated: {formatDateTime(task.updated_at || task.last_updated_at)}
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
