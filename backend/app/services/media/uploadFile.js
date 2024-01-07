const cloudinary = require("../../config_files/cloudinary");

module.exports.uploadToCloudinary = function ({ filePath, folder }) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { folder }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
};
