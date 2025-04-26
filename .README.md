# Turf Time - Mini Turf Booking System

**Turf Time** is a web-based system designed to simplify the booking process for turfs (outdoor sports fields). It allows users to register, log in, and book available slots for various sports activities. The system provides a real-time view of turf availability and ensures that users can only book open slots. While it does not include a payment gateway, it serves as a basic, user-friendly solution for turf management.

## Key Features:
- **User Registration & Login**: Users can create an account and log in to access booking features.
- **Real-Time Turf Availability**: View available turfs and their available time slots for specific dates.
- **Slot Booking**: Users can book available slots for their selected turf and date.
- **Booking Management**: Users can view, manage, and track their bookings.
- **Admin Dashboard**: Admins can view and manage all bookings, turf availability, and user data.
- **No Payment Gateway**: A simple booking system with offline payment handling.

## Technologies Used:
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT (JSON Web Tokens) for user authentication

## Installation:
1. Clone the repository.
2. Install dependencies:
npm install 
4. Set up MongoDB locally by creating a new database:
- Open your MongoDB shell (`mongosh`).
- Create a database named `proj`:
  ```bash
  use proj
  ```
- Create 3 collections: `users`, `bookings`, and `test`.
  ```bash
  db.createCollection("users")
  db.createCollection("bookings")
  db.createCollection("test")
  ```

4. Load the `test` collection with the provided data. Assuming you have a `proj.test.json` file:
- Use the following command in the MongoDB shell to import the data:
  ```bash
  mongoimport --db proj --collection test --file /path/to/proj.test.json --jsonArray
  ```

  

5. After the database is set up, navigate to the backend folder:
cd backend

6. Run the server:
```bash
node server.js
```
Server should now be running on http://localhost:5000 or the port you have configured
You should see a message like:
"Server running at http://localhost:5000"

