const express = require("express");
const routes = express.Router();

/**
 * this is the Controller import
 */
const TestingController = require("../App/Controllers/Testing");
const SurveyController = require("../App/Controllers/SurveyManager");
const UserController = require("../App/Controllers/User");

/**
 * Define the middleware
 */
const AuthMiddleware = require("../App/Middleware/auth");

/**
 * Define the routes
 */
routes.get("/", TestingController.index);
routes.get("/store", TestingController.store);

/**
 * Survey Manager Routes
 */

routes.get("/survey/:id", SurveyController.edit);
routes.get("/survey", SurveyController.index);

routes.post("/survey/update", SurveyController.update);
routes.post("/survey/upload-image", SurveyController.imageProcessing);
routes.post("/survey", SurveyController.store);

routes.delete("/survey/:id", SurveyController.destroy);

/**
 * AuthController
 */
routes.post("/auth/signup", UserController.signup);
routes.post("/auth/login", UserController.login);

/**
 * Export the routes
 */
module.exports = routes;
