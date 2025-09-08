// Demo file to test the new date utilities
// You can run this in browser console to see the difference

import { 
  formatDate, 
  formatDateTime, 
  formatTime, 
  formatDateDDMMYYYY,
  isOverdue,
  getRelativeTime 
} from './utils/dateUtils';

// Test with a sample date from your database
const sampleDate = '2024-01-15T14:30:00.000Z'; // UTC time from database

console.log('=== Date Utility Demo ===');
console.log('Sample date from database:', sampleDate);
console.log('');

console.log('OLD way (incorrect timezone):');
console.log('- formatDate:', new Date(sampleDate).toLocaleDateString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
}));
console.log('- formatTime:', new Date(sampleDate).toLocaleTimeString('en-US', {
  hour: 'numeric', minute: '2-digit', hour12: true
}));
console.log('');

console.log('NEW way (Asia/Kolkata timezone):');
console.log('- formatDate():', formatDate(sampleDate));
console.log('- formatDateTime():', formatDateTime(sampleDate));
console.log('- formatTime():', formatTime(sampleDate));
console.log('- formatDateDDMMYYYY():', formatDateDDMMYYYY(sampleDate));
console.log('- isOverdue():', isOverdue(sampleDate));
console.log('- getRelativeTime():', getRelativeTime(sampleDate));

console.log('');
console.log('=== Try with current time ===');
const now = new Date().toISOString();
console.log('Current time:', now);
console.log('- formatDateTime():', formatDateTime(now));
console.log('- getRelativeTime():', getRelativeTime(now));