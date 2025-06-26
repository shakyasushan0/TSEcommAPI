import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/techspireshop"
    );
    console.log(`Connection made to db ${connection.connection.host}`);
  } catch (err) {
    console.log("Error while connecting db:", err.messsage);
  }
};

export default connectDB;
