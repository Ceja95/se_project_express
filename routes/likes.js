const routers =require("express").Router();
const { addLike, removeLike } = require('../controllers/likes');

routers.put("/:itemsId/", () => console.log("Like added"));
routers.delete("/:itemsId/", () => console.log("Like removed"));