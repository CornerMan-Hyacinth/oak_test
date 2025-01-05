import mongoose from "mongoose";

export const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    return true;
  } catch (error) {
    console.log("Error connecting to db:", error);
  }
};

export const connectFxDb = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.FX_MONGODB_URI!);

    return true;
  } catch (error) {
    console.log("Error connecting to db:", error);
  }
};
