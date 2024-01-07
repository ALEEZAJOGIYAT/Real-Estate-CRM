const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({}),
  //Max file size = 5 MB
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return cb(
        new Error("Invalid file type. Only png, jpg & jpeg are accepted!"),
        false
      );
    } else if (fileSize > 5242880) {
      return cb(new Error("File must be equal to 5 MB!"), false);
    } else {
      cb(null, true);
    }
  },
});

function uploadFiles(fieldNames) {
  return function (req, res, next) {
    upload.fields(fieldNames)(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
      }
      next();
    });
  };
}

module.exports = { uploadFiles };
