
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/NotificationContext';

function NotificationPage() {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useContext(NotificationContext);

  const formatDate = (date) => {
    if (!date) return '—';
    const parsed = new Date(date);
    return isNaN(parsed) ? '—' : parsed.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-white py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-black text-yellow-400 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-10 text-black">All Notifications</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-lg">No notifications.</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note.id}
              className="w-96 h-[300px] bg-white border border-yellow-300 rounded-2xl p-4 shadow-md hover:shadow-yellow-400/50 transition-transform hover:-translate-y-[2px] animate-float flex flex-col justify-between"
            >
              <div className="space-y-1 text-black">
                <h2 className="font-bold text-lg">Task Update</h2>
                <p className="text-sm">{note.message}</p>
                <p className="text-xs text-gray-700">Created At: {formatDate(note.task?.created_at)}</p>
                <p className="text-xs text-gray-700">Due Date: {formatDate(note.task?.due_date)}</p>
                <p className="text-xs text-gray-700">Created By: {note.task?.created_by || '—'}</p>
                <p className="text-xs text-gray-700">Received At: {formatDate(note.created_at)}</p>
                <p className="text-xs text-gray-700">Priority: {note.task?.priority || '—'}</p>
                <p className="text-xs text-gray-700">Status: {note.task?.status || '—'}</p>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => markAsRead(note.id)}
                  className="bg-black text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-gray-900 hover:shadow-yellow-400/50 transition hover:-translate-y-[2px] animate-float"
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPage;