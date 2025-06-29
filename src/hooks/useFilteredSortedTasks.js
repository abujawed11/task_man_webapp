import { useMemo } from 'react';

const useFilteredSortedTasks = (tasks, filters, sortConfig) => {
    return useMemo(() => {
        let filteredTasks = [...tasks];

        // ---------- FILTERING ----------
        if (filters.assigned_by) {
            filteredTasks = filteredTasks.filter(t => t.assigned_by === filters.assigned_by);
        }

        if (filters.assigned_to) {
            filteredTasks = filteredTasks.filter((task) => task.assigned_to === filters.assigned_to);
        }

        if (filters.created_by) {
            filteredTasks = filteredTasks.filter(t => t.created_by === filters.created_by);
        }

        if (filters.status) {
            filteredTasks = filteredTasks.filter(t => t.status === filters.status);
        }

        if (filters.priority) {
            filteredTasks = filteredTasks.filter(t => t.priority === filters.priority);
        }

        if (filters.due_date) {
            filteredTasks = filteredTasks.filter(
                t => new Date(t.due_date).toLocaleDateString('en-CA') === filters.due_date
            );
        }

        if (filters.created_at) {
            filteredTasks = filteredTasks.filter(
                t => new Date(t.created_at).toLocaleDateString('en-CA') === filters.created_at
            );
        }

        if (filters.last_updated_at_date) {
            filteredTasks = filteredTasks.filter(
                t => new Date(t.updated_at).toLocaleDateString('en-CA') === filters.last_updated_at_date
            );
        }

        if (filters.updated_hour_range) {
            const hours = parseInt(filters.updated_hour_range, 10);
            const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);

            filteredTasks = filteredTasks.filter(t => {
                const updatedAt = new Date(t.updated_at);
                return updatedAt >= threshold;
            });

            // Optional debug logs
            //   console.log('Updated Hour Filter Active:', hours, 'hr ago');
            //   console.log('Now:', new Date());
            //   console.log('Threshold:', threshold);
            //   console.log('After hour filtering:', filteredTasks.length);
        }


        // if (filters.updated_hour_range) {
        //     const now = new Date();
        //     const threshold = new Date(Date.now() - filters.updated_hour_range * 60 * 60 * 1000);

        //     console.log("Updated Hour Filter Active:", filters.updated_hour_range, "hr ago");
        //     console.log("Now:", now);
        //     console.log("Threshold:", threshold);

        //     filteredTasks = filteredTasks.filter((t) => {
        //         const updatedTime = new Date(t.updated_at);
        //         const result = updatedTime >= threshold;
        //         console.log(
        //             `Checking ${t.task_id} → ${updatedTime} >= ${threshold}? → ${result}`
        //         );
        //         return result;
        //     });

        //     console.log("After filtering:", filteredTasks.length);
        // }


        // ---------- SORTING ----------
        if (sortConfig.field && sortConfig.order) {
            const dir = sortConfig.order === 'ASC' ? 1 : -1;
            const field = sortConfig.field;

            filteredTasks.sort((a, b) => {
                // Priority sorting
                if (field === 'priority') {
                    const map = { High: 3, Medium: 2, Low: 1 };
                    return (map[a.priority] - map[b.priority]) * dir;
                }

                // Status sorting
                if (field === 'status') {
                    const map = { Pending: 3, 'In Progress': 2, Completed: 1 };
                    return (map[a.status] - map[b.status]) * dir;
                }

                // Sort by created time only
                if (field === 'created_time') {
                    const timeA = new Date(a.created_at).getTime() % (24 * 60 * 60 * 1000);
                    const timeB = new Date(b.created_at).getTime() % (24 * 60 * 60 * 1000);
                    return (timeA - timeB) * dir;
                }

                // Sort by assigned_to or created_by
                if (field === 'assigned_to' || field === 'created_by') {
                    return a[field].localeCompare(b[field]) * dir;
                }

                // Default sorting for dates
                const dateA = new Date(a[field]);
                const dateB = new Date(b[field]);
                return (dateA - dateB) * dir;
            });
        }

        return filteredTasks;
    }, [tasks, filters, sortConfig]);
};

export default useFilteredSortedTasks;
