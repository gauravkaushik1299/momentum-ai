/**
 * ============================================================================
 * File: healthService.js
 * Path: server/services/healthService.js
 * ----------------------------------------------------------------------------
 * Business logic for the Health API.
 *
 * Services contain the application's business logic. Controllers should stay
 * lightweight and delegate work to services whenever possible.
 * ============================================================================
 */

/**
 * Returns information about the backend server.
 *
 * @returns {Object}
 */
const getHealthStatus = () => {
  return {
    success: true,
    message: "Momentum AI Backend is running 🚀",
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  getHealthStatus,
};
