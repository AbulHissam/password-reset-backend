const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if (!connection) throw new Error("connection to db failed");
    console.log(
      `connected to cluster => ${connection.host} and db => ${connection.db.namespace}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;
