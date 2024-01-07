let Tenant = require("../model/tenantSchema");
let Apartment = require('../../apartments/apartmentSchema');

async function create({
  tenantName,
  email,
  buildingId,
  apartmentId,
  contact,
  officeNo,
  createdBy,
  password,
  nationality,
  OTP_Expiry,
  OTP,
  joiningDate,
  creationDate
}) {
  try {
    let addTenant = await Tenant.create({
      tenantName,
      email,
      buildingId,
      apartmentId,
      contact,
      officeNo,
      nationality,
      createdBy,
      password,
      OTP_Expiry,
      OTP,
      joiningDate,
      creationDate
    });
    //updating status of apartments
    const updatedApartment = await Apartment.findOneAndUpdate({ _id: apartmentId }, { available: false, reserved: true });

    if (updatedApartment) {
      console.log('Apartment updated successfully!');
    } else {
      console.log('Apartment update failed.');
    }
    return { data: addTenant, status: 200 };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getTenant({ id, email, buildingId, apartmentId, all }) {
  try {
    let where = {};
    let data;
    if (id) {
      where._id = id;
    }
    if (email) {
      where.email = email;
    }
    if (buildingId) {
      let projection = {tenantName : 1, email: 1, realEstate:1, officeNo:1, contact: 1,apartmentId:1,buildingId:1}  
      where.buildingId = buildingId;
      data = await Tenant.find(where).populate("buildingId", [
        "buildingName",
        "buildingCode",
      ]).populate("apartmentId", ["flatNo"]);
      return data;      
    }
    if (apartmentId && all) {
      where.apartmentId = apartmentId;
    }
    if (all) {
      data = await Tenant.find(where).populate("buildingId", [
        "buildingName",
        "buildingCode",
      ]).populate("apartmentId", ["flatNo"]);
      return data;
    }
    data = await Tenant.findOne(where).populate("buildingId", [
      "buildingName",
      "buildingCode",
    ]).populate("apartmentId", ["flatNo"]);
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateTenant({
  id,
  tenantName,
  email,
  buildingId,
  apartmentId,
  flatNo,
  contact,
  officeNo,
  nationality,
  OTP_Verified,
  OTP,
  OTP_Expiry,
}) {
  try {
    let updatedTenant = await Tenant.findOneAndUpdate(
      { _id: id },
      {
        tenantName,
        email,
        buildingId,
        apartmentId,
        flatNo,
        contact,
        officeNo,
        nationality,
        OTP_Verified,
        OTP,
        OTP_Expiry,
      }
    );

    if (updatedTenant === null) {
      throw Error("Tenant Not Found");
    }

    return updatedTenant;
  } catch (err) {
    throw err;
  }
}

async function deleteTenant({ id }) {
  try {
    let response = await Tenant.findOneAndDelete({
      _id: id,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  getTenant,
  updateTenant,
  deleteTenant,
};
