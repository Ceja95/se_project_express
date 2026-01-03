const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateCardBody } = require("../middlewares/validation");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require("../controllers/clothingitems");
const { validateUserAndItemsId } = require("../middlewares/validation");

router.get("/", validateUserAndItemsId, getClothingItems);
router.use(auth);

router.post("/", validateCardBody, createClothingItem);
router.delete("/:itemId", validateUserAndItemsId, deleteClothingItem);

router.put("/:itemId/likes", validateUserAndItemsId, addLike);
router.delete("/:itemId/likes", validateUserAndItemsId, removeLike);

module.exports = router;
