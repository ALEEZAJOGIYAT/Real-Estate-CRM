const buildingModel = require("./buildingModel");
const code_generator = require("../../services/code_generator");
const apartmentModel = require("../apartments/apartmentModel");
const maintenanceModel = require("../maintenance/maintenanceModel")
const userModel = require("../users/dal/userModel.js");
const TenantModel = require("../tenant/dal/tenantModel");

async function createBuilding(req, res) {
  try {
    let {
      buildingName,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
      facilities,
     realEstateId,
     userId
    } = req.body;

    let buildingCode = code_generator.buildingCode(buildingName);
    let newBuilding = await buildingModel.addBuilding({
      buildingName,
      buildingCode,
      floorCount,
      parkingCount,
      watchman,
      landmark,
      fullName,
      facilities,
     realEstateId,
     userId
    });
    res.status(200).send({
      status: 200,
      message: "building successfully added",
      data: newBuilding,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function getBuilding(req, res) {
  try {
    let { all, id, realEstateId, userId } = req.query;
    let result = await buildingModel.getBuilding({ all, id, realEstateId, userId });

    res.status(200).send({
      status: 200,
      message: "Building Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}


async function updateBuilding(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingName,
      fullName,
      watchman,
      floorCount,
      parkingCount,
      landmark,
      facilities,
    } = req.body;

    let updatedBuilding = await buildingModel.updateBuilding({
      id,
      buildingName,
      fullName,
      watchman,
      floorCount,
      parkingCount,
      landmark,
      facilities,
    });
    return res.status(200).send({
      message: "Building Updated Succesfully",
      status: 200,
      data: updatedBuilding,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function deleteBuilding(req, res) {
  try {
    let { id } = req.query;

    let deleteBuilding = await buildingModel.deleteBuilding({ id });
    return res.status(200).send({
      message: "Building Deleted Succesfully",
      status: 200,
      data: deleteBuilding,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function getSelectedBuildingDetails(req, res){
  try{
    let {buildingId} = req.query;
    // const visitors = 
    let apartment = await apartmentModel.getApartment({ buildingId });
    let users = await userModel.getUsers({buildingId});
    const tenants = await TenantModel.getTenant({buildingId});
    const maintenance = users.filter(user => user.role === 'maintenance');
    const visitors = users.filter(user => user.role === 'visitor');
    let complaints = await maintenanceModel.getComplaints({buildingId});
    let data = {
      'apartments' : apartment,
      'tenants' : tenants,
      'visitors' : visitors,
      'maintenance' : maintenance,
      'complaints' : complaints
    };
    return res.status(200).send({
      message: "Building Details Fetched Succesfully",
      status: 200,
      data: data,
    });

  }catch(err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

module.exports = {
  createBuilding,
  getBuilding,
  updateBuilding,
  deleteBuilding,
  getSelectedBuildingDetails
};
