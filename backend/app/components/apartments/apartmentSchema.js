const mongoose = require("mongoose");

// Define the schema
const apartmentSchema = new mongoose.Schema(
  {
    buildingId: {
      type: mongoose.Types.ObjectId,
      ref: "BuildingModel",
      required: true,
    },
    flatNo: {
      type: String,
      required: true,
    },
    apartmentType: {
      type: String,
      enum: { values: ["Residential", "Commercial"] },
      required: true,
    },
    area: {
      type: String,
    },
    rent: {
      type: String,
    },
    furnished: {
      type: String,
      enum: { values: ["Full-Furnished", "Semi-Furnished", "Not Furnished"] },
    },
    balcony: {
      type: Boolean,
    },
    isStudio:{type:Boolean},
    floorNo:{type:String},
    rooms: {
      bedRoom: { type: Number, default: 0 },
      dining: { type: Number, default: 0 },
      lounge: { type: Number, default: 0 },
      bath: { type: Number, default: 0 },
      pantry: { type: Number, default: 0 },
      laundry: { type: Number, default: 0 },
    },
    comments: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true
    },
    reserved: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

// Create and export the model
const ApartmentModel =
  mongoose.models.apartmentSchema ||
  mongoose.model("ApartmentModel", apartmentSchema);
module.exports = ApartmentModel;
