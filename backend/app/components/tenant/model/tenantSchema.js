const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const BuildingModel = require("../../buildings/buildingSchema")

// Define the schema
const tenantSchema = new mongoose.Schema(
  {
    tenantName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // password: { type: String },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuildingModel",
      exists: true,
      required: true,
    },
    apartmentId: {
      exists: true,
      unique: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApartmentModel",
    },
    contact: {
      type: String,
    },
    officeNo: {
      type: String,
    },
    nationality: {
      type: String,
    },
    createdBy: {
      role: {
        type: String,
        mutable: false,
        default: "Self",
        enum: ["Admin", "Self", "SuperAdmin"],
      },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    },
    OTP: {
      type: String,
    },
    OTP_Expiry: {
      type: mongoose.SchemaTypes.Date,
    },
    OTP_Verified: {
      type: Boolean,
      default: false,
    },
    joiningDate: { 
      type: mongoose.SchemaTypes.Date,
    },
    creationDate: { 
      type: mongoose.SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

// Compare Email OTP
tenantSchema.methods.compareEmailVerificationOTP = async function (OTP) {
  return await bcrypt.compare(OTP, this.OTP);
};

tenantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
tenantSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the model
const TenantModel =
  mongoose.models.tenantSchema || mongoose.model("TenantModel", tenantSchema);
module.exports = TenantModel;
