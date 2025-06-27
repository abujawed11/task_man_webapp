import { useState } from 'react';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

const sortOptions = [
  'Created Date',
  'Created Time',
  'Due Date',
  'Priority',
  'Status',
  'Last Updated',
];

export default function SortMenu({ onSortSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 bg-white text-black border border-gray-300 rounded hover:shadow-md"
      >
        <ArrowsUpDownIcon className="h-5 w-5 text-yellow-500" />
        Sort
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setOpen(false);
                onSortSelect(option);
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
