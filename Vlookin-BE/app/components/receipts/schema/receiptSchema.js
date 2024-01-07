const mongoose = require("mongoose");
const BuildingModel = require("../../buildings/buildingSchema");

// Define the schema
const receiptSchema = new mongoose.Schema(
  {
    
    buildingId: {
      type: mongoose.Types.ObjectId,
      ref: "BuildingModel",
      required: true,
    },
    parkingPrice: {
      type: String,
    },
    flatNo: {
      type: String,
    },
    periodOfContract: {
      type: String,
    },
    receiptDetails: {
      type: String,
    },
    total: {
      type: String,
    },
    duration: {
      from: {
        type: String,
        require: true,
      },
      to: {
        type: String,
        require: true,
      },
    },
    
    tenantAccount: { type: mongoose.Types.ObjectId, ref:"TenantModel" },
  },
  { timestamps: true }
);

// Create and export the model
const ReceiptModel =
  mongoose.models.receiptSchema ||
  mongoose.model("ReceiptModel", receiptSchema);
module.exports = ReceiptModel;
