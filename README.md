## Internship Take-Home Assignment

## This is a full-stack application for managing employees with CRUD operations and Excel import functionality.

--------------------------------------------------

## Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer
- XLSX

## Frontend
- Expo (React Native)
- Expo Router
- Axios

--------------------------------------------------

## Demo Video

A short screen recording demonstrating the application can be found in the Screen Recording folder.

--------------------------------------------------

## Backend Setup

1. Navigate to backend directory
cd backend

2. Install dependencies
npm install

3. Environment variables
Create a .env file in the backend directory.
A .env.example file has been included for reference.

PORT=3000
MONGO=your_mongodb_connection_string

4. Run the backend
npm run dev

Backend will start on:
http://localhost:3000

--------------------------------------------------

## Frontend Setup

1. Navigate to frontend directory
cd frontend

2. Install dependencies
npm install

3. Backend URL configuration (Important)

The backend runs locally, and Expo does not fully support localhost for API calls on physical devices.

Get your local IP address:
ifconfig | grep inet

This will output something like:
192.168.1.9

Replace the base URL in:
frontend/src/api/restApi.ts

Example:
http://192.168.1.9:3000

Ensure your device and laptop are connected to the same network.

4. Run the frontend
npx expo start

You can run the app using:
- Expo Go (physical device)
- Android / iOS emulator
