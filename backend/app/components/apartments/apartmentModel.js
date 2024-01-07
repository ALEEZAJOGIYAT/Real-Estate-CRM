const Apartment = require("./apartmentSchema");
const mongoose = require('mongoose');
async function addApartment(apartments) {
  try {
    let newApartment;

   newApartment = await Apartment.insertMany(apartments);

    return newApartment;
  } catch (err) {
    throw err;
  }
}

async function getApartment({all, id, buildingId}) {
  try {
    let where = {}
    let response
    let projection = {name: 1 , _id: 1, flatNo: 1, floorNo:1, available:1, reserved:1}
    if(id){
      where._id = id
    }
    if(buildingId){
      where.buildingId = buildingId
    }
    if(buildingId && all){
      response = await Apartment.find(where).populate("buildingId", ["buildingName","buildingCode"]);
      return response
    }
    if (all) {
      response = await Apartment.find(where).populate("buildingId", ["buildingName","buildingCode"]);
      return response
    }
    if(buildingId){
      response = await Apartment.find(where, projection);
      console.log(response, 'apartment response');
      return response
    }
    response = await Apartment.findOne(where).populate("buildingId", [
      "buildingName",
      "buildingCode",
    ]);
    return response;
  } catch (err) {
    throw err;
  }
}
async function updateApartment({
  id,
  buildingId,
  apartmentType,
  area,
  rent,
  furnished,
  isStudio,
  balcony,
  rooms,
  floorNo,
  flatNo,
  comments,
}) {
  try {
    let response = await Apartment.findOneAndUpdate(
      { _id: id },
      {
        buildingId,
        apartmentType,
        area,
        rent,
        furnished,
        isStudio,
        balcony,
        rooms,
        floorNo,
        flatNo,
        comments,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteApartment({ id }) {
  try {
    let response = await Apartment.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

async function apartmentWithBuildingAndTenant({ id }) {
  try {
    console.log(id)
    let apartmentDetails = await Apartment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },

      {
        $lookup: {
          from: "buildingmodels",
          localField: "buildingId",
          foreignField: "_id",
          as: "buildingDetails",
        },
      },
      {
        $lookup: {
          from: "tenantmodels",
          localField: "_id",
          foreignField: "apartmentId",
          as: "tenantDetails",
        },
      },
    ]);
    return apartmentDetails;
  } catch (err) {
    throw err;
  }
}



module.exports = {
  addApartment,
  getApartment,
  updateApartment,
  deleteApartment,
  apartmentWithBuildingAndTenant,
};
