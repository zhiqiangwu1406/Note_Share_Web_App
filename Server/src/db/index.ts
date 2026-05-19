import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv({
  path: ".env",
});
let dbURI: string;

if (process.env.NODE_ENV === "development") {
  dbURI = process.env.MONGODB_LOCAL_URI!;
} else if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGODB_URI!;
}

export const connectDB = async () => {
  try {
    const dbRes = await mongoose.connect(dbURI);
    console.log("DB Connected: " + dbRes.connection.host);
  } catch (err) {
    console.log(err);
  }
};
