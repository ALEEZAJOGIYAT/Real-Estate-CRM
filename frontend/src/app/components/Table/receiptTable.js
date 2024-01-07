import React from "react";
import { CustomButton } from "../Button";
import {DeleteOutlined } from "@ant-design/icons";

const ReceiptTable = ({tableData, setTableData, handleSubmit}) => {

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);
  };

  const addRow = () => {
    setTableData([
      ...tableData,
      {
        chequeDate: "",
        chequeNo: "",
        Amount: "",
        bankName: "",
        depositBank: "",
        drawnBank: "",
        debitAccount: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };


  return (
    <div className='receipt-table'>
    <table>
        <thead>
          <tr>
            <th>Cheque Date</th>
            <th>Cheque No</th>
            <th>Amount</th>
            <th>Bank Name</th>
            <th>Deposit Bank</th>
            <th>Drawn Bank</th>
            <th>Debit Account</th>
        
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="chequeDate"
                  value={data.chequeDate}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="chequeNo"
                  value={data.chequeNo}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="Amount"
                  value={data.Amount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="bankName"
                  value={data.bankName}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="depositBank"
                  value={data.depositBank}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="drawnBank"
                  value={data.drawnBank}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="debitAccount"
                  value={data.debitAccount}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                  <DeleteOutlined  onClick={() => removeRow(index)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='receipt-table-footer'>
        <CustomButton handleClick={addRow} buttonName={'Add Row'} bgColor={'#4A0D37'} color={'#F8F8F8'} />
        <CustomButton handleClick={handleSubmit} buttonName={'Submit'} bgColor={'#4A0D37'} color={'#F8F8F8'} />
      </div>

    </div>
  );
};

export default ReceiptTable;
