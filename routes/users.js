const routers = require('express').Router();

routers.get("/", () => console.log("Get all users"));
routers.get("/:userId", () => console.log("Get user by ID"));
routers.post("/", () => console.log("Create a new user"));

module.exports = routers;