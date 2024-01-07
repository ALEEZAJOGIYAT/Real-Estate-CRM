const userModel = require("../users/dal/userModel");
const auth = require("../../middleware/authMiddleware");
const tenantModel = require("../tenant/dal/tenantModel")


async function login(req, res) {
  try {
    let { email, password, role } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Email & Password",
      });
    }
    let user;
    let tenant;
    if(role == 'tenant'){
        tenant = await tenantModel.getTenant({email});
        const tenantData = {
          id: tenant?._id,
          userName: tenant?.tenantName,
          status: tenant?.status,
          email: tenant?.email,
          contact: tenant?.contact,
          role: 'tenant',
        };  
        auth.createAndSendToken(tenantData, 200, res);        
    }
    if(role != 'tenant'){
      user = await userModel.getUsers({ email });
      if (!user || !await user.comparePassword(password) ) {
        return res.status(401).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      console.log(user, 'user');
      const userData = {
        id: user._id,
        userName: user.userName,
        status: user.status,
        email: user.email,
        contact: user.contact,
        role: user.role,
        allowSubUsers: user.allowSubUsers,
        allowMultipleBuildings: user.allowMultipleBuildings,
        buildingId: user.buildingId
      };  
      auth.createAndSendToken(userData, 200, res);      
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: null,
      message: "Failed to login",
    });
  }
}

module.exports = {
  login,
};
