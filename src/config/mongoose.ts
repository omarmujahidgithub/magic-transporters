import mongoose from "mongoose";

mongoose.set("debug", true);

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb://127.0.0.1:27017/magicTransporters?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000",
      {
        bufferCommands: false,
        dbName: "magicTransporters",
        autoIndex: true,
        autoCreate: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
