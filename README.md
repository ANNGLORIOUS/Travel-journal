# TRAVEL JOURNAL.


#### By **{List of contributors}**
This project was created and is sole property of Annglorious mueni ,Eric Nyamwaya ,George Badia and Brian Melly.

## Project Overview
A simple journal application built with React, allowing users to register, log in, manage entries, and edit their profiles. 
This app utilizes Formik for forms and Yup for validation, alongside Axios for API calls.

## Live Demo

Check out our deployed application: [View Live App](https://travel-journal-app-ydwm.onrender.com)

### Features
1. User authentication (login, register, reset password)
2. User profile management
3. Create, edit, and delete journal entries
4. Tag management for journal entries
5. Responsive design

### API Endpoints
1. User Authentication
- POST /api/users/login
- POST /api/users/register
- POST /api/users/reset-password
2. User Profile
- GET /api/users/profile
- PUT /api/users/profile
3. Journal Entries
- GET /api/entries
- GET /api/entries/:id
- POST /api/entries
- PUT /api/entries/:id
- DELETE /api/entries/:id
4. Tags
- GET /api/tags
- POST /api/tags
- DELETE /api/tags/:id
### Frontend Code Overview
The frontend is built using React and includes several pages and components:
    - LoginPage: Handles user login.
    - RegisterPage: Handles user registration.
    - ProfilePage: Displays and updates user profile information.
    - ResetPasswordPage: Manages password reset requests.
    - TagsPage: Manages journal tags.
    - JournalEntryPage: Handles journal entries.

## Setup/Installation Requirements
* One would need either linux or wsl for window users
* A copy of visual basic code installed
* A github account

1. Open your terminal and go to the directory you wish to work from.
2. Go to the following url using ur github account https://github.com/ANNGLORIOUS/Travel-journal
3. Go to the code tab and clone the ssh key
4. Go back to the terminal and type git clone <-followed by the ssh key you copied /cloned ->
5. Enter your new cloned repository and type in code .
6. On the visual studio code that has now opened, go to the the run tab.
7. Install the requied packages and set up the required for the frontend and backend:

      #### Steps to follow for the frontend:
      1. Install dependencies for the frontend:
                cd client
                npm install
      2. In a new terminal, start the frontend:
                cd client
                npm start

    #### Steps to follow for the backend:
     1. For the backend, create a separate directory, navigate there, and set up a virtual environment:
            mkdir server
            cd server
            pipenv install && pipenv shell(for the virtual environment).
     2. Install the backend dependencies:
            pip install -r requirements.txt
     3. Set up your environment variables in a .env file in the server directory:
            PORT=5555
            DATABASE_URL=your_database_connection_string
            JWT_SECRET=your_jwt_secret
     4. Start the backend server:
            python app.py
## Prerequisites
1. Python 3.8 or higher
2. Node.js
3. npm 
4. PostgreSQL (or your chosen database)


## Technologies Used
1. Frontend: React, Formik, Yup, Axios
2. Backend: Flask, SQLAlchemy, Flask-Migrate, Flask-RESTful
3. Database: PostgreSQL
4. Styling: Bootstrap

## Support and contact details
For any issues please email me at annglorious.mueni@student.moringaschool.com
### License
Apache License 2.0


