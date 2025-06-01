// creating mongoose connection separately

const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}`);

    mongoose.connection.on("connected", () => {
      console.log("Db connected successfully");
    });

    mongoose.connection.on("error", () => {
      console.log("Db error");
    });
  } catch (err) {
    console.log(`Error from Db -: ${err.message}`);
  }
};

module.exports = connectDb;
