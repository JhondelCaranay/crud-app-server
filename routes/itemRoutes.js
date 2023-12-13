const itemController = require("../controllers/itemController");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.use(verifyJWT);

router.get("/", itemController.getAllUserItem);

// router.get("/:id", itemController.getItemById);

router.post("/", itemController.createItem);

router.patch("/:id", itemController.updateItem);

router.delete("/:id", itemController.deleteItem);   

module.exports = router;
