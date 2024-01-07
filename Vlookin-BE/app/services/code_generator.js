const bcrypt = require('bcrypt')
const moment = require ("moment")

function buildingCode(buildingName) {
    buildingName = buildingName.toUpperCase()
    let nameArray = buildingName.split(" ");
    
    let buildingCode = '';
    
    buildingCode += nameArray[0].slice(0, 3)
    if (nameArray.length > 1) {
        nameArray.shift()
        nameArray.forEach((elem) => {
        buildingCode += elem[0];
    });
    }
    buildingCode += Math.floor(Math.random() * 10000);
    return buildingCode
}

function complaintCode({buildingCode, flatNo, complaintCount, tenantContact}) {
  let complaintId = `COMP/${flatNo && flatNo}/${moment().format("YY-MM-DD")}/${tenantContact && tenantContact.slice(-4)}/${complaintCount}`;

  return complaintId
}



async function OTP_generator() {
  //generate and return 4 digit hashed OTP 
  let OTP_Code = Math.floor(1000 + Math.random() * 9000).toString();
  let hashedOTP = await bcrypt.hash(OTP_Code, 5);
  return ({OTP_Code, hashedOTP})

}

function generateRandomTwoDigitNumber() {
  return Math.floor(Math.random() * 100).toString().padStart(2, '0');
}

function realEstateCode(realEstateName) {
  const words = realEstateName.toUpperCase().split(" ");
  let code = "RE-" + words[0].slice(0, 2); // Take the first two letters

  if (words.length > 1) {
      words.slice(1).forEach(word => {
          code += word.charAt(0); // Add first letter of subsequent words
      });
  }
  // If the code length is greater than 4, truncate it
  return code.slice(0, 6);
}


module.exports = {
  buildingCode,
  OTP_generator,
  complaintCode,
  realEstateCode
};
