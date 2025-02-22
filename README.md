# Task Management Application
## Overview
This Task Management Application enables users to efficiently manage tasks through a clean, minimalistic, and responsive interface. Users can add, edit, delete, and reorder tasks within three categories: To-Do, In Progress, and Done. The application ensures real-time synchronization and persistence by saving changes instantly to the database.

### Features
Authentication: Secure user authentication via Firebase Authentication with Google sign-in. User details (User ID, email, and display name) are stored in the database upon first login.

### Task Management:

Add, edit, delete, and reorder tasks.
Categorize tasks into To-Do, In Progress, and Done.
Drag and drop tasks between categories and reorder within categories.
Each task includes a title (max 50 characters), an optional description (max 200 characters), a timestamp, and a category.
Database & Persistence:

Tasks are stored in a MongoDB database via an Express.js server.
Real-time updates ensure tasks remain in their last known order after a refresh or reopening.
Deleted tasks are permanently removed from the database.
Frontend UI:

Built with Vite.js and React.
Utilizes a drag-and-drop library (e.g., react-beautiful-dnd) for task management.
Modern, clean, and responsive design with a maximum of four colors.
Responsiveness: Smooth operation on both desktop and mobile devices, ensuring a mobile-friendly drag-and-drop experience.

 [live link :](https://task-management-b4adc.web.app/)