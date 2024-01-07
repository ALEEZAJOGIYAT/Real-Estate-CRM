let User = require("../models/user/userSchema");

async function createUser({
  userName,
  email,
  contact,
  password,
  role,
  allowSubUsers,
  allowMultipleBuildings,
  gender,
  userId,
  createdBy,
  OTP,
  OTP_Expiry,
  allowAMS,
  realEstate,
  buildingId
}) {
  try {
    let create = await User.create({
      userName,
      email,
      contact,
      password,
      role,
      allowSubUsers,
      allowMultipleBuildings,
      gender,
      userId,
      createdBy,
      OTP,
      OTP_Expiry,
      allowAMS,
      realEstate,
      buildingId
    });
    console.log(create);
    return create;
  } catch (err) {
    console.log("User creation failed", err.message);
    throw err;
  }
}

async function getUsers({ id, email, all, realEstate, buildingId }) {
  try {
    let user = null;
    let searchParams = {};
    if (id) {
      searchParams._id = id;
    }
    if (email) {
      searchParams.email = email;
    }
    if (realEstate) {
      searchParams.realEstate = realEstate;
    }
    if (buildingId) {
      let projection = {userName : 1, email: 1, realEstate:1, role:1, contact: 1, userId:1,
      gender:1, buildingId:1}
      searchParams.buildingId = buildingId;
      user = await User.find(searchParams, projection);
      return user;
    }
    if (buildingId && email) {
      searchParams.buildingId = buildingId;
      searchParams.email = email;
    }

    if (all) {
      user = await User.find(searchParams);
    } else {
      user = await User.findOne(searchParams);
    }
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateUser({
  id,
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
}) {
  try {
    let response = await User.findOneAndUpdate(
      { _id: id },
      {
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
        OTP_Verified,
        OTP,
        OTP_Expiry,
      }
    );

    if (response === null) {
      throw Error("User does not exists ")
    }
    return response;
  } catch (err) {
    throw err;
  }
}

async function deleteUser({ id }) {
  try {
    let response = await User.findOneAndDelete({ _id: id });
    return response;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
