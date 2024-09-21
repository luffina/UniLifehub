# UniLifeHub

**UniLifeHub** is a comprehensive web application designed to enhance the student experience by providing a centralized platform for managing various academic and social activities. Whether you need help organizing your study schedule, finding study buddies, or staying updated on university events, UniLifeHub is here to assist.

## Features

- **Digital Student Profile**: Create and manage a personalized digital profile that stores academic, personal, and social details in one place for easy access.
- **Study Planner**: A dedicated tool for planning your studies effectively, complete with scheduling features and reminders to keep you on track.
- **Study Buddies**: Find and connect with like-minded study buddies based on courses, interests, or study habits to foster collaboration and improve learning.
- **University Events Forum**: Discover and post events happening at your university, from academic workshops to social gatherings and student organization meetings.
- **Important Links**: A convenient page with all the essential university-related links, such as learning portals, library resources, course registrations, and more for easy access.

## Tech Stack

- **Frontend**: Built with **React** for a fast and responsive user experience. React allows dynamic interactions and real-time updates on the platform.
- **Backend**: Developed using **Node.js** for server-side logic, APIs, and managing user sessions, ensuring a robust, scalable backend.
- **Flask**: A lightweight Python-based framework used to run the recommendation model (`Model.py`) for predicting student buddy similarity.
- **Database**: (Optional) Although this version of the app currently stores data in-memory, future updates will integrate a persistent database (e.g., MongoDB or PostgreSQL).

## Libraries and Tools Used

- **React**: For building the user interface and creating dynamic web pages.
- **Node.js**: For handling server-side logic, REST APIs, and session management.
- **Flask**: For running Python-based machine learning models and APIs.
- **npm**: Used to manage JavaScript dependencies for both frontend and backend.
- **Python**: Required for running Flask and the recommendation model.
- **Axios/Fetch**: To make API requests between the frontend and backend.
- **CORS**: Ensures smooth communication between the frontend and backend across different origins.
  
## Getting Started

### Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- **Node.js** (v12 or higher) and **npm** (comes with Node.js)
- **React** (included in project dependencies)
- **Git** (optional, for cloning the repository)
- **Python** (for using a Flask backend and additional scripts)
- **Flask** (install via `pip`)
  
### Installation

Follow these steps to get the project up and running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/unilifehub.git
   cd unilifehub
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

3. **Install Python dependencies**:
   - Install the required Flask libraries for running the `Model.py` file:
     ```bash
     pip install flask flask-cors
     ```

4. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory to store sensitive data such as your session secret key.
   - Example `.env` file:
     ```
     SECRET_KEY=your-secret-key
     ```

### Running the Application

1. **Run the Flask Backend (Model.py)**:
   - Navigate to the directory where `Model.py` is located and start the Flask server:
     ```bash
     cd backend
     python Model.py
     ```

   Flask will be running at `http://localhost:5000`, providing the API for recommendations.

2. **Start the Backend (Node.js)**:
   - After the Flask server is running, start the Node.js backend:
     ```bash
     cd backend
     node server.js
     ```
   The backend will be running on `http://localhost:3000`.

3. **Start the Frontend**:
   - In a new terminal, start the React frontend:
     ```bash
     cd frontend
     npm start
     ```
   The frontend will be available at `http://localhost:3001`.

4. **Access the Application**: 
   - Open your browser and go to `http://localhost:3001` to access the UniLifeHub platform.

### How to Use the Study Buddy Feature

- Go to the "Study Buddy" section.
- Click the "Find Buddy" button to connect with other students who have similar study interests and habits.
- The app will recommend study buddies based on courses, skills, and study preferences.

### Developmental Solutions: B4

### Example 1: Synthetic Data Generation and Modeling for Study Buddy Recommendations

During the development of the **Study Buddy** feature, we encountered difficulties in sourcing real-world data for the recommendation system. Due to these constraints, we generated synthetic dummy data to simulate user profiles, courses, learning styles, and subjects. This allowed us to proceed with the modeling phase while ensuring that the recommendation system functioned correctly.

To address the challenge of finding similar study buddies, we designed a Python-based recommendation model. The model compares various attributes, such as course enrollments, learning styles, and subjects, to identify users with the most similar profiles.

To further optimize the recommendation process, we implemented **cosine similarity** for calculating the similarity between students. After computing the cosine similarity between the new student and every other student, the recommendations are sorted to get the top N most similar students. Sorting a list of size `n` has a time complexity of **O(n log n)**, ensuring efficient ranking of the closest matches.

Additionally, we implemented a caching mechanism to store the results of recommendations for each user. This cache reduces redundant API calls and speeds up the user experience, ensuring that repeated requests for the same user result in instant responses rather than recalculating the similarity each time. As the project progresses and real data becomes available, the synthetic data can be easily replaced without significant changes to the modeling approach, making the system scalable and adaptable.

**API Call Complexity**: Initially, the API call for finding similar study buddies has a time complexity of **O(n)** for comparing student profiles, followed by **O(n log n)** for sorting the top N similar students. However, by using caching, subsequent requests are reduced to **O(1)**, as the system retrieves precomputed recommendations without recalculating. This optimization significantly enhances performance as the number of users increases.

This solution ensures that both memory usage and runtime remain efficient, balancing complexity while ensuring future expandability for more advanced features and datasets.

---

### Example 2: Absence of Database for User Profile Storage

Due to time constraints, we were unable to set up a fully operational database to persist user profiles and other data. Instead of using a traditional database, we designed the backend to store user session data in memory. This allowed for the temporary storage of profile information, which is sufficient for the application's current scale during development.

This interim solution enabled us to maintain core functionalities, such as user session management and profile-based recommendations, without requiring the overhead of integrating and managing a database system. While not ideal for long-term scalability, this approach allowed for rapid iteration and testing of the core application features.

For future expansions, the system is designed to easily integrate with a database when time permits, ensuring a smooth transition without major architectural changes. This plan supports both immediate functionality and long-term scalability, while allowing us to deliver the project within the set timeline.

### Additional Notes

- **CORS Issues**: If you run into CORS issues when connecting the frontend and backend, make sure the backend has the necessary CORS configurations in place.
- **Database Setup**: As the project grows, consider implementing a database to persistently manage data, such as student profiles and events.

