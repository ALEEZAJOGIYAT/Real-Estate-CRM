const mongoose = require("mongoose");
const config = require("../config_files")

const MONGODB_URI = config.MONGODB_URI
  

/**
 * Method for connecting to mongoDB
 * */

const connectDatabase = () => {
  try {
    if (MONGODB_URI != undefined || "") {
      mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      mongoose.connection.on("connected", () => {
        console.log(MONGODB_URI);
        console.log("MongoDB connected");
      });
      mongoose.connection.on("error", (err) => {
        console.log("Can't connect to MongoDB:", err);
      });
      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected!");
      });
    } else {
      console.log("No Mongo Credentials Given");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
};
