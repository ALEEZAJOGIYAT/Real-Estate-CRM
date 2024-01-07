const userModel = require("../dal/userModel");
const auth = require("../../../middleware/authMiddleware");
const code_generator = require("../../../services/code_generator.js");
const htmlTemplate = require("../../../services/emails/templates/otp");
const sendMail = require("../../../services/emails/email");
const OTP_EXPIRE_TIME = 5; //minutes
const moment = require("moment");

async function createUser(req, res) {
  try {
    let {
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      allowAMS,
      gender,
      userId,
      createdBy,
      realEstate,
      buildingId
    } = req.body;

    let emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let contactRegex = /^(?:\+971|0)(?:\d{1,2})?\d{7}$/;

    if (!emailReg.test(email) || !contactRegex.test(contact)) {
      return res.status(400).send({
        message: "Invalid email or contact format",
      });
    }
    let userExists = await userModel.getUsers({ email });

    console.log(userExists);

    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "User with an email already exist",
      });
    }
    let emailVerificationOTP = await code_generator.OTP_generator();
    let OTP_Expiry = moment().add(OTP_EXPIRE_TIME, "minutes");
    let userCreated = await userModel.createUser({
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      allowAMS,
      gender,
      userId,
      createdBy,
      OTP: emailVerificationOTP.hashedOTP,
      OTP_Expiry,
      realEstate,
      buildingId
    });
    if (userCreated) {
      res.status(200).send({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      data: null,
      message: "Failed to create user" + error.message,
    });
  }
}

async function getUsers(req, res) {
  try {
    let { id, all, email, name, realEstate,buildingId } = req.query;
    let userData = await userModel.getUsers({
      id,
      all,
      email,
      name,
      realEstate,
      buildingId
    });
    res.send({
      status: 200,
      message: "Data fetched successfully",
      data: userData,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    let {
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      allowAMS,
      gender,
      userId,
    } = req.body;

    let { id } = req.query;

    let response = await userModel.updateUser({
      id,
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
      userId,
      allowAMS,
    });

    if (response !== null) {
      res.status(200).send({
        status: 200,
        message: "User Updated Successfully",
        data: response,
      });
    } else {
      res.status(200).send({ message: "No record found" });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    let id = req.query;
    let result = await userModel.deleteUser(id);
    res.status(200).send({
      status: 200,
      message: "User Successfully Deleted",
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
    let user = await userModel.getUsers({ id });
    if (user.OTP_Verified === true) {
      throw Error("OTP Already Verified");
    }
    //Validate OTP expiration time
    let isOTPValid = moment().isBefore(user?.OTP_Expiry);
    let isOTPMatched = await user.compareEmailVerificationOTP(OTP);

    if (!isOTPValid || !isOTPMatched) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired OTP",
      });
    } else if (isOTPValid && isOTPMatched) {
      //If OTP is matched update email status to verified
      let result = await userModel.updateUser({
        id,
        OTP_Verified: true,
      });
      if (result.OTP_Verified === true) {
        res
          .status(200)
          .send({ success: true, message: "Email verified successfully" });
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
    let { id } = req.query;
    let emailVerificationOTP = await code_generator.OTP_generator();
    let OTP_Expiry = moment().add(OTP_EXPIRE_TIME, "minutes");
    let responseOfUpdateOTP = await userModel.updateUser({
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
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  verifyOTP,
  resendOTP,
};
