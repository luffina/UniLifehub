# UniLifeHub

**UniLife** is a comprehensive web application designed to enhance the student experience by providing a centralized platform for managing various academic and social activities. Whether you need help organizing your study schedule, finding study buddies, or staying updated on university events, UniLife is here to assist.

## Features

- **Digital Student Profile**: Create and manage a personalized digital profile that stores academic, personal, and social details in one place for easy access.
- **Study Planner**: A dedicated tool for planning your studies effectively, complete with scheduling features and reminders to keep you on track.
- **Study Buddies**: Find and connect with like-minded study buddies based on courses, interests, or study habits to foster collaboration and improve learning.
- **University Events Forum**: Discover and post events happening at your university, from academic workshops to social gatherings and student organization meetings.
- **Important Links**: A convenient page with all the essential university-related links, such as learning portals, library resources, course registrations, and more for easy access.

## Tech Stack

- **Frontend**: Built with **React** for a fast and responsive user experience. React allows dynamic interactions and real-time updates on the platform.
- **Backend**: Developed using **Node.js** for server-side logic, APIs, and managing user sessions, ensuring a robust, scalable backend.
- **Database**: (Optional) Although this version of the app currently stores data in-memory, future updates will integrate a persistent database (e.g., MongoDB or PostgreSQL).

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- **Node.js** (v12 or higher) and **npm** (comes with Node.js)
- **React** (included in project dependencies)
- **Git** (optional, for cloning the repository)
- **Python** (if using a Flask backend or for additional scripts)

### Installation

Follow these steps to get the project up and running locally:

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/your-username/unilifehub.git
   cd unilife
   ```

2. **Install the dependencies** for both the frontend and backend:

   For the **Backend**:
   ```bash
   cd backend
   npm install
   ```

   For the **Frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory to store sensitive data such as your session secret key.
   - Example `.env` file:
     ```
     SECRET_KEY=your-secret-key
     ```

4. **Start the backend server**:
   ```bash
   cd backend
   node server.js
   ```
   The backend should be running on `http://localhost:5000`.

5. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```
   The frontend should now be running on `http://localhost:3000`.

6. **Access the application**: 
   - Open your browser and go to `http://localhost:3000` to access the UniLife platform.

### How to Use the Study Buddy Feature

- Go to the "Study Buddy" section.
- Click the "Find Buddy" button to connect with other students who have similar study interests and habits.
- The app will recommend study buddies based on courses, skills, and study preferences.



## Additional Notes

- If you run into CORS issues when connecting the frontend and backend, make sure the backend has the necessary CORS configurations in place (as discussed earlier).
- As the project grows, consider implementing a database to manage data more efficiently.

Let me know if you need further customization or clarification!
