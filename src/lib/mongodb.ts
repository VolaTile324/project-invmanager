import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return Promise.resolve(true);
    }

    // Connect to MongoDB
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true); // Connection established
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return Promise.reject(error);
  }
};