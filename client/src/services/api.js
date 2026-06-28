/**
 * Axios instance used throughout the application.
 * Centralizing the configuration makes it easy to
 * update the API URL later for production deployment.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export default api;
