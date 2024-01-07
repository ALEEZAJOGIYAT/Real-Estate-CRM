const realEstateModel = require("./realEstateModel");
const code_generator = require("../../services/code_generator");

async function createRealEstate(req, res) {
  try {
    let {
      name
    } = req.body;

    let code = code_generator.realEstateCode(name);
    let newRealEstate = await realEstateModel.addRealEstate({
      name,
      code,
    });
    res.status(200).send({
      status: 200,
      message: "Real Estate successfully Added",
      data: newRealEstate,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function getRealEstate(req, res) {
  try {
    let { all, id } = req.query;
    let result = await realEstateModel.getRealEstate({ all, id });

    res.status(200).send({
      status: 200,
      message: "RealEstate Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}
async function updateRealEstate(req, res) {
  try {
    let { id } = req.query;
    let {
      name,
      code
    } = req.body;

    let updatedRealEstate = await realEstateModel.updateRealEstate({
      id,
      name,
      code
    });
    return res.status(200).send({
      message: "RealEstate Updated Succesfully",
      status: 200,
      data: updatedRealEstate,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteRealEstate(req, res) {
  try {
    let { id, all } = req.query;

    let deleteRealEstate = await realEstateModel.deleteRealEstate({ id, all });
    return res.status(200).send({
      message: "RealEstate Deleted Succesfully",
      status: 200,
      data: deleteRealEstate,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

module.exports = {
  createRealEstate,
  getRealEstate,
  updateRealEstate,
  deleteRealEstate,
};
