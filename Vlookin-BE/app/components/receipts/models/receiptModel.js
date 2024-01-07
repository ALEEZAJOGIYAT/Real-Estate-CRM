const Receipt = require("../schema/receiptSchema");
const mongoose = require('mongoose')

async function addReceipt({
  buildingId,
  parkingPrice,
  flatNo,
  periodOfContract,
  receiptDetails,
  total,
  duration,
  tenantAccount,
}) {
  try {
    let newReceipt = Receipt.create({
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });

    return newReceipt;
  } catch (err) {
    throw err;
  }
}

async function getReceipt({ all, id, buildingId }) {
  try {
    let where = {};
    let response;
    if (id) {
      where._id = id;
    }
    if (buildingId) {
      where.buildingId = buildingId;
    }
    if (all) {
      response = await Receipt.find(where).populate("tenantAccount",["tenantName","flatNo","email","nationality","contact","officeNo",]).populate("buildingId", ["buildingName","buildingCode"]);
      return response;
    }
    response = await Receipt.findOne(where)
      .populate("tenantAccount", [
        "tenantName",
        "flatNo",
        "email",
        "nationality",
        "contact",
        "officeNo",
      ])
      .populate("buildingId", ["buildingName", "buildingCode"]);
    return response;
  } catch (err) {
    throw err;
  }
}
async function updateReceipt({
  id,
  buildingId,
  parkingPrice,
  flatNo,
  periodOfContract,
  receiptDetails,
  total,
  duration,
  tenantAccount,
}) {
  try {
    let response = await Receipt.findOneAndUpdate(
      { _id: id },
      {
        buildingId,
        parkingPrice,
        flatNo,
        periodOfContract,
        receiptDetails,
        total,
        duration,
        tenantAccount,
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteReceipt({ id }) {
  try {
    let response = await Receipt.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

async function getReceiptWithTable({ receiptId , tenant, building}) {
  try {
    console.log(receiptId)
    let filter = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(receiptId),
        },
      },
      {
        $lookup: {
          from: "receipttableschemas",
          localField: "_id",
          foreignField: "receiptId",
          as: "receiptTable",
        },
      },
    ];
    let buildingFilter = {
          $lookup: {
            from: "buildingmodels",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
    }
    let tenantFilter =  {
          $lookup: {
            from: "tenantmodels",
            localField: "tenantAccount",
            foreignField: "_id",
            as: "tenant",
          },
        }
    if (building) {
      filter =[...filter, buildingFilter]
      
    } 
    if (tenant) {
      filter =[...filter, tenantFilter]
      
    } 

    let receiptWithTable = await Receipt.aggregate(filter);
    return receiptWithTable;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipt,
  getReceiptWithTable,
};
