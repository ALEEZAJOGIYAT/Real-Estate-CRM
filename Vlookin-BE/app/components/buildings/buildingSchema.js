const mongoose = require("mongoose");

// Define the schema
const buildingSchema = new mongoose.Schema(
  {
    buildingName: {
      type: String,
      required: true,
    },
    buildingCode: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
    },
    floorCount: {
      type: String,
    },
    parkingCount: {
      type: String,
    },
    watchman: {
      type: String,
    },
    landmark: {
      type: String,
    },
    facilities : [{type: String}],
    realEstateId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "RealEstateModel",
      unique:true,
      required:true
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "userModel",
    }

  },
  { timestamps: true }
);

// Create and export the model
const BuildingModel =
  mongoose.models.buildingSchema ||
  mongoose.model("BuildingModel", buildingSchema);
module.exports = BuildingModel;
