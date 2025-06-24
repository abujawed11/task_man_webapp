// src/components/TaskFilterSort.js
import { FunnelIcon } from '@heroicons/react/24/solid';

function TaskFilterSort({
    filters,
    onFilterChange,
    onResetFilters,
    sortConfig,
    onSortChange,
    users,
}) {
    return (
        <>
            {/* Filters */}
            <div className="bg-white border border-yellow-500 rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <FunnelIcon className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-lg font-semibold text-black">Filter Tasks</h3>
                    </div>
                    <button
                        onClick={onResetFilters}
                        className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                    >
                        Clear Filters
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Assigned To</label>
                        <select
                            name="assigned_to"
                            value={filters.assigned_to}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option value="">All</option>
                            {users.map((u) => (
                                <option key={u.username} value={u.username}>{u.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Created By</label>
                        <select
                            name="created_by"
                            value={filters.created_by}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option value="">All</option>
                            {users.map((u) => (
                                <option key={u.username} value={u.username}>{u.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Priority</label>
                        <select
                            name="priority"
                            value={filters.priority}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        >
                            <option value="">All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={filters.due_date}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Created Date</label>
                        <input
                            type="date"
                            name="created_at"
                            value={filters.created_at}
                            onChange={onFilterChange}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                </div>
            </div>

            {/* Sorting */}
            <div className="flex items-center mb-6 space-x-4">
                <label className="text-sm font-medium text-black">Sort By:</label>

                <select
                    value={sortConfig.field}
                    onChange={(e) => onSortChange({ ...sortConfig, field: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                >
                    <option value="created_at">Created Date</option>
                    <option value="created_time">Created Time</option>
                    <option value="due_date">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                    <option value="assigned_to">Assigned To</option>
                    <option value="created_by">Created By</option>
                </select>

                <select
                    value={sortConfig.order}
                    onChange={(e) => onSortChange({ ...sortConfig, order: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 text-sm focus:ring-yellow-500 focus:border-yellow-500"
                >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>

                {/* <button
                    onClick={() => setSortConfig({ ...sortConfig })}
                    className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
                >
                    Sort
                </button> */}
            </div>
        </>
    );
}

export default TaskFilterSort;
