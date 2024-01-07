const mongoose = require("mongoose");

// Define the schema
const receiptTableSchema = new mongoose.Schema(
  {
    SNo: { type: Number, default: 0 },
    receiptId: {
      type: mongoose.Types.ObjectId,
      ref: "ReceiptModel",
      required: true,
    },
    chequeDate: {
      type: String,
    },
    chequeNo: {
      type: String,
    },
    Amount: {
      type: String,
    },
    bankName: {
      type: String,
    },
    depositBank: {
      type: String,
    },
    drawnBank: {
      type: String,
    },
    debitAccount: { title: String, accountNo: String },
    creditAccount: { title: String, accountNo: String },
  },
  { timestamps: true }
);

// Create and export the model
const ReceiptTableSchema =
  mongoose.models.receiptTableSchema ||
  mongoose.model("ReceiptTableSchema", receiptTableSchema);
module.exports = ReceiptTableSchema;
