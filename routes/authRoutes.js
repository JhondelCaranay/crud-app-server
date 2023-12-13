const authController = require("../controllers/authController");
const loginLimiter = require("../middlewares/loginLimiter");
const verifyJWT = require("../middlewares/verifyJWT");

const router = require("express").Router();

router.post("/login", loginLimiter, authController.login);
router.post("/register", authController.register);
router.post("/profile", verifyJWT, authController.getCurrentUser);

module.exports = router;
