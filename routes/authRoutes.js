const authController = require("../controllers/authController");
const loginLimiter = require("../middlewares/loginLimiter");

const router = require("express").Router();

// router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);

module.exports = router;
