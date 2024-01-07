const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    realEstate: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Please Select role"],
      enum: ["admin", "superAdmin", 'tenant', 'visitor', 'maintenance'],
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    gender: {
      type: String,
    },
    allowSubUsers: {
      type: Boolean,
    },
    allowMultipleBuildings: {
      type: Boolean,
    },
    allowAMS: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
    },
    userId: {
      type: String,
      unique: true,
    },
    createdBy: {
      role: {
        type: String,
        mutable: false,
        default: "self",
        // enum: ["admin", "self", "superAdmin"],
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
    buildingId:{
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

//If password changes hash it before updating the document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.compareEmailVerificationOTP = async function (OTP) {
  return await bcrypt.compare(OTP, this.OTP);
};

// Create and export the model
const UserModel =
  mongoose.models.userSchema || mongoose.model("UserModel", userSchema);
module.exports = UserModel;
