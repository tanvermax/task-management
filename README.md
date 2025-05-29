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

### Built with Vite.js and React.
Utilizes a drag-and-drop library (e.g., react-beautiful-dnd) for task management.
Modern, clean, and responsive design with a maximum of four colors.
Responsiveness: Smooth operation on both desktop and mobile devices, ensuring a mobile-friendly drag-and-drop experience.

# 🧠 Mini Productivity Dashboard

This is a full-stack web application built as part of the hiring process for the **Frontend Developer** position at **Airepro Solution Pvt Ltd**.

The application allows users to:
- Register and log in securely (JWT-based authentication)
- Add, edit, delete, and mark daily tasks as complete
- Set and manage weekly/monthly goals
- View motivational quotes from a public API
- (Bonus) Reorder tasks using drag-and-drop
- (Bonus) Toggle between dark and light mode

---

## 🔗 Live Demo

Frontend: [Live on Vercel/Netlify](https://task-management-b4adc.web.app/)  
Backend API: [Live on Render](https://task-managment-server-jilq.onrender.com)

---

## 📹 Video Walkthrough

Watch the explanation of how the project works here: [Watch on YouTube](https://youtu.be/tlzmNtQySj8)

---

## 📁 Tech Stack

### Frontend
- React.js
- React Router
- Context API / Redux (if used)
- Tailwind CSS / CSS Modules / Styled Components
- JWT-based authentication
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- CORS, dotenv, etc.

---

## 🚀 Features

### ✅ Authentication
- User Registration & Login
- JWT-based protected routes

### 📝 Task Management
- Create, edit, delete, and complete daily tasks
- Optional: Drag-and-drop for reordering tasks


### 💬 Motivational Quotes
- Fetched from public APIs such as [zenquotes.io](https://zenquotes.io/) or [quotable.io](https://quotable.io/)

<!-- ### 🌙 UI Enhancements
- Responsive design
- Dark/Light mode toggle (optional bonus) -->

---



 [live link :](https://task-management-b4adc.web.app/)