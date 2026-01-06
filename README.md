# Internship Take-Home Assignment

This is a full-stack application for managing employees with CRUD operations and Excel import functionality.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer
- XLSX

### Frontend
- Expo (React Native)
- Expo Router
- Axios

---

## Demo Video can be found in Screen Recording folder


## Backend Setup

cd backend

npm install

# .env setup to be done, i have included a .env.example for reference
PORT=3000
MONGO=your_mongodb_connection_string

npm run dev


## Frontend Setup

cd frontend

npm install

# note: the backend runs on localhost, expo doesn't properly support localhost based url, below steps to make it work.

# Terminal 

ifconfig | grep inet 

# it outputs something similar to 192.168.1.9 copy this and replace it with base url in api/restApi.ts

# to run the project
npx expo start

