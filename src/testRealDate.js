// Test with actual database format
import { formatDate, formatDateTime } from './utils/dateUtils';

console.log('=== TESTING REAL DATABASE FORMAT ===');

// Your actual database format (no timezone)
const dbDate = '2025-09-08 15:16:47';  // 3:16 PM IST
const utcDate = '2024-01-15T14:30:00.000Z'; // 2:30 PM UTC = 8:00 PM IST

console.log('\n1. Database format (should show 3:16 PM):');
console.log('Input:', dbDate);
console.log('formatDateTime():', formatDateTime(dbDate));
console.log('Raw Date object:', new Date(dbDate).toString());

console.log('\n2. UTC format (should show 8:00 PM):');
console.log('Input:', utcDate);
console.log('formatDateTime():', formatDateTime(utcDate));
console.log('Raw Date object:', new Date(utcDate).toString());

console.log('\n3. Testing parseDate function:');
// Import parseDate to test
console.log('Checking parseDate logic...');