const express = require("express");
const router = express.Router();
const receiptController = require("./receiptController");

router.post("/", receiptController.createReceipt);
router.get("/", receiptController.getReceipt);
router.patch("/", receiptController.updateReceipt);
router.delete("/", receiptController.deleteReceipt);
//receipt table routes
router.post("/receipt-line", receiptController.addReceiptLine);
router.get("/receipt-table", receiptController.getReceiptTable);
router.get("/complete", receiptController.getReceiptWithTable);
module.exports = router;
