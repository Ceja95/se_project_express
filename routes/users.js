const routers = require('express').Router();

routers.get("/users", () => console.log("Get all users"));
routers.get("/users/:userId", () => console.log("Get user by ID"));
routers.post("/users", () => console.log("Create a new user"));

module.exports = routers;