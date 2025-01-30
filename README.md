Blog Platform
This is a full-stack blog platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to create, edit, delete, and view posts. It is built with modern tools and techniques, including Material-UI, Framer Motion, and Toast notifications.

Features
Create, update, and delete blog posts.
View a list of blog posts with animations.
Theme toggle between light and dark modes.
User-friendly UI with Material-UI components.
Smooth animations with Framer Motion.
Notifications with React Toastify.
Backend following the MVC pattern.
Frontend
The frontend is built using React with Material-UI for styling and Framer Motion for animations.

Key Dependencies
React: Component-based UI development.
Material-UI: UI components for styling.
Framer Motion: Animations for a smooth user experience.
React Toastify: Notifications for user feedback.
File Structure
Code
src/
├── components/
│   ├── PostForm.jsx
│   ├── PostList.jsx
│   ├── LoadingSpinner.jsx
├── ThemeContext.js
├── App.jsx
├── index.js
How It Works
PostForm Component:

Handles creating and updating posts.
Includes validation and error handling for form inputs.
Uses Framer Motion for animations on mount/unmount.
PostList Component:

Displays a list of blog posts.
Includes edit and delete functionality.
Animates post cards with hover effects using Framer Motion.
App Component:

Contains the main application logic.
Integrates theme toggling with ThemeContext.
Manages the state of posts and loading status.
Backend
The backend is structured using the MVC pattern.

Key Dependencies
Express.js: Web server framework.
Mongoose: MongoDB object modeling.
Cors: Cross-origin resource sharing.
Dotenv: Environment variable management.
File Structure
Code
go2cod_fd_01/backend/
├── controllers/
│   └── postController.js
├── models/
│   └── Post.js
├── routes/
│   └── postRoutes.js
├── config/
│   └── db.js
├── server.js
API Endpoints
GET /api/posts: Retrieve all posts.
POST /api/posts: Create a new post.
PUT /api/posts/:id: Update a post by ID.
DELETE /api/posts/:id: Delete a post by ID.
Installation
Clone the repository:

bash
git clone https://github.com/Nyamori2024/GO2COD_FD_01.git
cd blog-platform
Install dependencies:

bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd go2cod_fd_01
npm install
Set up environment variables:

Create a .env file in the backend folder.

Add the following variables:

env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.ilhc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
Start the development server:

bash
# Start the backend
cd go2cod_fd_01
npm run dev

# Start the frontend
cd ../frontend
npm start
Usage
Open the application in your browser at http://localhost:3000.
Create a new post using the form.
Edit or delete posts as needed.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature/bug fix.
Commit your changes with descriptive messages.
Open a pull request.
Acknowledgments
Material-UI for components.
Framer Motion for animations.
React Toastify for notifications.
