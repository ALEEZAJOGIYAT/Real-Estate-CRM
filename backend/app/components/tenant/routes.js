const express = require("express");
const router = express.Router();
var tenantController = require("./controllers/tenantController");

router.get("/", tenantController.getTenant);
router.post("/", tenantController.createTenant);
router.get("/verify-otp", tenantController.verifyOTP);
router.get("/resend-otp", tenantController.resendOTP);
router.patch("/", tenantController.updateTenant);
router.delete("/", tenantController.deleteTenant);

module.exports = router;
