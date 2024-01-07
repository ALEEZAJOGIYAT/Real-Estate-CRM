const ReceiptTable = require("../schema/receiptTableSchema");

async function addTableLines(tableLines) {
  try {
    let newTableLines = ReceiptTable.insertMany(tableLines);
    return newTableLines;
  } catch (err) {
    throw err;
  }
}
async function addTableLine({
  SNo,
  receiptId,
  chequeDate,
  chequeNo,
  Amount,
  bankName,
  depositBank,
  drawnBank,
  debitAccount,
}) {
  try {
    let newTableLines = ReceiptTable.create({
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
    return newTableLines;
  } catch (err) {
    throw err;
  }
}
async function getTableLines({receiptId, id}) {
  try {
    let where = {};
    let tableLines;
    if (id) {
      where._id = id;
    }
    if (receiptId) {
      where.receiptId = receiptId;
    }


    tableLines = ReceiptTable.find(where);

    return tableLines;
  } catch (err) {
    throw err;
  }
}




module.exports = {
  addTableLines,
  addTableLine,
  getTableLines,
};
