// Quick test file to debug date utilities
// Add this temporarily to any component to test

import { formatDate, formatDateTime, isOverdue } from './utils/dateUtils';

// Test with a UTC timestamp (what your database likely stores)
const testDates = [
  '2024-01-15T09:00:00.000Z', // 9 AM UTC = 2:30 PM IST
  '2024-01-15T14:30:00.000Z', // 2:30 PM UTC = 8:00 PM IST  
  '2024-01-15T18:45:00.000Z', // 6:45 PM UTC = 12:15 AM IST (next day)
];

console.log('=== DATE UTILITY TEST ===');
testDates.forEach((date, index) => {
  console.log(`\nTest ${index + 1}: ${date}`);
  console.log('formatDate():', formatDate(date));
  console.log('formatDateTime():', formatDateTime(date));
  
  // Show what old method would display (browser timezone)
  const oldDate = new Date(date);
  const oldTime = oldDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const oldDateStr = `${oldTime} | ${oldDate.getDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
  console.log('OLD method would show:', oldDateStr);
});

// Export for easy use
export { testDates, formatDate, formatDateTime };