// // components/TaskFilterMenu.jsx
// import { XMarkIcon } from '@heroicons/react/24/solid';

// const TaskFilterMenu = ({ filters, setFilters, onClose }) => {
//   return (
//     <div className="absolute top-[110px] right-4 bg-white border border-yellow-500 rounded-lg shadow-lg p-4 z-50 w-full max-w-md">
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-black font-bold">Filter Tasks</h3>
//         <button onClick={onClose}>
//           <XMarkIcon className="h-5 w-5 text-red-500" />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-3">
//         <input
//           name="assigned_by"
//           value={filters.assigned_by}
//           onChange={(e) => setFilters({ ...filters, assigned_by: e.target.value })}
//           placeholder="Assigned By"
//           className="border border-gray-300 p-2 rounded-md"
//         />
//         <input
//           name="created_by"
//           value={filters.created_by}
//           onChange={(e) => setFilters({ ...filters, created_by: e.target.value })}
//           placeholder="Created By"
//           className="border border-gray-300 p-2 rounded-md"
//         />
//         <select
//           name="status"
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           className="border border-gray-300 p-2 rounded-md"
//         >
//           <option value="">All Status</option>
//           <option>Pending</option>
//           <option>In Progress</option>
//           <option>Completed</option>
//         </select>
//         <select
//           name="priority"
//           value={filters.priority}
//           onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//           className="border border-gray-300 p-2 rounded-md"
//         >
//           <option value="">All Priorities</option>
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </select>
//         <input
//           type="date"
//           name="due_date"
//           value={filters.due_date}
//           onChange={(e) => setFilters({ ...filters, due_date: e.target.value })}
//           className="border border-gray-300 p-2 rounded-md"
//         />
//         <input
//           type="date"
//           name="created_at"
//           value={filters.created_at}
//           onChange={(e) => setFilters({ ...filters, created_at: e.target.value })}
//           className="border border-gray-300 p-2 rounded-md"
//         />
//         <input
//           type="date"
//           name="last_updated_at_date"
//           value={filters.last_updated_at_date}
//           onChange={(e) => setFilters({ ...filters, last_updated_at_date: e.target.value })}
//           className="border border-gray-300 p-2 rounded-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default TaskFilterMenu;

// components/TaskFilterMenu.jsx
// import { XMarkIcon } from '@heroicons/react/24/solid';




// const TaskFilterMenu = ({ filters, setFilters, onClose, users = [] }) => {

// const handleFilterChange = (name, value) => {
//   setFilters((prev) => ({ ...prev, [name]: value }));
//   onClose();
// };

//   return (
//     <div className="absolute top-[60px] right-4 bg-white border border-yellow-500 rounded-lg shadow-lg p-4 z-50 w-full max-w-sm max-h-[420px] overflow-y-auto">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-black font-bold text-lg">Filter Tasks</h3>
//         <button onClick={onClose}>
//           <XMarkIcon className="h-5 w-5 text-red-500" />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-3 text-sm">
//         {/* Assigned By */}
//         <div>
//           <label className="block text-black font-medium mb-1">Assigned By</label>
//           <select
//             name="assigned_by"
//             value={filters.assigned_by}
//             // onChange={(e) => setFilters({ ...filters, assigned_by: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All</option>
//             {users.map((u) => (
//               <option key={u.username} value={u.username}>
//                 {u.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Created By */}
//         <div>
//           <label className="block text-black font-medium mb-1">Created By</label>
//           <select
//             name="created_by"
//             value={filters.created_by}
//             // onChange={(e) => setFilters({ ...filters, created_by: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All</option>
//             {users.map((u) => (
//               <option key={u.username} value={u.username}>
//                 {u.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-black font-medium mb-1">Status</label>
//           <select
//             name="status"
//             value={filters.status}
//             // onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-black font-medium mb-1">Priority</label>
//           <select
//             name="priority"
//             value={filters.priority}
//             // onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>

//         {/* Due Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Due Date</label>
//           <input
//             type="date"
//             name="due_date"
//             value={filters.due_date}
//             // onChange={(e) => setFilters({ ...filters, due_date: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Created Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Created Date</label>
//           <input
//             type="date"
//             name="created_at"
//             value={filters.created_at}
//             // onChange={(e) => setFilters({ ...filters, created_at: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Last Updated Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Last Updated Date</label>
//           <input
//             type="date"
//             name="last_updated_at_date"
//             value={filters.last_updated_at_date}
//             // onChange={(e) => setFilters({ ...filters, last_updated_at_date: e.target.value })}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskFilterMenu;


// import { XMarkIcon } from '@heroicons/react/24/solid';

// const TaskFilterMenu = ({ filters, setFilters, onClose, users = [] }) => {
//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     onClose();
//   };

//   const handleClearFilters = () => {
//     setFilters({
//       assigned_by: '',
//       created_by: '',
//       status: '',
//       priority: '',
//       due_date: '',
//       created_at: '',
//       last_updated_at_date: '',
//     });
//     onClose();
//   };

//   return (
//     <div className="absolute top-[60px] right-4 bg-white border border-yellow-500 rounded-lg shadow-lg p-4 z-50 w-full max-w-sm max-h-[480px] overflow-y-auto">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-black font-bold text-lg">Filter Tasks</h3>
//         <button onClick={onClose}>
//           <XMarkIcon className="h-5 w-5 text-red-500" />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-3 text-sm">
//         {/* Assigned By */}
//         <div>
//           <label className="block text-black font-medium mb-1">Assigned By</label>
//           <select
//             name="assigned_by"
//             value={filters.assigned_by}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All</option>
//             {users.map((u) => (
//               <option key={u.username} value={u.username}>
//                 {u.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Created By */}
//         <div>
//           <label className="block text-black font-medium mb-1">Created By</label>
//           <select
//             name="created_by"
//             value={filters.created_by}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All</option>
//             {users.map((u) => (
//               <option key={u.username} value={u.username}>
//                 {u.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Status */}
//         <div>
//           <label className="block text-black font-medium mb-1">Status</label>
//           <select
//             name="status"
//             value={filters.status}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-black font-medium mb-1">Priority</label>
//           <select
//             name="priority"
//             value={filters.priority}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           >
//             <option value="">All Priorities</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>

//         {/* Due Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Due Date</label>
//           <input
//             type="date"
//             name="due_date"
//             value={filters.due_date}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Created Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Created Date</label>
//           <input
//             type="date"
//             name="created_at"
//             value={filters.created_at}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Last Updated Date */}
//         <div>
//           <label className="block text-black font-medium mb-1">Last Updated Date</label>
//           <input
//             type="date"
//             name="last_updated_at_date"
//             value={filters.last_updated_at_date}
//             onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>
//       </div>

//       {/* Clear Filters Button */}
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={handleClearFilters}
//           className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
//         >
//           Clear Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskFilterMenu;





// import { FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

// const TaskFilterMenu = ({ filters, setFilters, onClose, users }) => {
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value }));
//     };

//     const clearFilters = () => {
//         setFilters({
//             assigned_by: '',
//             created_by: '',
//             status: '',
//             priority: '',
//             due_date: '',
//             created_at: '',
//             last_updated_at_date: '',
//             updated_hour_range: '',
//         });
//         onClose(); // Optional: close after clearing
//     };

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-sm">
//             <div className="col-span-full flex justify-between items-center mb-2">
//                 <h2 className="flex items-center font-bold text-black text-lg">
//                     <FunnelIcon className="h-5 w-5 mr-1 text-yellow-500" />
//                     Filter Tasks
//                 </h2>
//                 <button
//                     onClick={clearFilters}
//                     className="flex items-center gap-2 bg-white text-black border border-black px-5 py-2 rounded-md text-sm shadow-sm hover:bg-gray-100 transition duration-200"
//                 >
//                     <ArrowPathIcon className="h-5 w-5" />
//                     Clear Filters
//                 </button>

//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Assigned To</label>
//                 <select name="assigned_by" value={filters.assigned_by} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md">
//                     <option value="">All</option>
//                     {users.map(u => (
//                         <option key={u.username} value={u.username}>{u.username}</option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Created By</label>
//                 <select name="created_by" value={filters.created_by} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md">
//                     <option value="">All</option>
//                     {users.map(u => (
//                         <option key={u.username} value={u.username}>{u.username}</option>
//                     ))}
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Status</label>
//                 <select name="status" value={filters.status} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md">
//                     <option value="">All</option>
//                     <option value="Pending">Pending</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Priority</label>
//                 <select name="priority" value={filters.priority} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md">
//                     <option value="">All</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Due Date</label>
//                 <input type="date" name="due_date" value={filters.due_date} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md" />
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Created Date</label>
//                 <input type="date" name="created_at" value={filters.created_at} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md" />
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Updated Date</label>
//                 <input type="date" name="last_updated_at_date" value={filters.last_updated_at_date} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md" />
//             </div>

//             <div>
//                 <label className="block mb-1 text-black font-medium">Updated Hour Range</label>
//                 <select name="updated_hour_range" value={filters.updated_hour_range} onChange={handleChange}
//                     className="w-full border border-gray-300 p-2 rounded-md">
//                     <option value="">All</option>
//                     <option value="1">Last 1 Hour</option>
//                     <option value="6">Last 6 Hours</option>
//                     <option value="12">Last 12 Hours</option>
//                     <option value="24">Last 24 Hours</option>
//                 </select>
//             </div>
//         </div>
//     );
// };

// export default TaskFilterMenu;


import { FunnelIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const TaskFilterMenu = ({ filters, setFilters, onClose, users, pageType }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            assigned_by: '',
            created_by: '',
            status: '',
            priority: '',
            due_date: '',
            created_at: '',
            last_updated_at_date: '',
            updated_hour_range: '',
        });
        // onClose(); // Optional: close after clearing
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-sm">
            <div className="col-span-full flex justify-between items-center mb-2">
                <h2 className="flex items-center font-bold text-black text-lg">
                    <FunnelIcon className="h-5 w-5 mr-1 text-yellow-500" />
                    Filter Tasks
                </h2>
                <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 bg-white text-black border border-black px-5 py-2 rounded-md text-sm shadow-sm hover:bg-gray-100 transition duration-200"
                >
                    <ArrowPathIcon className="h-5 w-5" />
                    Clear Filters
                </button>
            </div>

            {/* Assigned To */}
            <div>
                <label className="block mb-1 text-black font-medium">Assigned To</label>
                <select
                    name="assigned_to"
                    value={filters.assigned_to}
                    onChange={handleChange}
                    //   className="w-full border border-gray-300 p-2 rounded-md"
                    className={`w-full border p-2 rounded-md ${pageType === 'myTasks' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                        }`}
                    disabled={pageType === 'myTasks'}
                >
                    <option value="">All</option>
                    {users.map(u => (
                        <option key={u.username} value={u.username}>{u.username}</option>
                    ))}
                </select>
            </div>

            {/* Created By */}
            <div>
                <label className="block mb-1 text-black font-medium">Assigned By</label>
                <select
                    name="created_by"
                    value={filters.created_by}
                    onChange={handleChange}
                    // className="w-full border border-gray-300 p-2 rounded-md"
                    className={`w-full border p-2 rounded-md ${pageType === 'assignTasks' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                        }`}
                    disabled={pageType === 'assignTasks'}
                >
                    <option value="">All</option>
                    {users.map(u => (
                        <option key={u.username} value={u.username}>{u.username}</option>
                    ))}
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="block mb-1 text-black font-medium">Status</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Priority */}
            <div>
                <label className="block mb-1 text-black font-medium">Priority</label>
                <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                >
                    <option value="">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Due Date */}
            <div>
                <label className="block mb-1 text-black font-medium">Due Date</label>
                <input
                    type="date"
                    name="due_date"
                    value={filters.due_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>

            {/* Created Date */}
            <div>
                <label className="block mb-1 text-black font-medium">Created Date</label>
                <input
                    type="date"
                    name="created_at"
                    value={filters.created_at}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>

            {/* Updated Date */}
            <div>
                <label className="block mb-1 text-black font-medium">Updated Date</label>
                <input
                    type="date"
                    name="last_updated_at_date"
                    value={filters.last_updated_at_date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>

            {/* Updated Hour Range */}
            <div>
                <label className="block mb-1 text-black font-medium">Updated Hour Range</label>
                <select
                    name="updated_hour_range"
                    value={filters.updated_hour_range}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                >
                    <option value="">All</option>
                    <option value="1">Last 1 Hour</option>
                    <option value="6">Last 6 Hours</option>
                    <option value="12">Last 12 Hours</option>
                    <option value="24">Last 24 Hours</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilterMenu;




