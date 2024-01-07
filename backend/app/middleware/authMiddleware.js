const config = require("../config_files")
const jwt = require("jsonwebtoken")

const signToken = (id, role) => {
  return jwt.sign({ id, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (data, statusCode, res) => {
  const token = signToken(data.id, data.role);
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (config.ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data,
  });
};

module.exports = {
  createAndSendToken,
};
