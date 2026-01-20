import axios from "axios";

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  process.env.VITE_API_BASE_URL ||
  "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
