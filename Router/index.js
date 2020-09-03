const express = require("express");
const routes = express.Router();

/**
 * this is the Controller import
 */
const TestingController = require("../App/Controllers/Testing");

/**
 * Define the routes
 */
routes.get("/", TestingController.index);

/**
 * Export the routes
 */
module.exports = routes;
