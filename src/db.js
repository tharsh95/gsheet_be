import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

const connectToDB = async () => {
  try {
  const con =   await mongoose.connect(MONGODB_URI);
  console.log(`Mongodb connected`)
  } catch (e) {
    console.log(e);
  }
};
export default connectToDB;