# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
client
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ fav3.png
│  ├─ favicon.png
│  ├─ favicon2.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Logo For Black Background.svg
│  │  ├─ logo.svg
│  │  ├─ logo_white_background.svg
│  │  ├─ mascot.json
│  │  └─ react.svg
│  ├─ components
│  │  ├─ BellMenu.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NotificationBell.jsx
│  │  ├─ TaskCard.jsx
│  │  ├─ TaskFilterMenu.jsx
│  │  ├─ TaskSortMenu.jsx
│  │  ├─ TaskUpdateCard.jsx
│  │  └─ UserAvatar.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ NotificationContext.jsx
│  ├─ hooks
│  │  └─ useFilteredSortedTasks.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ AllTasks.jsx
│  │  ├─ AssignedTasks.jsx
│  │  ├─ CreateTask.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTasks.jsx
│  │  ├─ NotificationPage.jsx
│  │  ├─ Signup.jsx
│  │  ├─ TaskProgress.jsx
│  │  └─ UpdateTask.jsx
│  └─ utils
│     └─ downloadExcel.js
├─ tailwind.config.js
└─ vite.config.js

```
```
client
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ fav3.png
│  ├─ favicon.png
│  ├─ favicon2.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ Logo For Black Background.svg
│  │  ├─ logo.svg
│  │  ├─ logo_white_background.svg
│  │  ├─ mascot.json
│  │  └─ react.svg
│  ├─ components
│  │  ├─ BellMenu.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ NotificationBell.jsx
│  │  ├─ TaskCard.jsx
│  │  ├─ TaskFilterMenu.jsx
│  │  ├─ TaskSortMenu.jsx
│  │  ├─ TaskUpdateCard.jsx
│  │  └─ UserAvatar.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ NotificationContext.jsx
│  ├─ hooks
│  │  └─ useFilteredSortedTasks.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ AllTasks.jsx
│  │  ├─ AssignedTasks.jsx
│  │  ├─ CreateTask.jsx
│  │  ├─ Dashboard.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MyTasks.jsx
│  │  ├─ NotificationPage.jsx
│  │  ├─ Signup.jsx
│  │  ├─ TaskProgress.jsx
│  │  └─ UpdateTask.jsx
│  └─ utils
│     └─ downloadExcel.js
├─ tailwind.config.js
└─ vite.config.js

```