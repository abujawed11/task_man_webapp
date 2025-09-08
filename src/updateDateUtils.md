# Update Guide: Replace Custom Date Functions with Centralized Date Utils

## 🎯 Goal
Replace all duplicate `formatDate` and `formatDateTime` functions with the centralized date utilities that handle Asia/Kolkata timezone correctly.

## 📁 Files to Update

### 1. **pages/NotificationPage.jsx** (3 instances)
- Line ~10: `formatDate` function
- Line ~96: `formatDateTime` function  
- Line ~214 & ~322: More `formatDateTime` functions

**Changes needed:**
```js
// Add import at top
import { formatDate, formatDateTime, isOverdue } from '../utils/dateUtils';

// Remove all local formatDate/formatDateTime functions
// Keep the JSX usage as is - just remove function definitions
```

### 2. **pages/MyTasks.jsx** (2 instances)
- Line ~53: `formatDate` function
- Line ~326: Another `formatDate` function

### 3. **pages/AssignedTasks.jsx**
- Line ~70: `formatDate` function

### 4. **pages/AllTasks.jsx**
- Line ~173: `formatDate` function

### 5. **pages/TaskProgress.jsx** (3 instances)
- Line ~260: `formatDate` function
- Line ~415: Another `formatDate` function
- Line ~571: Third `formatDate` function

### 6. **components/TaskUpdateCard.jsx** (4 instances)
- Multiple `formatDate` functions at lines ~99, ~266, ~472

### 7. **components/BellMenu.jsx**
- Line ~162: `formatDate` function

## 🔧 Step-by-Step Process for Each File:

1. **Add the import at the top:**
   ```js
   import { formatDate, formatDateTime, isOverdue } from '../utils/dateUtils';
   ```

2. **Remove the local function definitions** (but keep the JSX usage):
   ```js
   // REMOVE THESE FUNCTIONS:
   const formatDate = (dateStr) => { ... };
   const formatDateTime = (dateStr) => { ... };
   const isOverdue = (dueDate) => { ... };
   ```

3. **Keep all JSX usage unchanged** - the imported functions work the same way

## ✅ Already Updated:
- ✅ **components/TaskCard.jsx**
- ✅ **utils/dateUtils.js** (new centralized utility)

## 🕐 Benefits After Update:
- ✅ **Correct timezone handling** (Asia/Kolkata)
- ✅ **Consistent date formatting** across the app
- ✅ **No duplicate code** - single source of truth
- ✅ **Better error handling** and edge cases
- ✅ **Easy to maintain** and update date formats

## 🚀 Quick Test:
After updating, check that dates show correctly in your timezone by looking at:
- Task creation dates
- Due dates
- Last updated timestamps
- Notification timestamps