/**
 * app.js
 *
 * Creates and configures the Express application.
 * The server entry point (server.js) imports this file.
 */

const express = require("express");
const cors = require("cors");

const app = express();

/**
 * Enable Cross-Origin Resource Sharing.
 * This allows the React frontend to communicate
 * with the backend during development.
 */
app.use(cors());

/**
 * Parse incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Health check route.
 * Useful to verify that the backend is running.
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Momentum AI Backend is running 🚀",
  });
});

module.exports = app;
