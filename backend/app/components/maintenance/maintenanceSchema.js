const mongoose = require("mongoose");
const TenantModel = require("../tenant/model/tenantSchema");

const maintenance = new mongoose.Schema(
  {
    category: String,
    description: String,
    images: [{ url: String, imageId: String }],
    complaintId: String,
    createdBy: String,
    tenantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "TenantModel", 
        required: true 
      },
    status: {
      type: String,
      enum: { values: ["SUBMITTED","HOLD", "IN PROGRESS", "PENDING", "CLOSED"] },
      required: true,
      default: "SUBMITTED",
      validate: {
      validator: function (status) {
        return [
          "SUBMITTED",
          "HOLD",
          "IN PROGRESS",
          "PENDING",
          "CLOSED",
        ].includes(status);
      },
      message: 'Invalid  value. Must be one of: "HOLD", "IN PROGRESS", "PENDING", "CLOSED"',
    },
  },
  buildingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "BuildingModel", 
    required: true 
  },
  },
  { timestamps: true }
);

// Create and export the model
const Maintenance =
  mongoose.models.maintenance || mongoose.model("Maintenance", maintenance);
module.exports = Maintenance;
