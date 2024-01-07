const receiptModel = require("./models/receiptModel");
const receiptTableModel = require("./models/receiptTableModel");
const code_generator = require("../../services/code_generator");
async function createReceipt(req, res) {
  try {
    let {
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
      receiptTable,
    } = req.body;
    
    let newReceipt = await receiptModel.addReceipt({
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });
    receiptTable.map(element => {
      element.receiptId = newReceipt._id
    });
    let newReceiptTable = await receiptTableModel.addTableLines(receiptTable);


    res.status(200).send({
      status: 200,
      message: "Receipt successfully added",
      data: { Receipt: newReceipt, ReceiptTable: newReceiptTable },
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function getReceipt(req, res) {
  try {
    let { all, id } = req.query;
    let result = await receiptModel.getReceipt({ all, id });

    res.status(200).send({
      status: 200,
      message: "Receipt Data Fetched Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}
async function updateReceipt(req, res) {
  try {
    let { id } = req.query;
    let {
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    } = req.body;

    let updatedReceipt = await receiptModel.updateReceipt({
      id,
      buildingId,
      parkingPrice,
      flatNo,
      periodOfContract,
      receiptDetails,
      total,
      duration,
      tenantAccount,
    });
    return res.status(200).send({
      message: "Receipt Updated Succesfully",
      status: 200,
      data: updatedReceipt,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteReceipt(req, res) {
  try {
    let { id } = req.query;

    let deleteReceipt = await receiptModel.deleteReceipt({ id });
    return res.status(200).send({
      message: "Receipt Deleted Successfully",
      status: 200,
      data: deleteReceipt,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}
async function addReceiptLine(req, res) {
  try {
    let { SNo,
      receiptId,
      chequeDate,
      chequeNo,
      Amount,
      bankName,
      depositBank,
      drawnBank,
      debitAccount } = req.body
    let newReceiptLine = await receiptTableModel.addTableLine({
      SNo,
      receiptId,
      chequeDate,
      chequeNo,
      Amount,
      bankName,
      depositBank,
      drawnBank,
      debitAccount,
    });

    res.status(200).send({
      status: 200,
      message: "Line added successfully to receipt",
      data: newReceiptLine
    })

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "failed to add receipt table",
      error: err.message,
    });
  }
  
}
async function getReceiptTable(req, res) {
  try {
    let { id, receiptId } = req.query
    let getReceipt = await receiptTableModel.getTableLines({id, receiptId})
    res.status(200).send({
      status: 200,
      message: "Receipt Table fetched Successfully",
      data: getReceipt,
    })
    
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "failed to get receipt table",
      error: err.message

    })
  }
}

async function getReceiptWithTable(req, res){
  try {
    let { receiptId, building, tenant } = req.query
    let receiptData = await receiptModel.getReceiptWithTable({ receiptId , building, tenant})
    res.status(200).send({
      status: 200,
      message: "Receipt fetched Successfully",
      data: receiptData,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "failed to get receipt table",
      error: err.message,
    });
  }
}

module.exports = {
  createReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipt,
  getReceiptTable,
  addReceiptLine,
  getReceiptWithTable,
};
