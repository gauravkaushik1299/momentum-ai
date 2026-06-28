/**
 * ============================================================================
 * File: healthRoutes.js
 * Path: server/routes/healthRoutes.js
 * ----------------------------------------------------------------------------
 * Defines API endpoints related to application health.
 * ============================================================================
 */

const express = require("express");

const router = express.Router();

const { getHealth } = require("../controllers/healthController");

router.get("/", getHealth);

module.exports = router;
