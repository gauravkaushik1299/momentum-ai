/**
 * ============================================================================
 * File: healthController.js
 * Path: server/controllers/healthController.js
 * ----------------------------------------------------------------------------
 * Receives incoming requests and sends responses.
 * Business logic is delegated to the service layer.
 * ============================================================================
 */

const healthService = require("../services/healthService");

/**
 * GET /api/health
 */
const getHealth = (req, res) => {
  const healthData = healthService.getHealthStatus();

  return res.status(200).json(healthData);
};

module.exports = {
  getHealth,
};
