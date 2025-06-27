import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';

const filterOptions = [
  'Assigned By',
  'Created By',
  'Status',
  'Priority',
  'Due Date',
  'Created Date',
  'Last Updated',
];

export default function FilterMenu({ onFilterSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 bg-white text-black border border-gray-300 rounded hover:shadow-md"
      >
        <FunnelIcon className="h-5 w-5 text-yellow-500" />
        Filter
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setOpen(false);
                onFilterSelect(option);
              }}
              className="w-full text-left px-4 py-2 hover:bg-yellow-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
