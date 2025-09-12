const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);

router.use(auth);

router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", addLike);
router.delete("/:itemId/likes", removeLike);

module.exports = router;
