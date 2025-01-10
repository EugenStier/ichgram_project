import mongoose from "mongoose";

const connectDB = async () => {
  //асинхронная функция
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB succesfully");
  } catch (error) {
    console.error("Error while connecting database: ", err.message);
  }
};

export default connectDB;
