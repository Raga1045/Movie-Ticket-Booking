# Movie Ticket Booking Website

## Project Description
A full-stack movie ticket booking application that allows users to browse movies, view detailed information, and book seats for selected showtimes. The platform features secure user authentication (including Google login), interactive seat selection, real-time seat availability checks, and concurrency handling to prevent double-booking using MongoDB transactions. Users can search and filter movies by title or location, view ratings and reviews, and filter showtimes by date.

---

## Screenshots
<img width="1919" height="899" alt="Homepage" src="https://github.com/user-attachments/assets/5ce192d3-1261-4dd0-be18-6a9c992023de" />

<img width="1918" height="911" alt="Homepage 2" src="https://github.com/user-attachments/assets/757d6036-5bf8-427d-a1bb-eb492e7f74ca" />

<img width="1917" height="890" alt="Sign up page" src="https://github.com/user-attachments/assets/c9cd9efb-9332-472f-b40e-8abee93e005c" />

<img width="1915" height="904" alt="Login" src="https://github.com/user-attachments/assets/e0b5e700-9046-4830-bd42-5bce844870e9" />

<img width="1919" height="903" alt="Movie Review page" src="https://github.com/user-attachments/assets/9dc22879-9c97-44f1-bccf-c8e32be2a97c" />

<img width="1918" height="907" alt="Show selection page" src="https://github.com/user-attachments/assets/64413dd3-22d4-4efd-9de4-7179c83ee360" />

<img width="1919" height="907" alt="Seat selection page" src="https://github.com/user-attachments/assets/c0a4eeb7-634e-4dfa-9efb-ba9410deb6f9" />

<img width="1919" height="903" alt="Payment page" src="https://github.com/user-attachments/assets/ba337518-0468-4515-9b53-4483f568af5e" />

---

## Features Implemented

### **Frontend**
- **User registration and login**
  - Signup and login forms
  - Validation and error display
  - Login with Google (OAuth integration)
- **Browse and filter movies**
  - Search by movie title
  - Filter by location
- **Movie details page**
  - Ratings, reviews, description, etc.
- **Showtimes list**
  - Grouped by city and theatre
  - Date filter for showtimes
- **Seat selection page**
  - Interactive seat map (available, booked, selected)
  - Real-time seat availability updates to avoid conflicts

 ### **Backend**
- **User Authentication**
  - API for user registration
  - API for user login (JWT token)
  - Google OAuth login API
  - Secure password hashing & storage
  - Middleware for route protection
- **Movies data**
  - API to get all available movies
  - API to search movies by title/location
  - API to get movie details & reviews by ID
- **Showtimes**
  - API to get showtimes for a selected movie
  - API to filter showtimes by date
- **Seat booking system**
  - API to get available seats
  - API to book seats
  - Concurrency handling to prevent double-booking using MongoDB transactions
    
 ---

 ## Technologies/Libraries/Packages Used

 ### **Frontend**
- React.js → Core frontend framework for building UI components
- React Router DOM → Client-side routing between pages
- Axios → For making HTTP requests to backend APIs
- CSS → Custom styling (component-specific CSS files)
- Vite → Development server & build tool (faster than CRA)

### **Backend**
- Node.js → JavaScript runtime for backend
- Express.js → Web framework for REST APIs
- Mongoose → MongoDB object modeling tool

### **Database**
- MongoDB → NoSQL database to store movies, showtimes, and bookings

### **Development Tools**
- npm → Package manager for dependencies
- Git & GitHub → Version control and code hosting
- Postman → API testing tool

---

## Local Setup

1. **Clone the repository**
```
 git clone https://github.com/Raga1045/Movie-Ticket-Booking.git
 cd Movie-Ticket-Booking
```

2. **Setup Environment Variables**
Create a .env file in the backend folder with the following:

```
env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Replace your_mongodb_connection_string with your actual MongoDB connection URI and your_jwt_secret with any secure string.

3. **Install Dependencies**
The project has frontend and backend parts, so install dependencies for both.

Backend

```
cd ../backend
npm install
```
```
cd ../src
node server.js
```

Frontend
```
cd ../FE
npm install
npm run dev
```
  
---

## Team Members
- Rishika
- Raga Hasini
- Mahathi

---

## Demo Video Link

https://drive.google.com/file/d/1hyKvL3zs0ccU5qU5xzs-5kM0U87TVgun/view?usp=drive_link
---
