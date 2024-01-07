const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController.js")

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get("/verify-otp", userController.verifyOTP);
router.get("/resend-otp", userController.resendOTP);
router.patch('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router;