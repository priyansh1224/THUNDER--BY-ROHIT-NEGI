import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
   await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("connected to Database Successfully");
}

export default connectDB;

