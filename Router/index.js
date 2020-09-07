const express = require("express");
const routes = express.Router();

/**
 * this is the Controller import
 */
const TestingController = require("../App/Controllers/Testing");
const SurveyController = require("../App/Controllers/SurveyManager");

/**
 * Define the routes
 */
routes.get("/", TestingController.index);
routes.get("/store", TestingController.store);

/**
 * Survey Manager Routes
 */
routes.get("/survey", SurveyController.index);
routes.post("/survey", SurveyController.store);
routes.delete("/survey", SurveyController.destroy);

/**
 * Export the routes
 */
module.exports = routes;
