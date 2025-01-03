import { CustomError } from "../middleware/Error";
import mongoose from "mongoose";
const ConnectDatabase = async () => {
  const uri: string | undefined = process.env.DB_URI_DEV;
  try {
    if (uri === undefined) {
      const err = new CustomError("db uri is undefined");
      err.name = "DB_URI_UNDEFINED";
      throw err;
    }
    await mongoose.connect(uri);
    console.log("Database is connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name}:${err.message}`);
    }
  }
};

export default ConnectDatabase;
