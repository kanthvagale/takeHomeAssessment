import axios from "axios";
const API_BASE_URL = 'http://localhost:3000/api/employee';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
