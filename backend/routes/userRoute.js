const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/changepassword", authenticateToken, userController.changePassword);
router.post("/logout", authenticateToken, userController.logoutUser);

router.get("/users", userController.getAllUsers);
router.get("/profile", authenticateToken, userController.getUserProfile);
router.get("/check-session", userController.checkSession);

router.delete('/deleteaccount', authenticateToken, userController.deleteAccount);

module.exports = router;
