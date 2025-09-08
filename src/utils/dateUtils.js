/**
 * Centralized Date Utility Functions
 * Handles timezone conversion for Asia/Kolkata
 * 
 * Note: Database stores dates as 'YYYY-MM-DD HH:mm:ss' (local time in Asia/Kolkata)
 * These are NOT UTC timestamps, so no timezone conversion is needed
 */

const TIMEZONE = 'Asia/Kolkata';

/**
 * Parse date string from database format
 * Database format: '2025-09-08 15:16:47' (already in IST)
 * @param {string|Date} dateStr - Date string from database or Date object
 * @returns {Date} - Parsed Date object
 */
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return dateStr;
  
  // If it's already a UTC string (contains T or Z), use as is
  if (typeof dateStr === 'string' && (dateStr.includes('T') || dateStr.endsWith('Z'))) {
    return new Date(dateStr);
  }
  
  // For database format 'YYYY-MM-DD HH:mm:ss', treat as local time (IST)
  // Don't add timezone conversion since it's already in IST
  return new Date(dateStr);
};

/**
 * Format date to short format (e.g., "Dec 25, 2023")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = parseDate(dateStr);
    if (!date || isNaN(date.getTime())) return 'N/A';
    
    // Since database dates are already in IST, no timezone conversion needed
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

/**
 * Format date with time (e.g., "2:30 PM | 25/12/2023")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = parseDate(dateStr);
    if (!date || isNaN(date.getTime())) return 'N/A';
    
    // Since database dates are already in IST, format directly without timezone conversion
    const timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const dateOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    
    const time = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions); // DD/MM/YYYY format
    
    return `${time} | ${formattedDate}`;
  } catch (error) {
    console.error('Error formatting date time:', error);
    return 'N/A';
  }
};

/**
 * Format time only (e.g., "2:30 PM")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Formatted time string
 */
export const formatTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = parseDate(dateStr);
    if (!date || isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'N/A';
  }
};

/**
 * Format date in DD/MM/YYYY format
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Formatted date string
 */
export const formatDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: TIMEZONE
    });
  } catch (error) {
    console.error('Error formatting date DD/MM/YYYY:', error);
    return 'N/A';
  }
};

/**
 * Format date for form inputs (YYYY-MM-DD)
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Formatted date string for input[type="date"]
 */
export const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    // Convert to Asia/Kolkata timezone and format as YYYY-MM-DD
    const localDate = new Date(date.toLocaleString("en-US", {timeZone: TIMEZONE}));
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Check if date is overdue (past current date)
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {boolean} - True if date is overdue
 */
export const isOverdue = (dateStr) => {
  if (!dateStr) return false;
  
  try {
    const dueDate = parseDate(dateStr);
    const currentDate = new Date();
    
    if (!dueDate || isNaN(dueDate.getTime())) return false;
    
    // Since database dates are already in IST, compare directly
    // Compare dates only (not time)
    const dueDateOnly = new Date(dueDate);
    const currentDateOnly = new Date(currentDate);
    
    dueDateOnly.setHours(0, 0, 0, 0);
    currentDateOnly.setHours(0, 0, 0, 0);
    
    return dueDateOnly < currentDateOnly;
  } catch (error) {
    console.error('Error checking if overdue:', error);
    return false;
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    const now = new Date();
    
    if (isNaN(date.getTime())) return 'N/A';
    
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    
    // For older dates, show formatted date
    return formatDate(dateStr);
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'N/A';
  }
};

/**
 * Convert UTC date to Asia/Kolkata timezone
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {Date} - Date object in Asia/Kolkata timezone
 */
export const toKolkataTime = (dateStr) => {
  if (!dateStr) return null;
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    return new Date(date.toLocaleString("en-US", {timeZone: TIMEZONE}));
  } catch (error) {
    console.error('Error converting to Kolkata time:', error);
    return null;
  }
};