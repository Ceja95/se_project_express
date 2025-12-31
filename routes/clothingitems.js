const router = require("express").Router();
const auth = require("../middlewares/auth");
const validateCardBody = require("../middlewares/validation");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.use(auth);

router.post("/", validateCardBody, createClothingItem);
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", addLike);
router.delete("/:itemId/likes", removeLike);

module.exports = router;
