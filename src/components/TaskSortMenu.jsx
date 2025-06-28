// components/TaskSortMenu.jsx

import { BarsArrowDownIcon, ArrowPathIcon } from '@heroicons/react/24/solid';


const TaskSortMenu = ({ sortConfig, setSortConfig, onClose, onSortClick }) => {
    const handleClearSort = () => {
        setSortConfig({ field: '', order: '' });
    };

    return (
        <div className="bg-white border border-yellow-500 rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black flex items-center">Sort Tasks</h2>
                {/* <button onClick={onClose} className="text-red-600 hover:underline font-medium flex items-center">
          <XMarkIcon className="h-5 w-5 mr-1" /> Close
        </button> */}
            </div>

            <div className="flex justify-between items-center flex-wrap gap-4">
                {/* Sort Controls */}
                <div className="flex items-center flex-wrap gap-4">
                    <label className="text-sm font-medium text-black">Sort By:</label>

                    <select
                        value={sortConfig.field}
                        onChange={(e) => setSortConfig((prev) => ({ ...prev, field: e.target.value }))}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
                    >
                        <option value="">Select</option>
                        <option value="created_at">Created Date</option>
                        <option value="created_time">Created Time</option>
                        <option value="due_date">Due Date</option>
                        <option value="updated_at">Last Updated Time</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                        <option value="assigned_to">Assigned To</option>
                        <option value="created_by">Created By</option>
                    </select>

                    <select
                        value={sortConfig.order}
                        onChange={(e) => setSortConfig((prev) => ({ ...prev, order: e.target.value }))}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm border border-black focus:ring-yellow-500 focus:border-yellow-500"
                    >
                        <option value="">Select</option>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>

                    <button
                        onClick={onSortClick}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-5 py-2 rounded-md text-sm shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition duration-200"
                    >
                        <BarsArrowDownIcon className="h-5 w-5" />
                        Sort
                    </button>

                    <button
                        onClick={handleClearSort}
                        className="flex items-center gap-2 bg-white text-black border border-black px-5 py-2 rounded-md text-sm shadow-sm hover:bg-gray-100 transition duration-200"
                    >
                        <ArrowPathIcon className="h-5 w-5" />
                        Clear Sort
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TaskSortMenu;
