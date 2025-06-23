// // components/TaskUpdateCard.jsx
// import { DocumentIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

// function TaskUpdateCard({ update, baseUrl }) {
//   return (
//     <div className="mb-10 ml-6 relative">
//       {/* Timeline Dot */}
//       <div className="absolute w-4 h-4 bg-yellow-500 rounded-full left-[-30px] top-1.5 border-2 border-white shadow"></div>

//       <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 ml-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
//           <div className="flex items-center space-x-1">
//             <UserIcon className="h-4 w-4" />
//             <span className="font-medium">{update.updated_by}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <CalendarIcon className="h-4 w-4" />
//             <span>{new Date(update.updated_at).toLocaleString()}</span>
//           </div>
//         </div>

//         {update.status && (
//           <p className="text-sm mb-1">
//             <span className="font-semibold text-gray-800">Status:</span> {update.status}
//           </p>
//         )}

//         {update.title && (
//           <p className="text-sm text-gray-800"><b>Title:</b> {update.title}</p>
//         )}

//         {update.description && (
//           <p className="text-sm text-gray-800 whitespace-pre-wrap"><b>Description:</b> {update.description}</p>
//         )}

//         {update.priority && (
//           <p className="text-sm"><b>Priority:</b> {update.priority}</p>
//         )}

//         {update.due_date && (
//           <p className="text-sm"><b>Due Date:</b> {new Date(update.due_date).toLocaleDateString()}</p>
//         )}

//         {update.assigned_to && (
//           <p className="text-sm"><b>Assigned To:</b> {update.assigned_to}</p>
//         )}

//         {update.comment && (
//           <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
//             <span className="font-semibold">Comment:</span>
//             <div className="bg-gray-100 rounded p-2 mt-1">{update.comment}</div>
//           </div>
//         )}

//         {update.audio_path && (
//           <div className="mt-3">
//             <span className="block text-sm font-medium text-gray-800 mb-1">Audio Note:</span>
//             <audio controls className="w-full">
//               <source src={`${baseUrl}/${update.audio_path}`} type="audio/webm" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>
//         )}

//         {update.file_path && (
//           <div className="mt-3">
//             <a
//               href={`${baseUrl}/${update.file_path}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center text-blue-600 hover:underline text-sm"
//             >
//               <DocumentIcon className="h-5 w-5 mr-1" />
//               Download Attachment
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TaskUpdateCard;


import {
  UserIcon,
  CalendarIcon,
  FireIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentArrowDownIcon,
  MusicalNoteIcon,
} from '@heroicons/react/24/solid';

function TaskUpdateCard({ update, baseUrl, assigned_to }) {
  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return <FireIcon className="h-5 w-5 text-red-500" />;
      case 'Medium':
        return <FireIcon className="h-5 w-5 text-yellow-500" />;
      case 'Low':
        return <FireIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
      case 'In Progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-12 relative">
      {/* Timeline Dot */}
      <div className="absolute w-5 h-5 bg-yellow-500 rounded-full left-[-22px] top-3 border-2 border-white shadow-md"></div>

      <div className="bg-white border border-yellow-500 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300">
        {/* Header */}
        <div className="bg-yellow-100 p-4 rounded-t-lg border-b border-yellow-500 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-black">
            <UserIcon className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Updated By: {update.updated_by}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-black">
            <UserIcon className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Current Assignee: {update.assigned_to ? update.assigned_to : assigned_to}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-black">
            <CalendarIcon className="h-5 w-5 text-yellow-500" />
            <span>{new Date(update.updated_at).toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 text-sm text-black">
          {update.status && (
            <div className="flex items-center">
              {getStatusIcon(update.status)}
              <span className="ml-2">Status: {update.status}</span>
            </div>
          )}
          {update.title && (
            <div>
              <span className="font-semibold">Title:</span> {update.title}
            </div>
          )}
          {update.description && (
            <div>
              <span className="font-semibold">Description:</span> {update.description}
            </div>
          )}
          {update.priority && (
            <div className="flex items-center">
              {getPriorityIcon(update.priority)}
              <span className="ml-2">Priority: {update.priority}</span>
            </div>
          )}
          {update.due_date && (
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Due Date: {formatDate(update.due_date)}</span>
            </div>
          )}
          {update.assigned_to && (
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Assigned To: {update.assigned_to}</span>
            </div>
          )}
          {update.comment && (
            <div>
              <span className="font-semibold block mb-1">Comment:</span>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-sm">
                {update.comment}
              </div>
            </div>
          )}
          {update.audio_path && (
            <div>
              <div className="flex items-center mb-2">
                <MusicalNoteIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-semibold">Audio Note</span>
              </div>
              <audio controls className="w-full max-w-xs">
                <source src={`${baseUrl}/${update.audio_path}`} type="audio/mpeg" />
                <source src={`${baseUrl}/${update.audio_path}`} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          {update.file_path && (
            <div>
              <div className="flex items-center mb-2">
                <DocumentArrowDownIcon className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-semibold">Attached File</span>
              </div>
              {update.file_path.match(/\.(jpg|jpeg|png)$/i) ? (
                <div className="relative">
                  <img
                    src={`${baseUrl}/${update.file_path}`}
                    alt="Attachment"
                    className="max-w-full h-40 object-cover rounded-md"
                  />
                  <a
                    href={`${baseUrl}/${update.file_path}`}
                    // download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs hover:bg-gray-800 transition"
                  >
                    Download
                  </a>
                </div>
              ) : (
                <a
                  href={`${baseUrl}/${update.file_path}`}
                  download
                  className="flex items-center text-yellow-500 hover:text-yellow-600"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Download {update.file_path.split('/').pop()}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskUpdateCard;
