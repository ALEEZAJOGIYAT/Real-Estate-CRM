const tenantModel = require("../dal/tenantModel");
const code_generator = require("../../../services/code_generator");
const htmlTemplate = require("../../../services/emails/templates/otp");
const sendMail = require("../../../services/emails/email");
const sendSMS = require("../../../services/sms/sms");
const OTP_EXPIRE_TIME = 5; //Minutes
const moment = require("moment");

async function createTenant(req, res) {
  try {
    let {
      tenantName,
      password,
      email,
      buildingId,
      apartmentId,
      contact,
      officeNo,
      nationality,
      createdBy,
      joiningDate,
      creationDate    
      
    } = req.body;
    console.log(req.body, 'requestttttttt')

    let emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let contactRegex = /^(?:\+971|0)(?:\d{1,2})?\d{7}$/;

    if (!emailReg.test(email) || !contactRegex.test(contact)) {
      return res.status(400).send({
        message: "Invalid email or contact format",
      });
    }

    //creating and sending OTP
    let emailVerificationOTP = await code_generator.OTP_generator();
    let OTP_Expiry = moment().add(OTP_EXPIRE_TIME, "minutes");
    let response = await tenantModel.create({
      tenantName,
      email,
      password,
      buildingId,
      apartmentId,
      contact,
      officeNo,
      nationality,
      createdBy,
      OTP: emailVerificationOTP.hashedOTP,
      OTP_Expiry,
      joiningDate,
      creationDate    
    });

    if (response.status == 200) {
      let html = htmlTemplate.otp_email({ otp: emailVerificationOTP.OTP_Code });
      let sendEmailResponse = await sendMail.sendEmail({ html, to: email });
      // let sendSMSResponse = await sendSMS.send_otp_sms({
      //   otp: emailVerificationOTP.OTP_Code,
      //   // sms_contact: [contact],SMS Sending Temporarily disabled due to development environment
      // });
      res.status(200).send({
        message: "Tenant created successfully",
        status: 200,
        data: response,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: ("Failed to add Tenant", err.message),
      status: 500,
    });
  }
}

async function getTenant(req, res) {
  try {
    let { id, email, buildingId, apartmentId,  all } = req.query;
    let response = await tenantModel.getTenant({
      id,
      email,
      buildingId,
      apartmentId,
      all,
    });
    console.log(response);
    if (response) {
      res.status(200).send({
        message: "Data fetched successfully",
        status: 200,
        data: response,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch data",
      error: err.message,
      status: 500,
      data: null,
    });
  }
}

async function updateTenant(req, res) {
  try {
    let {
      tenantName,
      email,
      buildingId,
      apartmentId,
      flatNo,
      contact,
      officeNo,
      nationality,
    } = req.body;

    let { id } = req.query;

    let response = await tenantModel.updateTenant({
      id,
      tenantName,
      email,
      buildingId,
      apartmentId,
      flatNo,
      contact,
      officeNo,
      nationality,
    });

    res.status(200).send({
      status: 200,
      message: "Tenant Updated Successfully",
      data: response,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteTenant(req, res) {
  try {
    let id = req.query;
    let result = await tenantModel.deleteTenant(id);
    res.status(200).send({
      status: 200,
      message: "Tenant Successfully Deleted",
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function verifyOTP(req, res) {
  try {
    let { id, OTP } = req.query;
    //Get merchant
    let tenant = await tenantModel.getTenant({ id });
    if (tenant.OTP_Verified === true) {
      throw Error ("OTP Already Verified")
    }
    //Validate OTP expiration time
    let isOTPValid = moment().isBefore(tenant?.OTP_Expiry);
    let isOTPMatched = await tenant.compareEmailVerificationOTP(OTP);
    console.log('otpssssssssssssssssssssssss', isOTPMatched, isOTPMatched)
    if (!isOTPValid || !isOTPMatched) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired OTP",
      });
    } else if (isOTPValid && isOTPMatched) {
      //If OTP is matched update email status to verified
      let result = await tenantModel.updateTenant({
        id ,
        OTP_Verified: true,
      });
      console.log(result, 'ress')
      if (result?.OTP_Verified) {
        console.log('iffffff')

        res.status(200).send({ success: true, message: "Email verified successfully" });
      }
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "OTP verification failed",
      error: err.message,
    });
  }
}

async function resendOTP(req, res) {
  try {
    let {id} = req.query;
    let emailVerificationOTP = await code_generator.OTP_generator();
    let OTP_Expiry = moment().add(OTP_EXPIRE_TIME, "minutes");
    let responseOfUpdateOTP = await tenantModel.updateTenant({
      id,
      OTP: emailVerificationOTP.hashedOTP,
      OTP_Expiry,
    });
    if (responseOfUpdateOTP !== null) {
      let html = htmlTemplate.otp_email({
        otp: emailVerificationOTP.OTP_Code,
      });
      let sendEmailResponse = await sendMail.sendEmail({
        html,
        to: responseOfUpdateOTP.email,
      });
      // let sendSMSResponse = await sendSMS.send_otp_sms({
      //   otp: emailVerificationOTP.OTP_Code,
      //   // sms_contact: [contact],SMS Sending Temporarily disabled due to development environment
      // });
    
      res.status(200).send({
        message: "OTP Resent successfully",
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "OTP resend failed",
      error: err.message,
    });
  }
}

module.exports = {
  createTenant,
  getTenant,
  updateTenant,
  deleteTenant,
  verifyOTP,
  resendOTP,
};
