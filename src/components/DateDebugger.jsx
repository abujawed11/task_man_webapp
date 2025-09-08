// Temporary debugging component - add this to any page to test dates
import React from 'react';
import { formatDate, formatDateTime, isOverdue } from '../utils/dateUtils';

const DateDebugger = ({ sampleDate = '2025-09-08 15:16:47', realTaskData = null }) => {
  const testDate = new Date(sampleDate);
  
  // Old method (what was showing before)
  const oldDateTime = () => {
    const hours = testDate.getHours();
    const minutes = testDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
    const day = testDate.getDate();
    const month = testDate.getMonth() + 1;
    const year = testDate.getFullYear();
    return `${time} | ${day}/${month}/${year}`;
  };

  return (
    <div className="bg-red-100 border border-red-300 p-4 m-4 rounded">
      <h3 className="font-bold text-red-800">🐛 Date Debugging</h3>
      <div className="mt-2 text-sm">
        <p><strong>Sample Date:</strong> {sampleDate}</p>
        <p><strong>OLD method shows:</strong> {oldDateTime()}</p>
        <p><strong>NEW formatDateTime():</strong> {formatDateTime(sampleDate)}</p>
        <p><strong>NEW formatDate():</strong> {formatDate(sampleDate)}</p>
        <p><strong>Browser timezone:</strong> {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
        <p><strong>Date in IST:</strong> {testDate.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})}</p>
        <p><strong>Raw Date object:</strong> {testDate.toString()}</p>
        
        {realTaskData && (
          <div className="mt-4 pt-4 border-t border-red-400">
            <h4 className="font-bold text-red-800">🔍 REAL TASK DATA FROM API:</h4>
            <p><strong>Task ID:</strong> {realTaskData.task_id}</p>
            <p><strong>Title:</strong> {realTaskData.title}</p>
            <div className="bg-yellow-50 p-2 mt-2 rounded">
              <p><strong>📅 created_at (raw from API):</strong> <code>{JSON.stringify(realTaskData.created_at)}</code></p>
              <p><strong>📅 created_at (type):</strong> {typeof realTaskData.created_at}</p>
              <p><strong>📅 created_at (string):</strong> {String(realTaskData.created_at)}</p>
              <p><strong>🕐 Date object:</strong> {new Date(realTaskData.created_at).toString()}</p>
            </div>
            <div className="bg-blue-50 p-2 mt-2 rounded">
              <p><strong>OLD formatDateTime shows:</strong> {(() => {
                const d = new Date(realTaskData.created_at);
                const h = d.getHours(); const m = d.getMinutes(); const ampm = h >= 12 ? 'PM' : 'AM';
                const fh = h % 12 || 12; const fm = m.toString().padStart(2, '0');
                return `${fh}:${fm} ${ampm} | ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
              })()}</p>
              <p><strong>NEW formatDateTime shows:</strong> {formatDateTime(realTaskData.created_at)}</p>
            </div>
            {realTaskData.due_date && (
              <div className="bg-green-50 p-2 mt-2 rounded">
                <p><strong>📅 due_date (raw):</strong> <code>{JSON.stringify(realTaskData.due_date)}</code></p>
                <p><strong>Due (OLD):</strong> {new Date(realTaskData.due_date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
                <p><strong>Due (NEW):</strong> {formatDate(realTaskData.due_date)}</p>
              </div>
            )}
            {realTaskData.updated_at && (
              <div className="bg-purple-50 p-2 mt-2 rounded">
                <p><strong>📅 updated_at (raw):</strong> <code>{JSON.stringify(realTaskData.updated_at)}</code></p>
                <p><strong>Updated (NEW):</strong> {formatDateTime(realTaskData.updated_at)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateDebugger;