const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnshcildm",
  api_key: "664947579933832",
  api_secret: "S4B_zK0tUOKuU0fsw4L5dnwnzv0",
});

module.exports = cloudinary;
